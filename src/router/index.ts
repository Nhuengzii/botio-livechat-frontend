import { createRouter, createWebHistory, } from 'vue-router'
import Livechat from '../views/Livechat.vue'
import Empty from '../views/Empty.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/start'
    },
    {
      path: '/start',
      name: 'start',
      component: () => Empty
    },
    {
      path: '/ordermars',
      name: 'ordermars',
      component: () => Empty
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: () => Empty
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => Empty
    },
    {
      path: '/customize',
      name: 'customize',
      component: () => Empty
    },
    {
      path: '/livechat',
      name: 'livechat',
      component: () => Livechat
    },
  ]
})

export default router
