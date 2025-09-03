import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import GamePage from '@/pages/GamePage.vue'
import StatsPage from '@/pages/StatsPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/game', component: GamePage },
  { path: '/stats', component: StatsPage },
]

const router = createRouter({
  history: createWebHashHistory('/JeMultiplie/'),
  routes,
})

export default router
