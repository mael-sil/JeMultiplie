import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/home.vue'
import game from '@/pages/game.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/game', component: game },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
