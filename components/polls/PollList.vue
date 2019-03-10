<template>
  <div>
    <div>
      <h2>Polls</h2>
      <poll-detail v-for="poll in polls" :key="'poll-'+poll.id" :poll="poll"/>
    </div>

    <div>
      <h2>Votes</h2>
      <p>votes count: {{ votes.length }}</p>
      <div v-for="vote in votes" :key="'vote-'+vote.id">
        <p>{{ vote.id }} [{{ vote.choiceId }}]: {{ vote.comment }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

import { Poll, Vote } from '@/lib/polls/models';
import PollDetail from './PollDetail.vue';

@Component({
  components: {
    PollDetail
  }
})
export default class PollList extends Vue {
  @Prop({ type: Array })
  polls!: Poll[];

  @Prop({ type: Array })
  votes!: Vote[];
}
</script>

<style>
</style>
