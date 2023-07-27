import { createRouter, createWebHistory, } from 'vue-router'
import Livechat from '../views/Livechat.vue'
import Root from '../views/Root.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: Root
    },
    {
      path: '/livechat',
      name: 'livechat',
      component: Livechat,
    },
  ]
})

export default router
