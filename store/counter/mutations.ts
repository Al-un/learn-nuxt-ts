import { MutationTree } from 'vuex';
import { RootState } from './types';

const mutations: MutationTree<RootState> = {
  increment: (state) => {
    state.count++;
  }
};

export default mutations;
