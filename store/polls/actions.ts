import { ActionContext, ActionTree } from 'vuex';
import { PollsState } from './types';
import { RootState } from '../types';
import { loadPolls } from '@/lib/polls/api';
import { Vote, ChoiceVote } from '@/lib/polls/models';

/**
 * Create a type to save some characters:
 * SO link for type alias: https://stackoverflow.com/a/28343437/4906586
 */
type PollActionContext = ActionContext<PollsState, RootState>;

export const actions: ActionTree<PollsState, RootState> = {
  load: async ({ commit }: PollActionContext) => {
    const polls = await loadPolls();
    commit('setPolls', polls);
  },

  vote: (
    { commit, state }: PollActionContext,
    { choiceId, comment }: ChoiceVote
  ) => {
    const voteId = state.votes.length
      ? state.votes[state.votes.length - 1].id + 1
      : 1;
    const vote = new Vote(voteId, choiceId, comment);
    commit('vote', vote);
  }
};

export default actions;
