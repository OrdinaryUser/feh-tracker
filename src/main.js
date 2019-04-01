// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import {firestorePlugin} from 'vuefire'
Vue.use(firestorePlugin)

Vue.config.productionTip = false

import App from './App'

// Routing
import routes from './routes'

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router,
})
