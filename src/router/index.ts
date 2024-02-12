import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/scene-list',
      name: 'scene-list',
      component: () => import('@/views/SceneSelectorView.vue')
    },
    {
      path: '/scene',
      name: 'scene',
      component: () => import('@/views/SceneView.vue')
    }
  ]
})

export default router
