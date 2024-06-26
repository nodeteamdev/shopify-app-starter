# ===== npm dependencies for build =====
FROM node:22.2.0-bullseye-slim AS build_dependencies

ENV APP_DIR=/apps/server

WORKDIR ${APP_DIR}

COPY ./apps/server/prisma ./prisma

COPY ./apps/server/package.json package.json
COPY ./apps/server/package-lock.json .

RUN npm pkg set scripts.prepare=" "

RUN npm ci --quit

RUN npm run db:generate

# ===== build =====

FROM node:22.2.0-bullseye-slim as build_product

ENV APP_DIR=/apps/server

WORKDIR ${APP_DIR}

COPY ./apps/server/ .

COPY --from=build_dependencies ${APP_DIR}/node_modules/ ./node_modules

RUN export PATH=./node_modules/.bin:$PATH

RUN npm run build

# ===== npm dependencies for product =====
FROM node:22.2.0-bullseye-slim as build_dependencies_prod

ENV APP_DIR=/apps/server

WORKDIR ${APP_DIR}

COPY --from=build_dependencies ${APP_DIR}/node_modules ./node_modules

COPY ./apps/server/package.json package.json
COPY ./apps/server/package-lock.json .

# ==== prevent husky install ====
ARG INSTALL_HUSKY=false

RUN npm pkg set scripts.prepare=" "

RUN npm ci --omit=dev --quit

# ===== product image =====
FROM node:22.2.0-bullseye-slim

ENV APP_DIR=/apps/server

WORKDIR ${APP_DIR}

COPY --from=build_dependencies_prod ${APP_DIR}/node_modules ./node_modules
COPY --from=build_product ${APP_DIR}/dist ./dist

COPY ./apps/server/package.json package.json

COPY ./apps/server/prisma ./prisma

RUN npm pkg set scripts.prepare=" "
RUN mkdir -p /app/.tmp/upload

ADD ./apps/server/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
