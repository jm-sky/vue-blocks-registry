<script setup lang="ts">
import LogoText from '@/components/brand/LogoText.vue'
import { RoutePaths } from '@/router/route-names'
import ButtonLink from '@registry/components/ui/button-link/ButtonLink.vue'
</script>

<template>
  <div class="text-center py-20 space-y-6 animate-fade-in">
    <h2 class="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
      Witaj w
      <LogoText class="text-5xl md:text-6xl" />
    </h2>

    <p class="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
      Odkryj naszą kolekcję gotowych komponentów UI, zaprojektowanych z myślą o nowoczesnych aplikacjach Vue.js
    </p>

    <p class="text-base text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
      Używamy Tailwind CSS i Shadcn Vue, Vee Validate, Zod...
    </p>

    <div class="flex gap-6 justify-center pt-4">
      <ButtonLink
        :to="RoutePaths.DEMO_INTRODUCTION"
        vibe="primary"
        size="lg"
      >
        Get Started
      </ButtonLink>

      <ButtonLink
        :to="RoutePaths.DEMO_COMPONENTS"
        variant="outline"
        vibe="outline"
        size="lg"
      >
        View Components
      </ButtonLink>
    </div>
  </div>
</template>
