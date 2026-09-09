import { useCallback, useEffect, useState } from "react";
import { getCollabConfig } from "../utils/config-loader";

// How often to poll for other people's reports. Not SSE: the hub can be a
// plain REST API (e.g. an AWS Lambda Function URL), which has no persistent
// connection to push over — polling works identically whether the hub is a
// long-running Node process or a stateless serverless endpoint.
const POLL_INTERVAL_MS = 4000;

export type ReportType = "bug" | "correction";
export type ReportStatus = "open" | "in_progress" | "resolved";
export type ReporterRole = "tester" | "developer";

export interface ReportDiff {
  before: Record<string, string> | string;
  after: Record<string, string> | string;
}

export interface CollabReport {
  id: string;
  projectKey: string;
  type: ReportType;
  status: ReportStatus;
  selector: string;
  domPath: string | null;
  description: string | null;
  diff: ReportDiff | null;
  screenshot: string | null;
  reporterRole: ReporterRole | null;
  createdAt: number;
  updatedAt: number;
  resolvedBy: string | null;
}

export interface CreateReportInput {
  type: ReportType;
  selector: string;
  domPath?: string | null;
  description?: string | null;
  diff?: ReportDiff | null;
  screenshot?: string | null;
  reporterRole?: ReporterRole | null;
}

export interface UpdateReportPatch {
  status?: ReportStatus;
  resolvedBy?: string | null;
  description?: string | null;
}

/**
 * Client for the cross-machine bug-report/UI-correction collaboration hub —
 * either the local/self-hosted Node hub (src/collab/hub-entry.ts) or a
 * stateless REST endpoint (e.g. an AWS Lambda Function URL,
 * src/collab/lambda-handler.ts). Both expose the same GET/POST/PATCH shape,
 * so this hook works identically against either: it polls GET periodically
 * rather than relying on a push connection, since a serverless hub has
 * nothing to push over. No-ops entirely — `enabled: false`, empty `reports`
 * — when the server hasn't been configured with a `collabServerUrl` (the
 * common single-machine case, where this feature is invisible).
 */
export function useCollabReports() {
  const { serverUrl, projectKey } = getCollabConfig();
  const enabled = !!serverUrl;

  const [reports, setReports] = useState<CollabReport[]>([]);

  useEffect(() => {
    if (!enabled || !serverUrl) return;

    let cancelled = false;

    const poll = () => {
      fetch(`${serverUrl}/__collab__/reports?projectKey=${encodeURIComponent(projectKey)}`)
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
        .then((latest: CollabReport[]) => {
          if (!cancelled) setReports(latest);
        })
        .catch((err) => {
          console.warn("[dom-inspector] Failed to load collab reports:", err);
        });
    };

    poll();
    const interval = setInterval(poll, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [enabled, serverUrl, projectKey]);

  const createReport = useCallback(
    async (input: CreateReportInput): Promise<CollabReport | null> => {
      if (!enabled || !serverUrl) return null;
      try {
        const res = await fetch(`${serverUrl}/__collab__/reports`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...input, projectKey }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const report = (await res.json()) as CollabReport;
        // Reflect it locally right away rather than waiting for the next
        // poll tick — only this browser's own action needs to feel instant;
        // everyone else picks it up on their next poll.
        setReports((prev) => [...prev, report]);
        return report;
      } catch (err) {
        console.warn("[dom-inspector] Failed to submit collab report:", err);
        return null;
      }
    },
    [enabled, serverUrl, projectKey],
  );

  const updateReport = useCallback(
    async (id: string, patch: UpdateReportPatch): Promise<CollabReport | null> => {
      if (!enabled || !serverUrl) return null;
      try {
        const res = await fetch(`${serverUrl}/__collab__/reports/${encodeURIComponent(id)}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const report = (await res.json()) as CollabReport;
        setReports((prev) => prev.map((r) => (r.id === report.id ? report : r)));
        return report;
      } catch (err) {
        console.warn("[dom-inspector] Failed to update collab report:", err);
        return null;
      }
    },
    [enabled, serverUrl, projectKey],
  );

  return { enabled, reports, createReport, updateReport };
}
