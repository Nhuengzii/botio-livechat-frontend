import { createRouter, createWebHistory, } from 'vue-router'
import LivechatView from '../views/LivechatView.vue'
import ChatView from '../views/ChatView.vue'
import EmptyView from '../views/Empty.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'root',
      path: '/',
      redirect: '/livechat/facebook'
    },

    {
      path: '/Start',
      component: EmptyView,
    },
    {
      path: '/Services',
      component: EmptyView,
    },
    {
      path: '/Order',
      component: EmptyView,
    },
    {
      path: '/Customer',
      component: EmptyView,
    },
    {
      path: '/Modify',
      component: EmptyView,
    },
    {
      path: '/Setting',
      component: EmptyView,
    },
    {
      path: '/Help',
      component: EmptyView,
    },
    {
      path: '/Stock',
      component: EmptyView,
    },
    {
      path: '/Logout',
      component: EmptyView,
    },
    {
      path: '/livechat/:platform',
      name: 'LivechatView',
      component: LivechatView,
      children: [
        {
          path: '',
          redirect(to) {
            return `/livechat/${to.params.platform}/-1`
          },
          name: 'Conversations',
        },
        {
          path: ':conversation_id/',
          name: 'Conver',
          component: ChatView,
          beforeEnter: (to, from) => {
            return true
          },
        }
      ]
    },
  ]

})

export default router
