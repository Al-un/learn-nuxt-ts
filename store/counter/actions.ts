import { ActionContext, ActionTree } from 'vuex/types';
import { CounterState, RootState } from './types';

const actions: ActionTree<CounterState, RootState> = {
  increment: ({ commit }: ActionContext<CounterState, RootState>) => {
    commit('increment');
  }
};

export default actions;
