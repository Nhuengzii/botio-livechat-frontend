import { createRouter, createWebHistory, } from 'vue-router'
import Livechat from '../views/Livechat.vue'
import Empty from '../views/Empty.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/Start'
    },
    {
      path: '/Start',
      name: 'Start',
      component: () => Empty
    },
    {
      path: '/Services',
      name: 'Services',
      component: () => Empty
    },
    {
      path: '/Stock',
      name: 'Stock',
      component: () => Empty
    },
    {
      path: '/Order',
      name: 'Order',
      component: () => Empty
    },
    {
      path: '/Modify',
      name: 'Modify',
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
