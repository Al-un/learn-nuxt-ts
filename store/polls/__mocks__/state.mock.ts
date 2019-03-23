import { Poll, Vote } from '@/lib/polls/models';
import { PollsState } from '@/store/polls/types';

/**
 * Mock1 polls list
 */
export const MOCK1_POLLS: Poll[] = [
  {
    id: 1,
    topic: 'topic1',
    choices: [
      { id: 1, pollId: 1, count: 1, text: 'choice1' },
      { id: 2, pollId: 1, count: 0, text: 'choice2' }
    ]
  },
  {
    id: 2,
    topic: 'topic2',
    choices: [
      { id: 3, pollId: 2, count: 0, text: 'choice3' },
      { id: 4, pollId: 2, count: 2, text: 'choice4' }
    ]
  }
];

/**
 * Mock1 votes list
 */
export const MOCK1_VOTES: Vote[] = [
  { id: 1, choiceId: 1, comment: 'some comment' },
  { id: 2, choiceId: 4 },
  { id: 2, choiceId: 4 }
];

/**
 * Mock1 polls factory
 * @see MOCK1_POLLS
 */
export const mock1Polls = (): Poll[] => MOCK1_POLLS;

/**
 * Mock1 votes factory
 * @see MOCK1_VOTES
 */
export const mock1Votes = (): Vote[] => MOCK1_VOTES;

/**
 * Mock1 factory
 */
export const mock1 = (): PollsState => ({
  polls: mock1Polls(),
  votes: mock1Votes()
});
