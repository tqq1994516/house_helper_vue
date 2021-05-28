import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/index.vue'),
    me
  },
  {
    path: '/login/',
    name: 'Login',
    component: () => import('../views/login_register.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '/404',
    component: () => import('../views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
