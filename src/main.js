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
import ViewHero from './pages/ViewHero.vue'
import ListHeroes from './pages/ListHeroes.vue'
const routes = [
  { path: '/ViewHero/:id', component: ViewHero },
  { path: '/ListHeroes', component: ListHeroes }
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router
})
