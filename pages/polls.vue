<template>
  <poll-list v-if="polls.length" :polls="polls" :votes="votes"/>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator';

import PollList from '@/components/polls/PollList.vue';
import { Poll, Vote } from '@/lib/polls/models';
import { pollsModule } from '@/store/polls/const';

@Component({
  components: {
    PollList
  }
})
export default class Polls extends Vue {
  @pollsModule.State('polls')
  public polls!: Poll[];
  @pollsModule.State('votes')
  public votes!: Vote[];

  @pollsModule.Action('load')
  private loadPolls!: () => void;

  mounted() {
    this.loadPolls();
  }}
</script>

<style>
</style>
