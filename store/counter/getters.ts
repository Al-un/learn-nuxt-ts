import { GetterTree } from 'vuex';
import { CounterState } from './types';

const getters: GetterTree<CounterState, CounterState> = {
  square: (state): number => state.count * state.count
};

export default getters;
