/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D models
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/

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

