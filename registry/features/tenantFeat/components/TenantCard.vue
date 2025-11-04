<!-- features/tenantFeat/components/TenantCard.vue -->
<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@registry/components/ui/card'
import { cn } from '@registry/lib/utils'
import type { Tenant } from '../types/tenant.types'

interface Props {
  tenant: Tenant
  isSelected?: boolean
  disabled?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<(e: 'click', tenant: Tenant) => void>()

function handleClick() {
  if (!props.disabled) {
    emit('click', props.tenant)
  }
}
</script>

<template>
  <Card
    :class="cn(
      'cursor-pointer transition-all hover:shadow-lg',
      isSelected && 'ring-2 ring-primary',
      disabled && 'opacity-50 cursor-not-allowed'
    )"
    @click="handleClick"
  >
    <CardHeader>
      <div class="flex items-start justify-between">
        <div class="flex items-center gap-3">
          <div
            v-if="tenant.logo"
            class="flex size-12 items-center justify-center rounded-lg bg-muted"
          >
            <img :src="tenant.logo" :alt="tenant.name" class="h-full w-full rounded-lg object-cover">
          </div>
          <div
            v-else
            class="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-lg"
          >
            {{ tenant.name.charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1">
            <CardTitle class="text-lg">
              {{ tenant.name }}
            </CardTitle>
            <CardDescription v-if="tenant.description" class="mt-1">
              {{ tenant.description }}
            </CardDescription>
          </div>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div class="flex items-center justify-between">
        <div class="text-sm text-muted-foreground">
          <span v-if="tenant.slug">{{ tenant.slug }}</span>
          <span v-else-if="tenant.businessIdentifier">{{ tenant.businessIdentifier }}</span>
        </div>
        <Button
          :variant="isSelected ? 'default' : 'outline'"
          size="sm"
          :disabled="disabled"
        >
          {{ isSelected ? 'Selected' : 'Select' }}
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
