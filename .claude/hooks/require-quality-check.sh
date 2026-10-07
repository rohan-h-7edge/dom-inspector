#!/usr/bin/env bash
# Stop hook: Claude may not finish while changed source files haven't passed
# the verify-quality skill. Blocks once per stop attempt; stop_hook_active
# lets the second attempt through so a stuck check can never loop forever.
input="$(cat)"
[ "$(jq -r '.stop_hook_active // false' <<<"$input" 2>/dev/null)" = "true" ] && exit 0

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}" || exit 0
VERIFY=".claude/skills/verify-quality/scripts/verify.sh"
[ -x "$VERIFY" ] || exit 0

[ -z "$("$VERIFY" files)" ] && exit 0
[ "$("$VERIFY" hash)" = "$(cat .claude/.quality-verified 2>/dev/null)" ] && exit 0

jq -n '{decision: "block", reason: "Source files changed since the last passing quality check. Before telling the user the work is finished, run the verify-quality skill (/verify-quality): automated checks, then review the changed files against react-best-practices, composition-patterns, web-design-guidelines, code-review-skill and code-quality. Fix blocking findings, then record the pass with `.claude/skills/verify-quality/scripts/verify.sh mark`. If the user only asked a question and no work is being finished, say so and stop."}'
