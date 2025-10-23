<script setup lang="ts">
import { FileText, Home, LayoutDashboard, Link2, MousePointerClick, Table } from 'lucide-vue-next'
import Sidebar from '@/components/ui/sidebar/Sidebar.vue'
import SidebarContent from '@/components/ui/sidebar/SidebarContent.vue'
import SidebarGroup from '@/components/ui/sidebar/SidebarGroup.vue'
import SidebarGroupLabel from '@/components/ui/sidebar/SidebarGroupLabel.vue'
import SidebarInset from '@/components/ui/sidebar/SidebarInset.vue'
import SidebarMenu from '@/components/ui/sidebar/SidebarMenu.vue'
import SidebarMenuButton from '@/components/ui/sidebar/SidebarMenuButton.vue'
import SidebarMenuItem from '@/components/ui/sidebar/SidebarMenuItem.vue'
import { RoutePaths } from '@/router/route-names'

// TODO: Extract to separate config file when navigation grows
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
</script>

<template>
  <!-- Positioned below header (top-14), full height minus header, z-30 -->
  <Sidebar
    collapsible="offcanvas"
    wrapper-class="[&>div:last-child]:!top-14 [&>div:last-child]:!bottom-0 [&>div:last-child]:!h-[calc(100vh-3.5rem)] [&>div:last-child]:!z-30"
  >
    <SidebarContent>
      <SidebarGroup v-for="group in sidebarNav" :key="group.title">
        <SidebarGroupLabel>{{ group.title }}</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem v-for="item in group.items" :key="item.title">
            <SidebarMenuButton as-child class="border border-transparent hover:bg-primary/5 hover:shadow-md transition-all duration-300">
              <RouterLink
                :to="item.href"
                exact-active-class="bg-primary/10 !border-primary/30 shadow-sm"
              >
                <component :is="item.icon" />
                <span>{{ item.title }}</span>
              </RouterLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>

  <!-- Content with left margin (16rem) on desktop to avoid sidebar overlap -->
  <SidebarInset class="md:ml-[var(--sidebar-width)]">
    <div class="mx-auto w-full max-w-screen-2xl px-4 py-6 lg:py-8">
      <slot />
    </div>
  </SidebarInset>
</template>
