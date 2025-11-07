<script setup lang="ts">
import { AlertTriangle, Trash2 } from 'lucide-vue-next'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import Sheet from '@/components/ui/sheet/Sheet.vue'
import SheetContent from '@/components/ui/sheet/SheetContent.vue'
import SheetDescription from '@/components/ui/sheet/SheetDescription.vue'
import SheetFooter from '@/components/ui/sheet/SheetFooter.vue'
import SheetHeader from '@/components/ui/sheet/SheetHeader.vue'
import SheetTitle from '@/components/ui/sheet/SheetTitle.vue'
import { Button } from '@registry/components/ui/button'
import Card from '@registry/components/ui/card/Card.vue'
import { Checkbox } from '@registry/components/ui/checkbox'
import { Input } from '@registry/components/ui/input'
import { Label } from '@registry/components/ui/label'

const { t } = useI18n()
const router = useRouter()

const isDeleteModalOpen = ref(false)
const confirmationText = ref('')
const isConfirmed = ref(false)
const isDeleting = ref(false)

const DELETE_CONFIRMATION = 'DELETE'

const handleDeleteAccount = async () => {
  if (confirmationText.value !== DELETE_CONFIRMATION || !isConfirmed.value) {
    toast.error(t('demo.examples_page.settings_example.delete_account.modal.errors.invalid_confirmation'))
    return
  }

  isDeleting.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    toast.success(t('demo.examples_page.settings_example.delete_account.modal.success'))

    // Close modal and redirect after a short delay
    setTimeout(() => {
      isDeleteModalOpen.value = false
      void router.push('/')
    }, 1000)
  } catch (error: unknown) {
    console.error('Delete account error:', error)
    toast.error(t('demo.examples_page.settings_example.delete_account.modal.errors.generic'))
  } finally {
    isDeleting.value = false
  }
}

const resetDeleteModal = () => {
  confirmationText.value = ''
  isConfirmed.value = false
}
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-1">
      <h1 class="text-3xl font-bold tracking-tight">
        {{ t('demo.examples_page.settings_example.title') }}
      </h1>
      <p class="text-sm text-muted-foreground">
        {{ t('demo.examples_page.settings_example.description') }}
      </p>
    </div>

    <div class="max-w-2xl space-y-6">
      <!-- General Settings Card -->
      <Card class="p-6">
        <div class="space-y-4">
          <div>
            <h2 class="text-lg font-semibold">
              {{ t('demo.examples_page.settings_example.general.title') }}
            </h2>
            <p class="text-sm text-muted-foreground">
              {{ t('demo.examples_page.settings_example.general.description') }}
            </p>
          </div>
          <div class="space-y-4 pt-4">
            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <Label>{{ t('demo.examples_page.settings_example.general.dark_mode') }}</Label>
                <p class="text-sm text-muted-foreground">
                  {{ t('demo.examples_page.settings_example.general.dark_mode_description') }}
                </p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <Label>{{ t('demo.examples_page.settings_example.general.language') }}</Label>
                <p class="text-sm text-muted-foreground">
                  {{ t('demo.examples_page.settings_example.general.language_description') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <!-- Delete Account Card (Danger Zone) -->
      <Card class="border-destructive/50 p-6">
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <div class="rounded-full bg-destructive/10 p-2">
              <Trash2 class="size-4 text-destructive" />
            </div>
            <div class="flex-1 space-y-1">
              <h2 class="text-lg font-semibold text-destructive">
                {{ t('demo.examples_page.settings_example.delete_account.title') }}
              </h2>
              <p class="text-sm text-muted-foreground">
                {{ t('demo.examples_page.settings_example.delete_account.description') }}
              </p>
            </div>
          </div>

          <div class="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <div class="flex items-start gap-3">
              <AlertTriangle class="mt-0.5 size-5 text-destructive" />
              <div class="flex-1 space-y-2">
                <p class="text-sm font-medium text-destructive">
                  {{ t('demo.examples_page.settings_example.delete_account.warning_title') }}
                </p>
                <ul class="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  <li>{{ t('demo.examples_page.settings_example.delete_account.warning_1') }}</li>
                  <li>{{ t('demo.examples_page.settings_example.delete_account.warning_2') }}</li>
                  <li>{{ t('demo.examples_page.settings_example.delete_account.warning_3') }}</li>
                </ul>
              </div>
            </div>
          </div>

          <Button
            variant="destructive"
            @click="isDeleteModalOpen = true"
          >
            <Trash2 class="mr-2 size-4" />
            {{ t('demo.examples_page.settings_example.delete_account.button') }}
          </Button>
        </div>
      </Card>

      <!-- Link to real settings page -->
      <div class="flex justify-end">
        <RouterLink to="/settings">
          <Button variant="outline">
            {{ t('demo.examples_page.settings_example.view_full_settings') }}
          </Button>
        </RouterLink>
      </div>
    </div>

    <!-- Delete Account Modal -->
    <Sheet :open="isDeleteModalOpen" @update:open="(val) => { isDeleteModalOpen = val; if (!val) resetDeleteModal() }">
      <SheetContent side="right" class="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle class="flex items-center gap-2 text-destructive">
            <Trash2 class="size-5" />
            {{ t('demo.examples_page.settings_example.delete_account.modal.title') }}
          </SheetTitle>
          <SheetDescription>
            {{ t('demo.examples_page.settings_example.delete_account.modal.description') }}
          </SheetDescription>
        </SheetHeader>

        <div class="space-y-6 py-6">
          <div class="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <div class="flex items-start gap-3">
              <AlertTriangle class="mt-0.5 size-5 text-destructive" />
              <div class="flex-1 space-y-2 text-sm">
                <p class="font-medium text-destructive">
                  {{ t('demo.examples_page.settings_example.delete_account.modal.warning_title') }}
                </p>
                <p class="text-muted-foreground">
                  {{ t('demo.examples_page.settings_example.delete_account.modal.warning_text') }}
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="space-y-2">
              <Label for="confirmation">
                {{ t('demo.examples_page.settings_example.delete_account.modal.confirmation_label') }}
              </Label>
              <Input
                id="confirmation"
                v-model="confirmationText"
                :placeholder="DELETE_CONFIRMATION"
                type="text"
              />
              <p class="text-xs text-muted-foreground">
                {{ t('demo.examples_page.settings_example.delete_account.modal.confirmation_hint') }}
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
                {{ t('demo.examples_page.settings_example.delete_account.modal.confirm_checkbox') }}
              </Label>
            </div>
          </div>
        </div>

        <SheetFooter class="gap-2">
          <Button
            variant="outline"
            :disabled="isDeleting"
            @click="isDeleteModalOpen = false"
          >
            {{ t('demo.examples_page.settings_example.delete_account.modal.cancel') }}
          </Button>
          <Button
            variant="destructive"
            :disabled="confirmationText !== DELETE_CONFIRMATION || !isConfirmed || isDeleting"
            :loading="isDeleting"
            @click="handleDeleteAccount"
          >
            {{ t('demo.examples_page.settings_example.delete_account.modal.delete_button') }}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
</template>


