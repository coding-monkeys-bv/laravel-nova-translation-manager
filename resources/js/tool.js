Nova.booting((Vue, router, store) => {

    Vue.config.devtools = true

    router.addRoutes([
        {
            name: 'nova-translation-manager',
            path: '/nova-translation-manager',
            component: require('./components/Tool'),
        },
    ])
})
