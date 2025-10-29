<script setup lang="ts">
import GuestLayoutCentered from '@registry/layouts/GuestLayoutCentered.vue'
import RegisterForm from '@registry/modules/auth/components/RegisterForm.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <GuestLayoutCentered>
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="text-center text-3xl font-extrabold text-foreground">
          {{ t('auth.create_account') }}
        </h2>
        <p class="mt-2 text-center text-sm text-muted-foreground">
          {{ t('auth.links.or_sign_in') }}
          <RouterLink to="/auth/login" class="font-medium text-primary hover:underline">
            {{ t('auth.links.sign_in_existing') }}
          </RouterLink>
        </p>
      </div>

      <div class="bg-card py-8 px-6 shadow-lg rounded-lg">
        <RegisterForm />
      </div>
    </div>
  </GuestLayoutCentered>
</template>
