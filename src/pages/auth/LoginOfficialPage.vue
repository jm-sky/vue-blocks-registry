<script setup lang="ts">
import GuestLayoutCentered from '@registry/layouts/GuestLayoutCentered.vue'
import LoginFormOfficial from '@registry/modules/auth/components/LoginFormOfficial.vue'
import { mockAuthService } from '@registry/modules/auth/services/mockAuthService'
</script>

<template>
  <GuestLayoutCentered>
    <LoginFormOfficial class="max-w-md w-full space-y-8" :auth-service="mockAuthService" />
  </GuestLayoutCentered>
</template>
