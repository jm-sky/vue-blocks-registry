// shared/composables/useDarkMode.ts
import { onMounted, ref, watch } from 'vue'

const DARK_MODE_KEY = 'vue-blocks:dark-mode'

// Shared state across all components
const isDark = ref(false)

export function useDarkMode() {
  // Initialize dark mode from localStorage or system preference
  onMounted(() => {
    const stored = localStorage.getItem(DARK_MODE_KEY)

    if (stored !== null) {
      isDark.value = stored === 'true'
    } else {
      // Check system preference
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    // Apply initial state
    updateDarkModeClass(isDark.value)
  })

  // Watch for changes and update DOM
  watch(isDark, (newValue) => {
    updateDarkModeClass(newValue)
    localStorage.setItem(DARK_MODE_KEY, String(newValue))
  })

  function updateDarkModeClass(dark: boolean) {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function toggle() {
    isDark.value = !isDark.value
  }

  function setDark(value: boolean) {
    isDark.value = value
  }

  return {
    isDark,
    toggle,
    setDark,
  }
}
