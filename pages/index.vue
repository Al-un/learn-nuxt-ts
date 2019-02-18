<template>
  <div>
    <component-wrapper title="logo">
      <logo/>
    </component-wrapper>

    <component-wrapper title="Typescript classes">
      <typescript-class/>
    </component-wrapper>

    <component-wrapper title="Counter">
      <counter/>
    </component-wrapper>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ComponentWrapper from '@/components/ComponentWrapper.vue';

import Counter from '@/components/Counter.vue';
import Logo from '@/components/Logo.vue';
import TypescriptClass from '@/components/TypescriptClass.vue';

@Component({
  components: {
    ComponentWrapper,

    Counter,
    Logo,
    TypescriptClass
  }
})
export default class Index extends Vue {}
</script>
