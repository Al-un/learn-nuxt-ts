# Games

Having fun in making and playing games

## Getting started

```
TODO
```

## Notes

#### Project setup

Project initialised with minimal configuration and yarn as package manager

```sh
yarn create nuxt-app games
```

#### Adding Typescript

- https://codesandbox.io/s/github/nuxt/nuxt.js/tree/dev/examples/typescript
- https://github.com/nuxt-community/hackernews-nuxt-ts

```sh
yarn add nuxt-ts
yarn add --dev vue-property-decorator
```

Change scripts in _package.json_:

```json
{
  "scripts": {
    "dev": "nuxt-ts",
    "build": "nuxt-ts build",
    "start": "nuxt-ts start",
    "generate": "nuxt-ts generate"
  }
}
```

Configure _tsconfig.json_:

```json
{
  "extends": "@nuxt/typescript",

  "compilerOptions": {
    "baseUrl": ".",
    "types": ["@types/node", "@nuxt/vue-app"],
    "experimentalDecorators": true,
    "paths": {
      "@/*": ["*"],
      "~/*": ["*"]
    }
  }
}
```

- `experimentalDecorators` is to remove a warning when using Vue decorators
- `paths` is to get aligned with [Nuxt aliases](https://nuxtjs.org/guide/directory-structure#aliases).
  I am using Nuxt default configuration meaning that my `srcDir` is my `rootDir`.
  Feel free to add the `@@` and `~~` aliases if required

  **edit for VS Code users**: VS Code rocks with thoses aliases! Source:
  https://medium.com/@caludio/how-to-use-module-path-aliases-in-visual-studio-typescript-and-javascript-e7851df8eeaa

- `extends` and `types` are taken from the mentioned repositories

Update _pages/index.vue_:

```ts
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Logo from "../components/Logo.vue";

@Component({
  components: {
    Logo
  }
})
export default class Index extends Vue {}
</script>
```

> Ensure that `lang="ts"` is added to the `script` tag

> In my case, `@/components/Logo.vue` raised

#### Adding Prettier & Tslint

```sh
yarn add --dev prettier tslint tslint-config-prettier
```

Add prettier configuration via a _.prettierrc_ file. Options can be found on
[Prettier documentation](https://prettier.io/docs/en/options.html):

```json
{
  "semi": true,
  "singleQuote": true
}
```

Add TSLint configuration via a _tslint.json_ file. More information on [TSLint](https://palantir.github.io/tslint/):

```json
{
  "defaultSeverity": "warning",
  "extends": ["tslint:recommended", "tslint-config-prettier"],
  "rules": {
    "prettier": true,
    "no-console": false
  }
}
```

Mainly from [Hackernew-nuxt-ts _tslint.json_](https://github.com/nuxt-community/hackernews-nuxt-ts/blob/master/tslint.json).

> Please note that _dummy.ts_ has been split into _another.class.ts_ and
> _some.class.ts_ as TypeScript recommends one class per file.
