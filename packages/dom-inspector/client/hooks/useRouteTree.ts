import { useEffect, useState } from "react";
import { extractReactRouterTree, type RouteTreeExtractionResult } from "../lib/routeTree";

const POLL_INTERVAL_MS = 300;
const MAX_ATTEMPTS = 15; // ~4.5s — covers slow first mounts without hanging forever

/**
 * Hook wrapper around extractReactRouterTree() that retries instead of relying
 * on a single fixed delay — the target app may not have mounted <Routes> yet
 * on the first attempt (cold Vite dep-optimization, Suspense boundaries, etc).
 */
export function useRouteTree(active: boolean = true): RouteTreeExtractionResult & { loading: boolean } {
  const [result, setResult] = useState<RouteTreeExtractionResult>({ ok: false, tree: [] });
  const [loading, setLoading] = useState(active);

  useEffect(() => {
    if (!active) return;

    setLoading(true);
    let attempts = 0;
    let cancelled = false;

    const attempt = () => {
      const r = extractReactRouterTree();
      attempts++;
      if (cancelled) return;

      if (r.ok || attempts >= MAX_ATTEMPTS) {
        setResult(r);
        setLoading(false);
        return;
      }
      timer = setTimeout(attempt, POLL_INTERVAL_MS);
    };

    let timer: ReturnType<typeof setTimeout> = setTimeout(attempt, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [active]);

  return { ...result, loading };
}
