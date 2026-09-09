import { randomUUID } from "node:crypto";

/**
 * Persistence for the cross-machine bug-report/UI-correction collaboration
 * feature. Talks directly to Turso's HTTP ("Hrana over HTTP") API via `fetch`
 * rather than the `@libsql/client` SDK — this repo installs as an npm
 * dependency across many machines, and pulling in a client library here would
 * be one more thing that can fail to resolve; a plain HTTP call has no
 * dependency footprint at all. See https://docs.turso.tech for the API this
 * follows.
 */

export type ReportType = "bug" | "correction";
export type ReportStatus = "open" | "in_progress" | "resolved";
export type ReporterRole = "tester" | "developer";

export interface ReportDiff {
  /** Changed CSS properties (correction) or free text (bug context), before editing. */
  before: Record<string, string> | string;
  /** Same shape as `before`, after editing. */
  after: Record<string, string> | string;
}

export interface CollabReport {
  id: string;
  projectKey: string;
  type: ReportType;
  status: ReportStatus;
  /** CSS selector used to relocate the element on the page (best-effort). */
  selector: string;
  domPath: string | null;
  description: string | null;
  diff: ReportDiff | null;
  /** Data-URL screenshot of the element at report time, if captured. */
  screenshot: string | null;
  reporterRole: ReporterRole | null;
  createdAt: number;
  updatedAt: number;
  resolvedBy: string | null;
}

export interface CreateReportInput {
  projectKey: string;
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

interface TursoConfig {
  url: string;
  authToken: string;
}

function getTursoConfig(): TursoConfig | null {
  const url = process.env.DOM_INSPECTOR_COLLAB_DB_URL;
  const authToken = process.env.DOM_INSPECTOR_COLLAB_DB_AUTH_TOKEN;
  if (!url || !authToken) return null;
  // Turso URLs are often given as libsql://<db>-<org>.turso.io — the HTTP
  // API lives at the https:// equivalent of the same host.
  return { url: url.replace(/^libsql:\/\//, "https://").replace(/\/$/, ""), authToken };
}

export function isCollabDbConfigured(): boolean {
  return getTursoConfig() !== null;
}

type TursoCell =
  | { type: "null" }
  | { type: "integer" | "float" | "text"; value: string };

function toTursoArg(value: unknown): TursoCell {
  if (value === null || value === undefined) return { type: "null" };
  if (typeof value === "number") {
    return Number.isInteger(value)
      ? { type: "integer", value: String(value) }
      : { type: "float", value: String(value) };
  }
  return { type: "text", value: String(value) };
}

function fromTursoCell(cell: TursoCell | undefined): unknown {
  if (!cell || cell.type === "null") return null;
  if (cell.type === "integer" || cell.type === "float") return Number(cell.value);
  return cell.value;
}

async function execute(sql: string, args: unknown[] = []): Promise<Record<string, unknown>[]> {
  const config = getTursoConfig();
  if (!config) {
    throw new Error(
      "Collab DB not configured — set DOM_INSPECTOR_COLLAB_DB_URL and DOM_INSPECTOR_COLLAB_DB_AUTH_TOKEN (create a free database at https://turso.tech)",
    );
  }

  const res = await fetch(`${config.url}/v2/pipeline`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.authToken}`,
    },
    body: JSON.stringify({
      requests: [
        { type: "execute", stmt: { sql, args: args.map(toTursoArg) } },
        { type: "close" },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Turso request failed (${res.status}): ${text}`);
  }

  const body = (await res.json()) as {
    results?: Array<{
      type: string;
      error?: { message?: string };
      response?: { result?: { cols?: Array<{ name: string }>; rows?: TursoCell[][] } };
    }>;
  };

  const result = body.results?.[0];
  if (result?.type === "error") {
    throw new Error(result.error?.message || "Turso query error");
  }

  const cols = result?.response?.result?.cols ?? [];
  const rows = result?.response?.result?.rows ?? [];
  return rows.map((row) => {
    const obj: Record<string, unknown> = {};
    cols.forEach((col, i) => {
      obj[col.name] = fromTursoCell(row[i]);
    });
    return obj;
  });
}

let schemaReady: Promise<void> | null = null;
function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = execute(`
      CREATE TABLE IF NOT EXISTS reports (
        id TEXT PRIMARY KEY,
        projectKey TEXT NOT NULL,
        type TEXT NOT NULL,
        status TEXT NOT NULL,
        selector TEXT NOT NULL,
        domPath TEXT,
        description TEXT,
        diff TEXT,
        screenshot TEXT,
        reporterRole TEXT,
        createdAt INTEGER NOT NULL,
        updatedAt INTEGER NOT NULL,
        resolvedBy TEXT
      )
    `).then(() => undefined);
  }
  return schemaReady;
}

function rowToReport(row: Record<string, unknown>): CollabReport {
  return {
    id: row.id as string,
    projectKey: row.projectKey as string,
    type: row.type as ReportType,
    status: row.status as ReportStatus,
    selector: row.selector as string,
    domPath: (row.domPath as string) ?? null,
    description: (row.description as string) ?? null,
    diff: row.diff ? (JSON.parse(row.diff as string) as ReportDiff) : null,
    screenshot: (row.screenshot as string) ?? null,
    reporterRole: (row.reporterRole as ReporterRole) ?? null,
    createdAt: Number(row.createdAt),
    updatedAt: Number(row.updatedAt),
    resolvedBy: (row.resolvedBy as string) ?? null,
  };
}

export async function createReport(input: CreateReportInput): Promise<CollabReport> {
  await ensureSchema();
  const now = Date.now();
  const report: CollabReport = {
    id: randomUUID(),
    projectKey: input.projectKey,
    type: input.type,
    status: "open",
    selector: input.selector,
    domPath: input.domPath ?? null,
    description: input.description ?? null,
    diff: input.diff ?? null,
    screenshot: input.screenshot ?? null,
    reporterRole: input.reporterRole ?? null,
    createdAt: now,
    updatedAt: now,
    resolvedBy: null,
  };

  await execute(
    `INSERT INTO reports (id, projectKey, type, status, selector, domPath, description, diff, screenshot, reporterRole, createdAt, updatedAt, resolvedBy)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      report.id,
      report.projectKey,
      report.type,
      report.status,
      report.selector,
      report.domPath,
      report.description,
      report.diff ? JSON.stringify(report.diff) : null,
      report.screenshot,
      report.reporterRole,
      report.createdAt,
      report.updatedAt,
      report.resolvedBy,
    ],
  );

  return report;
}

export async function listReports(projectKey: string): Promise<CollabReport[]> {
  await ensureSchema();
  const rows = await execute(`SELECT * FROM reports WHERE projectKey = ? ORDER BY createdAt ASC`, [
    projectKey,
  ]);
  return rows.map(rowToReport);
}

export async function updateReport(
  id: string,
  patch: UpdateReportPatch,
): Promise<CollabReport | null> {
  await ensureSchema();
  const sets: string[] = [];
  const args: unknown[] = [];

  if (patch.status !== undefined) {
    sets.push("status = ?");
    args.push(patch.status);
  }
  if (patch.resolvedBy !== undefined) {
    sets.push("resolvedBy = ?");
    args.push(patch.resolvedBy);
  }
  if (patch.description !== undefined) {
    sets.push("description = ?");
    args.push(patch.description);
  }
  sets.push("updatedAt = ?");
  args.push(Date.now());
  args.push(id);

  await execute(`UPDATE reports SET ${sets.join(", ")} WHERE id = ?`, args);

  const rows = await execute(`SELECT * FROM reports WHERE id = ?`, [id]);
  return rows.length ? rowToReport(rows[0]) : null;
}
