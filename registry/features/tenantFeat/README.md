# Tenant Feature (tenantFeat)

Multi-tenancy feature for Vue Blocks Registry. Allows users to belong to multiple tenants (organizations/workspaces) and switch between them.

## Overview

This feature implements a complete multi-tenancy system where:
- Users can belong to multiple tenants
- Users can switch between tenants
- Tenant context is stored in JWT token (`tid` and `trol` claims)
- All API requests automatically include tenant context

## Structure

```
tenantFeat/
├─ lib/
│  └─ jwtDecoder.ts              # JWT decoding utilities
├─ types/
│  └─ tenant.types.ts            # TypeScript types
├─ store/
│  └─ useTenantStore.ts          # Pinia store for tenant state
├─ services/
│  ├─ tenantService.ts           # Tenant CRUD operations
│  └─ tenantMembershipService.ts # Tenant membership operations
├─ composables/
│  ├─ useTenant.ts               # Access current tenant from JWT
│  ├─ useTenantSwitch.ts         # Switch between tenants
│  └─ useTenantList.ts           # Fetch list of user's tenants
├─ config/
│  ├─ tenant.config.ts           # Configuration with defaults
│  └─ routes.ts                  # Vue Router routes and paths
├─ guards/
│  └─ tenantGuard.ts             # Router guard for tenant-protected routes
├─ utils/
│  └─ queryUtils.ts              # Tanstack Query utilities
├─ pages/
│  └─ SelectTenantPage.vue       # Tenant selection page
├─ components/
│  ├─ TenantGrid.vue             # Grid with search for tenants
│  └─ TenantCard.vue             # Individual tenant card
├─ index.ts                      # Public exports
└─ README.md                     # This file
```

## Usage

### Basic Usage

```typescript
import { useTenant, useTenantSwitch, useTenantList } from '@registry/features/tenantFeat'

// Get current tenant info
const { tenantId, tenantRole, currentTenant, hasTenant } = useTenant()

// Switch tenant
const { switchTenant, isSwitching } = useTenantSwitch()
switchTenant('tenant-id-123', {
  onSuccess: () => {
    console.log('Switched successfully')
  }
})

// Get list of user's tenants
const { tenants, isLoading } = useTenantList()
```

### Using Tenant Store

```typescript
import { useTenantStore } from '@registry/features/tenantFeat'

const tenantStore = useTenantStore()

// Access current tenant
const currentTenant = tenantStore.currentTenant
const availableTenants = tenantStore.availableTenants
const tenantId = tenantStore.currentTenantId
const tenantRole = tenantStore.currentTenantRole

// Load tenants
await tenantStore.loadUserTenants()

// Switch tenant
await tenantStore.switchTenant('tenant-id-123')
```

### Adding Routes

```typescript
import { tenantRoutes } from '@registry/features/tenantFeat'
import { router } from './router'

// Add routes to your router
tenantRoutes.forEach(route => router.addRoute(route))
```

### Using Tenant Guard

```typescript
import { protectTenantRoutes } from '@registry/features/tenantFeat'
import { router } from './router'

// Protect routes that require tenant context
protectTenantRoutes(router)

// Mark routes that require tenant
router.addRoute({
  path: '/dashboard',
  meta: { requiresTenant: true },
  // ...
})
```

## JWT Token Structure

The JWT token includes tenant context in the payload:

```typescript
{
  sub: string,        // userId
  email: string,
  tid?: string,       // tenantId - current tenant context
  trol?: string,      // tenantRole - user's role in tenant (owner, admin, member, viewer)
  iat: number,
  exp: number
}
```

## API Endpoints

This feature expects the following backend endpoints:

- `GET /tenants` - Get list of user's tenants
- `GET /tenants/:id` - Get tenant details
- `POST /tenants` - Create new tenant
- `PATCH /tenants/:id` - Update tenant
- `POST /tenants/:id/switch` - Switch tenant (returns new JWT token)
- `GET /tenants/:id/membership` - Get tenant membership details
- `GET /tenants/:id/users` - Get list of tenant users

## Configuration

### Tenant Config

The tenant feature uses a configuration system similar to the auth module:

```typescript
import { getTenantConfig } from '@registry/features/tenantFeat'

const config = getTenantConfig({
  query: {
    staleTime: 10 * 60 * 1000, // 10 minutes
  },
})
```

### Route Paths

Routes can be configured via environment variables:

```env
VITE_TENANT_SELECT_PATH=/select-tenant
VITE_TENANT_DASHBOARD_PATH=/dashboard
```

Or use the exported constants:

```typescript
import { TenantRoutePaths, TenantRouteNames } from '@registry/features/tenantFeat'

router.push(TenantRoutePaths.selectTenant)
router.push({ name: TenantRouteNames.selectTenant })
```

## Dependencies

- `@registry/modules/auth` - Authentication module (required)
- `jwt-decode` - JWT decoding library
- `@tanstack/vue-query` - Server state management
- `pinia` - State management
- `vue-router` - Routing

## Integration with Auth

The tenant feature integrates with the auth module:
- Reads JWT token from `authStore.token`
- Updates JWT token in `authStore` when switching tenants
- Tenant context is automatically included in API requests via `authInterceptor`

## TypeScript Types

All types are exported from `@registry/features/tenantFeat`:

```typescript
import type { Tenant, TenantRole, TenantMembership } from '@registry/features/tenantFeat'
```

## Components

### TenantGrid

Displays a searchable grid of tenant cards.

```vue
<script setup>
import { TenantGrid } from '@registry/features/tenantFeat'
</script>

<template>
  <TenantGrid />
</template>
```

### TenantCard

Individual tenant card component.

```vue
<script setup>
import { TenantCard } from '@registry/features/tenantFeat'
import type { Tenant } from '@registry/features/tenantFeat'
</script>

<template>
  <TenantCard
    :tenant="tenant"
    :is-selected="false"
    @click="handleSelect"
  />
</template>
```
