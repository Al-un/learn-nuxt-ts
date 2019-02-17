# Nuxt-TS

Testing some TypeScript in Nuxt. Objective is to have:

- Nuxt
- TypeScript
- Linter and Prettier
- Jest
- Vuex

## Getting started

If you prefer to skip the tutorial and start from present version of this repository

```sh
# install dependencies
yarn install

# test
yarn test

# serve
yarn dev
```

## Tutorial

### Project setup

Initialise a nuxt with minimal configuration with _yarn_ as package manager. I
chose the minimal configuration (no plugin, no style library, etc) so that I can
see in _package.json_ what need to be added to be TypeScript compliant.

```sh
yarn create nuxt-app {your project name}
```

More information on [Nuxt getting started page](https://nuxtjs.org/guide/installation)

### Typescript

Following [Nuxt 2.4.0 release](https://dev.to/nuxt/nuxtjs-v240-is-out-typescript-smart-prefetching-and-more-18d),
I want to try `nuxt-ts`. I mainly rely on the two following links:

- https://codesandbox.io/s/github/nuxt/nuxt.js/tree/dev/examples/typescript
- https://github.com/nuxt-community/hackernews-nuxt-ts

#### Add TypeScript to project

Add `nuxt-ts` (TypeScript alter ego of `nuxt`) and `vue-property-decorator.`

```sh
yarn add nuxt-ts
yarn add --dev vue-property-decorator
```

> Note: I will not use [class based components](https://vuejs.org/v2/guide/typescript.html#Class-Style-Vue-Components)

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

  **VS Code users**: [VS Code rocks with thoses aliases!](https://medium.com/@caludio/how-to-use-module-path-aliases-in-visual-studio-typescript-and-javascript-e7851df8eeaa)
  Don't forget to:

  - reload your window to have it taking effect
  - Vue file needs to have extension: `import MyComponent from '@/components/MyComponent.vue';`
  - Ensure that `"baseUrl": "."` so that `"@/*": ["*"]` points to proper root folder

- `extends` and `types` are taken from the mentioned repositories

#### Update existing code

Update _pages/index.vue_:

```ts
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Logo from "@/components/Logo.vue";

@Component({
  components: {
    Logo
  }
})
export default class Index extends Vue {}
</script>
```

> Ensure that `lang="ts"` is added to the `script` tag

At that stage, your `yarn serve` should run without issue.

To ensure that TypeScript classes works properly, I have created a `lib/` folder
with a `dummy.ts` file:

```ts
// lib/dummy.ts
export class SomeClass {
  value = 4;

  constructor() {
    console.log('SomeClass constructor called');
  }

  moarValue(): number {
    return this.value + 2;
  }
}

export class AnotherClass {
  text = 'text';

  moarText(): string {
    return 'moar ' + this.text;
  }
}
```

TSLint will later tell me to split one class per file and to add property and
methods scopes

Use those classes in the home page (_pages/index.vue_):

```html
<template>
  <section class="container">
    <div>
      <logo />
      <h3>Testing values from TypeScript classes:</h3>
      <p>{{ val }}</p>
      <p>{{ text }}</p>
      <div />
    </div>
  </section>
</template>
```

```ts

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Logo from '@/components/Logo.vue';
import  { SomeClass, AnotherClass } from '@/lib/dummy'; //.ts extension can be omitted

@Component({
  components: {
    Logo
  }
})
export default class Index extends Vue {
  val: number = 0;
  text: string = '';

  mounted() {
    const some = new SomeClass();
    some.value = 42;
    const anot = new AnotherClass();
    this.val = some.moarValue(); // should return 42+2=44 instead of 4+2=6
    this.text = anot.moarText();
  }
}
</script>
```

### Adding Prettier & Tslint

[Prettier](https://prettier.io) is an opinionated formatter commonly used with
its Linter friend [TSLint](https://palantir.github.io/tslint/).

```sh
yarn add --dev prettier tslint tslint-config-prettier
```

#### Prettier configuration

Add prettier configuration via a _.prettierrc_ file. Options can be found on
[Prettier documentation](https://prettier.io/docs/en/options.html):

```json
{
  "semi": true,
  "singleQuote": true
}
```

#### TSLint configuration

Add TSLint configuration via a _tslint.json_ file:

```json
{
  "defaultSeverity": "warning",
  "extends": ["tslint:recommended", "tslint-config-prettier"],
  "rules": {
    "no-console": false
  }
}
```

Those configuration are mainly taken from
[Hackernew-nuxt-ts _tslint.json_](https://github.com/nuxt-community/hackernews-nuxt-ts/blob/master/tslint.json).

#### Code

As said earlier, TSLint now complains about my way of writing code. To please it,
I had to:

- Add scope on properties and methods
- Split _dummy.ts_ into _another.class.ts_ and _some.class.ts_ as TypeScript recommends one class per file.
- Organize import by alphabetical orders
- Use TypeScript types (`number` instead of `Number`, `string` instead of `String`, etc)
- Add / Update types in JSDocs as well

### Testing

#### Adding Jest

Time to test components with Jest:

```sh
yarn add --dev jest vue-jest @vue/test-utils ts-jest @types/jest
```

Here are what we are adding:

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

#### Testing plain TypeScript

Let's create a `tests/` folder and write our first tests:

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

Now `yarn test` should validate your pure TypeScript classes.

#### Testing Vue components

Time to jump into Vue testing. Let's try to test the Logo components. In _tests/components/logo.spec.ts_:

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

I also tried this approach:

```ts
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Logo'
})
</script>
```

But I have the error `TypeError: Cannot read property 'extend' of undefined`
when running `yarn test`. I have no problem when running `yarn dev`.

> Self TODO:
>
> - How to use `Vue.extend` syntax
> - How about official [`vue-class-component`](https://github.com/vuejs/vue-class-component)

### Vuex

Our app would feel lonely without a store. Let's add Vuex. I am pretty new with
TypeScript in Vuex so I am discovering in real time :D
[This article](https://codeburst.io/vuex-and-typescript-3427ba78cfa8) is my guide.

#### Store definition

To simulate a real life application, let's use Vuex modules.
[More about Vuex modules here](https://vuex.vuejs.org/guide/modules.html)

I created a _counter_ modules with split files:

```
- store
  - counter
    - actions.ts
    - getters.ts
    - mutations.ts
    - state.ts
    - types.ts
```

`type.ts` will defined types specific to the store. Other files are following Nuxt
standards. For more details regarding Vuex in Nuxt, please check
[Nuxt documentation](https://nuxtjs.org/guide/vuex-store/)

```ts
// actions.ts
import { ActionContext, ActionTree } from 'vuex/types';
import { CounterState, RootState } from './types';

const actions: ActionTree<CounterState, RootState> = {
  increment: ({ commit }: ActionContext<CounterState, RootState>) => {
    // Do more business logic here

    // we commit something at the end
    commit('increment');
  }
};

export default actions;

// getters.ts
import { GetterTree } from 'vuex';
import { CounterState } from './types';

const getters: GetterTree<CounterState, CounterState> = {
  // Completely useless and irrelevant getter but I needed some getter ^^
  square: (state): number => state.count * state.count
};

export default getters;

// mutations.ts
import { MutationTree } from 'vuex';
import { CounterState } from './types';

const mutations: MutationTree<CounterState> = {
  // Here, state type "CounterState" can be omitted because already handled
  // by the generic in MutationTree<X>
  increment: (state: CounterState) => {
    state.count++;
  }
};

export default mutations;

// state.ts
import { RootState } from './types';

// By Nuxt conventation, states must export a default function
export default (): RootState => ({
  count: 0
});

// types.ts
export interface CounterState extends RootState {
  // Not used, simulating a value which is not initialised
  clickCount: number;
}

export interface RootState {
  count: number;
}
```

#### Store usage

Now let's use our store in our home page (_pages/index.vue_):

```html
<template>
  <section class="container">
    <div>
      <logo />

      <h3>Testing Vuex</h3>
      <div>
        {{ count }} (square: {{ square }})
        <button @click="increment">Increment</button>
      </div>
    </div>
  </section>
</template>
```

```ts
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions, mapGetters } from 'vuex';
import Logo from '@/components/Logo.vue';

@Component({
  components: {
    Logo
  },
  computed: {
    ...mapState('counter', ['count']),
    ...mapGetters('counter', ['square'])
  },
  methods: {
    ...mapActions('counter', ['increment'])
  }
})
export default class Index extends Vue {}
</script>
```

Now, `yarn dev` should deploy smoothly. However, `yarn test` fails because the
store is not defined in our test.

#### Test update

Our index page tests need some updates. Before that, let's change a bit our
template for testing purpose:

```html
<template>
  <section class="container">
    <div>
      <logo />

      <h3>Testing Vuex</h3>
      <div>
        <span class="count">{{ count }}</span>
        <span class="square">(square: {{ square }})</span>
        <button @click="increment">Increment</button>
      </div>
    </div>
  </section>
</template>
```

Adding `span` and CSS classes help us to identify `{{ count }}` and `{{ square }}`.

Vuex testing requires two steps
(read more about [Vuex testing on `vue-test-utils` documentation](https://vue-test-utils.vuejs.org/guides/#testing-vuex-in-components)):

1. Store mocking
2. Component tests

```ts
import IndexPage from '@/pages/index.vue';
import { CounterState } from '@/store/counter/types';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

// Define variables for testing
const localVue = createLocalVue();
localVue.use(Vuex);
let mockStore: Store<CounterState>;
let wrapper: Wrapper<IndexPage>;

// Mocking increment function
const increment = jest.fn();

describe('HomePage', () => {
  beforeEach(() => {
    // Mocking our store
    mockStore = new Vuex.Store({
      modules: {
        counter: {
          // mocking actions requires mocked functions to check if they were
          // called, with which arguments etc
          actions: {
            increment
          },
          // We are not testing the square getter here so we can just return
          // any number
          getters: {
            square: () => 5
          },
          // In Nuxt, all modules are namespaced
          namespaced: true,
          // initial state
          state: {
            count: 0
          }
        }
      }
    });

    wrapper = shallowMount(IndexPage, { store: mockStore, localVue });
  });

  test('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('is linked to counter state', () => {
    const count = wrapper.find('.count');
    expect(count.text()).toBe('0');
  });

  test('is linked to counter state getter', () => {
    const square = wrapper.find('.square');
    expect(square.text()).toBe(`(square: ${5})`);
  });

  test('increments when clicking button', () => {
    const btn = wrapper.find('button');
    btn.trigger('click');
    expect(increment).toHaveBeenCalled();
  });
});
```

And tadaa!
