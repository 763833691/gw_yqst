#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"
cd "${COZE_WORKSPACE_PATH}"

echo "Installing dependencies..."
npm ci --prefer-offline --no-audit --no-fund

echo "Building frontend with Vite..."
node node_modules/vite/bin/vite.js build

echo "Build completed successfully!"
