<script setup lang="ts">
import { useAuth } from '../composables/useAuth'
import { Button } from '@registry/components/ui/button'

const { logout, isLoggingOut } = useAuth()
</script>

<template>
  <Button @click="logout" variant="ghost" :loading="isLoggingOut">
    Wyloguj się
  </Button>
</template>
