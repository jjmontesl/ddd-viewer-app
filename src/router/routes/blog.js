export default [
  {
    path: '/blog',
    name: 'blog',
    meta: {
      //requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/components/Blog.vue')
  }
]
