import { useClipboard } from '@vueuse/core'

export function useCopyToClipboard() {
  const { copy: copyToClipboard, copied, isSupported } = useClipboard()

  const copy = async (text: string) => {
    if (!isSupported.value) {
      throw new Error('Clipboard API not supported')
    }
    await copyToClipboard(text)
  }

  return {
    copy,
    copied,
  }
}
