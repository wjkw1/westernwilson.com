#!/usr/bin/env bash
# PreToolUse hook (Bash matcher): blocks `git commit` calls missing the
# Co-Authored-By trailer that records Claude as a commit author.
cmd=$(jq -r '.tool_input.command // ""')

if echo "$cmd" | grep -qE '(^|[;&|]\s*)git(\s+-C\s+\S+)?\s+commit\b' && ! echo "$cmd" | grep -q 'Co-Authored-By: Claude'; then
  printf '%s' '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Commit message is missing the required trailer: Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>. Add it to the commit message and retry."}}'
fi
