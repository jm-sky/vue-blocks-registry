<script setup lang="ts">
import { RoutePaths } from '@/router/route-names'
import { ButtonLink } from '@registry/components/ui/button-link'
</script>

<template>
  <ButtonLink
    :to="RoutePaths.DEMO_EXAMPLES_AUTH"
    variant="ghost"
  >
    Auth Docs
  </ButtonLink>
</template>
