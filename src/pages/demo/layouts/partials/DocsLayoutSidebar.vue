<script setup lang="ts">
import { Building2Icon, FileText, Home, Languages, LayoutDashboard, Link2, LogOutIcon, MousePointerClick, SettingsIcon, Table, UserIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LogoIcon from '@/components/brand/LogoIcon.vue'
import LogoText from '@/components/brand/LogoText.vue'
import { RoutePaths } from '@/router/route-names'

// Mobile menu state
const isMobileMenuOpen = ref(false)

const { t } = useI18n()

const sidebarNav = computed(() => [
  {
    title: t('demo.sidebar.getting_started'),
    items: [
      { title: t('demo.sidebar.overview'), href: RoutePaths.DEMO, icon: Home },
      { title: t('demo.sidebar.introduction'), href: RoutePaths.DEMO_INTRODUCTION, icon: FileText },
    ],
  },
  {
    title: t('demo.sidebar.components'),
    items: [
      { title: t('demo.sidebar.button'), href: RoutePaths.DEMO_COMPONENTS_BUTTON, icon: MousePointerClick },
      { title: t('demo.sidebar.links'), href: RoutePaths.DEMO_COMPONENTS_LINKS, icon: Link2 },
      { title: t('demo.sidebar.layout'), href: RoutePaths.DEMO_COMPONENTS_LAYOUT, icon: LayoutDashboard },
      { title: t('demo.sidebar.data_table'), href: RoutePaths.DEMO_COMPONENTS_DATA_TABLE, icon: Table },
    ],
  },
  {
    title: t('demo.sidebar.examples'),
    items: [
      { title: t('demo.sidebar.dashboard'), href: RoutePaths.DEMO_EXAMPLES_DASHBOARD, icon: LayoutDashboard },
      { title: t('demo.sidebar.authentication'), href: RoutePaths.DEMO_EXAMPLES_AUTH, icon: FileText },
      { title: t('demo.examples_page.i18n_example.title'), href: RoutePaths.DEMO_EXAMPLES_I18N, icon: Languages },
      { title: t('demo.examples_page.settings_example.title'), href: RoutePaths.DEMO_EXAMPLES_SETTINGS, icon: SettingsIcon },
      { title: t('demo.examples_page.user_example.title'), href: RoutePaths.DEMO_EXAMPLES_USER, icon: UserIcon },
      { title: t('demo.examples_page.logs_example.title'), href: RoutePaths.DEMO_EXAMPLES_LOGS, icon: LogOutIcon },
      { title: t('demo.examples_page.tenant_example.title', 'Multi-Tenancy'), href: RoutePaths.DEMO_EXAMPLES_TENANT, icon: Building2Icon }
    ],
  },
])

// Close mobile menu on route change
const handleLinkClick = () => {
  isMobileMenuOpen.value = false
}

// Expose for parent (header trigger)
defineExpose({
  isMobileMenuOpen,
  toggleMobileMenu: () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }
})
</script>

<template>
  <!-- Desktop Sidebar -->
  <aside class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
    <div class="h-full overflow-auto py-6 pl-2 pr-6 lg:py-8">
      <nav>
        <div v-for="group in sidebarNav" :key="group.title" class="pb-4">
          <h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {{ group.title }}
          </h4>
          <div class="grid grid-flow-row auto-rows-max text-sm gap-2">
            <RouterLink
              v-for="item in group.items"
              :key="item.href"
              :to="item.href"
              class="group flex w-full items-center rounded-md border border-transparent px-3 py-2 hover:bg-primary/5 hover:shadow-md transition-all duration-300"
              exact-active-class="bg-primary/10 !border-primary/30 shadow-sm"
            >
              <component :is="item.icon" class="mr-2 size-4" />
              {{ item.title }}
            </RouterLink>
          </div>
        </div>
      </nav>
    </div>
  </aside>

  <!-- Mobile Sidebar (Overlay) -->
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-from-class="opacity-0"
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-50 bg-black/50 md:hidden"
        @click="isMobileMenuOpen = false"
      />
    </Transition>

    <!-- Sliding Sidebar -->
    <aside
      class="fixed left-0 top-0 bottom-0 w-64 bg-background border-r overflow-auto z-50 md:hidden transition-transform duration-300 ease-out"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
      @click.stop
    >
      <!-- Logo Header -->
      <div class="flex items-center gap-2 p-4 border-b">
        <RouterLink :to="RoutePaths.DEMO" class="flex items-center gap-2" @click="handleLinkClick">
          <LogoIcon class="size-6 shrink-0" />
          <LogoText class="text-sm line-clamp-2" />
        </RouterLink>
      </div>

      <!-- Navigation -->
      <div class="p-4">
        <nav>
          <div v-for="group in sidebarNav" :key="group.title" class="pb-4">
            <h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
              {{ group.title }}
            </h4>
            <div class="grid grid-flow-row auto-rows-max text-sm gap-2">
              <RouterLink
                v-for="item in group.items"
                :key="item.href"
                :to="item.href"
                class="group flex w-full items-center rounded-md border border-transparent px-3 py-2 hover:bg-primary/5 transition-all duration-300"
                exact-active-class="bg-primary/10 !border-primary/30"
                @click="handleLinkClick"
              >
                <component :is="item.icon" class="mr-2 size-4" />
                {{ item.title }}
              </RouterLink>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  </Teleport>
</template>
