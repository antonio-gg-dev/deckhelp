<template>
  <pre>
    {{ decks }}
  </pre>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    decks: {
      required: true,
      type: Array as PropType<string[]>
    }
  }
})
</script>

<style scoped></style>
