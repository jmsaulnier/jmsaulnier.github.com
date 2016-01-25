import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { configRouter as ConfigRouter } from './core/routes'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  history: false,
  saveScrollPosition: true
})

ConfigRouter(router)

const App = Vue.extend(require('./App.vue'))
router.start(App, '#app')

// just for debugging
window.router = router
