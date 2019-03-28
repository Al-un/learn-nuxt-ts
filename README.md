# Nuxt-TS: Nuxt application powered by TypeScript

Half tutorial, half exploration, I want to check out how far I can get
with Nuxt+TypeScript in a full application from scratch.

**Table of contents**

- [01. Initialise Project](#initialise-project)
- [02. Switch to TypeScript](#switch-to-typescript)
  - [02.1 Adding nuxt-ts](#adding-nuxt-ts)
  - [02.2 Update Nuxt configuration](#update-configuration)
  - [02.3 Update existing code](#update-existing-code)
- [03. Code control: formatter and linter](#code-control-formatter-and-linter)
  - [03.1 Prettier](#prettier)
  - [03.2 ESLint](#eslint)
- [04. Polls: components & vuex](#polls-components-and-vuex)
  - [04.1 Models](#polls-models)
  - [04.2 Page](#polls-page)
  - [04.3 Components](#polls-components)
  - [04.4 Store](#polls-store)
- [05. Style](#style)
  - [05.1 SCSS](#scss)
  - [05.2 styling](#styling)
  - [05.3 filters](#filters)
- [06. Testing](#testing)
  - [06.1 Jest](#adding-and-configuring-jest)
  - [06.2 Testing Vuex](#vuex-testing)
  - [06.3 Testing Components](#components-testing)
  - [06.3 Coverage](#coverage)
- [07. Deployment](#deployment)
  - [07.1 Universal vs Pre-rendered vs SPA](#universal-vs-pre-rendered-vs-sPA)

**Nuxt**

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

## Initialise project

Create a NuxtJS project as usual ([Nuxt doc](https://nuxtjs.org/guide/installation)):

```sh
yarn create nuxt-app {your project name}
```

For the sake of the tutorial, my _nuxt-ts_ project is bare metal: no
plugins, no CSS framework, default server framework, no test
framework. I selected _Yarn_ as my package manager.

![Project creation](screenshots/01.01_create_project.png)

The Nuxt project structure is explained in [Nuxt doc](https://nuxtjs.org/guide/directory-structure):

![Project structure](screenshots/01.02_project_structure.png)

Run the scaffold project:

```sh
cd {your project folder}
yarn dev
```

Nuxt should not encounter any error:

![Project run](screenshots/01.03_run.png)

And the application is available on <http://localhost:3000>:

![Project is working](screenshots/01.04_project_is_working.png)

## Switch to TypeScript

Before adding anything, let switch to TypeScript first. I was
guided by the two following links:

- [Nuxt-ts helloworld](https://codesandbox.io/s/github/nuxt/nuxt.js/tree/dev/examples/typescript)
- [Hackernews on nuxt-ts](https://github.com/nuxt-community/hackernews-nuxt-ts)

### Adding Nuxt-ts

```sh
yarn add nuxt-ts
yarn add --dev nuxt-property-decorator
yarn remove nuxt
```

- `nuxt-ts` is TypeScript counterpart of `nuxt`
- [`nuxt-property-decorator`](https://github.com/nuxt-community/nuxt-property-decorator/) is
  Nuxt counter part of [`vue-property-decorator`](https://github.com/kaorun343/vue-property-decorator)

Optionally, you can add TypeScript as a development dependency:

```sh
yarn add --dev typescript
```

For VS Code users, you can force the usage of TypeScript from _node_modules/_
instead of using default VS Code TypeScript thanks to _.vscode/settings.json_:

```json
{
  // Windows version
  "typescript.tsdk": "node_modules\\typescript\\lib",
  // Linux
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

### Update configuration

Few configurations have to be added or changed:

Update _package.json_ by using `nuxt-ts` instead of `nuxt`:

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

Add a tsconfig.json:

```json
{
  "extends": "@nuxt/typescript",
  "compilerOptions": {
    "baseUrl": ".",
    "types": ["@types/node", "@nuxt/vue-app"],
    "experimentalDecorators": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "paths": {
      "@/*": ["*"],
      "~/*": ["*"]
    }
  }
}
```

- `experimentalDecorators` is required when using Vue decorators
- `resolveJsonModule` and `esModuleInterop` are required when
  [importing JSON in TypeScript](https://hackernoon.com/import-json-into-typescript-8d465beded79)
- `paths` are Nuxt convention and [it rocks with VS Code](https://medium.com/@caludio/how-to-use-module-path-aliases-in-visual-studio-typescript-and-javascript-e7851df8eeaa)

Renaming _nuxt.config.js_ into _nuxt.config.ts_. I simply change the first line:

```diff
- var pkg = require('./package')
+ import pkg from "./package.json";
```

and commented out the `build: { ... }` content to avoid having a _"declared but never used"_
and _"implicitly has an 'any' type"_ error

### Update existing code

The application scaffold is not much, only _pages/index.vue_ has to
be updated:

```vue
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import Logo from '@/components/Logo.vue';

@Component({
  components: {
    Logo
  }
})
export default class Index extends Vue {}
</script>
```

> Don't forget `lang="ts"`!

## Code control: formatter and linter

### Prettier

[Prettier](https://prettier.io) is an opinionated formatter.

```sh
yarn add --dev prettier
```

VS Code users, don't forget the [VS Code Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
extension.

Add a _.prettierrc_ file to configure prettier. Options can be found on
[Prettier documentation](https://prettier.io/docs/en/options.html):

```json
{
  "semi": true,
  "singleQuote": true
}
```

### ESLint

At first, I planned to use [TSLint](https://palantir.github.io/tslint/) but
[_TypeScript ecosystem is moving from TSLint to ESLint_](https://cmty.app/nuxt/nuxt.js/issues/c8742)
so let's move as well.

Let's add [ESLint](https://eslint.org) some plugins:

- [`@typescript-eslint/eslint-plugin`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)
- [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) due
  to our _Prettier_ usage
- [`eslint-plugin-vue`](https://vuejs.github.io/eslint-plugin-vue/) per [Nuxt documentation](https://nuxtjs.org/guide/development-tools/#eslint-and-prettier)

```sh
yarn add --dev eslint @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-vue
```

Configure ESLint with the _.eslintrc.js_ file:

```js
module.exports = {
  root: true,

  env: {
    browser: true,
    node: true
  },

  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2017,
    sourceType: 'module',
    project: './tsconfig.json'
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    'prettier',
    'prettier/vue',
    'prettier/@typescript-eslint'
  ],

  plugins: ['vue', '@typescript-eslint']
};
```

Few explanations:

- `vue-eslint-parser` is required by `eslint-plugin-vue` (check [doc](https://vuejs.github.io/eslint-plugin-vue/user-guide/#faq))
  and as `@typescript-eslint/parser` is required, it is moved to `parserOptions`
- Order in `extends` matters. Prettier configurations are at the end to ensure they
  override other rules
- `env` is set to `browser` and `node` for SSR reasons (check [Nuxt doc](https://nuxtjs.org/guide/development-tools/#eslint-and-prettier))

## Polls: Components and Vuex

Let's explorer further `nuxt-property-decorator`. Instead of the eternal _Counter_ example,
let's try something, not that different: Polls. Polls have questions with multiple choices.
The interface lets you vote for choice and you can optionally add some comment to your vote.

### Polls Models

Before getting into VueJS/Nuxt affairs, Polls models must be defined. This is
pure TypeScript writing so I won't dive into details.

I define my models in _lib/polls/models.ts_. As models are not depending on
the store nor components, I decided to create a _lib/_ folder to serve this
purpose.

```ts
/**
 * A vote for a given choice
 */
export class Vote {
  public constructor(
    public id: number,
    public choiceId: number,
    public comment?: string
  ) {}
}

/**
 * A choice to vote for within a Poll
 */
export class Choice {
  public count: number;

  public constructor(
    public id: number,
    public pollId: number,
    public text: string
  ) {
    this.count = 0;
  }
}

/**
 * A topic with which user is offered multiple choices to vote for
 */
export class Poll {
  public choices: Choice[];

  public constructor(
    public id: number,
    public topic: string,
    choices?: Choice[]
  ) {
    this.choices = choices !== undefined ? choices : [];
  }
}

/**
 * An intention of voting a given choice with an optional comment
 */
export interface ChoiceVote {
  choiceId: number;
  comment?: string;
}
```

To provide polls, I created a _lib/polls/api.ts_ file with a dummy variables:

```ts
import { Poll } from './models';

/**
 * Dummy polls
 */
export const DUMMY_POLLS: Poll[] = [
  {
    id: 1,
    topic: 'Which framework are you using?',
    choices: [
      { id: 1, count: 0, pollId: 1, text: 'NuxtJS' },
      { id: 2, count: 0, pollId: 1, text: 'Plain VueJS' },
      { id: 3, count: 0, pollId: 1, text: 'Angular' },
      { id: 4, count: 0, pollId: 1, text: 'React' }
    ]
  },
  {
    id: 2,
    topic: 'What is your OS?',
    choices: [
      { id: 5, count: 0, pollId: 2, text: 'Windows' },
      { id: 6, count: 0, pollId: 2, text: 'Linux' },
      { id: 7, count: 0, pollId: 2, text: 'MacOS' }
    ]
  }
];
```

### Polls Page

Let's add an empty page _pages/polls.vue_. For lazy people like me, feel free to add a
link : TypeScript components in _pages/index.vue_:

```html
<template>
  <section class="container">
    <!-- put that wherever you want -->
    <nuxt-link to="/polls">Polls</nuxt-link>
  </section>
</template>
```

### Polls Components

The _Polls_ page must display a list of polls. So let's create a _components/polls/PollList.vue_:

```vue
<template>
  <div>
    <div>
      <h2>Polls</h2>
      <poll-detail
        v-for="poll in polls"
        :key="'poll-' + poll.id"
        :poll="poll"
      />
    </div>

    <div>
      <h2>Votes</h2>
      <p>votes count: {{ votes.length }}</p>
      <div v-for="vote in votes" :key="'vote-' + vote.id">
        <p>{{ vote.id }} [{{ vote.choiceId }}]: {{ vote.comment }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

import { Poll, Vote } from '@/lib/polls/models';
import PollDetail from './PollDetail.vue';

@Component({
  components: {
    PollDetail
  }
})
export default class PollList extends Vue {
  @Prop({ type: Array })
  polls!: Poll[];

  @Prop({ type: Array })
  votes!: Vote[];
}
</script>
```

Notes:

- **Props usage**: Polls and votes are provided as _props_. Why? My rule of thumb
  is that components should not care if a list is properly loaded or not: it is
  the responsibility of the appropriate page.
- **Props decorator**: Please note the `@Prop` decorator usage. For people not comfortable with
  [_Class-Style Vue Components_](https://vuejs.org/v2/guide/typescript.html#Class-Style-Vue-Components),
  feel free to check the [Writing class based components with Vue.js and TypeScript](https://alligator.io/vuejs/typescript-class-components/)
  article.
- **Distinct keys**: votes and polls are rendered within the same component. To
  avoid key conflict (ex: first poll key is "1" and first vote key is "1"), some
  prefix is prepended.

For code flexibility reason, I defined poll details in a dedicated _components/polls/PollDetail.vue_:

```vue
<template>
  <div>
    <h3>{{ poll.topic }}</h3>

    <div
      v-for="choice in poll.choices"
      :key="choice.id"
      @click="selectChoice(choice)"
    >
      <p>
        <span v-if="choice.id === selectedChoiceId">[SELECTED]</span>
        <span>Select {{ choice.text }} (count: {{ choice.count }})</span>
      </p>
    </div>

    <div v-if="selectedChoiceId > 0">
      <textarea v-model="comment"></textarea>
      <button @click="voteChoice()">Vote!</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

import { Poll, Choice, ChoiceVote } from '@/lib/polls/models';
import { pollsModule } from '@/store/polls/const';

@Component({})
export default class PollList extends Vue {
  /**
   * Optional comment
   */
  private comment: string = '';
  /**
   * Avoid undefined to make it reactive
   */
  private selectedChoiceId: number = -1;

  @Prop({ type: Object })
  public poll: Poll;

  public selectChoice(choice: Choice): void {
    this.selectedChoiceId = choice.id;
  }

  public voteChoice(): void {
    console.log('Voting: ', {
      choiceId: this.selectedChoiceId,
      comment: this.comment.length > 0 ? this.comment : undefined
    });

    // reset vote selection
    this.selectedChoiceId = -1;
    this.comment = '';
  }
}
</script>
```

Still following class style syntax, `data` are simply defined by class attributes.
The usage of `undefined` is not recommended as data must be initialized to
be reactive. Check the [Vue doc](https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties)
for more information.

Selected choice is first defined by `selectChoice()`. Once a choice has
been selected, the `textarea` and `button` appear so that the choice
can be voted for.

We can now add `<poll-list/>` to our _pages/polls.vue_ and populate it with
dummy data:

```vue
<template>
  <poll-list v-if="polls.length" :polls="polls" :votes="votes" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import PollList from '@/components/polls/PollList.vue';
import { Poll, Vote } from '@/lib/polls/models';
import { DUMMY_POLLS } from '@/lib/polls/api';
: TypeScript components
@Component({
  components: {
    PollList
  }
})
export default class Polls extends Vue {
  public polls!: Poll[];

  public votes!: Vote[];

  created() {
    // provide some dummy data
    this.polls = DUMMY_POLLS;
    this.votes = [
      { id: 1, choiceId: 1 },
      { id: 2, choiceId: 2, comment: 'some comment' }
    ];
  }
}
</script>
```

> Because [_non-null assertion operator_](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator)
> is used, `this.polls` and `this.votes` cannot be left undefined. In a
> pure TypeScript program, they would need to be initialized in the `constructor()`.
> The usage of `created()` over `mounted()` is simple: When `mounted()` is called,
> HTML template is compiled but at this stage, both `this.polls` and `this.votes`
> are still undefined. Consequently, they need to be defined earlier. To
> know more about VueJS component lifecycle, please check [Vue doc](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram).

At this stage, <http://localhost:3000/polls> should render an ugly list:

![Polls simple display](screenshots/04.01_polls.png)

If a choice is clicked (no pointer cursor to show it), then _[SELECTED]_ is
prepended and a `textbox` appears:

![Choice select](screenshots/04.02_choice_select.png)

Clicking on _Vote!_ button does not do anything apart from logging into the
console and resetting the selected choice.

Note that as choice selection is defined at `PollDetail` level. Consequently,
you can select a choice from a poll and another choice from another poll at
the same first.

### Polls Store

Static data are a bit boring: a store would make it a tad more lively. Nuxt
requires a specific folder structure for Vuex modules. For those who need
it, the [documentation is over there](https://nuxtjs.org/guide/vuex-store/).

#### Root state

For typing sake, let's start with an empty _store/types.ts_, our root state
definition:

```ts
export interface RootState {}
```

ESLint would complain about having an empty interface so I switched it from
`error` to `warning` by adding in the _.eslintrc.js_:

```js
  rules: {
    "@typescript-eslint/no-empty-interface": 1
  }
```

#### Polls store types

Let's first define all the types required for our polls store with a
_store/polls/types.ts_. To summarize our polls store:

- state only contains polls & votes
- actions are "loading polls" and "vote"
- mutations are similar with a "setPolls" and "vote"
- there is no getter

```ts
import { Poll, Vote, ChoiceVote } from '@/lib/polls/models';
import { ActionTree, ActionContext, MutationTree, GetterTree } from 'vuex';
import { RootState } from '../types';

export interface PollsState {
  polls: Poll[];
  votes: Vote[];
}

/**
 * Create a type for convenience
 */
export type PollActionContext = ActionContext<PollsState, RootState>;

/**
 * Polls actions
 */
export interface PollsActions extends ActionTree<PollsState, RootState> {
  load: (ctx: PollActionContext) => void;
  vote: (ctx: PollActionContext, choiceVote: ChoiceVote) => void;
}

/**
 * Polls mutations
 */
export interface PollsMutations extends MutationTree<PollsState> {
  setPolls: (state: PollsState, polls: Poll[]) => void;
  vote: (state: PollsState, vote: Vote) => void;
}

/**
 * Polls getters is type instead of interface because it is
 * empty
 */
export type PollsGetters = GetterTree<PollsState, RootState>;
```

#### Polls state

Let's start define our polls initial state. Nothing fancy, it just reflects
the needs of _pages/polls.vue_. In _store/polls/state.ts_:

```ts
import { PollsState } from './types';

export const initState = (): PollsState => ({
  polls: [],
  votes: []
});

export default initState;
```

Notes:

- I use [split modules files](https://nuxtjs.org/guide/vuex-store/#module-files) so
  each file requires a default export.
- State must either be a value or a function.

#### Polls getters

Getters are not relevant for polls. You can skip this part. I added an empty
_store/polls/getters.ts_:

```ts
import { PollsGetters } from './types';

export const getters: PollsGetters = {};

export default getters;
```

#### Polls actions

Actions are implemented in _store/polls/actions.ts_:

```ts
import { PollsActions } from './types';
import { loadPolls } from '@/lib/polls/api';
import { Vote } from '@/lib/polls/models';

export const actions: PollsActions = {
  load: async ({ commit }) => {
    const polls = await loadPolls();
    commit('setPolls', polls);
  },

  vote: ({ commit, state }, { choiceId, comment }) => {
    const voteId = state.votes.length
      ? state.votes[state.votes.length - 1].id + 1
      : 1;
    const vote = new Vote(voteId, choiceId, comment);
    commit('vote', vote);
  }
};

export default actions;
```

Notes:

- Vote ID is artificially generated in the action. In real life, it should
  be generated by a back-end
- `async / await` FTW!
- _lib/polls/api.ts_ has a new method: `loadPolls`:
  ```ts
  export const loadPolls = async (): Promise<Poll[]> => {
    return new Promise<Poll[]>(resolve =>
      setTimeout(() => resolve(DUMMY_POLLS), 500)
    );
  };
  ```
  It simulates a back-end called with a 500ms latency.

#### Polls mutations

To update the state, the mutations called by actions must be defined
in _store/polls/mutations.ts_:

```ts
import { PollsMutations } from './types';

export const mutations: PollsMutations = {
  setPolls: (state, polls) => {
    state.polls = polls;
  },

  vote: (state, vote) => {
    // add vote
    state.votes.push(vote);

    // update choice
    state.polls
      .map(poll => poll.choices)
      .reduce((prev, curr) => prev.concat(curr), [])
      .filter(choice => choice.id === vote.choiceId)
      .forEach(choice => (choice.count += 1));
  }
};

export default mutations;
```

#### Polls namespace

For convenience purpose, let's define polls namespace in a _store/polls/const.ts_:

```ts
import { namespace } from 'vuex-class';

export const pollsModule = namespace('polls/');
```

#### Connect store to page/components

Now our state is ready, let's connect it to our page and components.

_pages/polls.vue_ script is updated as follows:

```diff
import { Component, Vue } from 'nuxt-property-decorator';

import PollList from '@/components/polls/PollList.vue';
import { Poll, Vote } from '@/lib/polls/models';
+import { pollsModule } from '@/store/polls/const';

@Component({
  components: {
    PollList
  }
})

export default class Polls extends Vue {
+  @pollsModule.State('polls')
  public polls!: Poll[];
+  @pollsModule.State('votes')
  public votes!: Vote[];

  @pollsModule.Action('load')
  private loadPolls!: () => void;

  mounted() {
    this.loadPolls();
  }

-  created() {
-    // provide some dummy data
-    this.polls = DUMMY_POLLS;
-    this.votes = [
-      { id: 1, choiceId: 1 },
-      { id: 2, choiceId: 2, comment: 'some comment' }
-    ];
-  }
}
```

- Because `nuxt-property-decorator` includes `vuex-class`, let's use it. An
  alternative I have not tested is [`vuex-typex`](https://github.com/mrcrowl/vuex-typex)
  (Check out [this _Writing Vuex Stores in TypeScript_ article](https://frontendsociety.com/writing-vuex-stores-in-typescript-b570ca34c2a?gi=f5f9d39cc2e1))
- Our previous data `polls` and `votes` are now mapped to state. Additionally,
  the `load` action is also mapped
- Lifecycle hook is `mounted` instead of `created`

Because `votes` is initialized as an empty list, you should have the same
content at <http://localhost:3000/polls> except that no vote is displayed.

Time to vote! Let's update _components/polls/PollDetail.vue_ script:

```diff
  /**
   * Optional comment
   */
  private comment: string = '';
  /**
   * Avoid undefined to make it reactive
   */
  private selectedChoiceId: number = -1;

  @Prop({ type: Object })
-  public poll: Poll;
+  public poll!: Poll;

+  @pollsModule.Action('vote')
+  private vote!: (choiceVote: ChoiceVote) => void;

  public selectChoice(choice: Choice): void {
    this.selectedChoiceId = choice.id;
  }

  public voteChoice(): void {
-    console.log('Voting: ', {
-      choiceId: this.selectedChoiceId,
-      comment: this.comment.length > 0 ? this.comment : undefined
-    });
+    this.vote({
+      choiceId: this.selectedChoiceId,
+      comment: this.comment.length > 0 ? this.comment : undefined
+    });

    // reset vote selection
    this.selectedChoiceId = -1;
    this.comment = '';
  }
```

Our store is now operational. If you vote with a comment:

![Vote!](screenshots/04.03_vote_nuxt.png)

The vote appears, with its comments and when selecting a choice from the same
poll, the comment text is cleared:

![Voted!](screenshots/04.04_voted_nuxt.png)

## Style

This part is not related to TypeScript but having a plain interface is somehow
hurtful. Let's dress our pages.

### SCSS

SCSS will help us to add some colours! Nuxt community makes our lives
easier with the [`style-resources-module`](https://github.com/nuxt-community/style-resources-module).

> Many thanks to [this article](https://hackernoon.com/how-i-use-scss-variables-mixins-functions-globally-in-nuxt-js-projects-while-compiling-css-utilit-58bb6ff30438)

```sh
yarn add --dev sass-loader node-sass @nuxtjs/style-resources
```

Following the `style-resources-module` documentation, let's update our _nuxt.config.ts_:

```ts
module.exports = {
  modules: ['@nuxtjs/style-resources'],

  styleResources: {
    // Don't forget to create both empty files
    //  if you use this
    scss: [
      // theme variables
      './assets/scss/_variables.scss',
      // mixins & abstract classes
      './assets/scss/_mixins.scss'
    ]
  }
};
```

SCSS can now be used in _.vue_ files:

```html
<style lang="scss"></style>
```

Additionally, thanks to `style-resources-module`, all variables in _./assets/scss/\_variables.scss_
and mixins from _./assets/scss/\_mixins.scss_ are available in _.vue_ files.

### Styling

Nothing very exciting over here, just regular (S)CSS. As for the theme colors, I was never
inspired when it comes to colors. Feel free to pick up you own colors.

```scss
// assets/scss/_variables.scss

$colorBgStart: #233237;
$colorBgEnd: #18121e;
$colorPrimary: #005b96;
$colorPrimaryDark: #03396c;
$colorSecondary: #94618e;
$colorSecondaryDark: #49274a;
```

I just added some media queries, for responsiveness, and some material
design inspired box shadows as mixins:

```scss
@mixin lt-sm {
  @media screen and (max-width: 575px) {
    @content;
  }
}
@mixin gt-sm {
  @media screen and (min-width: 576px) {
    @content;
  }
}

/* https://medium.com/@ladyleet/adding-box-shadow-z-depth-to-angular-material-2-components-6bd0de303dcb */
%transition-box-shadown {
  transition: box-shadow 0.2;
}
%z-depth-1 {
  @extend %transition-box-shadown;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
}

%z-depth-2 {
  @extend %transition-box-shadown;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px -1px rgba(0, 0, 0, 0.3);
}

%z-depth-3 {
  @extend %transition-box-shadown;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12),
    0 3px 5px -1px rgba(0, 0, 0, 0.3);
}

%z-depth-4 {
  @extend %transition-box-shadown;
  box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12),
    0 5px 5px -3px rgba(0, 0, 0, 0.3);
}

%z-depth-5 {
  @extend %transition-box-shadown;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12),
    0 8px 10px -5px rgba(0, 0, 0, 0.3);
}
```

Nuxt works with [layouts](https://nuxtjs.org/guide/views#layouts). For the moment,
let's only use the default layout, namely: _layouts/default.vue_:

```vue
<template>
  <div>
    <main>
      <nuxt />
    </main>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background-image: linear-gradient(
    to bottom right,
    $colorBgStart,
    $colorBgEnd
  );
  min-height: 100vh;
}

main {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: #fafcff;
  padding: 1rem;
  box-sizing: border-box;
}
</style>
```

Thanks to our previous SCSS configuration, `$colorBgStart` and `$colorBgEnd` here
resolve to appropriate values.

> Don't forget `lang="scss"`!

Similarly, let's have our `h2` colored. Our _components/polls/PollList.vue_
can be updated as follows:

```vue
<template>
  <div>
    <div>
      <h2>Polls</h2>
      <poll-detail
        v-for="poll in polls"
        :key="'poll-' + poll.id"
        :poll="poll"
      />
    </div>

    <div>
      <h2>Votes</h2>
      <p>votes count: {{ votes.length }}</p>
      <div v-for="vote in votes" :key="'vote-' + vote.id" class="poll__vote">
        <span>#{{ vote.id }}:</span>
        <span>{{ vote.choiceId }}</span>
        <span v-if="vote.comment !== undefined && vote.comment.length > 0"
          >({{ vote.comment }})</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// unchanged
</script>

<style lang="scss" scoped>
h2 {
  color: $colorPrimary;
  border-bottom: 1px solid $colorPrimaryDark;
}

.poll__vote {
  span:first-child {
    display: inline-block;
    width: 40px;
    text-align: right;
    margin-right: 8px;
  }
}
</style>
```

> I used `scoped` because I want to apply this style only in this components.
> [Vue _Scoped CSS_ documentation](https://vue-loader.vuejs.org/guide/scoped-css.html)
> can be refered for more information.

I have modified the vote section in the template.

Let's keep going and update our _components/polls/PollDetail.vue_. The style is
not relevant to this tutorial so the code below is only an example. Interesting
SCSS points may be:

- [SCSS mixins](https://sass-lang.com/guide)
- [SCSS inheriance](https://sass-lang.com/guide)

```vue
<template>
  <div>
    <h3>{{ poll.topic }}</h3>

    <div class="poll__choice--list">
      <div
        class="poll__choice--container"
        v-for="choice in poll.choices"
        :key="choice.id"
        @click="selectChoice(choice)"
      >
        <div class="poll__choice--box" :class="selectedChoiceClass(choice)">
          <span>Select {{ choice.text }}</span>
          <span>({{ choice.count }} votes)</span>
        </div>
      </div>
    </div>

    <div v-if="selectedChoiceId > 0" class="poll__vote">
      <textarea
        v-model="comment"
        placeholder="Enter an optional comment here"
      ></textarea>
      <button @click="voteChoice()">Vote!</button>
    </div>
  </div>
</template>

<script lang="ts">
// unchanged
</script>

<style lang="scss">
.poll__choice--list {
  display: flex;
  flex-flow: row wrap;
}

.poll__choice--container {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  @include gt-sm {
    width: 25%;
  }
}

.poll__choice--box {
  @extend %z-depth-1;
  background-color: $colorPrimary;
  color: #ddd;
  padding: 1rem;
  border: 1px solid $colorPrimaryDark;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;

  span {
    display: block;
    text-align: center;
  }
  &:hover {
    cursor: pointer;
    @extend %z-depth-2;
  }

  &.selected {
    @extend %z-depth-3;
    background-color: $colorPrimaryDark;
    color: #fff;
  }
}

.poll__vote {
  textarea {
    width: calc(100% - 1rem);
    margin: 0px 0.5rem;
    padding: 0.5rem;
    box-sizing: border-box;
    resize: vertical;
  }
  button {
    display: block;
    margin: 1rem auto;
    width: 50%;
    max-width: 300px;
    padding: 8px 0px;
    background-color: $colorSecondary;
    color: #ddd;
    border: 1px solid $colorSecondaryDark;
    border-radius: 4px;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
      cursor: pointer;
      background-color: $colorSecondaryDark;
      color: #fff;
    }
  }
}
</style>
```

> I am using a [_BEM-like_](http://getbem.com/introduction/) naming convention
> for my CSS classes. Feel free to use your own convention.

With all the examples above, my poll page looks like this:

![Polls page](screenshots/05.01_polls_page.png)

After voting, my vote appears:

![Voted](screenshots/05.02_polls_page_voted.png)

### Filters

While being a Vue.js feature, I add filters here because it is somehow
related to appearances.

Votes list displays the ID of voted choice but it would be better to have
the choice name. This is where a [Filter](https://vuejs.org/v2/guide/filters.html)
could help us.

The idea would be, in _components/polls/PollList.vue_:

- create a computed property `choices` to have a flat list of choices
- loop through `choices` and return `choice.text`

Filters do not have their own decorator (see [Github issue](https://github.com/kaorun343/vue-property-decorator/issues/98#issuecomment-390161771))
and must be defined in `@Component({})`. Computed properties, via
`this.choices` are not available in `@Component({})`. The workaround
is then to pass `this.choices` as an argument of the filter:

```ts
@Component({
  // unchanged
  filters: {
    choiceName: (value: number, choices: Choice[]): string => {
      const choice = choices.find(choice => choice.id === value);
      return choice !== undefined ? choice.text : 'Error no choice found';
    }
  }
})
export default class PollList extends Vue {
  // unchaged

  // Computed properties are defined as getters
  public get choices(): Choice[] {
    return this.polls
      .map(poll => poll.choices)
      .reduce((p1, p2) => p1.concat(p2), []);
  }
}
```

We can now use the `choiceName` filter with the choices list provided by
the `choices()` computed properties:

```html
<span>{{ vote.choiceId | choiceName(choices) }}</span>
```

Now, votes display choice name:

![Voted](screenshots/05.03_votes_with_choices_name.png)

## Testing

> I consider unit testing as part of the code itself. Following Angular
> folder structure, I like having my `.spec.ts` along with the tested
> files. May you prefer to have a `tests/` folder at the root folder
> or a `__tests__/` at each folder level, feel free to adapt this tutorial
> to your taste.
>
> As for the mocks, I follow Jest convention by having a `__mocks__/` folder
> at each folder level

### Adding and configuring Jest

Following dependencies will be used:

- [Jest](https://jestjs.io/)

  Our test runner. As we are using TypeScript, [`@types/jest`](https://www.npmjs.com/package/@types/jest)
  is also added

- [vue-jest](https://github.com/vuejs/vue-jest)

  Jest transformer for our vue components

- [vue-test-utils](https://vue-test-utils.vuejs.org/)

  Vue official unit testing library. Equivalent of Enzyme for React

- [ts-jest](https://github.com/kulshekhar/ts-jest)

  TypeScript preprocessor for Jest

- [babel-core](https://github.com/babel/babel-bridge)

  Required for `vue-jest` ([StackOverflow link](https://stackoverflow.com/a/54689793/4906586))

```sh
yarn add --dev jest @types/jest vue-jest @vue/test-utils ts-jest babel-core@^7.0.0-bridge.0
```

Add Jest types in _tsconfig.json_:

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

Add a Jest configuration file, _jest.config.js_:

```js
module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    // this line is optional and the tilde shortcut
    // will not be used in this tutorial
    '^~/(.*)$': '<rootDir>/$1'
  },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],

  collectCoverageFrom: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'lib/**/*.ts',
    'plugins/**/*.ts',
    'store/**/*.ts'
  ]
};
```

For more detail: [Jest configuration documentation](https://jestjs.io/docs/en/configuration)

> [`collectCoverageFrom`](https://jestjs.io/docs/en/cli#collectcoveragefrom-glob): we will
> be using Jest coverage (which uses Istanbul behind the hoods). We are listing all folders
> than have to be scanned for coverage so that files which do not have a corresponding
> `.spec.ts` file are flagged as _non tested_ instead of being skipped.

Finally, add a _ts-shim.d.ts_ at root level:

```ts
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
```

If this shim were missing, running tests against Vue components will trigger an
error: `error TS2307: Cannot find module '{path to component}'.`. Kudos to
[Beetaa](https://github.com/beetaa/) for
[the solution](https://github.com/vuejs/vue/issues/5298#issuecomment-453343514)

> Note: _lib/polls/_ testing is pure TypeScript testing and will be skipped in
> in this tutorial. For the sake of completion, feel free to check:
>
> - [_/lib/polls/api.spec.ts_](https://github.com/Al-un/nuxt-ts/blob/master/lib/polls/api.spec.ts)
> - [_/lib/polls/models.spec.ts_](https://github.com/Al-un/nuxt-ts/blob/master/lib/polls/models.spec.ts)

You are now ready to run tests with

```
yarn test
```

May you are interested into test coverage, please run

```
yarn test --coverage
```

and then check _coverage/lcov-report/index.html_.

### Vuex testing

As vuex files are plain TypeScript files, it is easier to start there. Let's
create the following files:

- _/store/polls/state.spec.ts_
- _/store/polls/mutations.spec.ts_
- _/store/polls/actions.spec.ts_

Getter is empty so there is nothing to test.

I mocked a state in [_store/polls/\_\_mocks\_\_/state.mock.ts_](https://github.com/Al-un/nuxt-ts/blob/master/store/polls/__mocks__/state.mock.ts).

State and mutations testing are pure TypeScript testing and
present not much of interest. I then just add the link to the
test files:

- [_/store/polls/state.spec.ts_](https://github.com/Al-un/nuxt-ts/blob/master/store/polls/state.spec.ts)
- [_/store/polls/mutations.spec.ts_](https://github.com/Al-un/nuxt-ts/blob/master/store/polls/mutations.spec.ts)

Actions testing involve API calls. Right, we are not really calling
any back-end but let's imagine we were. Testing should avoid any
network call. To fix this, Jest has the [manual mock](https://jestjs.io/docs/en/manual-mocks.html)
feature.

Following Jest convention, my API mock is located at
[_lib/polls/\_\_mocks\_\_/api.ts_](https://github.com/Al-un/nuxt-ts/blob/master/lib/polls/__mocks__/api.ts):

```ts
import { Poll, Vote } from '../models';

export const DUMMY_POLLS: Poll[] = [
  // ...
];

export const DUMMY_VOTES: Vote[] = [
  // ...
];

export const loadPolls = jest.fn().mockImplementation(
  (): Promise<Poll[]> => {
    return new Promise<Poll[]>(resolve => resolve(DUMMY_POLLS));
  }
);
```

Two points have to be noticed:

- The `loadPolls` function is exactly identical to the real one
- `loadPolls` definition is not a function but a `jest.fn()` mock

With such mock, we just have to call

```ts
// Beware of the star import !!
import * as api from '@/lib/polls/api';

jest.mock('@/lib/polls/api.ts');
```

at the top of our action testing file. There is no much to add besides
the mock point so here is the link of the testing file:

- [_/store/polls/actions.spec.ts_](https://github.com/Al-un/nuxt-ts/blob/master/store/polls/actions.spec.ts)

At this stage, API is only returning dummy values and votes are not
processed by any back-end (e.g. vote ID has to be generated by a
back-end). API structure will evolve, when Axios will enter the scene,
and tests will have to be updated accordingly

### Components testing

As Vue components testing relies on Vue Test Utils, please refer
to the [Vue Test Utils documentation](https://vue-test-utils.vuejs.org/)
if necessary

`PollDetail` and `PollList` are tested by:

- [_/components/polls/PollDetail.spec.ts_](https://github.com/Al-un/nuxt-ts/blob/master/components/polls/PollDetail.spec.ts)
- [_/components/polls/PollList.spec.ts_](https://github.com/Al-un/nuxt-ts/blob/master/components/polls/PollList.spec.ts)

As Nuxt pages are Vue components, polls page is tested by:

- [_/pages/polls.spec.ts_](https://github.com/Al-un/nuxt-ts/blob/master/pages/polls.spec.ts)

#### Shallow mounting

When [shallow mounting](https://vue-test-utils.vuejs.org/guides/#common-tips)
components, props and methods can be mocked:

```ts
const options = {};
const wrapper: Wrapper<PollList> = shallowMount(PollList, options);
```

Interesting options are:

- `propsData` to mock props (from _PollList.spec.ts_):

  ```ts
  import { DUMMY_POLLS, DUMMY_VOTES } from '@/lib/polls/__mocks__/api';

  const poll: Poll = DUMMY_POLLS[0];
  const wrapper: Wrapper<PollList> = shallowMount(PollList, {
    propsData: { polls: DUMMY_POLLS, votes: DUMMY_VOTES }
  });
  ```

- `methods` to override component methods definition. This could help for
  mocking or simply using another implementation (from _PollDetail.spec.ts_):

  ```ts
  import { DUMMY_POLLS } from '@/lib/polls/__mocks__/api';

  const poll: Poll = DUMMY_POLLS[0];
  const mockedVote: jest.Mock = jest.fn();

  const wrapper: Wrapper<PollDetail> = shallowMount(PollDetail, {
    propsData: { poll },
    methods: { vote: mockedVote }
  });
  ```

Please check [Vue Test Utils mounting options](https://vue-test-utils.vuejs.org/api/options.html)
for more details

#### Mocking Vuex store

Because _Polls_ page uses mapped state, Vuex Store has to be mocked as well.
Vue Test Utils has some [documentation dedicated to testing
Vuex in components](https://vue-test-utils.vuejs.org/guides/#testing-vuex-in-components)

```ts
import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

import Polls from './polls.vue';
import { RootState } from '@/store/types';
import { mock1 } from '@/store/polls/__mocks__/state.mock';

// Vue config
const localVue = createLocalVue();
localVue.use(Vuex);

// Vuex config
let store: Store<RootState>;

// Component config
let wrapper: Wrapper<Polls>;
const loadPolls: jest.Mock = jest.fn();

store = new Vuex.Store({
  modules: {
    polls: {
      namespaced: true,
      actions: { load: loadPolls },
      state: mock1()
    }
  }
});

const wrapper: Wrapper<Polls> = shallowMount(Polls, { localVue, store });
```

> Don't forget to have `namespaced: true`. All store within _store/{some folder}_
> are namespaced by default in Nuxt

Only the required action and state are mocked. There is no need to mock
mutations and other actions as they are not used by _Polls_ page.

### Coverage

To generate coverage report, run

```sh
yarn test --coverage
```

and you will have a nice output:

![console coverage](screenshots/06.01_coverage.png)

Open _coverage/lcov-report/index.html_ to have a detail HTML report:

![HTML coverage](screenshots/06.02_html_report.png)

## Deployment

### Universal vs Pre-rendered vs SPA

Nuxt offers three different ways to "build" our application
(more on [Nuxt docs](https://nuxtjs.org/guide/commands#production-deployment)):

- Universal, serving our app as an Node application
- Pre-rendered, serving our app as a static website but with all routes pre-rendered
- SPA, serving our app as a SPA website

I will not use SPA here as pre-rendered does all the hard work to generate all routes
for us, which is one of SPA weakness.

To deploy an universal build:

```sh
yarn build
yarn start
```

To deploy a pre-rendered build:

```sh
yarn generate
# deploy /dist/ folder
```

You will find relevant documentation on [NuxtJS FAQ](https://nuxtjs.org/faq/). I have tested
some deployments for my personal usage so I will cover these in the following paragraphs.

### Surge

[Surge](https://surge.sh/) is a very easy to use static website hosting accessible via
CLI only, which is quite cool for continuous deployment.

Install Surge:

```sh
# Install globally
npm install --global surge
# Add locally as a devDependency
yarn add --dev surge
```

> For some reasons, I could not install Surge globally with yarn

Then simply build and deploy a static website:

```sh
# Generate
yarn generate
# Deploy
surge --project ./dist/
```

Output:

```sh

   Running as xxxx@xxxx.xxx (Student)

        project: ./dist/
         domain: lively-quiver.surge.sh
         upload: [====================] 100% eta: 0.0s (12 files, 256921 bytes)
            CDN: [====================] 100%
             IP: 45.55.110.124

   Success! - Published to lively-quiver.surge.sh
```

That's it!

For more details, check:

- [Nuxtjs doc](https://nuxtjs.org/faq/surge-deployment)
- [Surge docs](https://surge.sh/help/)

### AWS S3

S3 bucket offers the possibility to host a static website ([AWS docs](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)):

- Go to your AWS management console
- Create a S3 bucket and open it
- Go to properties and enable _Static website hosting_
- Make your bucket public by adding this _permissions > bucket policy_:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "AddPerm",
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::nuxt-ts/*"
      }
    ]
  }
  ```

- Upload your _dist/_ content into your bucket

For those who prefer to use AWS CLI:

```sh
# Create your bucket. Replace "nuxt-ts" with your bucket name
aws s3 mb s3://nuxt-ts
# Enable static website hosting with default values
aws s3 website s3://nuxt-ts --index-document index.html --error-document error.html
# Create a bucket policy files
touch s3_policy.json
# Edit accordingly. Use VS Code!
vim s3_policy.json
# Apply policy file to bucket
aws s3api put-bucket-policy --bucket nuxt-ts --policy file://s3_policy.json
# Generate and upload dist/ content
yarn generate
aws s3 cp dist/ s3://nuxt-ts --recursive
# Tadaa!!
firefox nuxt-ts.s3-website.eu-west-3.amazonaws.com
```

Docs references:

- [Nuxtjs doc](https://nuxtjs.org/faq/deployment-aws-s3-cloudfront)
- [`aws s3 mb`](https://docs.aws.amazon.com/cli/latest/reference/s3/mb.html)
- [`aws s3 website`](https://docs.aws.amazon.com/cli/latest/reference/s3/website.html)
- [`aws s3api put-bucket-policy`](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-bucket-policy.html)
- [`aws s3 cp`](https://docs.aws.amazon.com/cli/latest/reference/s3/cp.html)

### Heroku

Configure first your _package.json_. By convention, Nuxt uses `build` and `start`
scripts which is properly triggered by Heroku after a `git push`. For the sake of
the tutorial, let's use Heroku specific hooks in _package.json_:

```json
"scripts": {
    "build": "nuxt build", // this will not run
    "heroku-postbuild": "nuxt build", // this will run instead
    "start": "nuxt start" // this will run after a successful build
  }
```

```sh
# == no app == : create app
heroku create nuxt-ts
# == app exists ==: add remote
heroku git:remote --app nuxt-ts
# check your remotes
git remote -v
# configure your app
heroku config:set NPM_CONFIG_PRODUCTION=false --app nuxt-ts
heroku config:set HOST=0.0.0.0 --app nuxt-ts
heroku config:set NODE_ENV=production --app nuxt-ts
# simply push your desired branch to Heroku
git push heroku master
```

Docs references:

- [Nuxtjs doc](https://nuxtjs.org/faq/heroku-deployment)
- [Using NodeJS with Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)
- [Customize build process](https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process)
- [Using Heroku CLI to deploy](https://devcenter.heroku.com/articles/git#creating-a-heroku-remote)

### Travis CI

Thanks to providers, including those deployment into Travis is easy.
Please check [_.travis.yml_](https://github.com/Al-un/learn-nuxt-ts/blob/master/.travis.yml) for
the complete configuration file.

When encrypting values, I prefer to copy paste the secured values into
my _.travis.yml_ rather than having the CLI doing it for me because
it sometimes breaks my formatting.

#### Surge

Configure Surge:

```sh
# Generate a token
surge token
# Encrypt SURGE_LOGIN
travis encrypt "SURGE_LOGIN={your email}" --com -r {your Github user}/{your repo}
# Encrypt SURGE_TOKEN
travis encrypt "SURGE_TOKEN={your token}" --com -r {your Github user}/{your repo}
```

Then add a Surge provider to your _.travis.yml_:

```yaml
deploy:
  - provider: surge
    project: ./dist
    domain: nuxt-ts.surge.sh # optional
    skip-cleanup: true
```

Please check [Travis docs](https://docs.travis-ci.com/user/deployment/surge/) for more.

#### AWS S3

Similary to Surge, encrypt your _AccessKeyId_ and your _SecretAccessKey_. Then add the
S3 provider:

```yaml
deploy:
  - provider: s3
    access_key_id:
      secure: '...'
    secret_access_key:
      secure: '...'
    bucket: nuxt-ts
    region: eu-west-3
    skip-cleanup: true
    local_dir: dist
```

Don't forget to specify the bucket region and the folder (`local_dir`) to upload

Please check [Travis docs](https://docs.travis-ci.com/user/deployment/s3/) for more.

#### Heroku

Encrypt your Heroku API key and add the Heroku provider:

```yaml
deploy:
  - provider: heroku
    api_key: secure: '...'
    app: nuxt-ts
    on:
      branch: master
      node_js: node
```

Please check [Travis docs](https://docs.travis-ci.com/user/deployment/heroku/) for more.

### Circle CI

When Travis is using _providers_, Circle CI uses _Orbs_. I will not
focus on Circle CI orbs in this tutorial. Please check
[_.circleci/config.yml_](https://github.com/Al-un/learn-nuxt-ts/blob/master/.circleci/config.yml)
for the complete configuration

#### Surge

As mentioned earlier, you can either install Surge globally or as a _devDependency_.
Having `SURGE_LOGIN` and `SURGE_TOKEN` environment variables defined, it is as
simple as executing the `surge` command:

```yaml
jobs:
  deploy-surge:
    docker:
      - image: circleci/node:11-browsers-legacy
    working_directory: ~/repo
    steps:
      - checkout
      - run: npm ci
      - run: npm run generate
      - run: ./node_modules/.bin/surge --project ~/repo/dist --domain nuxt-ts.surge.sh
```

Reference: [Surge doc](https://surge.sh/help/integrating-with-circleci)

#### AWS S3

Circle CI offers a [S3 orb](https://circleci.com/orbs/registry/orb/circleci/aws-s3)
to ease S3 deployment, especially regarding AWS CLI configuration. Three environments
variables are needed:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`

Then, add the orb and execute it in a job:

```yaml
orbs:
  aws-s3: circleci/aws-s3@1.0.4

jobs:
  deploy-s3:
    docker:
      - image: circleci/python:2.7
    steps:
      - checkout
      - run: npm ci
      - run: npm run generate
      - aws-s3/copy:
          from: ~/repo/dist
          to: 's3://nuxt-ts'
          arguments: '--recursive'
```

Reference: [Circle CI doc](https://circleci.com/docs/2.0/deployment-integrations/#aws)

#### Heroku

Configure first required environment variables:

- `HEROKU_API_KEY`
- `HEROKU_APP_NAME`

Once done, deploying to Heroku is a simple `git push`:

```yaml
jobs:
  deploy-heroku:
    docker:
      - image: buildpack-deps:trusty
    steps:
      - checkout
      - run:
          name: Deploy Master to Heroku
          command: |
            git push https://heroku:$HEROKU_API_KEY@git.heroku.com/$HEROKU_APP_NAME.git master
```

Reference: [Circle CI doc](https://circleci.com/docs/2.0/deployment-integrations/#heroku)
