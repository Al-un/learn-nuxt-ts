import { MutationTree } from 'vuex';
import { PollsState } from './types';
import { Poll, Vote } from '@/lib/polls/models';

export const mutations: MutationTree<PollsState> = {
  setPolls: (state, polls: Poll[]) => {
    state.polls = polls;
  },

  vote: (state, vote: Vote) => {
    // add vote
    state.votes.push(vote);

    // update choice
    state.polls
      .map(poll => poll.choices)
      .reduce((prev, curr) => prev.concat(curr), [])
      .filter(choice => choice.id === vote.choiceId)
      .forEach(choice => (choice.count += 1));
  }
};

export default mutations;
