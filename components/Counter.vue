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
export default class Counter extends Vue {}
</script>
