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
  // data are pure properties
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
