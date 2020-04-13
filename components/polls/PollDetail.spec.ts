import Vue from 'vue';
import { shallowMount, Wrapper, WrapperArray } from '@vue/test-utils';

import PollDetail from './PollDetail.vue';
import { DUMMY_POLLS } from '@/lib/polls/__mocks__/api';
import { Poll } from '@/lib/polls/models';

// Component config
let wrapper: Wrapper<PollDetail>;
let mockedVote: jest.Mock;
const poll: Poll = DUMMY_POLLS[0];

describe('PollDetail', () => {
  describe('initializing', () => {
    mockedVote = jest.fn();

    beforeEach(() => {
      wrapper = shallowMount(PollDetail, {
        propsData: { poll },
        methods: { vote: mockedVote }
      });
    });

    test('has no selected choice', () => {
      expect(wrapper.vm.$data.selectedChoiceId).toBe(-1);
    });
  });

  describe('Choices', () => {
    let choicesWrapper: WrapperArray<Vue>;
    let choices: Wrapper<Vue>[];
    beforeEach(() => {
      choicesWrapper = wrapper.findAll('.poll__choice--container');
      choices = choicesWrapper.wrappers;
    });

    test('are properly rendered', () => {
      expect(choicesWrapper.length).toBe(poll.choices.length);

      choices.forEach((choiceWrapper, index) => {
        const choiceBox = choiceWrapper.find('.poll__choice--box');
        const choiceText = choiceBox.findAll('span').wrappers[0].text();
        const countText = choiceBox.findAll('span').wrappers[1].text();
        expect(choiceText).toContain(poll.choices[index].text);
        expect(countText).toContain(poll.choices[index].count);
      });
    });

    test('clicking on a choice selects it', () => {
      choices.forEach((choiceWrapper, index) => {
        choiceWrapper.trigger('click');
        const choiceId = poll.choices[index].id;
        expect(wrapper.vm.$data.selectedChoiceId).toBe(choiceId);
      });
    });
  });

  describe('when no choice is selected', () => {
    test('voting form is not rendered', () => {
      wrapper.setData({ selectedChoiceId: -1 });

      const pollVote = wrapper.find('.poll__vote');
      expect(pollVote.exists()).toBeFalsy();
    });
  });

  describe('when a choice a selected', () => {
    const selectedChoiceId = poll.choices[1].id;
    test('is visible when a choice is selected', () => {
      wrapper.setData({ selectedChoiceId });

      const pollVote = wrapper.find('.poll__vote');
      expect(pollVote.exists()).toBeTruthy();
    });

    describe('voting', () => {
      test('is called when clicking vote button', () => {
        const voteBtn = wrapper.find('.poll__vote > button');
        voteBtn.trigger('click');
        expect(mockedVote).toHaveBeenCalledTimes(1);
        expect(mockedVote).toHaveBeenCalledWith({
          choiceId: selectedChoiceId,
          comment: undefined
        });
      });
    });
  });
});
