import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/index.vue'),
    meta: {
      roes: ['user', 'admin']
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => { return import('../views/login.vue')}
  },
  {
    path: '/baseInfo',
    name: 'BaseInfo',
    component: () => import('../views/baseInfo.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '/404',
    component: () => import('../views/404.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
