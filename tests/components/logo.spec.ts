import Logo from '@/components/logo.vue';
import { mount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<Logo>;

describe('Logo', () => {
  beforeEach(() => {
    wrapper = mount(Logo);
  });

  it('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
