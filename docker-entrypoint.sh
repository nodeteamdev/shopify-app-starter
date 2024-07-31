#!/bin/bash
set -e

echo "Generate prisma"
npm run db:generate

echo "Start prod"
npm run start:prod

exec "$@"