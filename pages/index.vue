<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">games</h1>
      <h2 class="subtitle">Games to learn, Games for fun</h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
      <h3>From ts classes:</h3>
      <p>{{ val }}</p>
      <p>{{ text }}</p>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Logo from "@/components/Logo.vue";
import { SomeClass, AnotherClass } from "~/lib/dummy";

@Component({
  components: {
    Logo
  }
})
export default class Index extends Vue {
  val: Number = 0;
  text: String = "";

  mounted() {
    const some = new SomeClass();
    some.value = 42;
    const anot = new AnotherClass();
    this.val = some.moarValue();
    this.text = anot.moarText();
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
