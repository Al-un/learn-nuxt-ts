import IndexPage from '@/pages/index.vue';
import { CounterState } from '@/store/counter/types';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);
let mockStore: Store<CounterState>;
let wrapper: Wrapper<IndexPage>;

const increment = jest.fn();

describe('HomePage', () => {
  beforeEach(() => {
    mockStore = new Vuex.Store({
      modules: {
        counter: {
          actions: {
            increment
          },
          getters: {
            square: () => 5
          },
          namespaced: true,
          state: {
            count: 0
          }
        }
      }
    });

    wrapper = shallowMount(IndexPage, { store: mockStore, localVue });
  });

  test('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('is linked to counter state', () => {
    const count = wrapper.find('.count');
    expect(count.text()).toBe('0');
  });

  test('is linked to counter state getter', () => {
    const square = wrapper.find('.square');
    expect(square.text()).toBe(`(square: ${5})`);
  });

  test('increments when clicking button', () => {
    const btn = wrapper.find('button');
    btn.trigger('click');
    expect(increment).toHaveBeenCalled();
  })
});
