<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import { useAuth } from '@registry/modules/auth/composables/useAuth'
import { useI18n } from 'vue-i18n'

const { logout, isLoggingOut } = useAuth()
const { t } = useI18n()
</script>

<template>
  <Button variant="ghost" :loading="isLoggingOut" @click="logout">
    {{ t('auth.logout') }}
  </Button>
</template>
