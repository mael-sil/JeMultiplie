import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/home.vue'
import game from '@/pages/game.vue'
import stats from '@/pages/stats.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/game', component: game },
  { path: '/stats', component: stats },
]

const router = createRouter({
  history: createWebHashHistory('/JeMultiplie/'),
  routes,
})

export default router
