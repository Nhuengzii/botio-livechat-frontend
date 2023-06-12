import { createRouter, createWebHistory, } from 'vue-router'
import Livechat from '../views/Livechat.vue'
import Empty from '../views/Empty.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: () => Empty
    },
    {
      path: '/livechat',
      name: 'livechat',
      component: () => Livechat
    }
  ]
})

export default router
