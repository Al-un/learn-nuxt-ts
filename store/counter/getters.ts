import { GetterTree } from 'vuex';

import { RootState } from '../type';
import { CounterState } from './types';

/**
 * Counter getters
 */
export const getters: GetterTree<CounterState, RootState> = {
  square: (state): number => state.count * state.count
};

export default getters;
