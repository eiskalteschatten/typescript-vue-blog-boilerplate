import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', () => {
  const windowWidth = ref(window.innerWidth)
  const prefersDarkMode = ref(false)
  const isLoading = ref(false)
  const globalInfo = ref<string>();
  const globalError = ref<string>();

  return {
    windowWidth,
    prefersDarkMode,
    isLoading,
    globalInfo,
    globalError,
  }
})
