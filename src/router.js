import { createWebHistory, createRouter } from 'vue-router'

import AppHomepage from './pages/AppHomepage.vue'
import AppCarrello from './pages/AppCarrello.vue'




const routes = [
  { path: '/', name:'home', component: AppHomepage },
  { path: '/carrello', name: 'carrello', component: AppCarrello},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router