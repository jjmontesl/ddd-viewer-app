export default [
  {
    path: '/maps/search/:query/:position(@[^\/]+)?',
    name: 'search',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "searchResults" */ '@/components/ddd/SearchResults.vue')
  }
]

