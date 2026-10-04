import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, initialValue: T): Ref<T> {
  const value = ref<T>(initialValue)

  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem(key) // Retrieve the stored value from localStorage
      value.value = stored ? (JSON.parse(stored) as T) : initialValue // If no stored value, use the initial value
    } catch (error) {
      console.warn(`Could not read localStorage key "${key}":`, error)
      value.value = initialValue
    }
  }

  watch( 
    value, // Watch for changes in the value
    (newValue) => {
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(key, JSON.stringify(newValue)) // Store the new value in localStorage
        } catch (error) {
          console.warn(`Could not write localStorage key "${key}":`, error)
        }
      }
    },
    { deep: true } // Watch deeply for changes in objects or arrays
  )

  return value as Ref<T>
}
