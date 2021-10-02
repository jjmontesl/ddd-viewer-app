export default [
  {
    path: '/maps/place/:osmId',
    name: 'moreInfo',
    component: () =>
      import(/* webpackChunkName: "moreInfo" */ '@/components/ddd/SearchResultUnic.vue')
  }
]
