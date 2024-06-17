#!/bin/bash
set -e

echo "Migration started"
npm run db:migrate:prod

echo "Generate prisma"
npm run db:generate

echo "installing joi"
npm install joi

echo "installing @types/joi"
npm install @types/joi

echo "Start prod"
npm run start:prod

exec "$@"
