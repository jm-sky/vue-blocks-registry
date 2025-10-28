<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RoutePaths } from '@/router/route-names'
import { ButtonLink } from '@registry/components/ui/button-link'

const { t } = useI18n()
</script>

<template>
  <ButtonLink
    :to="RoutePaths.DEMO_EXAMPLES_AUTH"
    variant="ghost"
  >
    {{ t('demo.auth.docs_link') }}
  </ButtonLink>
</template>
