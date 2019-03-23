import { Choice, Poll } from './models';

const pollId = 39;
const choiceId = 42;

describe('Choice', () => {
  let choice: Choice;

  beforeEach(() => {
    choice = new Choice(choiceId, pollId, 'some text');
  });

  test('initializes with zero count', () => {
    expect(choice.count).toBe(0);
  });
});

describe('Poll', () => {
  let poll: Poll;

  describe('when no choice is provided', () => {
    beforeEach(() => {
      poll = new Poll(pollId, 'some text');
    });

    test('poll is initialized with an empty array chocies', () => {
      expect(poll.choices).toEqual([]);
    });
  });

  describe('when choices are provided', () => {
    let choice: Choice;

    beforeEach(() => {
      choice = new Choice(choiceId, pollId, 'some text');
      poll = new Poll(pollId, 'some text', [choice]);
    });

    test('poll is initialized given chocies', () => {
      expect(poll.choices).toEqual([choice]);
    });
  });
});
