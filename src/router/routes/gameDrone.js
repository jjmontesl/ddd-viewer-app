export default [
  {
    path: '/game/drone/',
    name: 'gameDrone',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "gameDrone" */ '@/components/game/drone/DroneGame.vue')
  }
]

