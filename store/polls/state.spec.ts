import { initState } from '@/store/polls/state';

describe('Polls state', () => {
  describe('initState', () => {
    test('works', () => {
      const state = initState();
      expect(state.polls).toEqual([]);
      expect(state.votes).toEqual([]);
    });
  });
});
