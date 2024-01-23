<template>
  <form @submit.prevent="submit" ref="form">
    <input type="text" placeholder="Deck name..." v-model="deckName" />

    <button type="submit">Create</button>
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
      this.$emit('new-deck', this.deckName)
      this.$refs.form.reset()
    }
  }
})
</script>

<style scoped></style>
