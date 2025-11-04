import { Button } from '@registry/components/ui/button'
import { Checkbox } from '@registry/components/ui/checkbox'
import { ArrowUpDown } from 'lucide-vue-next'
import { h } from 'vue'
import type { Payment } from './types'
import type { ColumnDef } from '@tanstack/vue-table'

// Column definitions with row selection (shadcn-vue tutorial step 6)
export const columnsWithSelection: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        checked:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate'),
        'onUpdate:checked': (value: boolean) => { table.toggleAllPageRowsSelected(value) },
        'aria-label': 'Select all',
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        'onUpdate:checked': (value: boolean) => { row.toggleSelected(value) },
        'aria-label': 'Select row',
      }),
    enableSorting: false,
    enableHiding: false,
  },
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
