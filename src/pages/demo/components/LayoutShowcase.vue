<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageCard from '@registry/components/layout/PageCard.vue'
import PageListHeader from '@registry/components/layout/PageListHeader.vue'
import PageListWrapper from '@registry/components/layout/PageListWrapper.vue'
import Button from '@registry/components/ui/button/Button.vue'
import Card from '@registry/components/ui/card/Card.vue'
import CardContent from '@registry/components/ui/card/CardContent.vue'
import HoverCard from '@registry/components/ui/hover-card/HoverCard.vue'
import ScrollToTop from '@registry/components/ui/scroll-to-top/ScrollToTop.vue'
import DocsPageHeader from '../layouts/partials/DocsPageHeader.vue'

const { t } = useI18n()

const layouts = computed(() => [
  {
    title: t('demo.showcase.layout.available_layouts.public_layout.title'),
    description: t('demo.showcase.layout.available_layouts.public_layout.description'),
    linkTo: '/demo/public-layout',
  },
  {
    title: t('demo.showcase.layout.available_layouts.authenticated_layout.title'),
    description: t('demo.showcase.layout.available_layouts.authenticated_layout.description'),
    linkTo: '/demo/authenticated-layout',
  },
  {
    title: t('demo.showcase.layout.available_layouts.guest_centered.title'),
    description: t('demo.showcase.layout.available_layouts.guest_centered.description'),
    linkTo: '/demo/guest-layout-centered',
  },
  {
    title: t('demo.showcase.layout.available_layouts.guest_glass.title'),
    description: t('demo.showcase.layout.available_layouts.guest_glass.description'),
    linkTo: '/demo/guest-layout-centered-glass',
  },
  {
    title: t('demo.showcase.layout.available_layouts.guest_two_columns.title'),
    description: t('demo.showcase.layout.available_layouts.guest_two_columns.description'),
    linkTo: '/demo/guest-layout-two-columns',
  },
])
</script>

<template>
  <div class="space-y-12">
    <!-- Page Header -->
    <DocsPageHeader
      :title="t('demo.showcase.layout.title')"
      :description="t('demo.showcase.layout.description')"
    />

    <!-- ScrollToTop Component -->
    <div class="space-y-4 animate-slide-up">
      <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        {{ t('demo.showcase.layout.scroll_to_top.title') }}
      </h3>
      <p class="text-slate-600 dark:text-slate-400">
        {{ t('demo.showcase.layout.scroll_to_top.description') }}
      </p>
      <Card>
        <CardContent>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            {{ t('demo.showcase.layout.scroll_to_top.scroll_info') }}
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- PageCard Component -->
    <div class="space-y-4 animate-slide-up">
      <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        {{ t('demo.showcase.layout.page_card.title') }}
      </h3>
      <p class="text-slate-600 dark:text-slate-400">
        {{ t('demo.showcase.layout.page_card.description') }}
      </p>
      <PageCard>
        <h4 class="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
          {{ t('demo.showcase.layout.page_card.example_title') }}
        </h4>
        <p class="text-slate-600 dark:text-slate-400">
          {{ t('demo.showcase.layout.page_card.example_text') }}
        </p>
      </PageCard>
    </div>

    <!-- PageListHeader Component -->
    <div class="space-y-4 animate-slide-up">
      <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        {{ t('demo.showcase.layout.page_list_header.title') }}
      </h3>
      <p class="text-slate-600 dark:text-slate-400">
        {{ t('demo.showcase.layout.page_list_header.description') }}
      </p>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border dark:border-gray-700">
        <PageListHeader
          :title="t('demo.showcase.layout.page_list_header.users')"
          :count="42"
          :description="t('demo.showcase.layout.page_list_header.users_description')"
        >
          <template #actions>
            <Button size="sm">
              {{ t('demo.showcase.layout.page_list_header.add_user') }}
            </Button>
          </template>
        </PageListHeader>
        <p class="text-sm text-slate-600 dark:text-slate-400 mt-4">
          {{ t('demo.showcase.layout.page_list_header.example_list') }}
        </p>
      </div>
    </div>

    <!-- PageListWrapper Component -->
    <div class="space-y-4 animate-slide-up">
      <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        {{ t('demo.showcase.layout.page_list_wrapper.title') }}
      </h3>
      <p class="text-slate-600 dark:text-slate-400">
        {{ t('demo.showcase.layout.page_list_wrapper.description') }}
      </p>
      <PageListWrapper
        :title="t('demo.showcase.layout.page_list_wrapper.projects')"
        :count="15"
        :description="t('demo.showcase.layout.page_list_wrapper.projects_description')"
      >
        <template #actions>
          <Button size="sm" variant="outline">
            {{ t('demo.showcase.layout.page_list_wrapper.filter') }}
          </Button>
          <Button size="sm">
            {{ t('demo.showcase.layout.page_list_wrapper.new_project') }}
          </Button>
        </template>

        <div class="space-y-2 mt-4">
          <div class="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-border">
            {{ t('demo.showcase.layout.page_list_wrapper.project_alpha') }}
          </div>
          <div class="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-border">
            {{ t('demo.showcase.layout.page_list_wrapper.project_beta') }}
          </div>
          <div class="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-border">
            {{ t('demo.showcase.layout.page_list_wrapper.project_gamma') }}
          </div>
        </div>
      </PageListWrapper>
    </div>

    <!-- Layout Variants Info -->
    <div class="space-y-4 animate-slide-up">
      <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        {{ t('demo.showcase.layout.available_layouts.title') }}
      </h3>
      <p class="text-slate-600 dark:text-slate-400">
        {{ t('demo.showcase.layout.available_layouts.description') }}
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <HoverCard
          v-for="layout in layouts"
          :key="layout.title"
          :title="layout.title"
          :description="layout.description"
          :link-to="layout.linkTo"
          :link-label="t('demo.showcase.layout.available_layouts.view_link')"
        />
      </div>
    </div>

    <ScrollToTop />
  </div>
</template>
