/** Appended to every prompt that asks the agent to change code, so the work
 * goes through the `review_code_quality` MCP tool (src/mcp-quality.ts) before
 * it's reported as done. Free-form chat messages are left untouched. */
export const QUALITY_GATE_STEP = `## Before reporting this as done
After editing code, call the \`review_code_quality\` tool. Fix every type/lint error it reports in the files you changed and review your changes against its checklist — fix all 🔴 items — then call it again until it passes. Only then report the change as done, with a one-line summary of what the review found.`;

export const withQualityGate = (prompt: string) => `${prompt}\n\n${QUALITY_GATE_STEP}`;
