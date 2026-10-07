---
name: verify-quality
description: Quality gate to run before telling the user any coding work is finished. Type-checks and lints the changed files, then reviews them against the react-best-practices, composition-patterns, web-design-guidelines, code-review-skill and code-quality skills, fixes blocking issues, and records the pass. Use whenever code was changed in this repo and before saying "done", or when asked to verify, check quality or review changes.
---

# Verify Quality

Run this before reporting any code change as finished. A Stop hook
(`.claude/hooks/require-quality-check.sh`) blocks finishing until it passes on
the current changes.

## 1. Automated checks

```bash
.claude/skills/verify-quality/scripts/verify.sh check
```

It lists the changed source files (vs `HEAD`, excluding build output), runs
`tsc` and fails only on errors **in those files** (the repo has pre-existing
errors elsewhere), and runs `oxlint` on them. Fix every failure it reports in
files you changed, then re-run until it prints `AUTOMATED CHECKS PASSED`.

## 2. Review against the skills

Review only the changed files from step 1 — and within them, focus on the
lines that changed. Use each skill's own reference material:

| Skill | Applies to | Read |
|---|---|---|
| `react-best-practices` | `.tsx`/`.jsx`, hooks | `SKILL.md` quick reference; open `rules/<rule>.md` for any rule you think applies |
| `composition-patterns` | React components | `SKILL.md`; `rules/` for boolean-prop sprawl, compound components, state lifting |
| `web-design-guidelines` | UI markup/styles | `guidelines.md` (accessibility, focus, forms, content) |
| `code-review-skill` | all changed code | `reference/react.md`, `reference/typescript.md`, `reference/architecture-review-guide.md`, `reference/code-quality-universal.md`, `reference/security-review-guide.md` |
| `code-quality` | all changed code | SOLID, naming, function size, complexity, Sharp Edges, Validations |

Skip what doesn't apply (no UI change → skip web-design-guidelines; no
Next.js/server code → skip those rule categories). Don't flag pre-existing
issues in untouched code unless the change makes them worse.

Classify each finding with code-review-skill's severity levels:

- 🔴 **blocking**: a bug, security issue, broken accessibility, a clear SOLID
  violation introduced by the change, or a CRITICAL/HIGH rule violated.
- 🟡 **important**: should fix; fix it unless there's a stated reason not to.
- 🟢 **nit**: optional; report, don't block.

## 3. Fix, then record the pass

Fix all 🔴 findings (and 🟡 unless there's a reason not to), then run:

```bash
.claude/skills/verify-quality/scripts/verify.sh mark
```

`mark` re-runs the automated checks and, only if they pass, records a
fingerprint of the current changes in `.claude/.quality-verified`. Any later
edit changes the fingerprint, so the gate re-arms automatically.

## 4. Report

Tell the user, briefly:
- automated checks: passed (and how many pre-existing type errors were ignored)
- per skill: ✓ no findings, or the findings as `file:line — issue` with severity
- what you fixed, and any 🟡/🟢 items you deliberately left

Never record a pass (`mark`) without actually doing the review in step 2.
