import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { configRouter as ConfigRouter } from './route-config'
require('es6-promise').polyfill()

Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  history: false,
  saveScrollPosition: true
})

ConfigRouter(router)
 
const App = Vue.extend(require('./App.vue'))
router.start(App, '#app')

document.body.style.backgroundColor = '#000';

// just for debugging
window.router = router