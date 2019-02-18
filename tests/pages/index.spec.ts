import IndexPage from '@/pages/index.vue';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<IndexPage>;

describe('HomePage', () => {
  beforeEach(() => {
    wrapper = shallowMount(IndexPage);
  });

  test('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
