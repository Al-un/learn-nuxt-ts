import { PollsMutations } from './types';

export const mutations: PollsMutations = {
  setPolls: (state, polls) => {
    state.polls = polls;
  },

  vote: (state, vote) => {
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
