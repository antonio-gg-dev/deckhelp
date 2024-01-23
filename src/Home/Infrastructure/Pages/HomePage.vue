<template>
  <main>
    <CreateDeckForm @new-deck="createDeck" />

    <DeckList :decks="decks" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CreateDeckForm from '@/Home/Infrastructure/Components/CreateDeckForm.vue'
import DeckList from '@/Home/Infrastructure/Components/DeckList.vue'

export default defineComponent({
  components: { DeckList, CreateDeckForm },
  inject: ['createNewDeck', 'listDecks'],
  data() {
    return {
      decks: []
    }
  },
  methods: {
    createDeck(deckName: string) {
      this.createNewDeck?.create(deckName)
      this.decks = this.listDecks?.list()
    }
  },
  created() {
    this.decks = this.listDecks?.list()
  }
})
</script>
