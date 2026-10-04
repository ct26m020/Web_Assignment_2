<script setup lang="ts">
import BaseCard from './BaseCard.vue'
import type { Note } from '../types/notes'

const props = defineProps<{
  note: Note
}>()

const emit = defineEmits<{
  (event: 'delete', id: number): void
}>()
</script>

<template>
  <BaseCard class="note-card">
    <template #header>
      <div class="note-card-header">
        <h2>{{ props.note.title }}</h2>
        <button 
          type="button" 
          class="delete-button" 
          @click="emit('delete', props.note.id)">
          Entfernen
        </button>
      </div>

      <div 
        v-if="props.note.tags.length" 
        class="tag-list">
        <span 
          v-for="tag in props.note.tags" 
          :key="tag" 
          class="tag">
          {{ tag }}
        </span>
      </div>
    </template>

    <p>
      {{ props.note.content }}
    </p>
  </BaseCard>
</template>
