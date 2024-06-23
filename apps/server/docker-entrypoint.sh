#!/bin/bash
set -e

echo "Migration started"
npm run db:migrate:prod

echo "Generate prisma"
npm run db:generate

echo "Start prod"
npm run start:prod

exec "$@"
