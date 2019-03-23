import { shallowMount, Wrapper } from '@vue/test-utils';

import PollDetail from './PollDetail.vue';
import PollList from './PollList.vue';
import { DUMMY_POLLS, DUMMY_VOTES } from '@/lib/polls/__mocks__/api';

// Component config
let wrapper: Wrapper<PollList>;
const propsData = { polls: DUMMY_POLLS, votes: DUMMY_VOTES };

describe('PollList', () => {
  beforeEach(() => {
    wrapper = shallowMount(PollList, { propsData });
  });

  test('renders all Polls', () => {
    const pollsWrapper = wrapper.findAll(PollDetail);
    expect(pollsWrapper.length).toBe(DUMMY_POLLS.length);
  });

  test('renders all Votes', () => {
    const votesWrapper = wrapper.findAll('.poll__vote');
    expect(votesWrapper.length).toBe(DUMMY_VOTES.length);
  });
});
