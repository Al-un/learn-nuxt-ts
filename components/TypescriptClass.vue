<template>
  <div>
    <p class="some-class">{{ val }}</p>
    <p class="another-class">{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import AnotherClass from '@/lib/another.class';
import SomeClass from '@/lib/some.class';

/**
 * A basic component to test TypeScript classes in Vue SFC files
 */
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
    this.val = some.moarValue();
    this.text = anot.moarText();
  }
}
</script>
