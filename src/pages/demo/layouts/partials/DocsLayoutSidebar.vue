<script setup lang="ts">
import { FileText, Home, LayoutDashboard, Link2, MousePointerClick, Table } from 'lucide-vue-next'
import { ref } from 'vue'
import { RoutePaths } from '@/router/route-names'

// Mobile menu state
const isMobileMenuOpen = ref(false)

const sidebarNav = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Overview', href: RoutePaths.DEMO, icon: Home },
      { title: 'Introduction', href: RoutePaths.DEMO_INTRODUCTION, icon: FileText },
    ],
  },
  {
    title: 'Components',
    items: [
      { title: 'Button', href: RoutePaths.DEMO_COMPONENTS_BUTTON, icon: MousePointerClick },
      { title: 'Links', href: RoutePaths.DEMO_COMPONENTS_LINKS, icon: Link2 },
      { title: 'Layout', href: RoutePaths.DEMO_COMPONENTS_LAYOUT, icon: LayoutDashboard },
      { title: 'Data Table', href: RoutePaths.DEMO_COMPONENTS_DATA_TABLE, icon: Table },
    ],
  },
  {
    title: 'Examples',
    items: [
      { title: 'Dashboard', href: RoutePaths.DEMO_EXAMPLES_DASHBOARD, icon: LayoutDashboard },
      { title: 'Authentication', href: RoutePaths.DEMO_EXAMPLES_AUTH, icon: FileText },
    ],
  },
]

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
    <div class="h-full overflow-auto py-6 pr-6 lg:py-8">
      <nav>
        <div v-for="group in sidebarNav" :key="group.title" class="pb-4">
          <h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {{ group.title }}
          </h4>
          <div class="grid grid-flow-row auto-rows-max text-sm gap-2">
            <RouterLink
              v-for="item in group.items"
              :key="item.title"
              :to="item.href"
              class="group flex w-full items-center rounded-md border border-transparent px-3 py-2 hover:bg-primary/5 transition-all duration-300"
              exact-active-class="bg-primary/10 !border-primary/30"
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
      class="fixed left-0 top-14 bottom-0 w-64 bg-background border-r overflow-auto z-50 md:hidden transition-transform duration-300 ease-out"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
      @click.stop
    >
      <div class="p-4">
        <nav>
          <div v-for="group in sidebarNav" :key="group.title" class="pb-4">
            <h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
              {{ group.title }}
            </h4>
            <div class="grid grid-flow-row auto-rows-max text-sm gap-2">
              <RouterLink
                v-for="item in group.items"
                :key="item.title"
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
