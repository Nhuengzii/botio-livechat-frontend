import { createRouter, createWebHistory, } from 'vue-router'
import LivechatView from '../views/LivechatView.vue'
import ChatView from '../views/ChatView.vue'
// import { useMessageStore } from '@/stores/messages'
import { useConversationStore } from '@/stores/conversation'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:platform',
      name: 'LivechatView',
      component: LivechatView,
      children: [
        {
          path: '',
          redirect(to) {
            return `/${to.params.platform}/-1`
          },
        },
        {
          path: ':conversation_id/',
          name: 'Conver',
          component: ChatView,
          beforeEnter: (to, from) => {
            // useMessageStore().fetchMessages(to.params.conversation_id);
            // useConversationStore().fetchConversations();
            return true
          }
        }
      ]
    },
  ]
})

export default router
