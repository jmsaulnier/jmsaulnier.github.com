export function configRouter (router) {

    router.map({
        '/': {
            component: require('./display/sections/Index.vue')
        },

        '/projects/:id': {
            component: require('./display/sections/Project.vue')
        },

        '*': {
            component: require('./display/sections/Index.vue')
        }
    })
}