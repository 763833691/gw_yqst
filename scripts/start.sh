#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"
PORT=5000
DEPLOY_RUN_PORT="${DEPLOY_RUN_PORT:-$PORT}"

cd "${COZE_WORKSPACE_PATH}"

echo "Starting Vite preview server on port ${DEPLOY_RUN_PORT}..."
DEPLOY_RUN_PORT=${DEPLOY_RUN_PORT} node node_modules/vite/bin/vite.js preview --host 0.0.0.0 --port ${DEPLOY_RUN_PORT}
