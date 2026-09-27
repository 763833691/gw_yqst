#!/bin/sh
export PATH="$PWD/node_modules/.bin:$PATH"
exec node "$PWD/node_modules/vite/bin/vite.js" "$@"
