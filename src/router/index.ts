import { createRouter, createWebHistory, } from 'vue-router'
import Livechat from '../views/Livechat.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: () => Livechat
    }
  ]
})

export default router
