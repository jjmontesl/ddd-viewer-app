export default [
  {
    path: '/dddserver/tasks/',
    name: 'dddServerTasks',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "dddServerTasks" */ '@/dddserver/pages/Tasks.vue')
  }
]

