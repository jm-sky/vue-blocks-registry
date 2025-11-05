<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@registry/components/ui/card'
import { useClipboard } from '@vueuse/core'
import { Check, Copy } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'

const props = defineProps<{
  qrCode: string // Data URL for QR code image
  secret: string // Base32 encoded secret
}>()

const { t } = useI18n()
const { copy, copied } = useClipboard()

const handleCopySecret = async () => {
  await copy(props.secret)
  toast.success(t('auth.two_factor.totp.secret_copied'))
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ t('auth.two_factor.totp.scan_qr_code') }}</CardTitle>
      <CardDescription>{{ t('auth.two_factor.totp.scan_qr_code_description') }}</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <!-- QR Code -->
      <div class="flex justify-center">
        <img :src="qrCode" alt="TOTP QR Code" class="max-w-[256px] w-full h-auto">
      </div>

      <!-- Secret Key -->
      <div class="space-y-2">
        <p class="text-sm font-medium">
          {{ t('auth.two_factor.totp.manual_entry') }}
        </p>
        <div class="flex items-center gap-2">
          <code class="flex-1 bg-muted p-2 rounded text-sm break-all">
            {{ secret }}
          </code>
          <Button
            type="button"
            variant="outline"
            size="icon"
            :title="t('auth.two_factor.totp.copy_secret')"
            @click="handleCopySecret"
          >
            <Check v-if="copied" :size="16" />
            <Copy v-else :size="16" />
          </Button>
        </div>
      </div>

      <!-- Instructions -->
      <div class="text-sm text-muted-foreground space-y-1">
        <p>{{ t('auth.two_factor.totp.scan_instructions') }}</p>
      </div>
    </CardContent>
  </Card>
</template>
