import Vue from 'vue'
import Router from 'vue-router'
import Default from './views/Default.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Cats from './views/Cats.vue'
import NewCat from './views/NewCat.vue'
import User from './views/User.vue'
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
      }, {
        path:"newcat",
        components: {
          default: Default,
          content: NewCat
        }
      }, {
        path:"cats",
        components: {
          default: Default,
          content: Cats
        }
      }, {
        path:"user",
        components: {
          default: Default,
          content: User
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
