<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import { useAuth } from '@registry/modules/auth/composables/useAuth'

const { logout, isLoggingOut } = useAuth()
</script>

<template>
  <Button variant="ghost" :loading="isLoggingOut" @click="logout">
    Wyloguj się
  </Button>
</template>
