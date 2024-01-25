<template>
  <main>
    <CreateDeckForm @new-deck="createDeck" />

    <DeckList :decks="decks" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CreateDeckForm from '@/DeckBuilder/Infrastructure/Components/CreateDeckForm.vue'
import DeckList from '@/DeckBuilder/Infrastructure/Components/DeckList.vue'
import type { ListDecks } from '@/DeckBuilder/Application/UseCases/ListDecks'
import type { DeckResponse } from '@/DeckBuilder/Application/DTOs/ListDecksResponse'
import type { CreateNewDeck } from '@/DeckBuilder/Application/UseCases/CreateNewDeck'

export default defineComponent({
  components: { DeckList, CreateDeckForm },
  inject: [
    'createNewDeck',
    'listDecks'
  ],
  data() {
    return {
      decks: [] as DeckResponse[]
    }
  },
  methods: {
    createDeck(deckName: string) {
      const createNewDeck = this.createNewDeck as CreateNewDeck
      const listDecks = this.listDecks as ListDecks

      createNewDeck.create(deckName)
      this.decks = listDecks.list().decks
    }
  },
  created() {
    const listDecks = this.listDecks as ListDecks

    this.decks = listDecks.list().decks
  }
})
</script>
