import { PollsActions } from './types';
import { loadPolls } from '@/lib/polls/api';
import { Vote } from '@/lib/polls/models';

export const actions: PollsActions = {
  load: async ({ commit }) => {
    const polls = await loadPolls();
    commit('setPolls', polls);
  },

  vote: ({ commit, state }, { choiceId, comment }) => {
    const voteId = state.votes.length
      ? state.votes[state.votes.length - 1].id + 1
      : 1;
    const vote = new Vote(voteId, choiceId, comment);
    commit('vote', vote);
  }
};

export default actions;
