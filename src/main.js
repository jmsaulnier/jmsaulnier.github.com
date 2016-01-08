import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { configRouter } from './route-config'
require('es6-promise').polyfill()

Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  history: false,
  saveScrollPosition: true
})

configRouter(router)
 
const App = Vue.extend(require('./App.vue'))
router.start(App, 'body')

// just for debugging
window.router = router