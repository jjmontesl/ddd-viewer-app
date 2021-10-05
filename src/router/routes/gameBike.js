export default [
  {
    path: '/game/bike/',
    name: 'gameBike',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "gameBike" */ '@/components/game/bike/BikeGame.vue')
  }
]

