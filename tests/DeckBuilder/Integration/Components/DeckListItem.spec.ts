import { it, expect, beforeEach } from 'vitest'
import { createRouter, createWebHistory, type Router } from 'vue-router'
import { render, fireEvent, type RenderResult } from '@testing-library/vue'
import DeckListItem from '@/DeckBuilder/Infrastructure/Components/DeckListItem.vue'
import type { DeckResponse } from '@/DeckBuilder/Application/DTOs/ListDecksResponse'
import DummyComponent from '@@/Shared/Integration/Fixtures/DummyComponent.vue'

let router: Router
let component: RenderResult
let link: HTMLElement

beforeEach(async () => {
  const deck: DeckResponse = {
    name: 'Deck Name',
    index: 3
  }

  router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/decks/:index',
        component: DummyComponent
      }
    ]
  })
  component = render(DeckListItem, {
    props: { deck },
    global: {
      plugins: [router]
    }
  })
  link = component.getByTestId('link')
})

it('navigates on link click', async () => {
  await fireEvent.click(link)
  await router.isReady()

  expect(router.currentRoute.value.fullPath).toBe(`/decks/3`)
})
