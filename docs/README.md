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

- 13-Apr-2020: switch Nuxt official TypeScript support: https://typescript.nuxtjs.org/. Migration method is described here: https://typescript.nuxtjs.org/migration.html.

  <details>

    <summary>Update steps</summary>

    Update dependencies
    ```sh
    # Bump node-sass
    rm -Rf node_modules
    rm package-lock.json
    npm uninstall node-sass
    npm install node-sass

    # Remove nuxt dependencies
    npm uninstall @nuxt/typescript nuxt nuxt-property-decorator
    # Ensure that we have at least nuxt 2.9.x
    npm install nuxt
    # Bump property decorator
    npm install nuxt-property-decorator
    # Upgrade
    npm install --save-dev @nuxt/typescript-build
    # Add TypeScript runtime configuration for nuxt-property-decorator
    # https://github.com/nuxt-community/nuxt-property-decorator/issues/62#issuecomment-577601678
    npm install @nuxt/typescript-runtime

    # Update linting
    npm uninstall @typescript-eslint/eslint-plugin
    npm install --save-dev @nuxtjs/eslint-module
    npm install --save-dev @nuxtjs/eslint-config-typescript
    npm uninstall eslint-plugin-vue
    npm install --save-dev eslint-plugin-nuxt eslint-plugin-prettier
    ```

    Update `nuxt.config.js`:

    ```diff
    - import pkg from './package.json';

    - module.exports = {
    + export default {

    -     title: pkg.name,
    +     titleTemplate: '%s - ' + process.env.npm_package_name,
    +     title: process.env.npm_package_name || '',

    -      { hid: 'description', name: 'description', content: pkg.description }
    +      {
    +        hid: 'description',
    +        name: 'description',
    +        content: process.env.npm_package_description || ''
    +      }

    +  /*
    +   ** Nuxt.js dev-modules
    +   */
    +  buildModules: [
    +    // Doc: https://github.com/nuxt-community/eslint-module
    +    '@nuxtjs/eslint-module',
    +    '@nuxt/typescript-build'
    +  ],
    ```

    Update `tsconfig.json`

    ```diff
    -      "@nuxt/vue-app",
    +      "@nuxt/types",
    ```

    Update `.eslintrc.js`:

    ```diff
    -  // https://eslint.org/docs/user-guide/configuring#specifying-parser
    -  parser: 'vue-eslint-parser',
    -  // https://vuejs.github.io/eslint-plugin-vue/user-guide/#faq
    -  parserOptions: {
    -    parser: '@typescript-eslint/parser',
    -    ecmaVersion: 2017,
    -    sourceType: 'module',
    -    project: './tsconfig.json'
    -  },
    -
    -  // https://eslint.org/docs/user-guide/configuring#extending-configuration-files
    -  // order matters: from least important to most important in terms of overriding
    -  // Prettier + Vue: https://medium.com/@gogl.alex/how-to-properly-set-up-eslint-with-prettier-for-vue-or-nuxt-in-vscode-e42532099a9c
      extends: [
    -    'eslint:recommended',
    -    'plugin:@typescript-eslint/recommended',
    -    'plugin:vue/recommended',
    -    'prettier',
    -    'prettier/vue',
    -    'prettier/@typescript-eslint'
    +    '@nuxtjs',
    +    '@nuxtjs/eslint-config-typescript',
    +    'prettier',
    +    'prettier/vue',
    +    'plugin:prettier/recommended',
    +    'plugin:nuxt/recommended'
      ],
    -  
    -  // https://eslint.org/docs/user-guide/configuring#configuring-plugins
    -  plugins: ['vue', '@typescript-eslint'],

    +  plugins: ['prettier'],
    ```

    Update `package.json` for runtime

    ```diff
      "scripts": {
    -    "dev": "nuxt",
    +    "dev": "nuxt-ts",
    -    "build": "nuxt build",
    +    "build": "nuxt-ts build",
    -    "heroku-postbuild": "nuxt build",
    +    "heroku-postbuild": "nuxt-ts build",
        "test": "jest",
        "lint": "eslint . --ext .vue,.ts,.js",
    -    "start": "nuxt start",
    +    "start": "nuxt-ts start",
    -    "generate": "nuxt generate"
    +    "generate": "nuxt-ts generate"
      },
    ```
  </details>

- 22-Mar-2019: [Nuxt 2.5.0](https://github.com/nuxt/nuxt.js/releases/tag/v2.5.0)

  `nuxt-ts` is not needed anymore. Nuxt Typescript support is done by adding
  `@nuxt/typescript`

  <details>

    <summary>Update from Nuxt 2.4.0 is done with:</summary>

    ```sh
    yarn remove nuxt-ts
    yarn add nuxt @nuxt/typescript
    rm -Rf node_modules/
    rm yarn.lock
    yarn
    ```
  </details>

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
