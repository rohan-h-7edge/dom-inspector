/**
 * AWS Lambda entry point for the bug-report/UI-correction collaboration hub —
 * a plain REST API (GET to list, POST to create, PATCH to update) rather than
 * the SSE-based push used by the local/Fly.io hub (src/collab/hub-entry.ts).
 * Lambda's execution model doesn't suit long-lived SSE connections (each
 * concurrent connection can land on a separate execution environment with
 * its own memory, breaking the in-process subscriber list SSE relies on), so
 * this trades instant push for the client polling GET periodically instead —
 * see client/hooks/useCollabReports.ts.
 *
 * Targets the Lambda Function URL payload format (same shape as API Gateway
 * HTTP API v2) — deploy with a Function URL directly, no API Gateway needed.
 *
 * Reuses `createReport`/`listReports`/`updateReport` from ./store.ts as-is —
 * those are plain functions with no HTTP-framework dependency.
 */
import {
  createReport,
  listReports,
  updateReport,
  isCollabDbConfigured,
  type CreateReportInput,
  type UpdateReportPatch,
} from "./store";

interface LambdaFunctionUrlEvent {
  requestContext: { http: { method: string } };
  rawPath: string;
  queryStringParameters?: Record<string, string> | null;
  body?: string | null;
  isBase64Encoded?: boolean;
}

interface LambdaResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(statusCode: number, data: unknown): LambdaResponse {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    body: JSON.stringify(data),
  };
}

function text(statusCode: number, message: string): LambdaResponse {
  return { statusCode, headers: { "Content-Type": "text/plain", ...CORS_HEADERS }, body: message };
}

export async function handler(event: LambdaFunctionUrlEvent): Promise<LambdaResponse> {
  const method = event.requestContext.http.method;
  const path = event.rawPath;

  if (method === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }

  if (path === "/health") {
    return text(200, "dom-inspector collab hub (lambda): ok");
  }

  if (!isCollabDbConfigured()) {
    return json(503, {
      error:
        "Collaboration DB not configured — set DOM_INSPECTOR_COLLAB_DB_URL and DOM_INSPECTOR_COLLAB_DB_AUTH_TOKEN as Lambda environment variables.",
    });
  }

  try {
    if (path === "/__collab__/reports" && method === "GET") {
      const projectKey = event.queryStringParameters?.projectKey;
      if (!projectKey) return text(400, "Missing projectKey query param");
      return json(200, await listReports(projectKey));
    }

    if (path === "/__collab__/reports" && method === "POST") {
      const input = JSON.parse(event.body || "{}") as CreateReportInput;
      if (!input.projectKey || !input.type || !input.selector) {
        return text(400, "Missing required fields: projectKey, type, selector");
      }
      return json(201, await createReport(input));
    }

    const patchMatch = path.match(/^\/__collab__\/reports\/([^/]+)$/);
    if (patchMatch && method === "PATCH") {
      const patch = JSON.parse(event.body || "{}") as UpdateReportPatch;
      const report = await updateReport(patchMatch[1], patch);
      if (!report) return text(404, "Report not found");
      return json(200, report);
    }

    return text(404, "Not Found");
  } catch (err) {
    return text(500, `Error: ${err instanceof Error ? err.message : String(err)}`);
  }
}
