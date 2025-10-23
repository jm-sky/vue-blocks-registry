<script setup lang="ts">
import { LayoutDashboard, Lock, Star, Table } from 'lucide-vue-next'
import { type Component, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import FeatureCard from '@/components/demo/FeatureCard.vue'
import { RoutePaths } from '@/router/route-names'
import Card from '@registry/components/ui/card/Card.vue'
import CardContent from '@registry/components/ui/card/CardContent.vue'
import DocsPageHeader from './layouts/partials/DocsPageHeader.vue'

const { t } = useI18n()

const features = computed(() => [
  {
    title: t('demo.introduction.features.ui_components.title'),
    items: t('demo.introduction.features.ui_components.items') as unknown as string[],
    iconComponent: Star as Component,
    iconClass: 'size-5 text-blue-600',
    iconBgClass: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
  },
  {
    title: t('demo.introduction.features.layouts.title'),
    items: t('demo.introduction.features.layouts.items') as unknown as string[],
    iconComponent: LayoutDashboard as Component,
    iconClass: 'size-5 text-violet-600',
    iconBgClass: 'bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20'
  },
  {
    title: t('demo.introduction.features.auth_modules.title'),
    items: t('demo.introduction.features.auth_modules.items') as unknown as string[],
    iconComponent: Lock as Component,
    iconClass: 'size-5 text-emerald-600',
    iconBgClass: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20'
  },
  {
    title: t('demo.introduction.features.data_table.title'),
    items: t('demo.introduction.features.data_table.items') as unknown as string[],
    iconComponent: Table as Component,
    iconClass: 'size-5 text-amber-600',
    iconBgClass: 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20'
  }
])
</script>

<template>
  <div class="space-y-10">
    <DocsPageHeader :title="t('demo.introduction.title')" :description="t('demo.introduction.description')" />

    <Card>
      <CardContent class="leading-7 text-muted-foreground">
        {{ t('demo.introduction.intro_text') }}
      </CardContent>
    </Card>

    <div class="space-y-4">
      <h2 class="scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight">
        {{ t('demo.introduction.what_is_title') }}
      </h2>

      <p class="leading-7 text-muted-foreground" v-html="t('demo.introduction.what_is_p1')" />

      <p class="leading-7 text-muted-foreground">
        {{ t('demo.introduction.what_is_p2') }}
      </p>
    </div>

    <div class="space-y-4 animate-slide-up">
      <h2 class="scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight">
        {{ t('demo.introduction.features_title') }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          :title="feature.title"
          :items="feature.items"
          :icon-component="feature.iconComponent"
          :icon-class="feature.iconClass"
          :icon-bg-class="feature.iconBgClass"
          dense
        />
      </div>
    </div>

    <h2 class="scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight">
      {{ t('demo.introduction.technologies_title') }}
    </h2>

    <div class="grid grid-cols-2 gap-4 not-prose my-6">
      <FeatureCard
        :title="t('demo.introduction.tech.frontend')"
        :items="t('demo.introduction.tech.frontend_items') as unknown as string[]"
      />
      <FeatureCard
        :title="t('demo.introduction.tech.tools')"
        :items="t('demo.introduction.tech.tools_items') as unknown as string[]"
      />
    </div>

    <h2 class="scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight">
      {{ t('demo.introduction.get_started_title') }}
    </h2>

    <p class="leading-7 text-muted-foreground">
      {{ t('demo.introduction.get_started_text') }}
    </p>

    <div class="flex flex-wrap gap-4 not-prose my-6">
      <RouterLink
        :to="RoutePaths.DEMO_COMPONENTS_BUTTON"
        class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors duration-200"
      >
        {{ t('demo.introduction.view_components') }}
      </RouterLink>
      <a
        href="https://github.com/jm-sky/vue-blocks-registry"
        target="_blank"
        class="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
      >
        {{ t('demo.introduction.github_repo') }}
      </a>
    </div>
  </div>
</template>
