import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import ShowDetail from '@/views/ShowDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView,
    },
    {
      path: '/show/:id',
      name: 'ShowDetail',
      component: ShowDetail,
      props: (route) => ({ id: Number(route.params.id) }),
    },
    
  ],
})

export default router
