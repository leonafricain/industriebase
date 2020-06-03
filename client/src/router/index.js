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
    component: () => import('../views/Agenda.vue'),
    meta:{
      requireAuth: true
    }
  },
  {
    path: '/structure',
    name: 'structure',
    component: () => import('../views/Structure.vue'),
    meta:{
      requireAuth: false
    }
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
    meta:{
      requireAuth: true
    }
    
  },
  {
    path:'/dashboard/:pdfId/',
    name:'pdfshow',
    props: true,
    component: () => import ('../views/PdfShow'),
    meta:{
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
    if(to.matched.some(route => route.meta.requireAuth)) {
      if(store.state.authModule.isUserLoggedIn) {
        next()
      } else {
        next({path: '/'})
      }
    } else {
      next()
    }
})
export default router
