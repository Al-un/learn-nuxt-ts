<template>
  <section>
    <h2>{{ title }}</h2>
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

/**
 * a component wrapper to ensure that all presented components have proper
 * borders and title
 */
@Component({
  name: 'ComponentWrapper',

  props: {
    title: {
      default: 'no title',
      type: String
    }
  }
})
export default class ComponentWrapper extends Vue {}
</script>

<style scoped>
section {
  /* sizing */
  width: 90%;
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0px 0px 1rem;
  /* borders */
  border: 1px solid seagreen;
  border-radius: 8px;
  /* text */
  text-align: center;
}
section > h2 {
  /* position */
  position: relative;
  margin-top: -20px;
  /* colors */
  background: white;
  /* sizing */
  box-sizing: border-box;
  width: 90%;
  max-width: 300px;
  height: 40px;
  padding-left: 1rem;
  margin-left: 5%;
  /* borders */
  border: 1px solid seagreen;
  border-radius: 6px;
  /* text */
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  line-height: 40px;
}
</style>
