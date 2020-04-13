import { mock1 } from './__mocks__/state.mock';
import { actions } from '@/store/polls/actions';
import { PollsState, PollActionContext } from '@/store/polls/types';
import * as api from '@/lib/polls/api';
import { Vote } from '@/lib/polls/models';

let actionCxt: PollActionContext;
let commit: jest.Mock;
let state: PollsState;

jest.mock('@/lib/polls/api.ts');

describe('Polls actions', () => {
  beforeEach(() => {
    commit = jest.fn();
    state = mock1();

    actionCxt = {
      state,
      commit,
      dispatch: jest.fn(),
      getters: jest.fn(),
      rootGetters: jest.fn(),
      rootState: {}
    };
  });

  describe('load', () => {
    beforeEach(async () => {
      await actions.load(actionCxt);
    });

    test('call api.loadPolls', () => {
      expect(api.loadPolls).toHaveBeenCalledTimes(1);
    });

    test('commits "setPolls" with polls from api call', async () => {
      expect(commit).toHaveBeenCalledTimes(1);

      const commitCall = commit.mock.calls[0];
      const polls = await api.loadPolls();
      expect(commitCall[1]).toEqual(polls);
    });
  });

  describe('vote', () => {
    const choiceId = 0;

    test('commits "vote"', () => {
      actions.vote(actionCxt, { choiceId });
      expect(commit).toHaveBeenCalledTimes(1);

      const vote: Vote = commit.mock.calls[0][1];
      expect(vote.choiceId).toBe(choiceId);
    });

    describe('when there is no vote', () => {
      beforeEach(() => {
        state.votes = [];
        actions.vote(actionCxt, { choiceId });
      });

      test('vote ID is 1', () => {
        const vote: Vote = commit.mock.calls[0][1];
        expect(vote.id).toBe(1);
      });
    });

    describe('when there is some votes', () => {
      beforeEach(() => {
        state.votes = [{ id: 1, choiceId: 1 }];
        actions.vote(actionCxt, { choiceId });
      });

      test('vote ID is increment from votes length', () => {
        const vote: Vote = commit.mock.calls[0][1];
        expect(vote.id).toBe(2);
      });
    });
  });
});
