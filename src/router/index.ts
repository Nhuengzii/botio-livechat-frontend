import { createRouter, createWebHistory, } from 'vue-router'
import LivechatView from '../views/LivechatView.vue'
import ChatView from '../views/ChatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'root',
      path: '/',
      redirect: '/fb/'
    },
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
          name: 'Conversations',
        },
        {
          path: ':conversation_id/',
          name: 'Conver',
          component: ChatView,
          beforeEnter: (to, from) => {
            return true
          }
        }
      ]
    },
  ]
})

export default router
