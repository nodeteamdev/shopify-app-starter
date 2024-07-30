<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Setup

- [x] Run `npm i` to install dependencies.
  - Do not delete `shopify.app.toml` file since that's required by Shopify CLI 3.0 to function properly, even if the file is empty.
- [x] Prisma migrations
  - Run `db:migrate:dev` to run db migrations
- [x] Create a new Public app from your [Shopify Partner Dashboard](https://partners.shopify.com).
- [x] Build your `.env` file in core project based on `.env.example` . Some envs explanation:
  - `DATABASE_URL`: Postgres connection URL. If you're using a locally hosted version, `postgresql://<username>:<password>@localhost:5432/<dbname>`
  - `API_HOST_NAME`: URL generated from Ngrok. It should not contain trailing slash.
- [x] Build your `.env` file in apps/client based on `.env.example` .
- [x] You can choose Shopify api scopes in apps/server/src/config/shopify.config.ts
  - A list of access scopes can be found [here](https://shopify.dev/api/usage/access-scopes)
- [x] NPM Scripts
  - `dev`: Run in dev mode.
  - `build`: Use Vite to build React into `client/dist`. If you don't run build, you cannot serve anything in dev / production modes.
  - `start`: Run in production mode. Please run `npm run build` before to compile client side.
  - `ngrok:auth`: Add in your auth token from [Ngrok](https://ngrok.com) to use the service.
  - `ngrok`: Ngrok is used to expose specific ports of your machine to the internet and serve over https. Running `npm run ngrok` auto generates a URL for you. The URL that's generated here goes in `API_HOST_NAME` and in the URL section of your app in Partner Dashboard.
  - `shopify`: Run CLI 3.0 commands with `npm run shopify [command]`;
  - `s:e:create`: Create extension scaffolding using CLI 3.0. A new folder called `extensions` is created at root that uses the new folder structure.
  - `s:e:deploy`: Deploy extension(s) to Shopify.
  - `lint`: Run biome lint.
  - `format`: Run biome format.
  - `prepare`: Install husky.
- [x] Setup Partner Dashboard
  - Run `npm run ngrok` to generate your subdomain. Copy the `<your-url>` domain and add it in `API_HOST_NAME` in your `.env` file.
  - Setup URL's manually by heading over to Shopify Partner Dashboard > Apps > _Your App Name_ > Configuration
  - In the URLs section
    - App URL: `https://<your-url>`
    - Allowed Redirection URL(s):
      - `https://<your-url>/api/v1/shopify-auth/offline`
      - `https://<your-url>/api/v1/shopify-auth/online`
    - Embedded in Shopify admin:
      - should be `true`
    - Compliance webhooks
      - Customers Data Request: `https://<your-url>/api/v1/mandatory-webhook/customers/data-request`
      - Customers Redact: `https://<your-url>/api/v1/mandatory-webhook/customers/redact`
      - Shop Redact: `https://<your-url>/api/v1/mandatory-webhook/shops/redact`
- [x] Running App
  - Development Mode
    - Run `npm run ngrok` to create a ngrok instance if you haven't already.
    - Run `npm run dev` to run the server in development mode.
  - Production Mode
    - Run `npm run ngrok:prod` to create a ngrok instance if you haven't already.
    - Run `npm run build` to build both react and nest.
    - Run `npm run start` to run the server in development mode.
  - Install the app by heading over to `https://ngrokurl.io/api/v1/shopify-auth?shop=mystorename.myshopify.com`. In dev mode, if you try and install from your partner dashboard, it'll fail since it'll use Vite instead of Express to run the server.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
