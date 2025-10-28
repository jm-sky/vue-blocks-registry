<script setup lang="ts">
import { refAutoReset, useClipboard } from '@vueuse/core'
import { Check, Copy } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'

const { t } = useI18n()

const props = defineProps<{
  code: string
}>()

const isCopied = refAutoReset(false, 1500)

const copyToClipboard = async () => {
  if (isCopied.value) return
  await useClipboard().copy(props.code)
  isCopied.value = true
  toast.info(t('common.copyToClipboard.success'))
}
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    :class="isCopied ? 'text-green-600' : 'cursor-pointer text-muted-foreground'"
    @click="copyToClipboard"
  >
    <Check v-if="isCopied" :size="16" />
    <Copy v-else :size="16" />
  </button>
</template>
