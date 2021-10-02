
export default [
  {
    path: '/maps/position/:name/:position(@[^\/]+)?',
    name: 'mapPosition',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "mapPlace" */ '@/components/map/MapPlace.vue')
  }
]

