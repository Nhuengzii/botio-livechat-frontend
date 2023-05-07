import { createRouter, createWebHistory } from 'vue-router'
import LivechatView from '../views/LivechatView.vue'
import ChatView from '../views/ChatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:platform',
      name: 'LivechatView',
      component: LivechatView,
      children: [
        {
          path: '/:platform/:conversation_id/',
          name: 'Conver',
          component: ChatView
        }
      ]
    },
  ]
})

export default router
