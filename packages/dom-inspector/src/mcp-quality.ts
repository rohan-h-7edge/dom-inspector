/**
 * `review_code_quality` — a quality gate the agent runs after editing code and
 * before reporting work as done. Runs in the dev server process, so it checks
 * the user's own project: type-checks and lints the changed files with the
 * project's own tools, and returns a review checklist distilled from the rule
 * sets shipped in `quality-rules/` (see quality-rules/NOTICE.md).
 */

import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TOOL_SCHEMAS } from "./tool-schemas.js";

/** Minimal interface required — compatible with both McpServer and ComposableMCPServer. */
type ToolRegistrar = { tool: (...args: any[]) => any };

const SOURCE_FILE = /\.(ts|tsx|mts|cts|js|jsx|mjs|cjs)$/;
const TS_FILE = /\.(ts|tsx|mts|cts)$/;
const REACT_FILE = /\.(tsx|jsx)$/;
const IGNORED_DIR = /(^|\/)(node_modules|dist|dist-[a-z]+|build|out|coverage|\.next|\.nuxt|\.svelte-kit|\.claude)\//;
const ESLINT_CONFIGS = [
  "eslint.config.js",
  "eslint.config.mjs",
  "eslint.config.cjs",
  "eslint.config.ts",
  ".eslintrc.js",
  ".eslintrc.cjs",
  ".eslintrc.json",
  ".eslintrc.yml",
  ".eslintrc.yaml",
  ".eslintrc",
];
const COMMAND_TIMEOUT_MS = 180_000;
const MAX_LISTED_ERRORS = 50;

type CheckStatus = "PASS" | "FAIL" | "SKIPPED";
interface CheckResult {
  status: CheckStatus;
  summary: string;
  details?: string;
}

interface RunResult {
  code: number;
  output: string;
}

function run(cmd: string, args: string[], cwd: string): Promise<RunResult> {
  return new Promise((resolve) => {
    execFile(
      cmd,
      args,
      { cwd, timeout: COMMAND_TIMEOUT_MS, maxBuffer: 32 * 1024 * 1024 },
      (error, stdout, stderr) => {
        const code = error ? (typeof error.code === "number" ? error.code : 1) : 0;
        resolve({ code, output: `${stdout}${stderr}` });
      },
    );
  });
}

/** Walks up from `startDir` to `root` (inclusive) and returns the first existing candidate. */
function findUp(startDir: string, root: string, candidates: string[]): string | null {
  let dir = startDir;
  while (true) {
    for (const name of candidates) {
      const candidate = path.join(dir, name);
      if (existsSync(candidate)) return candidate;
    }
    if (dir === root || dir === path.dirname(dir)) return null;
    dir = path.dirname(dir);
  }
}

const findBin = (startDir: string, root: string, bin: string) =>
  findUp(startDir, root, [path.join("node_modules", ".bin", bin)]);

/** Groups files by a key; files whose key is null are dropped. */
function groupBy(files: string[], keyOf: (file: string) => string | null): Map<string, string[]> {
  const groups = new Map<string, string[]>();
  for (const file of files) {
    const key = keyOf(file);
    if (!key) continue;
    groups.set(key, [...(groups.get(key) ?? []), file]);
  }
  return groups;
}

async function projectRoot(): Promise<string> {
  const { code, output } = await run("git", ["rev-parse", "--show-toplevel"], process.cwd());
  return code === 0 ? output.trim() : process.cwd();
}

async function changedFiles(root: string): Promise<string[]> {
  const [diff, untracked] = await Promise.all([
    run("git", ["diff", "--name-only", "HEAD"], root),
    run("git", ["ls-files", "--others", "--exclude-standard"], root),
  ]);
  const lines = [diff, untracked]
    .filter((r) => r.code === 0)
    .flatMap((r) => r.output.split("\n"))
    .map((line) => line.trim())
    .filter((line) => SOURCE_FILE.test(line) && !IGNORED_DIR.test(line));
  return [...new Set(lines)].sort();
}

/**
 * Configs to type-check for a tsconfig. A "solution" tsconfig (Vite's default:
 * `files: []` plus `references`) checks nothing itself with `tsc -p`, so its
 * referenced configs are checked instead.
 */
async function configsToCheck(tsc: string, config: string): Promise<string[]> {
  const { code, output } = await run(tsc, ["--showConfig", "-p", config], path.dirname(config));
  if (code !== 0) return [config];
  try {
    const resolved = JSON.parse(output) as {
      files?: string[];
      include?: string[];
      references?: { path: string }[];
    };
    // --showConfig omits an empty `files: []`, so "no files and no include" is the signal.
    const isSolution =
      resolved.references?.length && !resolved.files?.length && !resolved.include?.length;
    if (!isSolution) return [config];
    return resolved.references!.map((ref) => {
      const target = path.resolve(path.dirname(config), ref.path);
      return target.endsWith(".json") ? target : path.join(target, "tsconfig.json");
    });
  } catch {
    return [config];
  }
}

/** Type-checks each changed TS file against its nearest tsconfig; reports only errors in changed files. */
async function typeCheck(root: string, files: string[]): Promise<CheckResult> {
  const tsFiles = files.filter((f) => TS_FILE.test(f));
  if (tsFiles.length === 0) return { status: "SKIPPED", summary: "no TypeScript files changed" };

  const byConfig = groupBy(tsFiles, (f) =>
    findUp(path.dirname(path.join(root, f)), root, ["tsconfig.json"]),
  );
  if (byConfig.size === 0) return { status: "SKIPPED", summary: "no tsconfig.json found" };

  const changed = new Set(tsFiles);
  const errors: string[] = [];
  let ignored = 0;
  for (const nearest of byConfig.keys()) {
    const tsc = findBin(path.dirname(nearest), root, "tsc");
    if (!tsc) return { status: "SKIPPED", summary: "TypeScript (tsc) is not installed" };

    for (const config of await configsToCheck(tsc, nearest)) {
      const args = ["--noEmit", "--pretty", "false", "-p", config];
      let { output } = await run(tsc, args, root);
      // TS5103: tsconfig's ignoreDeprecations value is invalid for this TypeScript
      // version, which stops tsc before it checks any file. Retry with one it accepts.
      if (output.includes("TS5103")) {
        ({ output } = await run(tsc, [...args, "--ignoreDeprecations", "5.0"], root));
      }
      for (const line of output.split("\n")) {
        if (!line.includes("error TS")) continue;
        const match = line.match(/^(.+?)\(\d+,\d+\): error TS/);
        if (!match) {
          return { status: "FAIL", summary: "tsc could not run", details: line };
        }
        if (changed.has(path.relative(root, path.resolve(root, match[1])))) errors.push(line);
        else ignored++;
      }
    }
  }

  const ignoredNote = ignored ? ` (${ignored} pre-existing errors in other files ignored)` : "";
  return errors.length
    ? {
        status: "FAIL",
        summary: `${errors.length} error(s) in changed files${ignoredNote}`,
        details: errors.slice(0, MAX_LISTED_ERRORS).join("\n"),
      }
    : { status: "PASS", summary: `no errors in changed files${ignoredNote}` };
}

/** Lints with the project's ESLint when it has a config, otherwise oxlint if installed. */
async function lint(root: string, files: string[]): Promise<CheckResult> {
  const existing = files.filter((f) => existsSync(path.join(root, f)));
  if (existing.length === 0) return { status: "SKIPPED", summary: "no files to lint" };

  const byEslintConfig = groupBy(existing, (f) =>
    findUp(path.dirname(path.join(root, f)), root, ESLINT_CONFIGS),
  );
  if (byEslintConfig.size > 0) {
    const outputs: string[] = [];
    let failed = false;
    for (const [config, group] of byEslintConfig) {
      const dir = path.dirname(config);
      const eslint = findBin(dir, root, "eslint");
      if (!eslint) continue;
      const { code, output } = await run(
        eslint,
        group.map((f) => path.join(root, f)),
        dir,
      );
      if (code === 2) return { status: "SKIPPED", summary: "ESLint failed to run", details: output.trim() };
      if (code !== 0) failed = true;
      if (output.trim()) outputs.push(output.trim());
    }
    if (outputs.length || failed) {
      return {
        status: failed ? "FAIL" : "PASS",
        summary: failed ? "ESLint errors" : "ESLint warnings only",
        details: outputs.join("\n"),
      };
    }
    return { status: "PASS", summary: "ESLint: no problems" };
  }

  const oxlint = findBin(root, root, "oxlint");
  if (oxlint) {
    const { code, output } = await run(oxlint, existing, root);
    return code === 0
      ? { status: "PASS", summary: "oxlint: no errors", details: output.trim() || undefined }
      : { status: "FAIL", summary: "oxlint errors", details: output.trim() };
  }
  return { status: "SKIPPED", summary: "no linter (ESLint config or oxlint) found" };
}

/** Locates the bundled quality-rules folder from both src/ and dist/ builds. */
function rulesDir(): string | null {
  const here = path.dirname(fileURLToPath(import.meta.url));
  return (
    [path.resolve(here, "../quality-rules"), path.resolve(here, "../../quality-rules")].find((dir) =>
      existsSync(dir),
    ) ?? null
  );
}

function checklist(files: string[]): string {
  const hasReact = files.some((f) => REACT_FILE.test(f));
  const sections: string[] = [];

  if (hasReact) {
    sections.push(`### React (react-best-practices, composition-patterns)
- 🔴 Hooks: no conditional hooks; effect dependencies complete; every listener/interval/subscription cleaned up in the effect's return.
- 🔴 Don't define components inside components (\`rerender-no-inline-components\`).
- 🟡 Derive state during render instead of syncing it in effects (\`rerender-derived-state-no-effect\`); functional setState for updates based on the previous value.
- 🟡 Independent awaits run in parallel with \`Promise.all\` (\`async-parallel\`); heavy components loaded lazily (\`bundle-dynamic-imports\`).
- 🟡 Conditional rendering with a ternary, not \`count && <X/>\` (\`rendering-conditional-render\`).
- 🟡 No boolean props that switch behavior — use explicit variants or composition (\`architecture-avoid-boolean-props\`); children over render props.
- 🟡 One responsibility per component; move non-UI logic into hooks; split components that grow past ~200 lines.`);

    sections.push(`### UI & accessibility (web-design-guidelines)
- 🔴 Actions use \`<button>\`, navigation uses \`<a>\` — no \`<div onClick>\`; icon-only buttons have \`aria-label\`; form controls have labels; images have \`alt\`.
- 🔴 Visible keyboard focus — never \`outline: none\` without a \`:focus-visible\` replacement.
- 🟡 Async messages (toasts, errors) use \`aria-live\`; animations honor \`prefers-reduced-motion\`; no \`transition: all\`.
- 🟡 Long text truncates or wraps; empty states handled; loading text ends with "…".`);
  }

  sections.push(`### Design & clean code (code-quality, code-review-skill)
- 🟡 SOLID: single responsibility; extend through maps/strategies instead of growing type-switches; depend on injected abstractions, not concrete singletons; narrow props/interfaces.
- 🟡 Functions under ~50 lines, cyclomatic complexity under 10, nesting ≤ 3; more than 4 parameters → an options object.
- 🟡 Reuse existing helpers instead of duplicating logic; descriptive names; no magic numbers.
- 🟢 No \`any\`; no leftover \`console.log\`; TODOs reference a ticket.`);

  sections.push(`### Correctness & security (code-review-skill)
- 🔴 No unsanitized HTML (\`dangerouslySetInnerHTML\`, \`innerHTML\`) from user or remote data; no secrets in client code; validate external input.
- 🔴 Every promise awaited or handled; async errors reach the user or a log; no state updates after unmount (abort in-flight requests).
- 🟡 Edge cases: empty/null data, failed requests, double submissions, race conditions.`);

  return sections.join("\n\n");
}

function rulesIndex(dir: string): string {
  const p = (rel: string) => path.join(dir, rel);
  return `Open a rule file when a checklist item is unclear or you suspect a violation:
- React performance — ${p("react-best-practices/SKILL.md")} (one file per rule in ${p("react-best-practices/rules/")})
- Component composition — ${p("composition-patterns/SKILL.md")} (rules in ${p("composition-patterns/rules/")})
- UI & accessibility — ${p("web-design-guidelines/guidelines.md")}
- Review guides — ${p("code-review/reference/")} (react.md, typescript.md, architecture-review-guide.md, security-review-guide.md, code-quality-universal.md)
- SOLID & clean code — ${p("code-quality/SKILL.md")}`;
}

function formatCheck(title: string, result: CheckResult): string {
  const body = result.details ? `\n\`\`\`\n${result.details}\n\`\`\`` : "";
  return `## ${title}: ${result.status} — ${result.summary}${body}`;
}

async function reviewCodeQuality(requested?: string[]): Promise<string> {
  const root = await projectRoot();
  const files = requested?.length
    ? requested.map((f) => path.relative(root, path.resolve(root, f))).filter((f) => SOURCE_FILE.test(f))
    : await changedFiles(root);

  if (files.length === 0) {
    return "# Code quality review: nothing to check\nNo changed source files (git diff vs HEAD is empty). If you edited files outside git, pass them in `files`.";
  }

  const [types, lintResult] = await Promise.all([typeCheck(root, files), lint(root, files)]);
  const automatedFailed = types.status === "FAIL" || lintResult.status === "FAIL";
  const dir = rulesDir();

  return [
    `# Code quality review — automated checks ${automatedFailed ? "FAIL" : "PASS"}`,
    `Project: ${root}\nChanged files (${files.length}):\n${files.map((f) => `- ${f}`).join("\n")}`,
    formatCheck("Type-check", types),
    formatCheck("Lint", lintResult),
    `## Review checklist — apply to the lines you changed\n🔴 must fix · 🟡 should fix · 🟢 nit. Don't flag untouched pre-existing code.\n\n${checklist(files)}`,
    dir ? `## Full rules\n${rulesIndex(dir)}` : "",
    automatedFailed
      ? "## Result: FAIL\nFix the errors above in the changed files, then call review_code_quality again. Do not report the work as done yet."
      : "## Result: automated checks PASS\nNow review your changes against the checklist. Fix every 🔴 violation (and 🟡 unless there is a reason not to), then call review_code_quality again if you changed code. Only then report done — and say briefly what the review found.",
  ]
    .filter(Boolean)
    .join("\n\n");
}

export function registerQualityTool(mcpServer: ToolRegistrar) {
  mcpServer.tool(
    TOOL_SCHEMAS.review_code_quality.name,
    TOOL_SCHEMAS.review_code_quality.description,
    TOOL_SCHEMAS.review_code_quality.inputSchema,
    async ({ files }: { files?: string[] }) => ({
      content: [{ type: "text" as const, text: await reviewCodeQuality(files) }],
    }),
  );
}

export { reviewCodeQuality };
