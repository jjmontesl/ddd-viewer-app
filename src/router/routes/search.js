export default [
  {
    path: '/maps/search/:query',
    name: 'search',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "searchResults" */ '@/components/ddd/SearchResults.vue')
  }
]

