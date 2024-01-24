<template>
  <main>
    {{ deck }}
  </main>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

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
      deck: null
    }
  },
  created() {
    this.deck = this.getDeckByIndex?.byIndex(Number(this.index))
  }
})
</script>
