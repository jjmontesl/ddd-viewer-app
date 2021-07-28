export default [
  {
    path: '/3d/layers/',
    name: 'sceneLayers',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "sceneLayers" */ '@/components/scene/SceneLayers.vue')
  }
]

