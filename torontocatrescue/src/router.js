import Vue from 'vue'
import Router from 'vue-router'
import Default from './views/Default.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      components: {
        default: Default,
        content: Home
      },
      children: [{
        path:"",
        components: {
          default: Default,
          content: Home
        }
      }, {
        path:"about",
        components: {
          default: Default,
          content: About
        }
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})
