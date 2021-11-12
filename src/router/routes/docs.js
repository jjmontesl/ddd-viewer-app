export default [
    {
        path: '/docs',
        name: 'docs',
        meta: {
        //requiresAuth: true
        },
        component: () =>
            import(/* webpackChunkName: "doc" */ '@/components/pages/Docs.vue')
    }
]
