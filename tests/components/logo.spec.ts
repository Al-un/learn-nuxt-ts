import Logo from '@/components/logo.vue';
import { mount } from '@vue/test-utils';

describe('Logo', () => {
  it('is a Vue component', () => {
    const wrapper = mount(Logo);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
