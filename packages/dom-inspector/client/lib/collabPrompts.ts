import type { CollabReport } from "../hooks/useCollabReports";

function formatDiff(diff: CollabReport["diff"]): string {
  if (!diff) return "";
  if (typeof diff.before === "string" || typeof diff.after === "string") {
    return `**Before:**\n\`\`\`\n${diff.before}\n\`\`\`\n\n**After:**\n\`\`\`\n${diff.after}\n\`\`\``;
  }
  const before = diff.before as Record<string, string>;
  const after = diff.after as Record<string, string>;
  const props = new Set([...Object.keys(before), ...Object.keys(after)]);
  const rows = Array.from(props)
    .map((prop) => `| \`${prop}\` | \`${before[prop] ?? "(unset)"}\` | \`${after[prop] ?? "(unset)"}\` |`)
    .join("\n");
  return `**Changed CSS properties:**\n\n| Property | Before | After |\n|---|---|---|\n${rows}`;
}

/** Builds the prompt sent to the agent when a developer clicks "Resolve with
 * AI" on a tester-submitted bug report. Follows the same
 * `build<X>Prompt(item): string` + "## Your Task" footer pattern as
 * `buildPerfFixPrompt`/`buildInspectionPrompt` (ContextDialog.tsx /
 * InspectionQueue.tsx) so it plugs into the same `onSubmitToAgent` pipeline. */
export function buildBugReportPrompt(report: CollabReport, pageUrl: string): string {
  return `## Bug Report

**Element**: \`${report.selector}\`${report.domPath ? ` (${report.domPath})` : ""}
**Reported by**: ${report.reporterRole ?? "a tester"}
**Page**: ${pageUrl}

**Description:**
${report.description || "(no description provided)"}
${report.screenshot ? "\n_A screenshot of the element was captured at report time._" : ""}

## Your Task
1. Find the element described above in the codebase (search by the selector/DOM path and description).
2. Identify the actual root cause of the bug — don't guess at a generic fix without confirming what's actually wrong.
3. Make a real code change that fixes it.
4. Briefly explain what you changed and why it addresses the reported issue.
5. Note in your reply that a developer should verify the fix in the browser and mark this report resolved once confirmed — this isn't done automatically.`;
}

/** Builds the prompt for a tester-submitted style/content correction — a
 * structured diff rather than free text, so the agent can apply (or adapt)
 * the exact change instead of guessing at intent from a description alone. */
export function buildCorrectionPrompt(report: CollabReport, pageUrl: string): string {
  return `## Suggested UI Correction

**Element**: \`${report.selector}\`${report.domPath ? ` (${report.domPath})` : ""}
**Suggested by**: ${report.reporterRole ?? "a tester"}
**Page**: ${pageUrl}

${formatDiff(report.diff)}
${report.description ? `\n**Tester's note:**\n${report.description}` : ""}

## Your Task
1. Find the element described above in the codebase (search by the selector/DOM path).
2. Apply the equivalent change in source (the diff above was made live in the browser via the inspector, not in code yet) — adjust it if the literal values don't fit the codebase's existing patterns (e.g. use an existing design-token/class instead of a raw hex color if one exists).
3. Briefly explain what you changed and why.
4. Note in your reply that a developer should verify the change in the browser and mark this report resolved once confirmed.`;
}
