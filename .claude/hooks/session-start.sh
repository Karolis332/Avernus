#!/bin/bash
set -euo pipefail

# Only run in remote (Claude Code on the web) environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# No dependencies to install — this is a content-only markdown repository.
# This hook exists as a placeholder so future dependencies can be added here.
exit 0
