/**
 * Standalone entry point for running JUST the collaboration hub (bug
 * reports / UI corrections), with none of the rest of this package's
 * dependencies (React, the AI/ACP agent pipeline, VisBug, etc.) — those are
 * irrelevant here; the hub only ever needs to store/broadcast reports.
 *
 * Deliberately avoids importing `StandaloneServer` (utils/standalone-server.ts)
 * or the `vite`-typed `Connect.Server` shape used elsewhere in this package,
 * since pulling those in would drag the rest of the package's dependency
 * graph along for a deploy that should stay tiny. `setupCollabMiddleware`
 * only actually needs an object with a Connect-style `.use(handler)` method,
 * so this provides the smallest possible implementation of that instead.
 *
 * Build: `npm run build:hub` (esbuild, bundles this + its local imports —
 * which have zero external npm dependencies — into one plain JS file).
 * Run:   `node dist-hub/index.js`, with DOM_INSPECTOR_COLLAB_DB_URL and
 * DOM_INSPECTOR_COLLAB_DB_AUTH_TOKEN set (see collab/store.ts).
 */
import http from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";
import { setupCollabMiddleware } from "../middleware/collab-middleware";
import { isCollabDbConfigured } from "./store";

type Handler = (req: IncomingMessage, res: ServerResponse, next: () => void) => void;

/** The smallest possible stand-in for the Connect-style `.use()` app shape
 * `setupCollabMiddleware` expects — just enough to register and run its one
 * handler, since this deploy has nothing else to route. */
function createMiniApp() {
  const handlers: Handler[] = [];

  const app = {
    use(handler: Handler) {
      handlers.push(handler);
      return app;
    },
  };

  const server = http.createServer((req, res) => {
    let i = 0;
    const next = () => {
      const handler = handlers[i++];
      if (!handler) {
        res.statusCode = 404;
        res.end("Not Found");
        return;
      }
      handler(req, res, next);
    };
    next();
  });

  return { app, server };
}

const port = Number(process.env.PORT) || 8080;
const host = "0.0.0.0"; // required to be reachable inside a container

const { app, server } = createMiniApp();
setupCollabMiddleware(app as any);

// Trivial health check for Fly.io / any platform's health probes — the
// collab routes themselves live under /__collab__, so this doesn't collide.
app.use(((req, res, next) => {
  if (req.url === "/" || req.url === "/health") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("dom-inspector collab hub: ok");
    return;
  }
  next();
}) as Handler);

server.listen(port, host, () => {
  console.log(`[collab-hub] listening on http://${host}:${port}`);
  console.log(
    isCollabDbConfigured()
      ? "[collab-hub] Turso DB configured — ready."
      : "[collab-hub] WARNING: DOM_INSPECTOR_COLLAB_DB_URL / DOM_INSPECTOR_COLLAB_DB_AUTH_TOKEN not set — all requests will 503.",
  );
});
