#!/usr/bin/env bash
# Quality gate for uncommitted code changes. Used by the verify-quality skill
# and by .claude/hooks/require-quality-check.sh.
#
#   verify.sh files   list changed source files (one per line)
#   verify.sh hash    fingerprint of the current changes
#   verify.sh check   type-check + lint the changed files (exit 1 on failure)
#   verify.sh mark    run `check`; if it passes, record the fingerprint as verified
set -uo pipefail

ROOT="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)" || exit 2
cd "$ROOT" || exit 2
MARKER=".claude/.quality-verified"

# Source files changed vs HEAD (staged, unstaged, untracked), minus build
# output and tooling folders.
changed_files() {
  { git diff --name-only HEAD 2>/dev/null; git ls-files --others --exclude-standard; } \
    | grep -E '\.(ts|tsx|js|jsx|mjs|cjs)$' \
    | grep -vE '(^|/)(dist|dist-[a-z]+|out|node_modules|\.claude)/' \
    | sort -u
}

fingerprint() {
  changed_files | while IFS= read -r f; do
    if [ -f "$f" ]; then printf '%s %s\n' "$f" "$(sha256sum < "$f" | cut -d' ' -f1)"
    else printf '%s DELETED\n' "$f"; fi
  done | sha256sum | cut -d' ' -f1
}

check() {
  local files status=0
  files="$(changed_files)"
  if [ -z "$files" ]; then echo "No changed source files — nothing to check."; return 0; fi
  echo "Changed source files:"; echo "$files" | sed 's/^/  /'

  # 1. TypeScript. The repo has many pre-existing errors, so only errors in
  #    changed files fail the gate. TS5103 = tsconfig's ignoreDeprecations value
  #    is invalid for the installed TypeScript; retry with a value it accepts.
  echo; echo "== Type-check (errors in changed files only)"
  local tsc="node_modules/.bin/tsc" out
  out="$("$tsc" --noEmit -p tsconfig.json 2>&1)"
  if grep -q 'TS5103' <<<"$out"; then out="$("$tsc" --noEmit -p tsconfig.json --ignoreDeprecations 5.0 2>&1)"; fi
  if grep -qE '^(tsconfig[^(]*\.json\(|error TS)' <<<"$out"; then
    echo "FAIL: tsc could not run (config error):"; grep -E 'error TS' <<<"$out" | head -5; status=1
  else
    local errs
    errs="$(grep -E 'error TS' <<<"$out" | grep -F -f <(echo "$files" | sed 's/$/(/') || true)"
    if [ -n "$errs" ]; then echo "FAIL:"; echo "$errs"; status=1
    else echo "OK ($(grep -c 'error TS' <<<"$out") pre-existing errors elsewhere ignored)"; fi
  fi

  # 2. Lint (oxlint; errors fail, warnings are reported).
  echo; echo "== Lint (oxlint)"
  local existing; existing="$(echo "$files" | while IFS= read -r f; do [ -f "$f" ] && echo "$f"; done)"
  if [ -n "$existing" ]; then
    # shellcheck disable=SC2086
    if node_modules/.bin/oxlint $existing; then echo "OK"; else echo "FAIL: lint errors above"; status=1; fi
  fi

  echo
  if [ $status -eq 0 ]; then echo "AUTOMATED CHECKS PASSED"; else echo "AUTOMATED CHECKS FAILED"; fi
  return $status
}

case "${1:-check}" in
  files) changed_files ;;
  hash)  fingerprint ;;
  check) check ;;
  mark)
    if check; then fingerprint > "$MARKER"; echo "Recorded verification for current changes ($MARKER)."
    else echo "Not recorded: fix the failures above first."; exit 1; fi ;;
  *) echo "usage: $0 files|hash|check|mark" >&2; exit 2 ;;
esac
