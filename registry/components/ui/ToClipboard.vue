<script setup lang="ts">
import { cn } from '@registry/lib/utils'
import { refAutoReset, useClipboard } from '@vueuse/core'
import { CheckIcon, ClipboardIcon } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import type { HTMLAttributes } from 'vue'

const { t } = useI18n()

const props = defineProps<{
  text?: string
  class?: HTMLAttributes['class']
  copiedClass?: HTMLAttributes['class']
  withLabel?: boolean
}>()

const copied = refAutoReset(false, 1000)

const copyToClipboard = async () => {
  if (!props.text) return
  await useClipboard().copy(props.text)
  copied.value = true
  toast.info(t('common.copyToClipboard.success'))
}
</script>

<template>
  <button
    v-if="text"
    v-tooltip="copied ? t('common.copyToClipboard.copied') : t('common.copyToClipboard.copy')"
    type="button"
    :class="cn(
      'cursor-pointer flex items-center gap-1 opacity-50 hover:opacity-100 text-muted-foreground hover:text-primary',
      props.class,
      copied && props.copiedClass,
    )"
    @click="copyToClipboard"
  >
    <slot>
      <slot name="before" />
      <ClipboardIcon v-if="!copied" />
      <CheckIcon v-else />
      <slot name="after">
        <span v-if="withLabel">
          {{ copied ? t('common.copyToClipboard.copied') : t('common.copyToClipboard.copy') }}
        </span>
      </slot>
    </slot>
  </button>
</template>
