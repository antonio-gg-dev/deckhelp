<template>
  <RouterLink
    :to="`/decks/${deck.index}`"
    data-testid="link"
  >
    {{ deck }}
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { DeckResponse } from '@/DeckBuilder/Application/DTOs/ListDecksResponse'

export default defineComponent({
  props: {
    deck: {
      required: true,
      type: Object as PropType<DeckResponse>
    }
  }
})
</script>
