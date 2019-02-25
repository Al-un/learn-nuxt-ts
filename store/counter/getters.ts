import { GetterTree } from 'vuex';
import { RootState } from './types';

const getters: GetterTree<RootState, RootState> = {
  square: (state): number => state.count * state.count
};

export default getters;
