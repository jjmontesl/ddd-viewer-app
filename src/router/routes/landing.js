export default [
  {
    path: '/home',
    name: 'landing',
    meta: {
      //requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/components/home/Home.vue')
  }
]
