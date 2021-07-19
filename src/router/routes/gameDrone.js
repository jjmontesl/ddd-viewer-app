export default [
  {
    path: '/game/drone/',
    name: 'gameDrone',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "gameFly" */ '@/components/game/drone/DroneGame.vue')
  }
]

