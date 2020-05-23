import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import  store from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/agenda',
    name: 'agenda',
    component: () => import('../views/Agenda.vue')
  },
  {
    path: '/structure',
    name: 'structure',
    component: () => import('../views/Structure.vue')
  },
  {
    path:'/jour',
    name: 'jour',
    component: () => import ('../views/Jour.vue')
  },
  {
    path:'/login',
    name: 'login',
    component: () => import ('../views/Login.vue')
  },
  {
    path:'/register',
    name: 'register',
    component: () => import ('../views/Register.vue')
  },
  {
    path:'/dashboard',
    name: 'dashboard',
    component: () => import ('../views/Dashboard.vue'),
    
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !store.state.authModule.isUserLoggedIn) next({ name: 'login' })
  else next()
})
export default router
