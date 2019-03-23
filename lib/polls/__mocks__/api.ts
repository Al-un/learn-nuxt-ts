import { Poll, Vote } from '../models';

/**
 * Dummy polls
 */
export const DUMMY_POLLS: Poll[] = [
  {
    id: 1,
    topic: 'Poll1',
    choices: [
      { id: 1, count: 0, pollId: 1, text: 'Choice1' },
      { id: 2, count: 0, pollId: 1, text: 'Choice2' }
    ]
  },
  {
    id: 2,
    topic: 'Poll2',
    choices: [
      { id: 3, count: 0, pollId: 2, text: 'Choice3' },
      { id: 4, count: 0, pollId: 2, text: 'Choice4' }
    ]
  }
];

export const DUMMY_VOTES: Vote[] = [
  { id: 1, choiceId: 1 },
  { id: 2, choiceId: 3, comment: 'comment' }
];

/**
 * Load polls with associated choices. Votes are not loaded here.
 *
 * It uses a timeout to simulate server response time
 */
export const loadPolls = jest.fn().mockImplementation(
  (): Promise<Poll[]> => {
    return new Promise<Poll[]>(resolve => resolve(DUMMY_POLLS));
  }
);
