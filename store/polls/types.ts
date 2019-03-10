import { Poll, Vote } from '@/lib/polls/models';

export interface PollsState {
  polls: Poll[];
  votes: Vote[];
}

