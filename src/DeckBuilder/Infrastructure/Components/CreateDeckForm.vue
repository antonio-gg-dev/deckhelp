<template>
  <form
    @submit.prevent="submit"
    ref="form"
  >
    <input
      type="text"
      placeholder="Deck name..."
      v-model="deckName"
    />

    <button type="submit">New</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['new-deck'],
  data() {
    return {
      deckName: ''
    }
  },
  methods: {
    submit() {
      const form = this.$refs.form as HTMLFormElement

      this.$emit('new-deck', this.deckName)

      form.reset()
    }
  }
})
</script>
