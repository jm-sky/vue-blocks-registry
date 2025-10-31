<script setup lang="ts">
import ChangePasswordPage from '@registry/modules/auth/pages/ChangePasswordPage.vue'
import { mockUserService } from '@registry/modules/user/services/mockUserService'
</script>

<template>
  <ChangePasswordPage :service="mockUserService" />
</template>


