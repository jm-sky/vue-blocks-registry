// shared/composables/useDarkMode.ts
import { onBeforeMount, ref, watch } from 'vue'
import { DARK_MODE_STORAGE_KEY } from '../config/config'

// Shared state across all components
const isDark = ref(false)

export function useDarkMode() {
  // Initialize dark mode from localStorage or system preference
  onBeforeMount(() => {
    const stored = localStorage.getItem(DARK_MODE_STORAGE_KEY)

    if (stored !== null) {
      isDark.value = stored === 'true'
    } else {
      // Check system preference
      isDark.value = isPrefersDark()
    }

    // Apply initial state
    updateDarkModeClass(isDark.value)
  })

  // Watch for changes and update DOM
  watch(isDark, (newValue) => {
    updateDarkModeClass(newValue)
    localStorage.setItem(DARK_MODE_STORAGE_KEY, String(newValue))
  })

  const isPrefersDark = (): boolean => window.matchMedia('(prefers-color-scheme: dark)').matches

  const updateDarkModeClass = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggle = () => {
    isDark.value = !isDark.value
  }

  const setDark = (value: boolean) => {
    isDark.value = value
  }

  return {
    isDark,
    toggle,
    setDark,
  }
}
