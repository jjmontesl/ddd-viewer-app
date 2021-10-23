export default [
  {
    path: '/dddserver/params/',
    name: 'dddServerParams',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "dddServerParams" */ '@/dddserver/pages/Params.vue')
  }
]

