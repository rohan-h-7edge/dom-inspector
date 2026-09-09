import type { Connect } from "vite";
import type { IncomingMessage, ServerResponse } from "http";
import { handleCors } from "../utils/cors";
import {
  createReport,
  listReports,
  updateReport,
  isCollabDbConfigured,
  type CreateReportInput,
  type UpdateReportPatch,
} from "../collab/store";

// Maximum request body size (10MB) — matches inspector-middleware.ts's limit.
const MAX_BODY_SIZE = 10 * 1024 * 1024;

// Live SSE subscribers, grouped by projectKey so multiple teams/apps sharing
// one hub don't see each other's bug reports. Per-process only — if this hub
// process restarts, clients reconnect and re-fetch via GET /__collab__/reports.
const subscribers = new Map<string, Set<ServerResponse>>();

function broadcast(projectKey: string, event: { type: "created" | "updated"; report: unknown }) {
  const conns = subscribers.get(projectKey);
  if (!conns || conns.size === 0) return;
  const payload = `data: ${JSON.stringify(event)}\n\n`;
  for (const res of conns) {
    try {
      res.write(payload);
    } catch {
      // Dead connection — its own 'close' handler will remove it from the set.
    }
  }
}

function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = "";
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_SIZE) {
        reject(new Error("Request body too large"));
        req.destroy();
        return;
      }
      body += chunk.toString();
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function sendJson(res: ServerResponse, statusCode: number, data: unknown) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

function sendError(res: ServerResponse, statusCode: number, message: string) {
  res.statusCode = statusCode;
  res.end(message);
}

/**
 * Registers the collaboration-hub routes (bug reports + UI corrections,
 * shared across machines via a hosted Turso database — see collab/store.ts).
 * Follows the same single-`middlewares.use` pattern as
 * `setupInspectorMiddleware`/`setupMcpMiddleware`.
 */
export function setupCollabMiddleware(middlewares: Connect.Server) {
  middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (!req.url?.startsWith("/__collab__")) {
      next();
      return;
    }

    if (handleCors(req, res)) return;

    if (!isCollabDbConfigured()) {
      sendJson(res, 503, {
        error:
          "Collaboration DB not configured on this server instance — set DOM_INSPECTOR_COLLAB_DB_URL and DOM_INSPECTOR_COLLAB_DB_AUTH_TOKEN.",
      });
      return;
    }

    const url = new URL(req.url, "http://localhost");

    if (url.pathname === "/__collab__/stream" && req.method === "GET") {
      const projectKey = url.searchParams.get("projectKey") || "default";

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache, no-transform");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("X-Accel-Buffering", "no");
      res.socket?.setKeepAlive?.(true);
      res.socket?.setTimeout?.(0);
      res.write(`: collab-sse-connected\n\n`);

      let conns = subscribers.get(projectKey);
      if (!conns) {
        conns = new Set();
        subscribers.set(projectKey, conns);
      }
      conns.add(res);

      req.on("close", () => {
        conns?.delete(res);
        if (conns && conns.size === 0) subscribers.delete(projectKey);
      });
      return;
    }

    if (url.pathname === "/__collab__/reports" && req.method === "POST") {
      readRequestBody(req)
        .then(async (body) => {
          let input: CreateReportInput;
          try {
            input = JSON.parse(body);
          } catch {
            sendError(res, 400, "Invalid JSON");
            return;
          }
          if (!input.projectKey || !input.type || !input.selector) {
            sendError(res, 400, "Missing required fields: projectKey, type, selector");
            return;
          }
          const report = await createReport(input);
          broadcast(input.projectKey, { type: "created", report });
          sendJson(res, 201, report);
        })
        .catch((err) => {
          sendError(res, 500, `Failed to create report: ${err instanceof Error ? err.message : String(err)}`);
        });
      return;
    }

    if (url.pathname === "/__collab__/reports" && req.method === "GET") {
      const projectKey = url.searchParams.get("projectKey");
      if (!projectKey) {
        sendError(res, 400, "Missing projectKey query param");
        return;
      }
      listReports(projectKey)
        .then((reports) => sendJson(res, 200, reports))
        .catch((err) => {
          sendError(res, 500, `Failed to list reports: ${err instanceof Error ? err.message : String(err)}`);
        });
      return;
    }

    const patchMatch = url.pathname.match(/^\/__collab__\/reports\/([^/]+)$/);
    if (patchMatch && req.method === "PATCH") {
      const id = patchMatch[1];
      readRequestBody(req)
        .then(async (body) => {
          let patch: UpdateReportPatch;
          try {
            patch = JSON.parse(body);
          } catch {
            sendError(res, 400, "Invalid JSON");
            return;
          }
          const report = await updateReport(id, patch);
          if (!report) {
            sendError(res, 404, "Report not found");
            return;
          }
          broadcast(report.projectKey, { type: "updated", report });
          sendJson(res, 200, report);
        })
        .catch((err) => {
          sendError(res, 500, `Failed to update report: ${err instanceof Error ? err.message : String(err)}`);
        });
      return;
    }

    sendError(res, 404, "Not Found");
  });
}
