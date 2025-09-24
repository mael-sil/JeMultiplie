import './assets/main.css'

import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from '@/router/index'
import VueApexCharts from 'vue3-apexcharts'

import { faMoon, faCalculator, faSun, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { createPinia } from 'pinia'

library.add(faMoon)
library.add(faCalculator)
library.add(faSun)
library.add(faBars)
library.add(faXmark)

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(VueApexCharts)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia)

app.mount('#app')
