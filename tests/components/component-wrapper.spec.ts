import ComponentWrapper from '@/components/ComponentWrapper.vue';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<ComponentWrapper>;

describe('ComponentWrapper', () => {
  describe('with a default title', () => {
    beforeEach(() => {
      wrapper = shallowMount(ComponentWrapper);
    });

    test('is a Vue component', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('display "no title" as default title', () => {
      const componentTitle = wrapper.find('h2');
      expect(componentTitle.text()).toBe('no title');
    });

    test('renders a section tag', () => {
      const section = wrapper.find('section');
      expect(section).toBeDefined();
    });
  });

  describe('with a given title', () => {
    test('displays the given title', () => {
      const title = 'Given title';
      wrapper = shallowMount(ComponentWrapper, { propsData: { title } });
      const componentTitle = wrapper.find('h2');

      expect(componentTitle.text()).toBe(title);
    });
  });
});
