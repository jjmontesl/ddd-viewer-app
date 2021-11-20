export default [
  {
    path: '*',
    component: () =>
      import(/* webpackChunkName: "notfound" */ '@/components/pages/NotFound.vue')
  }
]
