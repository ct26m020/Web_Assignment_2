<script setup lang="ts">
import SearchBar from './components/SearchBar.vue'
import BaseCard from './components/BaseCard.vue'
import { ref } from 'vue'
import type { Note } from './types/notes'

const searchQuery = ref('')
const notes = ref<Note[]>([
  { id: 1, title: 'Note 1', content: 'This is the content of note 1.', tags: ['tag1', 'tag2'] },
  { id: 2, title: 'Note 2', content: 'This is the content of note 2.', tags: ['tag3', 'tag4'] },
  { id: 3, title: 'Note 3', content: 'This is the content of note 3.', tags: ['tag5', 'tag6'] }
])
</script>

<template>
  <div id="notes-bar">
    <h1>Notes</h1>
    <SearchBar />
    <div id="notes-list">
      <BaseCard v-for="note in notes" :key="note.id">
      <template #header>
        <h2>{{ note.title }}</h2>
        <span v-for="tag in note.tags" :key="tag" class="tag">{{ tag }}</span>
      </template>
      <p>{{ note.content }}</p>
    </BaseCard>
    </div>
    <button id="add-button">+</button>
  </div>

  <div id="notes-container">
    
  </div>
  
</template>
