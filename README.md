# Nuxt-TS

Testing some TypeScript in Nuxt. Objective is to have:

- Nuxt
- TypeScript
- Linter and Prettier
- Jest
- Vuex

## Getting started

```sh
# dependencies
yarn install

# test
yarn test

# serve
yarn dev
```

## Tutorial

### Project setup

Initialise a nuxt with minimal configuration. I use _yarn_ as package manager

```sh
yarn create nuxt-app games
```

More information on [Nuxt getting started page](https://nuxtjs.org/guide/installation)

### Adding Typescript

Add TypeScript. Following [Nuxt 2.4.0 release](https://dev.to/nuxt/nuxtjs-v240-is-out-typescript-smart-prefetching-and-more-18d),
I want to try `nuxt-ts`. I mainly rely on the two following links:

- https://codesandbox.io/s/github/nuxt/nuxt.js/tree/dev/examples/typescript
- https://github.com/nuxt-community/hackernews-nuxt-ts

```sh
yarn add nuxt-ts
yarn add --dev vue-property-decorator
```

> Note: I will not use [class based components](https://vuejs.org/v2/guide/typescript.html#Class-Style-Vue-Components)
> If you try it, please let me know if there is any issue :)

Change `nuxt` to `nuxt-ts` in _package.json_ scripts:

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

  **edit for VS Code users**: VS Code rocks with thoses aliases! Don't forget
  to reload your window to have it taking effect. Source:
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

At that stage, your `yarn serve` should run without issue

> In my case, `@/components/Logo.vue` raised

To ensure that TypeScript classes works properly, I have created a `lib/` folder
with a `dummy.js` file:

```ts
export class SomeClass {
  value = 4;

  constructor() {
    console.log('SomeClass constructor called');
  }

  moarValue(): Number {
    return this.value + 2;
  }
}

export class AnotherClass {
  text = 'text';

  moarText(): String {
    return 'moar ' + this.text;
  }
}
```

TSLint will later tell me:

- split one class per file
- add property and methods scopes

### Adding Prettier & Tslint

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

### Adding Jest

Time to test components with Jest:

```sh
yarn add --dev jest vue-jest @vue/test-utils ts-jest @types/jest
```

- [`jest`](https://jestjs.io/) is our test runner
- [`vue-jest`](https://github.com/vuejs/vue-jest) is to convert our _\*.vue_ files for Jest
- [`@vue/test-utils`](https://vue-test-utils.vuejs.org/) is the VueJs specific testing utility
- [`ts-jest`](https://github.com/kulshekhar/ts-jest): are we here for TypeScript or not?
- `@types/jest`, recommended [here](https://basarat.gitbooks.io/typescript/docs/testing/jest.html)
  and to have VSCode recognize Jest commands (_describe_, _test_, etc). Don't
  forget to add jest type in your _tsconfig.json_:

  ```json
  {
    "compilerOptions": {
      "types": ["@types/node", "@nuxt/vue-app", "@types/jest"]
    }
  }
  ```

Add a `test` script in _package.json_:

```json
{
  "scripts": {
    "dev": "nuxt-ts",
    "build": "nuxt-ts build",
    "start": "nuxt-ts start",
    "generate": "nuxt-ts generate",
    "test": "jest"
  }
}
```

Time to write tests in the `tests/` folder:

- _another.class.spec.ts_:

  ```ts
  import AnotherClass from '@/lib/another.class';

  let anot: AnotherClass;

  describe('Another Class', () => {
    beforeEach(() => {
      anot = new AnotherClass();
    });

    test('it initialises', () => {
      expect(anot.text).toBe('text');
    });

    test('it has moar test', () => {
      expect(anot.moarText()).toBe('moar text');
    });
  });
  ```

- _some.class.spec.ts_:

  ```ts
  import SomeClass from '@/lib/some.class';

  let some: SomeClass;

  describe('SomeClass', () => {
    beforeEach(() => {
      some = new SomeClass();
    });

    test('it initialises', () => {
      expect(some.value).toBe(4);
    });

    test('it has moar value', () => {
      expect(some.moarValue()).toBe(6);
    });
  });
  ```

At this stage, your `yarn test` should fail because _Jest_ is not told yet how
to handle TypeScript. Create a _jest.config.js_:

```js
module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1'
  },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json']
};
```

Now `yarn test` should validate your pure TypeScript classes. Time to jump into Vue testing.
Let's try to test the Logo components. In _tests/components/logo.spec.ts_:

```ts
import Logo from '@/components/logo.vue';
import { mount } from '@vue/test-utils';

describe('Logo', () => {
  it('is a Vue component', () => {
    const wrapper = mount(Logo);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
```

VS Code highlight the Logo import: `Cannot find module '@/components/logo.vue'.ts(2307)`.
Create a _ts-shim.d.ts_ at root folder:

```ts
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
```

Credits to [Beetaa's template](https://github.com/beetaa/template-vue) for
[_ts-shim.d.ts_](https://github.com/beetaa/template-vue/blob/master/ts-shim.d.ts)
and [_tsconfig.json_](https://github.com/beetaa/template-vue/blob/master/tsconfig.json).
Originally from [his comment](https://github.com/vuejs/vue/issues/5298#issuecomment-453343514)

If VS Code keeps complaining about _.vue_ files, add the following to _tsconfig.json_:

```json
{
  "include": ["**/*.ts", "**/*.vue"],
  "exclude": ["node_modules"]
}
```

Now Vue components can be tested. How about pages? More globally, how about
components involving other components?

Let's try to create a _tests/pages/index.spec.ts_:

```ts
import Index from '@/pages/index.vue';
import { mount } from '@vue/test-utils';

describe('HomePage', () => {
  it('is a Vue component', () => {
    const wrapper = mount(Index);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
```

Jest will complain:

```
console.error node_modules/vue/dist/vue.runtime.common.dev.js:621
  [Vue warn]: Unknown custom element: <logo> - did you register the component correctly? For recursive components, make sure to provide the "name" option.

  found in

  ---> <Index>
          <Root>
```

Okay, _Logo_ is not declared. Let's declare it in _components/Logo.vue_:

```ts
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Logo'
})
export default class Logo extends Vue {}
</script>
```

I tried this approach:

```ts
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Logo'
})
</script>
```

But I have an error: `TypeError: Cannot read property 'extend' of undefined`
