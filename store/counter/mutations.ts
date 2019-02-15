import { MutationTree } from 'vuex';
import { CounterState } from './types';

const mutations: MutationTree<CounterState> = {
  increment: (state) => {
    state.count++;
  }
};

export default mutations;
