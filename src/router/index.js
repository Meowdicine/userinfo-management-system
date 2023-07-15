import Vue from 'vue'
import VueRouter from 'vue-router'

import Users from './../views/Index'
import NotFound from './../views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/users',
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
  },

  // Not Found Page
  {path: '/404', alias: '*', name: 'NotFound', component: NotFound},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
