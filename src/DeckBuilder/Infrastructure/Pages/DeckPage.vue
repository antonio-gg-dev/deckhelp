<template>
  <main>
    {{ deck }}
  </main>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { GetDeckByIndex } from '@/DeckBuilder/Application/UseCases/GetDeckByIndex'
import type { DeckResponse } from '@/DeckBuilder/Application/DTOs/GetDeckByIndexResponse'

export default defineComponent({
  inject: ['getDeckByIndex'],
  props: {
    index: {
      required: true,
      type: String as PropType<string>
    }
  },
  data() {
    return {
      deck: null as DeckResponse | null
    }
  },
  created() {
    const getDeckByIndex = this.getDeckByIndex as GetDeckByIndex
    const response = getDeckByIndex.byIndex(Number(this.index))

    if (response.error !== undefined) {
      alert(response.error)
      return
    }

    this.deck = response
  }
})
</script>
