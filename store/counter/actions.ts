import { ActionContext, ActionTree } from 'vuex/types';

import { RootState } from '../type';
import { CounterState } from './types';

/**
 * Action context specific to counter module
 */
interface CounterActionContext extends ActionContext<CounterState, RootState>{}

/**
 * Counter actions
 */
export const actions: ActionTree<CounterState, RootState> = {
  increment: ({ commit }: CounterActionContext) => {
    commit('increment');
  }
};

export default actions;
