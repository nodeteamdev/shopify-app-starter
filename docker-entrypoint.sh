#!/bin/bash
set -e

# export PATH=./node_modules/.bin:$PATH

echo "Migrate prisma"
npx prisma migrate dev --schema=./apps/server/prisma/schema.prisma

echo "Start prod"
npm run start:prod

exec "$@"