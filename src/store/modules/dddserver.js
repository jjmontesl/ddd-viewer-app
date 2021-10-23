import * as types from '@/store/mutation-types'

export default {

  state: {
    tasks: [],
    data: [],
  },

  getters: {
    getTasks: (state) => state.tasks,
    getData: (state) => state.data,
  },

  mutations: {
    [types.TASKS_SET](state, tasks) {
      console.debug("Mutating tasks");
      state.tasks = tasks;
    },
    [types.DATA_SET](state, data) {
      console.debug("Mutating pipeline data");
      console.debug(data)
      state.data = data;
    }
  },

  actions: {

    setStatus(context, status) {
      console.debug("Action: setStatus", status);
      context.commit(types.DATA_SET, status.data);
      context.commit(types.TASKS_SET, status.tasks);
    },

  },

}
