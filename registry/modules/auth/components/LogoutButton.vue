<script setup lang="ts">
import { useLogout } from '../composables/useLogout'
import { Button } from '@registry/components/ui/button'

const { logout } = useLogout()
</script>

<template>
  <Button @click="logout" variant="ghost">
    Wyloguj się
  </Button>
</template>
