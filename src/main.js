import Vue from 'vue'
import VueRouter from 'vue-router'
import { configRouter } from './route-config'
require('es6-promise').polyfill()

// install router
Vue.use(VueRouter)

// create router
const router = new VueRouter({
  history: false,
  saveScrollPosition: true
})

// configure router
configRouter(router)

// boostrap the app
const App = Vue.extend(require('./App.vue'))
router.start(App, 'body')

// just for debugging
window.router = router