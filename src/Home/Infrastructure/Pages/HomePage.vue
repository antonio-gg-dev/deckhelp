<template>
  <main>
    <CreateDeckForm @new-deck="createDeck" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CreateDeckForm from '@/Home/Infrastructure/Components/CreateDeckForm.vue'

export default defineComponent({
  components: { CreateDeckForm },
  inject: ['createNewDeck'],
  methods: {
    createDeck(deckName: string) {
      this.createNewDeck.create(deckName)
    }
  }
})
</script>
