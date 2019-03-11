# Nuxt-TS: Nuxt application powered by TypeScript

[Nuxt 2.4.0 release (Jan-2019)](https://dev.to/nuxt/nuxtjs-v240-is-out-typescript-smart-prefetching-and-more-18d)
has pushed one step forward TypeScript integration into Nuxt. **Kudos to Nuxt team**.

Half tutorial, half exploration, I want to check out how far I can get
with Nuxt+TypeScript in a full application from scratch.

- [01. Initialise Project](#initialise-project)
- [02. Switch to TypeScript](#switch-to-typescript)
- [03. Code control: formatter and linter](#code-control-formatter-and-linter)
  - [03.1 Prettier](#prettier)
  - [03.2 ESLint](#eslint)
- [04. Polls: components & vuex](#polls-components-and-vuex)
  - [04.1 Models](#polls-models)
  - [04.2 Page](#polls-page)
  - [04.3 Components](#polls-components)
  - [04.4 Store](#polls-store)

This tutorial has underwent a complete refactoring on March 2019. Old version
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

Run the scaffolded project:

```sh
cd {your project folder}
yarn dev
```

Nuxt should not encounter any error:

![Project run](screenshots/01.03_run.png)

And the application should be available on <http://localhost:3000>:

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

## Update existing code

The scaffolded application is not much, only _pages/index.vue_ has to
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
link : TypeScript componentsin _pages/index.vue_:
: TypeScript components

```ht: TypeScript componentsml
<temp: TypeScript componentslate>
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
  the responsibility ofthe appropriate page.
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
The usage of `undefined` is not recommended as data must be initialised to
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
> pure TypeScript program, they would need to be initialised in the `constructor()`.
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

#### Polls state

That defined, we can define our poll state. Nothing fancy, it just reflects
the needs of _pages/polls.vue_. _store/polls/types.ts_ is as simple as follow:

```ts
import { Poll, Vote } from '@/lib/polls/models';

export interface PollsState {
  polls: Poll[];
  votes: Vote[];
}
```

Such state is initialised as defined in _store/polls/state.ts_:

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
import { GetterTree } from 'vuex';

import { PollsState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<PollsState, RootState> = {};

export default getters;
```

#### Polls actions

With our simplified interface, only two actions are required:

- poll loading
- choice vote

Both are defined in _store/polls/actions.ts_:

```ts
import { ActionContext, ActionTree } from 'vuex';

import { PollsState } from './types';
import { RootState } from '../types';
import { loadPolls } from '@/lib/polls/api';
import { Vote, ChoiceVote } from '@/lib/polls/models';

type PollActionContext = ActionContext<PollsState, RootState>;

export const actions: ActionTree<PollsState, RootState> = {
  load: async ({ commit }: PollActionContext) => {
    const polls = await loadPolls();
    commit('setPolls', polls);
  },

  vote: (
    { commit, state }: PollActionContext,
    { choiceId, comment }: ChoiceVote
  ) => {
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

- To avoid copying `ActionContext<PollsState, RootState>`, I added a type
  alias. Check [this StackOverflow answer](https://stackoverflow.com/questions/21839692/does-typescript-allow-type-aliases/28343437#28343437)
  for more information
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
import { MutationTree } from 'vuex';
import { PollsState } from './types';
import { Poll, Vote } from '@/lib/polls/models';

export const mutations: MutationTree<PollsState> = {
  setPolls: (state, polls: Poll[]) => {
    state.polls = polls;
  },

  vote: (state, vote: Vote) => {
    // add vote
    state.votes.push(vote);

    // update choice
    state.polls
      // map Poll => Choice[]
      .map(poll => poll.choices)
      // flatMap Choice[] => Choice
      .reduce((prev, curr) => prev.concat(curr), [])
      // There should be only one
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

_pages/polls.vue_ script is updated as follow:

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

Because `votes` is initialised as an empty list, you should have the same
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
