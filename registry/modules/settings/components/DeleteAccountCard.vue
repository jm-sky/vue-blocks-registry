<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import { Card } from '@registry/components/ui/card'
import { Checkbox } from '@registry/components/ui/checkbox'
import { Input } from '@registry/components/ui/input'
import { Label } from '@registry/components/ui/label'
import { useAuth } from '@registry/modules/auth/composables/useAuth'
import { AuthRoutePaths } from '@registry/modules/auth/config/routes'
import { AlertTriangle, Trash2 } from 'lucide-vue-next'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import type { IAuthService } from '@registry/modules/auth/types/auth.type'

const props = defineProps<{
  authService?: IAuthService
}>()

const router = useRouter()
const { t } = useI18n()
const { deleteAccount, isDeletingAccount } = useAuth(props.authService)

const isDeleteModalOpen = ref(false)
const confirmationText = ref('')
const isConfirmed = ref(false)

const DELETE_CONFIRMATION = 'DELETE'

const handleDeleteAccount = async () => {
  if (confirmationText.value !== DELETE_CONFIRMATION || !isConfirmed.value) {
    toast.error(t('settings.delete_account.modal.errors.invalid_confirmation'))
    return
  }

  try {
    await deleteAccount({ confirmation: confirmationText.value })
    toast.success(t('settings.delete_account.modal.success'))

    // Redirect to login after a short delay
    setTimeout(() => {
      void router.push(AuthRoutePaths.login)
    }, 1000)
  } catch (error: unknown) {
    console.error('Delete account error:', error)
    toast.error(t('settings.delete_account.modal.errors.generic'))
  }
}

const resetDeleteModal = () => {
  confirmationText.value = ''
  isConfirmed.value = false
}
</script>

<template>
  <div>
    <Card class="border-destructive/50 p-6">
      <div class="space-y-4">
        <div class="flex items-start gap-3">
          <div class="rounded-full bg-destructive/10 p-2">
            <Trash2 class="size-4 text-destructive" />
          </div>
          <div class="flex-1 space-y-1">
            <h2 class="text-lg font-semibold text-destructive">
              {{ t('settings.delete_account.title') }}
            </h2>
            <p class="text-sm text-muted-foreground">
              {{ t('settings.delete_account.description') }}
            </p>
          </div>
        </div>

        <div class="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <div class="flex items-start gap-3">
            <AlertTriangle class="mt-0.5 size-5 text-destructive" />
            <div class="flex-1 space-y-2">
              <p class="text-sm font-medium text-destructive">
                {{ t('settings.delete_account.warning_title') }}
              </p>
              <ul class="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>{{ t('settings.delete_account.warning_1') }}</li>
                <li>{{ t('settings.delete_account.warning_2') }}</li>
                <li>{{ t('settings.delete_account.warning_3') }}</li>
              </ul>
            </div>
          </div>
        </div>

        <Button
          variant="destructive"
          @click="isDeleteModalOpen = true"
        >
          <Trash2 class="mr-2 size-4" />
          {{ t('settings.delete_account.button') }}
        </Button>
      </div>
    </Card>

    <!-- Delete Account Modal -->
    <div
      v-if="isDeleteModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      @click.self="resetDeleteModal(); isDeleteModalOpen = false"
    >
      <Card class="w-full max-w-lg p-6 shadow-lg">
        <div class="space-y-6">
          <div class="space-y-2">
            <div class="flex items-center gap-2 text-destructive">
              <Trash2 class="size-5" />
              <h3 class="text-xl font-semibold">
                {{ t('settings.delete_account.modal.title') }}
              </h3>
            </div>
            <p class="text-sm text-muted-foreground">
              {{ t('settings.delete_account.modal.description') }}
            </p>
          </div>

          <div class="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <div class="flex items-start gap-3">
              <AlertTriangle class="mt-0.5 size-5 text-destructive" />
              <div class="flex-1 space-y-2 text-sm">
                <p class="font-medium text-destructive">
                  {{ t('settings.delete_account.modal.warning_title') }}
                </p>
                <p class="text-muted-foreground">
                  {{ t('settings.delete_account.modal.warning_text') }}
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="space-y-2">
              <Label for="confirmation">
                {{ t('settings.delete_account.modal.confirmation_label') }}
              </Label>
              <Input
                id="confirmation"
                v-model="confirmationText"
                :placeholder="DELETE_CONFIRMATION"
                type="text"
              />
              <p class="text-xs text-muted-foreground">
                {{ t('settings.delete_account.modal.confirmation_hint') }}
              </p>
            </div>

            <div class="flex items-start space-x-2">
              <Checkbox
                id="confirm-delete"
                v-model:checked="isConfirmed"
                class="mt-1"
              />
              <Label
                for="confirm-delete"
                class="text-sm font-normal leading-relaxed cursor-pointer"
              >
                {{ t('settings.delete_account.modal.confirm_checkbox') }}
              </Label>
            </div>
          </div>

          <div class="flex justify-end gap-2">
            <Button
              variant="outline"
              :disabled="isDeletingAccount"
              @click="resetDeleteModal(); isDeleteModalOpen = false"
            >
              {{ t('settings.delete_account.modal.cancel') }}
            </Button>
            <Button
              variant="destructive"
              :disabled="confirmationText !== DELETE_CONFIRMATION || !isConfirmed || isDeletingAccount"
              :loading="isDeletingAccount"
              @click="handleDeleteAccount"
            >
              {{ t('settings.delete_account.modal.delete_button') }}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

