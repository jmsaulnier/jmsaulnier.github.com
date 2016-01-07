export function configRouter (router) {

    router.map({
        '/': {
            component: require('./display/sections/Index.vue')
        },

        '/work/:id': {
            component: require('./display/sections/Work.vue')
        },

        '*': {
            component: require('./display/sections/Index.vue')
        }
    })
}