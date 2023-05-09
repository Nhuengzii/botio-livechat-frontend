import { createRouter, createWebHistory } from 'vue-router'
import LivechatView from '../views/LivechatView.vue'
import ChatView from '../views/ChatView.vue'
import { useMessageStore } from '@/stores/messages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:platform',
      name: 'LivechatView',
      component: LivechatView,
      redirect: to => {
        return { path: `/${to.params.platform}/-1` }
      },
      children: [
        {
          path: '/:platform/:conversation_id/',
          name: 'Conver',
          component: ChatView,
          beforeEnter: (to, from, next) => {
            useMessageStore().fetchMessages(to.params.conversation_id);
            next()
          }
        }
      ]
    },
  ]
})

export default router
