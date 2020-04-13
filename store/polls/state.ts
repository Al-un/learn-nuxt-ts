import { PollsState } from './types';

/**
 * Poll state initialiser
 */
export const initState = (): PollsState => ({
  polls: [],
  votes: []
});

export default initState;
