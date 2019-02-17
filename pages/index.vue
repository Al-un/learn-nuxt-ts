<template>
  <section class="container">
    <div>
      <logo/>

      <h3>Testing Vuex</h3>
      <div>
        <span class="count">{{ count }}</span>
        <span class="square">(square: {{ square }})</span>
        <button @click="increment">Increment</button>
      </div>

      <h3>From ts classes:</h3>
      <p>{{ val }}</p>
      <p>{{ text }}</p>
      <div/>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions, mapGetters } from 'vuex';
import Logo from '@/components/Logo.vue';
import SomeClass from '@/lib/some.class';
import AnotherClass from '@/lib/another.class';

@Component({
  components: {
    Logo
  },
  computed: {
    ...mapState('counter', ['count']),
    ...mapGetters('counter', ['square'])
  },
  methods: {
    ...mapActions('counter', ['increment'])
  }
})
export default class Index extends Vue {
  val: number = 0;
  text: string = '';

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
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
