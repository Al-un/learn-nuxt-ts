# Nuxt-TS

[Nuxt 2.4.0 release](https://dev.to/nuxt/nuxtjs-v240-is-out-typescript-smart-prefetching-and-more-18d)
has pushed one step forward TypeScript integration into Nuxt. **Kudos to Nuxt team**.
I wanted to give `nuxt-ts` a try. As a Nuxt beginner, I had to go beyond a simple
_Helloworld_. Consequently, part of this tutorial might not directly linked to
TypeScript in Nuxt.

To achieve a minimal application, I plan to gather:

- Nuxt
- TypeScript
- Linter and Prettier
- Jest
- Vuex

## Updates

- _16-Feb-2019_: initialisation
- _18-Feb-2019_: update to meet Nuxt standards (logic moved at components level and
  each component is tested)
- _25-Feb-2019_: update Vuex state vs rootState. I was confused about rootState
  typing. As Vuex modules are not used here, local state equals root state.
- _25-Feb-2019_: Adding _Reuse mapped Vuex elements_

## TODO

- Axios
- TSLint vue files in VS Code

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

More information about [Nuxt application creation on getting started page](https://nuxtjs.org/guide/installation)

### Typescript

I mainly rely on the two following links:

- https://codesandbox.io/s/github/nuxt/nuxt.js/tree/dev/examples/typescript
- https://github.com/nuxt-community/hackernews-nuxt-ts

#### Add TypeScript to project

Add `nuxt-ts` (TypeScript alter ego of `nuxt`) and `vue-property-decorator.`

```sh
yarn add nuxt-ts
yarn add --dev vue-property-decorator
```

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

Nuxt CLI provides a _Logo_ component and an _Index_ page. So far, only the _Index_ page
has a `<script>` tag so it is the only part to migrate to TypeScript. I also
refactored a bit the template:

```vue
<template>
  <div>
    <component-wrapper title="logo">
      <logo />
    </component-wrapper>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Logo from '@/components/Logo.vue';

@Component({
  components: {
    Logo
  }
})
export default class Index extends Vue {}
</script>
```

- Ensure that `lang="ts"` is added to the `script` tag
- At that stage, your `yarn serve` should run without issue.
- `component-wrapper` is not relevant to this tutorial and only serves aesthetic
  purpose. Please check the code [here](https://github.com/Al-un/nuxt-ts/blob/master/components/ComponentWrapper.vue)

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

To use those classes, create a _TypescriptClass_ component (_components/TypescriptClass.vue_):

```vue
<template>
  <div>
    <p class="some-class">{{ val }}</p>
    <p class="another-class">{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AnotherClass from '@/lib/another.class';
import SomeClass from '@/lib/some.class';

@Component({
  name: 'TypescriptClass'
})
export default class TypescriptClass extends Vue {
  public val: number = 0;
  public text: string = '';

  public mounted() {
    const some = new SomeClass();
    some.value = 42;
    const anot = new AnotherClass();
    this.val = some.moarValue(); // should return 42+2=44 instead of 4+2=6
    this.text = anot.moarText();
  }
}
</script>
```

TypescriptClass component can then be added in our home page (_pages/index.vue_):

```vue
<template>
  <div>
    <component-wrapper title="logo">
      <logo />
    </component-wrapper>

    <component-wrapper title="Typescript classes">
      <typescript-class />
    </component-wrapper>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Logo from '@/components/Logo.vue';
import TypescriptClass from '@/components/TypescriptClass.vue';

@Component({
  components: {
    Logo,
    TypescriptClass
  }
})
export default class Index extends Vue {}
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
    "no-console": false,
    "interface-name": [true, "never-prefix"]
  }
}
```

Those configuration are mainly taken from
[Hackernew-nuxt-ts _tslint.json_](https://github.com/nuxt-community/hackernews-nuxt-ts/blob/master/tslint.json).

_Note_: I do not want to prefix my interfaces name with a capitilised "I" hence
the `interface-name` rule.

#### Code

TSLint now complains about my way of writing code. To please it,
I had to:

- Add scope on properties and methods
- Split _dummy.ts_ into [_another.class.ts_](https://github.com/Al-un/nuxt-ts/blob/master/lib/another.class.ts)
  and [_some.class.ts_](https://github.com/Al-un/nuxt-ts/blob/master/lib/some.class.ts)
  as TypeScript recommends one class per file.
- Organize import by alphabetical orders. I split my import between third-party imports
  and this project specific imports.
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

> Feel free to add the `--verbose` and/or `--coverage` options

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

VS Code highlights the Logo import: `Cannot find module '@/components/logo.vue'.ts(2307)`.
Create a _ts-shim.d.ts_ at root folder:

```ts
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
```

Credits to [Beetaa](https://github.com/beetaa/) for
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

For references, please have a look at the [_tests/_ folder](https://github.com/Al-un/nuxt-ts/tree/master/tests)
to check the components and page tests.

### Vuex

Our app would feel lonely without a store. Let's add Vuex. I am pretty new with
TypeScript in Vuex so I am discovering in real time :D
[This article](https://codeburst.io/vuex-and-typescript-3427ba78cfa8) is my guide.

#### Store definition

To simulate a real life application, let's use Vuex modules.
[More about Vuex modules here](https://vuex.vuejs.org/guide/modules.html)

I created a _counter_ module with split files:

```
- store
  - counter
    - actions.ts
    - getters.ts
    - mutations.ts
    - state.ts
    - types.ts
```

`type.ts` will define types specific to the store. Other files are following Nuxt
naming convention. For more details regarding Vuex in Nuxt, please check
[Nuxt documentation](https://nuxtjs.org/guide/vuex-store/)

```ts
// store/counter/actions.ts
import { ActionContext, ActionTree } from 'vuex/types';
import { RootState } from './types';

const actions: ActionTree<RootState, RootState> = {
  increment: ({ commit }: ActionContext<RootState, RootState>) => {
    // Do more business logic here

    // we commit something at the end
    commit('increment');
  }
};

export default actions;

// store/counter/getters.ts
import { GetterTree } from 'vuex';
import { RootState } from './types';

const getters: GetterTree<RootState, RootState> = {
  // Completely useless and irrelevant getter but I needed some getter ^^
  square: (state): number => state.count * state.count
};

export default getters;

// store/counter/mutations.ts
import { MutationTree } from 'vuex';
import { RootState } from './types';

const mutations: MutationTree<RootState> = {
  // Here, state type "RootState" can be omitted because already handled
  // by the generic in MutationTree<X>
  increment: (state: RootState) => {
    state.count++;
  }
};

export default mutations;

// store/counter/state.ts
import { RootState } from './types';

// By Nuxt conventation, states must export a default function
export default (): RootState => ({
  count: 0
});

// store/counter/types.ts
export interface RootState {
  count: number;
  // Not used, simulating a value which is not initialised
  clickCount?: number;
}
```

#### Store usage

New logic calls for a new component. Create a _components/Counter.vue_:

```vue
<template>
  <div>
    <span class="count">{{ count }}</span>
    <span class="square">(square: {{ square }})</span>
    <button @click="increment">Increment</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters, mapState } from 'vuex';

@Component({
  name: 'Counter',
  computed: {
    ...mapState('counter', ['count']),
    ...mapGetters('counter', ['square'])
  },
  methods: {
    ...mapActions('counter', ['increment'])
  }
})
export default class Counter extends Vue {}
</script>
```

which is used in our home page (_pages/index.vue_):

```vue
<template>
  <div>
    <component-wrapper title="logo">
      <logo />
    </component-wrapper>

    <component-wrapper title="Typescript classes">
      <typescript-class />
    </component-wrapper>

    <component-wrapper title="Counter">
      <counter />
    </component-wrapper>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ComponentWrapper from '@/components/ComponentWrapper.vue';

import Counter from '@/components/Counter.vue';
import Logo from '@/components/Logo.vue';
import TypescriptClass from '@/components/TypescriptClass.vue';

@Component({
  components: {
    ComponentWrapper,

    Counter,
    Logo,
    TypescriptClass
  }
})
export default class Index extends Vue {}
</script>
```

Now, `yarn dev` should deploy smoothly

#### Testing Vuex-based components

To test our _Counter_ component, we need to initialise the Vuex store.
(read more about [Testing Vuex in components](https://vue-test-utils.vuejs.org/guides/#testing-vuex-in-components)):

As we are using TypeScript, our mock has to be properly typed thanks to _store/counter/types.ts_:

```ts
import Counter from '@/components/Counter.vue';
import { RootState } from '@/store/counter/types';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);
let mockStore: Store<RootState>;
let wrapper: Wrapper<Counter>;

const increment = jest.fn();

describe('Counter', () => {
  beforeEach(() => {
    mockStore = new Vuex.Store({
      modules: {
        counter: {
          actions: { increment },
          getters: { square: () => 5 },
          namespaced: true,
          state: { count: 0 }
        }
      }
    });

    wrapper = shallowMount(Counter, { store: mockStore, localVue });
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

#### Reuse mapped Vuex elements

Thanks for Vuex mappers, it is very easy to access Vuex state, getters & actions:

```ts
  computed: {
    ...mapState('counter', ['count']),
    ...mapGetters('counter', ['square'])
  },
  methods: {
    ...mapActions('counter', ['increment'])
  }
```

But what if we want to re-use it? For example, if I want to wrap the `increment`
method, I would like to be able to call `this.increment()`

- One solution is to use [`vuex-class`](https://github.com/ktsn/vuex-class) as
  suggested by [this "_Vuex and Typescript_" Article](https://codeburst.io/vuex-and-typescript-3427ba78cfa8).
- I also encountered [`vuex-typex`](https://github.com/mrcrowl/vuex-typex) from
  [this "_Writing Vuex stores in TypeScript_"](https://frontendsociety.com/writing-vuex-stores-in-typescript-b570ca34c2a).

> I have tried none of the above methods

As for me, I came across an easier solution. It's kind of magic but more than
enough for my current needs. Let's say I want to:

- reuse a getter
- reuse an action

Let's change our _components/Counter.vue_ to add that:

```vue
<template>
  <div>
    <span class="count">{{ count }}</span>
    <span class="square">({{ squareText }}: {{ square }})</span>
    <span class="squareAndCount">(squarePlusCount: {{ squarePlusCount }})</span>
    <button @click="wrappedIncrement">Increment</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters, mapState } from 'vuex';

/**
 * A basic counter with the square value of the counter to test Vuex
 */
@Component({
  name: 'Counter',
  computed: {
    ...mapState('counter', ['count']),
    ...mapGetters('counter', ['square'])
  },
  methods: {
    ...mapActions('counter', ['increment'])
  }
})
export default class Counter extends Vue {
  // data are pure properties. Bonus here as non related to Vuex
  private squareText: string = 'square';
  // computed properties are defined as non-null variables
  private count!: number;
  private square!: number;
  // methods should match expected signature
  private increment!: () => void;

  /**
   * Computed property
   */
  public get squarePlusCount() {
    return this.square + this.count;
  }

  /**
   * Components methods are simply class methods
   */
  public wrappedIncrement() {
    // do some stuff
    console.log('going to increment!!');
    // dispatch the "increment" action
    this.increment();
  }
}
</script>
```

By leveraging the [_Class-based component approach_](https://alligator.io/vuejs/typescript-class-components/),
our code is now typing Vuex elements and also gains readibility. I indeed enjoy
the fact that our methods and computed properties are split in two parts:

1. `@Component({...})` contains all Vuex related computed properties and methods
2. Class body contains component-specific computed properties, as getters, and
   methods, as methods.

Notice that even if we wrapped our `increment` action, all tests should pass.