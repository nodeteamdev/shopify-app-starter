#!/bin/bash
set -e

echo "Generate prisma"
npm run db:generate

echo "DB deploy"
npm run db:deploy

echo "Start prod"
npm run start:prod

exec "$@"