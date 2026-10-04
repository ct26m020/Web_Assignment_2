import { computed } from 'vue'
import type { Ref } from 'vue'
import { useLocalStorage } from './useLocalStorage.js'
import type { Note } from '../types/notes'

export function useNotes() {
  const notes: Ref<Note[]> = useLocalStorage('quicknotes', []) as Ref<Note[]>

  function normalizeTags(tags: Array<string | number | null | undefined> = []) {
    return tags
      .flatMap((tag) => String(tag).split(',')) // Split tags by commas
      .map((tag) => tag.trim()) // Trim whitespace
      .filter(Boolean) // Remove empty strings
  }

  function addNote(note: Partial<Note> | null | undefined) {
    if (!note) return

    const nextNote: Note = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      title: String(note.title ?? '').trim() || 'Untitled',
      content: String(note.content ?? '').trim(),
      tags: normalizeTags(note.tags ?? [])
    }

    notes.value = [nextNote, ...notes.value] // Add the new note to the beginning of the array
  }

  function deleteNote(id: number) {
    notes.value = notes.value.filter((note) => note.id !== id)
  }

  function filteredNotes(term: string) {
    const searchTerm = String(term ?? '').trim().toLowerCase() // Normalize the search term

    return computed(() => { // Use computed to create a reactive filtered list of notes
      const orderedNotes = [...notes.value].sort((a, b) => b.id - a.id) // Sort notes by id in descending order

      if (!searchTerm) return orderedNotes

      return orderedNotes.filter((note) => { // Filter notes based on the search term
        const searchableText = [
          note.title,
          note.content,
          ...note.tags
        ]
          .join(' ')
          .toLowerCase()

        return searchableText.includes(searchTerm) // Check if the searchable text includes the search term
      })
    })
  }

  return { notes, addNote, deleteNote, filteredNotes }
}
