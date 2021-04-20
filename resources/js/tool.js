Nova.booting((Vue, router, store) => {
  Vue.config.devtools = true
  router.addRoutes([
    {
      name: 'laravel-nova-translations-manager',
      path: '/laravel-nova-translations-manager',
      component: require('./components/Tool'),
    },
  ])
})
