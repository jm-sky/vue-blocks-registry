<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LogoText from '@/components/brand/LogoText.vue'
import { RoutePaths } from '@/router/route-names'
import ButtonLink from '@registry/components/ui/button-link/ButtonLink.vue'

const { t } = useI18n()
</script>

<template>
  <div class="text-center py-20 space-y-6 animate-fade-in">
    <h2 class="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
      {{ t('demo.hero.welcome') }}
      <LogoText class="text-5xl md:text-6xl" />
    </h2>

    <p class="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
      {{ t('demo.hero.subtitle') }}
    </p>

    <p class="text-base text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
      {{ t('demo.hero.tech_stack') }}
    </p>

    <div class="flex gap-6 justify-center pt-4">
      <ButtonLink
        :to="RoutePaths.DEMO_INTRODUCTION"
        vibe="primary"
        size="lg"
      >
        {{ t('demo.hero.get_started') }}
      </ButtonLink>

      <ButtonLink
        :to="RoutePaths.DEMO_COMPONENTS"
        variant="outline"
        vibe="outline"
        size="lg"
      >
        {{ t('demo.hero.view_components') }}
      </ButtonLink>
    </div>
  </div>
</template>
