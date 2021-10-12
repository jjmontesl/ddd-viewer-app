import * as types from '@/store/mutation-types'

export default {

  state: {
    tasks: [],
  },

  getters: {
    getTasks: (state) => state.tasks,
  },

  mutations: {
    [types.TASKS_SET](state, tasks) {
      console.debug("Mutating tasks");
      state.tasks = tasks
    }
  },

  actions: {

    setTasks(context, payload) {
      console.debug("Action: setTasks");
      context.commit(types.TASKS_SET, payload.tasks);

    },

  },

}
