export default [
  {
    path: '/3d/layers/create/',
    name: 'sceneLayersCreate',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "sceneLayersCreate" */ '@/components/scene/SceneLayersCreate.vue')
  }
]
