<script setup lang="ts">
import { ref, computed } from 'vue'
import SearchBar from './components/SearchBar.vue'
import NoteCard from './components/NoteCard.vue'
import NoteForm from './components/NoteForm.vue'
import { useNotes } from './composables/useNotes'

const searchQuery = ref('')
const { addNote, deleteNote, filteredNotes } = useNotes()
const showForm = ref(false)
const visibleNotes = computed(() => filteredNotes(searchQuery.value).value)

function handleAddNote(note: { title: string; content: string; tags: string[] }) {
  addNote(note)
  showForm.value = false
}
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="topbar-title">
        <h1>Notes</h1>
      </div>

      <div class="topbar-actions">
        <SearchBar v-model="searchQuery" />
        <button id="add-button" type="button" @click="showForm = true">+</button>
      </div>
    </header>

    <main class="content-area">
      <section class="notes-panel">
        <div v-if="visibleNotes.length" id="notes-list">
          <NoteCard
            v-for="note in visibleNotes"
            :key="note.id"
            :note="note"
            @delete="deleteNote"
          />
        </div>

        <div v-else class="empty-state">
          <h2>Keine Notizen gefunden</h2>
          <p>Füge eine neue Notiz hinzu oder ändere deine Suche.</p>
        </div>
      </section>
    </main>
  </div>

  <div v-if="showForm" class="modal-backdrop" @click.self="showForm = false">
    <div class="modal-window">
      <div class="modal-header">
        <h2>Neue Notiz</h2>
        <button type="button" class="modal-close" @click="showForm = false">×</button>
      </div>

      <NoteForm @add-note="handleAddNote" />
    </div>
  </div>
</template>
