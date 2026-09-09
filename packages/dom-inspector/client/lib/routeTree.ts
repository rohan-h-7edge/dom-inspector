import type { ReactFiber } from "../types";

/**
 * Proof-of-concept: extract a React Router route tree at runtime by walking the
 * React Fiber tree, instead of parsing route source files with an AST.
 *
 * Technique reference: the same family as callstackincubator/agent-react-devtools
 * and ChakshuGautam/react-devtools-mcp (both walk/bridge into React's fiber tree
 * to expose live app structure to an AI agent) — this applies that to React
 * Router specifically: find the `<Routes>` fiber, read its `children` prop
 * (already-resolved React elements — any `.map()`/conditional the app used has
 * already run by this point), and convert that into a plain route tree.
 *
 * Known limits (see conversation write-up): only sees whichever branch is
 * "live" for the current session/role/flag state; guard vs. layout routes
 * are distinguished by a naming heuristic, not certain knowledge.
 */

export interface RouteTreeNode {
  /** "route" for a normal/index/dynamic route, "layout" for a Route with no
   * path that renders an <Outlet/>-style wrapper, "guard" for one that looks
   * like an auth/redirect gate (heuristic — see isLikelyGuard). */
  kind: "route" | "layout" | "guard";
  path: string | null;
  index: boolean;
  /** Name of the component passed as `element`/`Component`, if resolvable. */
  componentName: string | null;
  children: RouteTreeNode[];
}

function getFiberKey(node: unknown): string | undefined {
  return Object.keys(node as object).find(
    (key) =>
      key.startsWith("__reactFiber") ||
      key.startsWith("__reactInternalInstance") ||
      key.startsWith("__reactContainer"),
  );
}

function getRootFiber(): ReactFiber | null {
  // Try the common root container ids first, then fall back to scanning body.
  const candidates = [
    document.getElementById("root"),
    document.getElementById("app"),
    document.body,
  ].filter((el): el is HTMLElement => !!el);

  for (const el of candidates) {
    const key = getFiberKey(el);
    if (key) {
      const fiber = (el as any)[key] as ReactFiber;
      // __reactContainer$xxx points at the root fiber directly; the others
      // point at the fiber for that DOM node itself — either works as a
      // starting point for the child-walk below.
      return fiber?.stateNode?.current ?? fiber;
    }
  }
  return null;
}

// React.lazy(load) doesn't return a plain named function — it's a wrapper
// object ({ $$typeof: react.lazy, _payload, _init }); the actual component is
// only reachable once its chunk has resolved, via _payload._result.
const REACT_LAZY_TYPE = Symbol.for("react.lazy");

function unwrapLazy(type: any): unknown {
  if (type && typeof type === "object" && type.$$typeof === REACT_LAZY_TYPE) {
    const result = type._payload?._result;
    // _result is the resolved module (with a `.default` export) once loaded,
    // or a pending/rejected thenable before that — only unwrap the former.
    if (result && typeof result === "object" && "default" in result) {
      return result.default;
    }
    return null; // not loaded yet — this route's chunk hasn't been visited
  }
  return type;
}

function componentName(type: unknown): string | null {
  if (!type) return null;
  if (typeof type === "string") return type; // host element like "div"
  const resolved = unwrapLazy(type);
  if (!resolved) return null;
  const t = resolved as { name?: string; displayName?: string };
  return t.displayName || t.name || null;
}

/** Depth-first search over the fiber child/sibling tree for a fiber whose
 * component name matches (react-router-dom's <Routes> function is literally
 * named "Routes"). Bounded to avoid runaway traversal on huge trees. */
function findFiberByName(root: ReactFiber, name: string, maxNodes = 20000): ReactFiber | null {
  let visited = 0;
  const stack: ReactFiber[] = [root];

  while (stack.length && visited < maxNodes) {
    const fiber = stack.pop()!;
    visited++;

    if (componentName(fiber.type) === name) return fiber;

    if (fiber.child) stack.push(fiber.child);
    if (fiber.sibling) stack.push(fiber.sibling);
  }
  return null;
}

// Heuristic only — a Route with no path and a single guard-shaped name is
// almost certainly a redirect/auth gate rather than a pure layout wrapper.
// Get this wrong sometimes; let the developer correct it in the reconciliation
// UI rather than trying to make this perfect.
const GUARD_NAME_PATTERN = /guard|private|protected|auth|redirect/i;

function classifyRoute(path: string | null, index: boolean, name: string | null): RouteTreeNode["kind"] {
  if (path !== null || index) return "route";
  if (name && GUARD_NAME_PATTERN.test(name)) return "guard";
  return "layout";
}

/** A React element is a plain object `{ type, props, key }` — by the time it's
 * sitting in a fiber's pendingProps, any `.map()`/spread/conditional the app
 * used to build it has already executed, so this is just a mechanical walk. */
function elementToRouteNode(element: any): RouteTreeNode | null {
  if (!element || typeof element !== "object") return null;

  // <Route> children are sometimes an array (from .map()) or a single element,
  // and React.Fragment wrappers show up too — flatten transparently.
  if (Array.isArray(element)) {
    // Caller (routeChildrenToNodes) handles arrays; a bare array here shouldn't
    // occur, but guard defensively.
    return null;
  }

  const type = element.type;
  const name = componentName(type);
  if (name !== "Route") {
    // Not a <Route> — likely a <React.Fragment> or similar wrapper; recurse
    // into its children as if they were direct children of the parent <Route>.
    return null;
  }

  const props = element.props ?? {};
  const path: string | null = props.path ?? null;
  const index: boolean = !!props.index;
  const elementProp = props.element;
  const elementName = elementProp ? componentName(elementProp.type) : null;

  return {
    kind: classifyRoute(path, index, elementName),
    path,
    index,
    componentName: elementName,
    children: routeChildrenToNodes(props.children),
  };
}

function routeChildrenToNodes(children: any): RouteTreeNode[] {
  if (!children) return [];
  const list = Array.isArray(children) ? children : [children];
  const nodes: RouteTreeNode[] = [];

  for (const child of list) {
    const node = elementToRouteNode(child);
    if (node) {
      nodes.push(node);
    } else if (child?.props?.children) {
      // Fragment/wrapper we didn't recognize as <Route> — flatten its children
      // up a level rather than silently dropping this whole branch.
      nodes.push(...routeChildrenToNodes(child.props.children));
    }
  }
  return nodes;
}

export interface RouteTreeExtractionResult {
  ok: boolean;
  tree: RouteTreeNode[];
  reason?: string;
}

/** Joins a parent's resolved base path with a route's own `path` prop, following
 * React Router v6 path-joining rules: a leading "/" makes the segment absolute
 * (ignoring the parent), otherwise it's appended relative to the parent. Layout/
 * guard/index nodes pass `segment: null` and simply keep the parent's path. */
export function joinRoutePath(basePath: string, segment: string | null): string {
  if (!segment) return basePath || "/";
  if (segment.startsWith("/")) return segment;
  const base = basePath === "/" ? "" : basePath;
  return `${base}/${segment}`.replace(/\/{2,}/g, "/");
}

/** Whether a resolved path can be navigated to directly for a performance test —
 * excludes dynamic segments (":id") and catch-alls ("*") since there's no real
 * param value to substitute here. */
export function isTestablePath(path: string): boolean {
  return !path.split("/").some((segment) => segment.startsWith(":") || segment === "*");
}

export interface TestableRoute {
  path: string;
  componentName: string | null;
  /** True if this route sits under a "guard" node (heuristic — see
   * classifyRoute/GUARD_NAME_PATTERN) — i.e. it likely needs an authenticated
   * session to reach, and testing it while logged out will just redirect
   * somewhere else instead of measuring the intended route. */
  requiresAuth: boolean;
}

/** Flattens the tree into the concrete, navigable routes it contains (for "test
 * all routes"). Paths may repeat (e.g. an index route resolves to its parent's
 * path) — callers that navigate through the list should dedupe first. */
export function collectTestableRoutes(
  tree: RouteTreeNode[],
  basePath = "",
  underGuard = false,
): TestableRoute[] {
  const out: TestableRoute[] = [];
  for (const node of tree) {
    const fullPath = joinRoutePath(basePath, node.path);
    const guarded = underGuard || node.kind === "guard";
    if ((node.path !== null || node.index) && isTestablePath(fullPath)) {
      out.push({ path: fullPath, componentName: node.componentName, requiresAuth: guarded });
    }
    out.push(...collectTestableRoutes(node.children, fullPath, guarded));
  }
  return out;
}

/** Entry point: walks the page's fiber tree to find <Routes> and returns its
 * resolved route tree. Dev-only proof of concept — no persistence, no UI. */
export function extractReactRouterTree(): RouteTreeExtractionResult {
  const root = getRootFiber();
  if (!root) {
    return { ok: false, tree: [], reason: "Could not find a React root fiber on this page." };
  }

  const routesFiber = findFiberByName(root, "Routes");
  if (!routesFiber) {
    return {
      ok: false,
      tree: [],
      reason:
        "No <Routes> component found. This app may use a data router (createBrowserRouter) instead of declarative <Routes>, which this prototype doesn't handle yet.",
    };
  }

  const children = routesFiber.pendingProps?.children ?? routesFiber.memoizedProps?.children;
  const tree = routeChildrenToNodes(children);

  return { ok: true, tree };
}
