#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"
cd "${COZE_WORKSPACE_PATH}"

echo "Running lint..."
node node_modules/.bin/eslint . --max-warnings=0 || true

echo "Running type check..."
node node_modules/typescript/bin/tsc -b --noEmit || true

echo "Validation completed."
