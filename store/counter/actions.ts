import { ActionContext, ActionTree } from 'vuex/types';
import { RootState } from './types';

const actions: ActionTree<RootState, RootState> = {
  increment: ({ commit }: ActionContext<RootState, RootState>) => {
    commit('increment');
  }
};

export default actions;
