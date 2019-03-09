<template>
  <section>
    <h2>{{ title }}</h2>
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

/**
 * a component wrapper to ensure that all presented components have proper
 * borders and title
 */
@Component({})
export default class ComponentWrapper extends Vue {
  @Prop({ default: 'no title' })
  public title!: string;
}
</script>

<style scoped>
section {
  /* sizing */
  width: 90%;
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0px 0px 1rem;
  /* colors */
  background: #fefefe;
  /* borders */
  border-radius: 6px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  /* text */
  text-align: center;
}
section > h2 {
  /* position */
  position: relative;
  margin: 0px 0px 20px;
  /* colors */
  background: #009688;
  color: #f9fbe7;
  /* sizing */
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding-left: 1rem;
  /* borders */
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  /* text */
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  line-height: 40px;
}
</style>
