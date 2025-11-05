<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@registry/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@registry/components/ui/table'
import { usePasskeys } from '@registry/modules/auth/composables/useTwoFactor'
import { useDeletePasskey } from '@registry/modules/auth/composables/useWebAuthn'
import { Fingerprint, Trash2 } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import type { ITwoFactorService } from '@registry/modules/auth/types/twoFactor.type'

const props = defineProps<{
  service?: ITwoFactorService
}>()

const { t } = useI18n()
const { data: passkeys, isLoading } = usePasskeys(props.service)
const { mutateAsync: deletePasskey, isPending: isDeleting } = useDeletePasskey(props.service)

const handleDelete = async (passkeyId: string) => {
  if (!confirm(t('auth.two_factor.webauthn.delete_confirm'))) {
    return
  }

  try {
    await deletePasskey(passkeyId)
    toast.success(t('auth.two_factor.webauthn.delete_success'))
  } catch (err) {
    toast.error(t('errors.generic'))
    console.error('Passkey deletion error:', err)
  }
}

const formatDate = (dateString?: string) => {
  if (!dateString) return t('common.never')
  return new Date(dateString).toLocaleDateString()
}
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-center gap-2">
        <Fingerprint :size="20" />
        <CardTitle>{{ t('auth.two_factor.webauthn.registered_passkeys') }}</CardTitle>
      </div>
      <CardDescription>{{ t('auth.two_factor.webauthn.passkeys_description') }}</CardDescription>
    </CardHeader>
    <CardContent>
      <div v-if="isLoading" class="text-center text-muted-foreground py-8">
        {{ t('common.loading') }}
      </div>

      <div v-else-if="!passkeys || passkeys.length === 0" class="text-center text-muted-foreground py-8">
        <Fingerprint :size="48" class="mx-auto mb-2 opacity-20" />
        <p>{{ t('auth.two_factor.webauthn.no_passkeys') }}</p>
      </div>

      <Table v-else>
        <TableHeader>
          <TableRow>
            <TableHead>{{ t('auth.two_factor.webauthn.name') }}</TableHead>
            <TableHead>{{ t('auth.two_factor.webauthn.created') }}</TableHead>
            <TableHead>{{ t('auth.two_factor.webauthn.last_used') }}</TableHead>
            <TableHead class="text-right">
              {{ t('common.actions') }}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="passkey in passkeys" :key="passkey.id">
            <TableCell class="font-medium">
              {{ passkey.name }}
            </TableCell>
            <TableCell>{{ formatDate(passkey.createdAt) }}</TableCell>
            <TableCell>{{ formatDate(passkey.lastUsedAt) }}</TableCell>
            <TableCell class="text-right">
              <Button
                variant="ghost"
                size="icon"
                :disabled="isDeleting"
                :title="t('auth.two_factor.webauthn.delete')"
                class="hover:text-destructive"
                @click="handleDelete(passkey.id)"
              >
                <Trash2 :size="16" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>
