import { data } from '../api/projects'

export function configRouter (router) {

  router.on('/project/:id', {
    name: 'project',
    component: require('../display/sections/Project.vue')
  })

  router.redirect({
    '*': '/project/' + Object.keys(data)[0]
  })

  router.afterEach(function (transition) {
    // google analytics
    // ga('send', 'pageview');
  })

}
