export function configRouter (router) {

    // normal routes
    router.map({
        // basic example
        '/': {
            component: require('./display/sections/Index.vue')
        },

        '/work/:id': {
            component: require('./display/sections/Work.vue')
        },

        // not found handler
        '*': {
            component: require('./display/sections/Index.vue')
        }
    })
}