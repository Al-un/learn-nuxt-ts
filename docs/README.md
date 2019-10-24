# Nuxt-TS: Nuxt application powered by TypeScript

Half tutorial, half exploration, I want to check out how far I can get
with Nuxt+TypeScript in a full application from scratch.

**Table of contents**

- [01. Initialise Project](01.init.md)
- [02. Switch to TypeScript](02.typescript.md)
  - [02.1 Adding nuxt-ts](02.typescript.md#adding-nuxt-ts)
  - [02.2 Update Nuxt configuration](02.typescript.md#update-configuration)
  - [02.3 Update existing code](02.typescript.md#update-existing-code)
- [03. Code control: formatter and linter](03.codecontrol.md)
  - [03.1 Prettier](03.codecontrol.md#prettier)
  - [03.2 ESLint](03.codecontrol.md#eslint)
- [04. Polls: components & vuex](04.polls.md)
  - [04.1 Models](04.polls.md#polls-models)
  - [04.2 Page](04.polls.md#polls-page)
  - [04.3 Components](04.polls.md#polls-components)
  - [04.4 Store](04.polls.md#polls-store)
- [05. Style](05.style.md)
  - [05.1 SCSS](05.style.md#scss)
  - [05.2 styling](05.style.md#styling)
  - [05.3 filters](05.style.md#filters)
- [06. Testing](06.test.md)
  - [06.1 Jest](06.test.md#adding-and-configuring-jest)
  - [06.2 Testing Vuex](06.test.md#vuex-testing)
  - [06.3 Testing Components](06.test.md#components-testing)
  - [06.3 Coverage](06.test.md#coverage)
- [07. Deployment](07.deploy.md)
  - [07.1 Universal vs Pre-rendered vs SPA](07.deploy.md#universal-vs-pre-rendered-vs-spa)
  - [07.2 Surge](07.deploy.md#surge)
  - [07.3 AWS S3](07.deploy.md#aws-s3)
  - [07.4 Heroku](07.deploy.md#heroku)
  - [07.5 Travis CI](07.deploy.md#travis-ci)
  - [07.6 Circle CI](07.deploy.md#circle-ci)

**Nuxt**

- 24-Oct-2019: [Nuxt 2.10.2](https://github.com/nuxt/nuxt.js/releases/tag/v2.10.2)
 `@nuxt/typescript` has been externalized therefore the dependency has to be changed to `@nuxt/typescript-build` [nuxt typescript setup guide](https://typescript.nuxtjs.org/guide/setup.html#configuration)

- 22-Mar-2019: [Nuxt 2.5.0](https://github.com/nuxt/nuxt.js/releases/tag/v2.5.0)

  `nuxt-ts` is not needed anymore. Nuxt Typescript support is done by adding
  `@nuxt/typescript`

  <detail>
  Update from Nuxt 2.4.0 is done with:

  ```sh
  yarn remove nuxt-ts
  yarn add nuxt @nuxt/typescript
  rm -Rf node_modules/
  rm yarn.lock
  yarn
  ```

  As-of 24-Mar-2019, Nuxt version is 2.5.1.

  Side-effect is that as-of Nuxt 2.5.1, Nuxt does not support `"extends": "@nuxt/typescript"`
  and _tsconfig.json_ is initialized by Nuxt:

  - `"resolveJsonModule": true` has to be added
  - `"types": ["@types/node", "@nuxt/vue-app", "@types/jest"]` has `@types/jest` added back

- 28-Jan-2019: [Nuxt 2.4.0](https://github.com/nuxt/nuxt.js/releases/tag/v2.4.0)

  [Nuxt 2.4.0 release (Jan-2019)](https://dev.to/nuxt/nuxtjs-v240-is-out-typescript-smart-prefetching-and-more-18d)
  has pushed one step forward TypeScript integration into Nuxt thanks to `nuxt-ts`

  **Kudos to Nuxt team**.

This tutorial has undergone a complete refactoring on March 2019. Old version
is archived at the [`archive/2019-03-09_refactoring` branch](https://github.com/Al-un/nuxt-ts/tree/archive/2019-03-09_refactoring)
