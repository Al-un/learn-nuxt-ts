import TypescriptClass from '@/components/TypescriptClass.vue';
import { mount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<TypescriptClass>;

describe('Logo', () => {
  beforeEach(() => {
    wrapper = mount(TypescriptClass);
  });

  test('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders 42+2=44 from SomeClass', () => {
      const val = wrapper.find('.some-class');
      expect(val.text()).toBe('44');
  })

  test('renders "moar text" from AnotherClass', () => {
      const txt = wrapper.find('.another-class');
      expect(txt.text()).toBe('moar text');
  })
});
