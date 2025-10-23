<script setup lang="ts">
import LinkWithArrow from '@/components/demo/LinkWithArrow.vue'
import PageCard from '@registry/components/layout/PageCard.vue'
import PageListHeader from '@registry/components/layout/PageListHeader.vue'
import PageListWrapper from '@registry/components/layout/PageListWrapper.vue'
import Button from '@registry/components/ui/button/Button.vue'
import Card from '@registry/components/ui/card/Card.vue'
import CardContent from '@registry/components/ui/card/CardContent.vue'

const layouts = [
  {
    title: 'PublicLayout',
    description: 'Prosty layout dla landing pages i public pages',
    linkTo: '/demo/public-layout',
  },
  {
    title: 'AuthenticatedLayout',
    description: 'Zaawansowany layout z MainNav, UserNav i dark mode toggle',
    linkTo: '/demo/authenticated-layout',
  },
  {
    title: 'GuestLayoutCentered',
    description: 'Centered layout z gradient background dla auth pages',
    linkTo: '/demo/guest-layout-centered',
  },
  {
    title: 'GuestLayoutCenteredGlass',
    description: 'Glass-morphism efekt + background image support',
    linkTo: '/demo/guest-layout-centered-glass',
  },
  {
    title: 'GuestLayoutTwoColumns',
    description: 'Split-screen design z branding panel po lewej stronie',
    linkTo: '/demo/guest-layout-two-columns',
  },
]
</script>

<template>
  <div class="space-y-12">
    <!-- Page Header -->
    <div class="animate-fade-in">
      <h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
        Layout Components
      </h2>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
        Komponenty układu, nawigacji i utility components do budowania profesjonalnych aplikacji
      </p>
    </div>

    <!-- ScrollToTop Component -->
    <div class="space-y-4 animate-slide-up">
      <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        ScrollToTop
      </h3>
      <p class="text-slate-600 dark:text-slate-400">
        Fixed button pojawia się po scroll > 300px z smooth scroll behavior
      </p>
      <Card>
        <CardContent>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Przewiń stronę w dół, aby zobaczyć przycisk ScrollToTop w prawym dolnym rogu
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- PageCard Component -->
    <div class="space-y-4 animate-slide-up">
      <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        PageCard
      </h3>
      <p class="text-slate-600 dark:text-slate-400">
        Wrapper dla content z consistent padding i styling
      </p>
      <PageCard>
        <h4 class="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
          Example Card Content
        </h4>
        <p class="text-slate-600 dark:text-slate-400">
          To jest przykładowa zawartość PageCard. Możesz tu umieścić dowolną treść, tabele, formularze, etc.
        </p>
      </PageCard>
    </div>

    <!-- PageListHeader Component -->
    <div class="space-y-4 animate-slide-up">
      <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        PageListHeader
      </h3>
      <p class="text-slate-600 dark:text-slate-400">
        Header dla list pages z title, count badge i actions slot
      </p>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-border dark:border-gray-700">
        <PageListHeader
          title="Users"
          :count="42"
          description="Lista wszystkich użytkowników w systemie"
        >
          <template #actions>
            <Button size="sm">
              Add User
            </Button>
          </template>
        </PageListHeader>
        <p class="text-sm text-slate-600 dark:text-slate-400 mt-4">
          (Przykładowa lista użytkowników...)
        </p>
      </div>
    </div>

    <!-- PageListWrapper Component -->
    <div class="space-y-4 animate-slide-up">
      <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        PageListWrapper
      </h3>
      <p class="text-slate-600 dark:text-slate-400">
        Kombinacja PageCard + PageListHeader w jednym komponencie
      </p>
      <PageListWrapper
        title="Projects"
        :count="15"
        description="Wszystkie aktywne projekty"
      >
        <template #actions>
          <Button size="sm" variant="outline">
            Filter
          </Button>
          <Button size="sm">
            New Project
          </Button>
        </template>

        <div class="space-y-2 mt-4">
          <div class="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-border">
            Project Alpha
          </div>
          <div class="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-border">
            Project Beta
          </div>
          <div class="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-border">
            Project Gamma
          </div>
        </div>
      </PageListWrapper>
    </div>

    <!-- Layout Variants Info -->
    <div class="space-y-4 animate-slide-up">
      <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        Available Layouts
      </h3>
      <p class="text-slate-600 dark:text-slate-400">
        Vue Blocks Registry oferuje 5 gotowych layoutów
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card v-for="layout in layouts" :key="layout.title">
          <CardContent>
            <h4 class="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
              {{ layout.title }}
            </h4>
            <p class="text-slate-600 dark:text-slate-400">
              {{ layout.description }}
            </p>
            <p class="mt-4 text-sm">
              <LinkWithArrow :link-to="layout.linkTo" label="Zobacz komponenty" />
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
