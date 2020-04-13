/**
 * A vote for a given choice
 */
export class Vote {
  // eslint-disable-next-line no-useless-constructor
  public constructor(
    public id: number,
    public choiceId: number,
    public comment?: string
  ) {}
}

/**
 * A choice to vote for within a Poll
 */
export class Choice {
  public count: number;

  public constructor(
    public id: number,
    public pollId: number,
    public text: string
  ) {
    this.count = 0;
  }
}

/**
 * A topic with which user is offered multiple choices to vote for
 */
export class Poll {
  public choices: Choice[];

  public constructor(
    public id: number,
    public topic: string,
    choices?: Choice[]
  ) {
    this.choices = choices !== undefined ? choices : [];
  }
}

/**
 * An intention of voting a given choice with an optional comment
 */
export interface ChoiceVote {
  choiceId: number;
  comment?: string;
}
