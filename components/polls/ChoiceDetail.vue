<template>
  <div>
    <div v-for="choice in poll.choices" :key="choice.id" @click="selectChoice(choice)">
      <p>Select {{ choice.text }} (count: {{ choice.count }})</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

import { Choice } from '@/lib/polls/models';

@Component({})
export default class PollList extends Vue {
  @Prop({ type: Object })
  public choice: Choice;

  @Prop({ type: Number })
  public selectedChoiceId: number;
}
</script>

<style>
</style>
