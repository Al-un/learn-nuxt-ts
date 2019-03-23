import { loadPolls } from './api';

describe('Polls API', () => {
  describe('loadPolls', () => {
    test('works', async () => {
      const polls = await loadPolls();
      expect(polls).toBeInstanceOf(Array);
    });
  });
});
