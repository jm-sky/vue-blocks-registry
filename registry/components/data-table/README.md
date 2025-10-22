# DataTable Component

## Overview

Advanced DataTable component system for Vue 3 based on shadcn-vue and TanStack Table v8. Provides a fully-featured, type-safe table with sorting, filtering, pagination, row selection, and column visibility management.

## Project Status

### ✅ Completed

1. **Base Table Components** (from shadcn-vue)
   - ✅ Table.vue - HTML table wrapper with responsive overflow
   - ✅ TableHeader.vue - `<thead>` element
   - ✅ TableBody.vue - `<tbody>` element
   - ✅ TableRow.vue - `<tr>` with hover/selected states
   - ✅ TableHead.vue - `<th>` header cell
   - ✅ TableCell.vue - `<td>` data cell
   - ✅ TableEmpty.vue - Empty state row
   - ✅ TableCaption.vue - `<caption>` element
   - ✅ TableFooter.vue - `<tfoot>` element
   - ✅ Location: `registry/components/ui/table/`
   - ✅ Added to registry.json

2. **Dependencies**
   - ✅ @tanstack/vue-table (^8.21.2) - Table state management
   - ✅ checkbox component (from shadcn-vue) - For row selection
   - ✅ dropdown-menu component (from shadcn-vue) - For column visibility toggle
   - ✅ Moved to: `registry/components/ui/checkbox/` and `registry/components/ui/dropdown-menu/`

3. **Example Data & Types**
   - ✅ types.ts - Payment interface example
   - ✅ data.ts - Sample payment data (10 records)
   - ✅ columns.ts - Basic column definitions with formatting
   - ✅ Location: `registry/examples/data-table/`

4. **Basic Components**
   - ✅ DataTableBasic.vue - Simple table with TanStack integration
   - ✅ Location: `registry/components/data-table/`

---

## 🚧 TODO: Features to Implement

### Priority 1: Core DataTable Features

#### 1. **Sorting** ⏳
Based on shadcn-vue tutorial step 3 and azure-ocr-service implementation.

**Files to create:**
- `columns-sortable.ts` - Column definitions with sorting
- `DataTableWithSorting.vue` - Table with sorting state

**Implementation:**
```typescript
// Add to table setup
import { getSortedRowModel } from '@tanstack/vue-table'

const sorting = ref<SortingState>([])

const table = useVueTable({
  // ... existing config
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  getSortedRowModel: getSortedRowModel(),
  state: {
    get sorting() { return sorting.value },
  },
})
```

**Column definition with sorting:**
```typescript
{
  accessorKey: 'email',
  header: ({ column }) => {
    return h(Button, {
      variant: 'ghost',
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
    }, () => ['Email', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
  },
}
```

**Resources:**
- shadcn-vue docs: https://www.shadcn-vue.com/docs/components/data-table.html#sorting
- azure-ocr-service: Uses built-in TanStack sorting

---

#### 2. **Filtering** ⏳
Client-side filtering with search input.

**Files to create:**
- `DataTableWithFiltering.vue` - Table with filter input

**Implementation:**
```typescript
import { getFilteredRowModel } from '@tanstack/vue-table'

const filtering = ref('')

const table = useVueTable({
  // ... existing config
  onGlobalFilterChange: (value) => { filtering.value = value },
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get globalFilter() { return filtering.value },
  },
})
```

**UI Component:**
```vue
<Input
  v-model="filtering"
  placeholder="Filter emails..."
  class="max-w-sm"
/>
```

**Resources:**
- shadcn-vue docs: https://www.shadcn-vue.com/docs/components/data-table.html#filtering
- Need to add: Input component (already exists in button form, check if separate input exists)

---

#### 3. **Pagination** ⏳
Client-side and server-side pagination support.

**Files to create:**
- `Pagination.vue` - Pagination controls component
- `DataTableWithPagination.vue` - Table with pagination

**Implementation:**
```typescript
import { getPaginationRowModel } from '@tanstack/vue-table'

const table = useVueTable({
  // ... existing config
  getPaginationRowModel: getPaginationRowModel(),
  initialState: {
    pagination: {
      pageSize: 10,
    },
  },
})
```

**Pagination UI (from azure-ocr-service):**
- Page size selector (dropdown with options: 10, 20, 30, 40, 50, 100, 500)
- Navigation buttons: First (⏮), Previous (◀), Next (▶), Last (⏭)
- Page info: "Page 1 of 5"
- Total rows counter

**Props for server-side:**
```typescript
total?: number  // Total records from server
page: number    // Current page (v-model)
pageSize: number // Page size (v-model)
```

**Resources:**
- shadcn-vue docs: https://www.shadcn-vue.com/docs/components/data-table.html#pagination
- azure-ocr-service: `/src/components/DataTable/Pagination.vue`

---

#### 4. **Row Selection with Checkboxes** ⏳
Select single or multiple rows.

**Files to create:**
- `columns-selectable.ts` - Columns with selection checkbox
- `DataTableWithRowSelection.vue` - Table with row selection

**Implementation:**
```typescript
import { getRowSelectionModel } from '@tanstack/vue-table'

const rowSelection = ref({})

const table = useVueTable({
  // ... existing config
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  getRowSelectionModel: getRowSelectionModel(),
  state: {
    get rowSelection() { return rowSelection.value },
  },
})
```

**Selection column:**
```typescript
{
  id: 'select',
  header: ({ table }) => h(Checkbox, {
    checked: table.getIsAllPageRowsSelected(),
    onUpdate:checked: (value) => table.toggleAllPageRowsSelected(!!value),
  }),
  cell: ({ row }) => h(Checkbox, {
    checked: row.getIsSelected(),
    onUpdate:checked: (value) => row.toggleSelected(!!value),
  }),
  enableSorting: false,
  enableHiding: false,
}
```

**Resources:**
- shadcn-vue docs: https://www.shadcn-vue.com/docs/components/data-table.html#row-selection
- Checkbox component: `registry/components/ui/checkbox/`

---

#### 5. **Column Visibility Toggle** ⏳
Show/hide columns dynamically.

**Files to create:**
- `DataTableColumnVisibilityDropdown.vue` - Dropdown for toggling columns
- `DataTableWithColumnVisibility.vue` - Table with visibility controls

**Implementation:**
```typescript
const columnVisibility = ref({})

const table = useVueTable({
  // ... existing config
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  state: {
    get columnVisibility() { return columnVisibility.value },
  },
})
```

**UI Component:**
```vue
<DropdownMenu>
  <DropdownMenuTrigger as-child>
    <Button variant="outline">
      Columns
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuCheckboxItem
      v-for="column in table.getAllColumns().filter(c => c.getCanHide())"
      :key="column.id"
      :checked="column.getIsVisible()"
      @update:checked="(value) => column.toggleVisibility(!!value)"
    >
      {{ column.id }}
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Resources:**
- shadcn-vue docs: https://www.shadcn-vue.com/docs/components/data-table.html#visibility
- DropdownMenu: `registry/components/ui/dropdown-menu/`

---

### Priority 2: Final Integrated Component

#### 6. **DataTable.vue (Final Component)** ⏳
Combined component with all features, similar to azure-ocr-service implementation.

**Features:**
- ✅ Generic TypeScript support `<TData, TValue>`
- ⏳ Sorting (getSortedRowModel)
- ⏳ Filtering (getFilteredRowModel)
- ⏳ Pagination (getPaginationRowModel)
- ⏳ Row selection (with checkboxes)
- ⏳ Column visibility management
- ⏳ Custom cell rendering via slots
- ⏳ Empty state handling
- ⏳ Loading state support (opacity during loading)

**Props:**
```typescript
{
  columns: ColumnDef<TData>[]
  data: TData[]
  initialColumnVisibility?: VisibilityState
  total?: number                    // For server-side pagination
  page?: number                     // v-model (server-side)
  pageSize?: number                 // v-model (server-side)
  pageSizeOptions?: number[]
  enableSorting?: boolean
  enableFiltering?: boolean
  enableRowSelection?: boolean
  enableColumnVisibility?: boolean
}
```

**Slot System (from azure-ocr-service):**
```vue
<DataTable :columns="columns" :data="data">
  <template #[columnId]="{ column, row, data }">
    <!-- Custom cell content -->
  </template>
</DataTable>
```

**Reference:**
- azure-ocr-service: `/src/components/DataTable.vue`
- Should combine all features into one component
- Conditional feature enabling via props

---

### Priority 3: Advanced Features (Future)

#### 7. **Virtual Scrolling** 📅
For large datasets (1000+ rows).

**Implementation:**
- Use @tanstack/vue-virtual or similar
- Only render visible rows in viewport
- Significantly improves performance

**Resources:**
- TanStack Virtual: https://tanstack.com/virtual/latest

---

#### 8. **Server-Side Operations** 📅
Full server-side mode for sorting, filtering, pagination.

**Implementation:**
- Emit events for sort/filter/page changes
- Parent component handles API calls
- Table displays loading state during fetch

**Events:**
```typescript
emit('sort', { column: string, direction: 'asc' | 'desc' })
emit('filter', { query: string })
emit('page-change', { page: number, pageSize: number })
```

---

#### 9. **Expandable Rows** 📅
Nested content within rows.

**Implementation:**
- Add expand/collapse column
- Use getExpandedRowModel()
- Render sub-content in additional row

---

#### 10. **Column Resizing** 📅
Drag to resize column widths.

**Implementation:**
- Use getColumnResizeHandler()
- Add resize handles to headers
- Persist widths to localStorage

---

#### 11. **Column Reordering** 📅
Drag and drop to reorder columns.

**Implementation:**
- Use onColumnOrderChange
- Integrate with drag-drop library

---

## File Structure

```
registry/
├── components/
│   ├── ui/
│   │   ├── table/                          # Base table components (shadcn-vue)
│   │   │   ├── Table.vue
│   │   │   ├── TableHeader.vue
│   │   │   ├── TableBody.vue
│   │   │   ├── TableRow.vue
│   │   │   ├── TableHead.vue
│   │   │   ├── TableCell.vue
│   │   │   ├── TableEmpty.vue
│   │   │   ├── TableCaption.vue
│   │   │   ├── TableFooter.vue
│   │   │   └── index.ts
│   │   ├── checkbox/                       # Checkbox component
│   │   └── dropdown-menu/                  # Dropdown menu components
│   │
│   └── data-table/                         # DataTable components
│       ├── README.md                       # This file
│       ├── DataTableBasic.vue             # ✅ Basic table (step 1-2)
│       ├── DataTableWithSorting.vue       # ⏳ With sorting (step 3)
│       ├── DataTableWithFiltering.vue     # ⏳ With filtering (step 4)
│       ├── DataTableWithPagination.vue    # ⏳ With pagination (step 5)
│       ├── DataTableWithRowSelection.vue  # ⏳ With row selection (step 6)
│       ├── DataTableWithColumnVisibility.vue # ⏳ With column visibility
│       ├── DataTable.vue                  # ⏳ Final integrated component
│       ├── Pagination.vue                 # ⏳ Pagination controls
│       └── index.ts                       # Exports
│
└── examples/
    └── data-table/                         # Example data and columns
        ├── README.md                       # Example usage docs
        ├── types.ts                        # ✅ Payment interface
        ├── data.ts                         # ✅ Sample data
        ├── columns.ts                      # ✅ Basic columns
        ├── columns-sortable.ts            # ⏳ With sorting
        ├── columns-selectable.ts          # ⏳ With selection
        └── columns-advanced.ts            # ⏳ Full example
```

---

## Utility Functions Needed

Add to `registry/lib/utils.ts`:

```typescript
// Already exists:
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// TODO: Add this for TanStack updaters
export function valueUpdater<T extends Updater<any>>(
  updaterOrValue: T,
  ref: Ref
) {
  ref.value = typeof updaterOrValue === 'function'
    ? updaterOrValue(ref.value)
    : updaterOrValue
}
```

---

## Registry.json Entries

### ✅ Completed:
```json
{
  "name": "table",
  "type": "registry:ui",
  "title": "Table",
  "description": "Base table components from shadcn-vue",
  "files": [/* 10 files */],
  "registryDependencies": ["utils"]
}
```

### ⏳ TODO:
```json
{
  "name": "checkbox",
  "type": "registry:ui",
  "title": "Checkbox",
  "registryDependencies": ["utils"]
}
```

```json
{
  "name": "dropdown-menu",
  "type": "registry:ui",
  "title": "Dropdown Menu",
  "registryDependencies": ["utils"]
}
```

```json
{
  "name": "data-table",
  "type": "registry:ui",
  "title": "DataTable",
  "description": "Advanced DataTable with TanStack Table",
  "files": [
    "components/data-table/DataTable.vue",
    "components/data-table/Pagination.vue",
    "components/data-table/index.ts"
  ],
  "dependencies": ["@tanstack/vue-table"],
  "registryDependencies": ["table", "checkbox", "dropdown-menu", "button", "input"]
}
```

```json
{
  "name": "data-table-examples",
  "type": "registry:example",
  "title": "DataTable Examples",
  "files": [
    "examples/data-table/types.ts",
    "examples/data-table/data.ts",
    "examples/data-table/columns.ts"
  ]
}
```

---

## Demo Page TODO

Create: `src/pages/demo/DataTable.vue`

**Sections:**
1. Basic Table - DataTableBasic with simple columns
2. Sortable Table - With sorting on headers
3. Filtered Table - With search input
4. Paginated Table - With pagination controls
5. Selectable Rows - With checkboxes
6. Column Visibility - With toggle dropdown
7. Full Featured - Final DataTable with all features
8. Server-Side Example - With loading states and API simulation

**Add to navigation:**
- Overview page: Add DataTable category card
- Nav menu: Add "Data Table" link

---

## References

### Official Documentation:
- shadcn-vue DataTable: https://www.shadcn-vue.com/docs/components/data-table.html
- TanStack Table: https://tanstack.com/table/latest/docs/introduction
- TanStack Table Vue: https://tanstack.com/table/latest/docs/framework/vue/vue-table

### azure-ocr-service Implementation:
- Main DataTable: `/src/components/DataTable.vue`
- Pagination: `/src/components/DataTable/Pagination.vue`
- Base components: `/src/components/ui/table/`
- Example usage: `/src/views/attachments/AttachmentsListView.vue`

### Key Patterns:
1. **Generic component**: `<TData, TValue>` for type safety
2. **v-model for pagination**: `page` and `pageSize`
3. **Slot-based customization**: Named slots per column
4. **Resource pattern**: `ResourceResponse<T>` with meta
5. **Reactive filters**: Watch filters, trigger API calls

---

## Next Steps

1. ✅ Base table components - DONE
2. ✅ Basic DataTable - DONE
3. ⏳ Add valueUpdater to utils.ts
4. ⏳ Implement sorting (DataTableWithSorting.vue + columns-sortable.ts)
5. ⏳ Implement filtering (DataTableWithFiltering.vue + Input component check)
6. ⏳ Implement pagination (Pagination.vue + DataTableWithPagination.vue)
7. ⏳ Implement row selection (columns-selectable.ts + DataTableWithRowSelection.vue)
8. ⏳ Implement column visibility (DataTableWithColumnVisibility.vue)
9. ⏳ Create final DataTable.vue (all features integrated)
10. ⏳ Add checkbox & dropdown-menu to registry.json
11. ⏳ Create demo page with all examples
12. ⏳ Update overview page with DataTable category

---

**Status:** 🟡 In Progress (20% complete)
**Last Updated:** 2025-01-22
**Priority:** HIGH - DataTable is a core component for data-heavy applications
