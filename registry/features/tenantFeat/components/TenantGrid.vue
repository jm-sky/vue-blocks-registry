<!-- features/tenantFeat/components/TenantGrid.vue -->
<script setup lang="ts">
import { Input } from '@registry/components/ui/input'
import { isAxiosError } from 'axios'
import { SearchIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import type { Tenant } from '../types/tenant.types'
import type { ITenantService } from '../types/tenantService.type'
import { useTenant } from '../composables/useTenant'
import { useTenantList } from '../composables/useTenantList'
import { useTenantSwitch } from '../composables/useTenantSwitch'
import { TenantRoutePaths } from '../config/routes'
import TenantCard from './TenantCard.vue'

const { tenantService } = defineProps<{
  tenantService?: ITenantService
}>()

const router = useRouter()
const { tenants, isLoading } = useTenantList(tenantService)
const { switchTenant: switchTenantMutation, isSwitching } = useTenantSwitch(tenantService)
const { tenantId } = useTenant(tenantService)

const searchQuery = ref('')

const filteredTenants = computed<Tenant[]>(() => {
  if (!searchQuery.value.trim()) {
    return tenants.value ?? []
  }

  const query = searchQuery.value.toLowerCase()
  return tenants.value?.filter(tenant =>
    tenant.name.toLowerCase().includes(query) ||
    tenant.slug.toLowerCase().includes(query) ||
    (tenant.description?.toLowerCase().includes(query) ?? false) ||
    (tenant.businessIdentifier?.toLowerCase().includes(query) ?? false)
  ) ?? []
})

async function handleTenantSelect(tenant: Tenant) {
  if (tenant.id === tenantId.value) {
    // Already selected, redirect to dashboard
    await router.push(TenantRoutePaths.dashboard)
    return
  }

  switchTenantMutation(tenant.id, {
    onSuccess: () => {
      toast.success(`Switched to ${tenant.name}`)
      // Redirect to original destination or dashboard
      const redirectTo = router.currentRoute.value.query.redirectTo as string | undefined
      void router.push(redirectTo ?? TenantRoutePaths.dashboard)
    },
    onError: (error: unknown) => {
      toast.error(isAxiosError(error) ? error.response?.data?.message ?? 'Failed to switch tenant' : 'Failed to switch tenant')
    },
  })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Search Input -->
    <div class="relative">
      <div class="relative">
        <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
        <Input
          v-model="searchQuery"
          type="text"
          placeholder="Search tenants..."
          class="w-full pl-9"
        />
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="i in 3" :key="i" class="h-32 animate-pulse rounded-lg bg-muted" />
    </div>

    <!-- Empty State -->
    <div
      v-else-if="filteredTenants.length === 0"
      class="flex flex-col items-center justify-center py-12 text-center"
    >
      <p class="text-lg font-medium text-muted-foreground">
        {{ searchQuery ? 'No tenants found' : 'No tenants available' }}
      </p>
      <p v-if="searchQuery" class="mt-2 text-sm text-muted-foreground">
        Try a different search term
      </p>
    </div>

    <!-- Tenant Grid -->
    <div
      v-else
      class="flex flex-col gap-4"
    >
      <TenantCard
        v-for="tenant in filteredTenants"
        :key="tenant.id"
        :tenant="tenant"
        :is-selected="tenant.id === tenantId"
        :disabled="isSwitching"
        @click="handleTenantSelect"
      />
    </div>
  </div>
</template>
