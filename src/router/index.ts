import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/DeckBuilder/Infrastructure/Pages/HomePage.vue'
import DeckPage from '@/DeckBuilder/Infrastructure/Pages/DeckPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/decks/:index',
      component: DeckPage,
      props: true
    }
  ]
})

export default router
