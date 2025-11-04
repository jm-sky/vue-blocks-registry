import { Button } from '@registry/components/ui/button'
import { ArrowUpDown } from 'lucide-vue-next'
import { h } from 'vue'
import type { Payment } from './types'
import type { ColumnDef } from '@tanstack/vue-table'

// Sortable column definitions (shadcn-vue tutorial step 3)
export const columnsSortable: ColumnDef<Payment>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => { column.toggleSorting(column.getIsSorted() === 'asc') },
        class: 'h-8 px-2 lg:px-3',
      }, () => [
        'ID',
        h(ArrowUpDown, { class: 'ml-2 size-4' })
      ])
    },
    cell: ({ row }) => {
      const id = String(row.getValue('id'))
      return h('div', { class: 'text-left font-medium' }, id)
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => { column.toggleSorting(column.getIsSorted() === 'asc') },
        class: 'h-8 px-2 lg:px-3',
      }, () => [
        'Status',
        h(ArrowUpDown, { class: 'ml-2 size-4' })
      ])
    },
    cell: ({ row }) => {
      const status = String(row.getValue('status'))
      return h('div', { class: 'text-left capitalize' }, status)
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => { column.toggleSorting(column.getIsSorted() === 'asc') },
        class: 'h-8 px-2 lg:px-3',
      }, () => [
        'Email',
        h(ArrowUpDown, { class: 'ml-2 size-4' })
      ])
    },
    cell: ({ row }) => {
      const email = String(row.getValue('email'))
      return h('div', { class: 'text-left' }, email)
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => { column.toggleSorting(column.getIsSorted() === 'asc') },
        class: 'h-8 px-2 lg:px-3',
      }, () => [
        'Amount',
        h(ArrowUpDown, { class: 'ml-2 size-4' })
      ])
    },
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
