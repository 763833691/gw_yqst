#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"
cd "${COZE_WORKSPACE_PATH}"

echo "Installing dependencies..."
npm ci --prefer-offline --no-audit --no-fund
if command -v coze > /dev/null 2>&1 && coze check-bins --help > /dev/null 2>&1; then
  coze check-bins --fix
fi
