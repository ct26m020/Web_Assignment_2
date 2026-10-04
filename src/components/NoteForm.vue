<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (event: 'add-note', note: { title: string; content: string; tags: string[] }): void
}>()

const title = ref('')
const content = ref('')
const tags = ref('')

function submit() {
  const trimmedTitle = title.value.trim()
  const trimmedContent = content.value.trim()

  if (!trimmedTitle && !trimmedContent) return

  emit('add-note', {
    title: trimmedTitle,
    content: trimmedContent,
    tags: tags.value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
  })

  title.value = ''
  content.value = ''
  tags.value = ''
}
</script>

<template>
  <form class="note-form" @submit.prevent="submit">
    <input v-model="title" class="note-form-input" type="text" placeholder="Titel" />
    <textarea v-model="content" class="note-form-textarea" placeholder="Notiztext" rows="6" />
    <input v-model="tags" class="note-form-input" type="text" placeholder="Tags, durch Kommas getrennt" />
    <button type="submit" class="note-form-submit">Notiz hinzufügen</button>
  </form>
</template>
