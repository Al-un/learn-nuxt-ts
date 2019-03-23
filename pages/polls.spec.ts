import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

import Polls from './polls.vue';
import PollList from '@/components/polls/PollList.vue';
import { RootState } from '@/store/types';
import { mock1 } from '@/store/polls/__mocks__/state.mock';

// Vue config
const localVue = createLocalVue();
localVue.use(Vuex);

// Vuex config
let store: Store<RootState>;

// Component config
let wrapper: Wrapper<Polls>;
const loadPolls: jest.Mock = jest.fn();

describe('PollList', () => {
  beforeEach(() => {
    loadPolls.mockReset();
    store = new Vuex.Store({
      modules: {
        polls: {
          namespaced: true,
          actions: { load: loadPolls },
          state: mock1()
        }
      }
    });

    wrapper = shallowMount(Polls, { localVue, store });
  });

  test('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders a PollList', () => {
    const pollList = wrapper.find(PollList);
    expect(pollList.exists()).toBeTruthy();
  });

  test('call "loadPolls"', () => {
    expect(loadPolls).toHaveBeenCalledTimes(1);
  });
});
