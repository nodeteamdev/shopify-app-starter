# ===== npm dependencies for build =====
FROM node:22.2.0-bullseye-slim AS build_dependencies

ENV APP_DIR=./

WORKDIR ${APP_DIR}

COPY ./apps/server/prisma ./prisma

COPY ./package.json package.json
COPY ./package-lock.json .

RUN npm pkg set scripts.prepare=" "

RUN npm ci --quit

RUN npm run db:migrate:dev

# ===== build =====

FROM node:22.2.0-bullseye-slim as build_product

ENV APP_DIR=/apps/client

WORKDIR ${APP_DIR}

COPY ./apps/client/ .

COPY --from=build_dependencies ${APP_DIR}/node_modules/ ./node_modules

RUN export PATH=./node_modules/.bin:$PATH

RUN npm run build

# ==== prevent husky install ====
ARG INSTALL_HUSKY=false

RUN npm pkg set scripts.prepare=" "

RUN npm ci --omit=dev --quit

# ===== product image =====
FROM node:22.2.0-bullseye-slim

ENV APP_DIR=./

WORKDIR ${APP_DIR}

COPY --from=build_dependencies_prod ${APP_DIR}/node_modules ./node_modules
COPY --from=build_product ${APP_DIR}/apps/server/public .
COPY --from=build_product ${APP_DIR}/apps/server/dist ./dist

COPY ./ package.json

COPY ./apps/server/prisma ./prisma

RUN npm pkg set scripts.prepare=" "

ADD ./docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
