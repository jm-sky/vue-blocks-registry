<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import { useLogout } from '@registry/modules/auth/composables/useLogout'

const { logout } = useLogout()
</script>

<template>
  <Button variant="ghost" @click="logout">
    Wyloguj się
  </Button>
</template>
