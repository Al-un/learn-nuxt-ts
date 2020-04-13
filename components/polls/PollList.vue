<template>
  <div>
    <div>
      <h2>Polls</h2>
      <poll-detail
        v-for="poll in polls"
        :key="'poll-' + poll.id"
        :poll="poll"
      />
    </div>

    <div>
      <h2>Votes</h2>
      <p>votes count: {{ votes.length }}</p>
      <div v-for="vote in votes" :key="'vote-' + vote.id" class="poll__vote">
        <span>#{{ vote.id }}:</span>
        <span>{{ vote.choiceId | choiceName(choices) }}</span>
        <span v-if="vote.comment !== undefined && vote.comment.length > 0"
          >({{ vote.comment }})</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

import PollDetail from './PollDetail.vue';
import { Poll, Vote, Choice } from '@/lib/polls/models';

@Component({
  components: {
    PollDetail
  },
  filters: {
    /**
     * Fetch the name of a voted choice.
     *
     * Choices list is passed as argument because `this` is not
     * accessible here so the computed properties `this.choices`
     * does not resolve
     */
    choiceName: (value: number, choices: Choice[]): string => {
      const choice = choices.find(choice => choice.id === value);
      return choice !== undefined ? choice.text : 'Error no choice found';
    }
  }
})
export default class PollList extends Vue {
  @Prop({ type: Array })
  polls!: Poll[];

  @Prop({ type: Array })
  votes!: Vote[];

  /**
   * Computed properties for flatteting the list of choices
   * @return list of displayed choices
   */
  public get choices(): Choice[] {
    return this.polls
      .map(poll => poll.choices)
      .reduce((p1, p2) => p1.concat(p2), []);
  }
}
</script>

<style lang="scss" scoped>
h2 {
  color: $colorPrimary;
  border-bottom: 1px solid $colorPrimaryDark;
}

.poll__vote {
  span:first-child {
    display: inline-block;
    width: 40px;
    text-align: right;
    margin-right: 8px;
  }
}
</style>
