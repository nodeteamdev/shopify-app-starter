# ===== npm dependencies for build =====
FROM node:22.2.0-bullseye-slim AS build_dependencies

ENV APP_DIR=.

WORKDIR ${APP_DIR}

# Install git
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

COPY ./package.json .
COPY ./package-lock.json .
COPY ./turbo.json .

COPY ./apps/server/package.json ./apps/server/package.json

RUN npm pkg set scripts.prepare=" " && npm ci --quiet

WORKDIR ${APP_DIR}/apps/server
RUN npm pkg set scripts.prepare=" " && npm install

WORKDIR ${APP_DIR}

# ===== build =====

FROM node:22.2.0-bullseye-slim as build_product

ENV APP_DIR=.

WORKDIR ${APP_DIR}

COPY . .
COPY ./apps/server ./apps/server

COPY --from=build_dependencies ${APP_DIR}/node_modules ./node_modules
COPY --from=build_dependencies ${APP_DIR}/apps/server/node_modules ./apps/server/node_modules

RUN export PATH=./node_modules/.bin:$PATH
RUN npm run db:generate
RUN npm run build:back
RUN npm run build

# ==== prevent husky install ====
ARG INSTALL_HUSKY=false

RUN npm pkg set scripts.prepare=" "

RUN npm ci --omit=dev --quit

# ===== product image =====
FROM node:22.2.0-bullseye-slim

ENV APP_DIR=.

WORKDIR ${APP_DIR}

COPY --from=build_product ${APP_DIR}/apps/server/public ./apps/server/public
COPY --from=build_product ${APP_DIR}/apps/server/dist ./apps/server/dist
COPY --from=build_product ${APP_DIR}/apps/client/dist ./apps/client/dist
COPY --from=build_product ${APP_DIR}/node_modules ./node_modules
COPY --from=build_product ${APP_DIR}/apps/server/node_modules ./apps/server/node_modules

COPY ./package.json package.json

COPY ./apps/server/prisma ./apps/server/prisma

COPY turbo.json .

ADD ./docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
