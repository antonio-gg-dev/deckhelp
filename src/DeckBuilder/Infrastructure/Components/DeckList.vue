<template>
  <DeckListItem
    v-for="(deck, index) in decks"
    :key="index"
    :deck="deck"
  />
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { DeckResponse } from '@/DeckBuilder/Application/DTOs/ListDecksResponse'
import DeckListItem from '@/DeckBuilder/Infrastructure/Components/DeckListItem.vue'

export default defineComponent({
  components: { DeckListItem },
  props: {
    decks: {
      required: true,
      type: Array as PropType<DeckResponse[]>
    }
  }
})
</script>
