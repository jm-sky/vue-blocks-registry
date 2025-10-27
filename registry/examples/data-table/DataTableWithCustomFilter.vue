<script setup lang="ts">
import { DataTable } from '@registry/components/data-table'
import type { Payment } from './types'
import { columnsSortable } from './columns-sortable'
import { data } from './data'

// Custom global filter function that works with full row data
const customGlobalFilter = (row: Payment, filterValue: string): boolean => {
  if (!filterValue) return true
  
  const searchTerm = filterValue.toLowerCase()
  
  // Search across multiple fields
  return (
    row.id.toLowerCase().includes(searchTerm) ||
    row.email.toLowerCase().includes(searchTerm) ||
    row.status.toLowerCase().includes(searchTerm) ||
    row.amount.toString().includes(searchTerm)
  )
}

// Advanced filter function with multiple criteria
const advancedGlobalFilter = (row: Payment, filterValue: string): boolean => {
  if (!filterValue) return true
  
  const searchTerm = filterValue.toLowerCase()
  
  // Support for special search patterns
  if (searchTerm.startsWith('status:')) {
    const status = searchTerm.replace('status:', '').trim()
    return row.status.toLowerCase().includes(status)
  }
  
  if (searchTerm.startsWith('amount>')) {
    const amount = parseFloat(searchTerm.replace('amount>', '').trim())
    return !isNaN(amount) && row.amount > amount
  }
  
  if (searchTerm.startsWith('amount<')) {
    const amount = parseFloat(searchTerm.replace('amount<', '').trim())
    return !isNaN(amount) && row.amount < amount
  }
  
  // Default search across all fields
  return (
    row.id.toLowerCase().includes(searchTerm) ||
    row.email.toLowerCase().includes(searchTerm) ||
    row.status.toLowerCase().includes(searchTerm) ||
    row.amount.toString().includes(searchTerm)
  )
}

// Example of a filter function that searches in nested objects (if data had them)
// const nestedObjectFilter = (row: Payment, filterValue: string): boolean => {
//   if (!filterValue) return true
//   
//   const searchTerm = filterValue.toLowerCase()
//   
//   // Example: if Payment had a nested user object
//   return (
//     row.user?.name?.toLowerCase().includes(searchTerm) ||
//     row.user?.email?.toLowerCase().includes(searchTerm) ||
//     row.id.toLowerCase().includes(searchTerm)
//   )
// }
</script>

<template>
  <div class="space-y-8 p-6">
    <h1 class="text-3xl font-bold">
      DataTable with Custom Global Filter
    </h1>

    <!-- Example 1: Basic custom filter -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">
        1. Custom Global Filter
      </h2>
      <p class="text-muted-foreground mb-4">
        Search across ID, email, status, and amount fields.
      </p>
      <DataTable
        :columns="columnsSortable"
        :data="data"
        :global-filter-fn="customGlobalFilter"
        search-placeholder="Search across all fields..."
      />
    </section>

    <!-- Example 2: Advanced filter with special patterns -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">
        2. Advanced Filter with Patterns
      </h2>
      <p class="text-muted-foreground mb-4">
        Try these search patterns:<br>
        • <code>status:pending</code> - Filter by status<br>
        • <code>amount>100</code> - Filter by amount greater than 100<br>
        • <code>amount&lt;50</code> - Filter by amount less than 50<br>
        • <code>john</code> - Regular text search
      </p>
      <DataTable
        :columns="columnsSortable"
        :data="data"
        :global-filter-fn="advancedGlobalFilter"
        search-placeholder="Try: status:pending, amount>100, or john..."
      />
    </section>

    <!-- Example 3: Default filter (for comparison) -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">
        3. Default Filter (Comparison)
      </h2>
      <p class="text-muted-foreground mb-4">
        Using the default TanStack Table filter for comparison.
      </p>
      <DataTable
        :columns="columnsSortable"
        :data="data"
        search-placeholder="Default string search..."
      />
    </section>
  </div>
</template>

<style scoped>
code {
  @apply bg-muted px-1 py-0.5 rounded text-sm font-mono;
}
</style>
