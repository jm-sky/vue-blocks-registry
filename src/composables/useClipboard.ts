import { ref } from 'vue'
import useClipboard from 'vue-clipboard3'

export function useCopyToClipboard() {
  const { toClipboard } = useClipboard()
  const copied = ref(false)
  const error = ref<Error | null>(null)

  const copy = async (text: string) => {
    try {
      await toClipboard(text)
      copied.value = true
      error.value = null

      // Reset copied state after 2 seconds
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Failed to copy')
      copied.value = false
    }
  }

  return {
    copy,
    copied,
    error,
  }
}
