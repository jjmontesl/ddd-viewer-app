export default [
  {
    path: '/home',
    name: 'landing',
    meta: {
      //requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "home" */ '@/components/pages/Home.vue')
  }
]
