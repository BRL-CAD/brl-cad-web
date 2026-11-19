#!/bin/sh
# Builds the static export and syncs it to the FreeBSD host that runs the
# Bastille jail. Run from a machine that can build Next.js (Linux or macOS).
#
# Usage: bastille/deploy.sh user@freebsd-host [site-dir]

set -eu

HOST="${1:?usage: bastille/deploy.sh user@freebsd-host [site-dir]}"
SITE_DIR="${2:-/usr/local/www/brl-cad-web}"

cd "$(dirname "$0")/.."

npm ci
npm run build

# The jail mounts SITE_DIR read-only, so nginx serves the new files right away.
rsync -az --delete out/ "${HOST}:${SITE_DIR}/"

echo "Deployed out/ to ${HOST}:${SITE_DIR}"
