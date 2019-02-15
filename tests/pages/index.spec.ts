import Index from '@/pages/index.vue';
import { mount } from '@vue/test-utils';

describe('HomePage', () => {
  it('is a Vue component', () => {
    const wrapper = mount(Index);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
