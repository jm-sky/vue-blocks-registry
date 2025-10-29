<script setup lang="ts">
import Alert from '@registry/components/ui/alert/Alert.vue'
import AlertDescription from '@registry/components/ui/alert/AlertDescription.vue'
import GuestLayoutCentered from '@registry/layouts/GuestLayoutCentered.vue'
import LoginForm from '@registry/modules/auth/components/LoginForm.vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
const message: string | null = route.meta.message as string | null
</script>

<template>
  <GuestLayoutCentered>
    <template #actions>
      <slot name="actions" />
    </template>

    <div class="max-w-md w-full space-y-8">
      <div class="space-y-4 bg-card/80 py-8 px-6 shadow-lg rounded-lg">
        <h2 class="text-center text-2xl font-bold text-card-foreground">
          {{ t('auth.sign_in_to_account') }}
        </h2>
        <p class="mt-2 text-center text-sm text-muted-foreground">
          {{ t('auth.links.or_create_account') }}
          <RouterLink to="/auth/register" class="font-medium text-primary hover:underline">
            {{ t('auth.links.create_new_account') }}
          </RouterLink>
        </p>
        <LoginForm />
      </div>

      <div class="text-center">
        <RouterLink to="/auth/forgot-password" class="text-sm text-muted-foreground hover:underline">
          {{ t('auth.forgot_password') }}
        </RouterLink>
      </div>

      <Alert v-if="message" variant="info">
        <AlertDescription>{{ message }}</AlertDescription>
      </Alert>
    </div>
  </GuestLayoutCentered>
</template>
