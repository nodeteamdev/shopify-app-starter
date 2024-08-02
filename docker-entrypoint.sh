#!/bin/bash
set -e

echo "Generate prisma"
npm run db:generate

echo "Migrate prisma"
npm run db:migrate:dev

echo "Start prod"
npm run start:prod

exec "$@"