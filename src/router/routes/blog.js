export default [
  {
    path: '/blog',
    name: 'blog',
    meta: {
      //requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "blog" */ '@/components/pages/Blog.vue')
  }
]
