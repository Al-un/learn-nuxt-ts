<template>
  <div>
    <span class="count">{{ count }}</span>
    <span class="square">({{ squareText }}: {{ square }})</span>
    <span class="squareAndCount">(squarePlusCount: {{ squarePlusCount }})</span>
    <button @click="wrappedIncrement">Increment</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { counterVuexNamespace } from '@/store/counter/const';

/**
 * A basic counter with the square value of the counter to test Vuex
 */
@Component({})
export default class Counter extends Vue {
  // data are pure properties
  public squareText: string = 'square';

  // computed properties are defined as non-null variables
  @counterVuexNamespace.State('count')
  private count!: number;
  @counterVuexNamespace.Getter('square')
  private square!: number;

  // methods should match expected signature
  @counterVuexNamespace.Action('increment')
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
