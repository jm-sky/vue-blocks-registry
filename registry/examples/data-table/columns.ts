import { h } from 'vue'
import type { Payment } from './types'
import type { ColumnDef } from '@tanstack/vue-table'

// Basic column definitions (shadcn-vue tutorial step 1)
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left' }, 'ID'),
    cell: ({ row }) => {
      const id = String(row.getValue('id'))
      return h('div', { class: 'text-left font-medium' }, id)
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      const status = String(row.getValue('status'))
      return h('div', { class: 'text-left capitalize' }, status)
    },
  },
  {
    accessorKey: 'email',
    header: () => h('div', { class: 'text-left' }, 'Email'),
    cell: ({ row }) => {
      const email = String(row.getValue('email'))
      return h('div', { class: 'text-left' }, email)
    },
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  },
]
