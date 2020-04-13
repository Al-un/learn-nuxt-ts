import _ from 'lodash';

import { mock1 } from './__mocks__/state.mock';
import { mutations } from '@/store/polls/mutations';
import { PollsState } from '@/store/polls/types';
import { Poll, Vote } from '@/lib/polls/models';

let state: PollsState;

describe('Polls mutations', () => {
  beforeEach(() => {
    state = mock1();
  });

  describe('setPolls', () => {
    const newPolls: Poll[] = [{ id: 4, topic: 'topic', choices: [] }];

    test('works', () => {
      mutations.setPolls(state, newPolls);
      expect(state.polls).toEqual(newPolls);
    });
  });

  describe('vote', () => {
    // voting second choice of first poll
    const vote: Vote = { id: 5, choiceId: 2 };
    let prevState: PollsState;

    beforeEach(() => {
      prevState = _.cloneDeep(state);
      mutations.vote(state, vote);
    });

    test('adds the vote', () => {
      expect(state.votes).toEqual([...prevState.votes, vote]);
    });

    test('update choice', () => {
      const prevChoice = prevState.polls[0].choices[1];
      const choice = state.polls[0].choices[1];
      expect(choice.count).toBe(prevChoice.count + 1);
    });
  });
});
