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
   - ✅ input component (from shadcn-vue) - For filtering
   - ✅ button component (from shadcn-vue) - For sorting and actions
   - ✅ Location: `registry/components/ui/`

3. **Example Data & Types**
   - ✅ types.ts - Payment interface example
   - ✅ data.ts - Sample payment data (10 records)
   - ✅ columns.ts - Basic column definitions with formatting
   - ✅ columns-sortable.ts - Column definitions with sorting
   - ✅ columns-with-selection.ts - Column definitions with row selection
   - ✅ Location: `registry/examples/data-table/`

4. **Individual Feature Components**
   - ✅ DataTableBasic.vue - Simple table with TanStack integration
   - ✅ DataTableWithSorting.vue - Table with sorting functionality
   - ✅ DataTableWithFiltering.vue - Table with global filtering
   - ✅ DataTableWithPagination.vue - Table with pagination
   - ✅ Pagination.vue - Reusable pagination controls component
   - ✅ Location: `registry/components/data-table/`

5. **Unified DataTable Component** 🎉
   - ✅ DataTable.vue - **MAIN COMPONENT** with ALL features
   - ✅ Generic TypeScript support `<TData, TValue>`
   - ✅ Sorting (getSortedRowModel) - Click column headers to sort
   - ✅ Filtering (getFilteredRowModel) - Global search with custom filter functions
   - ✅ Pagination (getPaginationRowModel) - Client-side and server-side support
   - ✅ Row selection (with checkboxes) - Select single or multiple rows
   - ✅ Column visibility management - Show/hide columns dynamically
   - ✅ Custom global filter functions - Pass callback with full row data access
   - ✅ Server-side pagination support - Control pagination from parent
   - ✅ Feature toggles - Enable/disable any feature independently
   - ✅ Event system - Emit events for pagination and selection changes
   - ✅ Empty state handling - Display "No results" when no data
   - ✅ TypeScript generics - Full type safety

6. **Utility Functions**
   - ✅ valueUpdater - TanStack Table state updater utility
   - ✅ Location: `registry/lib/utils.ts`

7. **Example Components**
   - ✅ DataTableExample.vue - Comprehensive usage examples
   - ✅ DataTableWithCustomFilter.vue - Custom filter function examples
   - ✅ Location: `registry/examples/data-table/`

---

## 🎯 **MAIN COMPONENT: DataTable.vue**

The unified DataTable component combines all features into a single, highly configurable component.

### **Features:**
- ✅ **Sorting** - Click column headers to sort (asc/desc)
- ✅ **Filtering** - Global search with custom filter functions
- ✅ **Pagination** - Client-side and server-side pagination
- ✅ **Row Selection** - Checkbox selection with state management
- ✅ **Column Visibility** - Show/hide columns dynamically
- ✅ **Custom Global Filter** - Pass callback function with full row data access
- ✅ **Server-side Support** - Control pagination from parent component
- ✅ **Feature Toggles** - Enable/disable any feature independently
- ✅ **TypeScript Generics** - Full type safety with `<TData, TValue>`
- ✅ **Event System** - Emit events for pagination and selection changes

### **Props:**
```typescript
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  // Feature toggles
  enableSorting?: boolean
  enableFiltering?: boolean
  enablePagination?: boolean
  enableRowSelection?: boolean
  enableColumnVisibility?: boolean
  // Filtering
  searchPlaceholder?: string
  globalFilterFn?: (row: TData, filterValue: string) => boolean
  // Pagination
  initialPageSize?: number
  pageSizeOptions?: number[]
  // Server-side pagination
  total?: number
  page?: number
  pageSize?: number
  // Events
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}
```

### **Events:**
```typescript
// Row selection changes
@update:row-selection="(selection: RowSelectionState) => void"

// Server-side pagination
@update:page="(page: number) => void"
@update:page-size="(pageSize: number) => void"
```

### **Usage Examples:**

```vue
<!-- Basic usage with all features -->
<DataTable
  :columns="columns"
  :data="data"
  search-placeholder="Search..."
/>

<!-- With v-model for reactive state -->
<DataTable
  :columns="columns"
  :data="data"
  v-model:page="currentPage"
  v-model:page-size="pageSize"
  v-model:row-selection="selection"
  :enable-row-selection="true"
/>

<!-- With custom global filter -->
<DataTable
  :columns="columns"
  :data="data"
  :global-filter-fn="(row, filterValue) => {
    return row.email.includes(filterValue) || 
           row.status.includes(filterValue)
  }"
/>

<!-- With custom slots -->
<DataTable
  :columns="columns"
  :data="data"
  :enable-row-selection="true"
>
  <template #toolbar="{ table, globalFilter }">
    <div class="flex items-center justify-between py-4">
      <div class="flex items-center space-x-4">
        <Button>Export</Button>
        <Button>Import</Button>
      </div>
      <input v-model="globalFilter" placeholder="Search..." />
    </div>
  </template>
  
  <template #empty>
    <div class="text-center py-8">
      <h3>No data available</h3>
      <Button>Add New Record</Button>
    </div>
  </template>
  
  <template #selection-info="{ selectedCount, totalCount }">
    <div class="bg-muted p-4 rounded">
      {{ selectedCount }} of {{ totalCount }} selected
      <Button size="sm">Delete Selected</Button>
    </div>
  </template>
</DataTable>

<!-- Server-side pagination -->
<DataTable
  :columns="columns"
  :data="serverData"
  :total="totalRecords"
  v-model:page="currentPage"
  v-model:page-size="pageSize"
/>

<!-- Minimal table (no features) -->
<DataTable
  :columns="columns"
  :data="data"
  :enable-sorting="false"
  :enable-filtering="false"
  :enable-pagination="false"
  :enable-column-visibility="false"
/>
```

### **Available Slots:**

- **`toolbar`** - Custom toolbar with table, globalFilter, and columnVisibility props
- **`empty`** - Custom empty state when no data is available
- **`pagination`** - Custom pagination controls with table, page, pageSize, total, and handler props
- **`selection-info`** - Custom selection info display with selectedCount and totalCount props

---

## 🚧 Future Enhancements

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

#### 8. **Expandable Rows** 📅
Nested content within rows.

**Implementation:**
- Add expand/collapse column
- Use getExpandedRowModel()
- Render sub-content in additional row

---

#### 9. **Column Resizing** 📅
Drag to resize column widths.

**Implementation:**
- Use getColumnResizeHandler()
- Add resize handles to headers
- Persist widths to localStorage

---

#### 10. **Column Reordering** 📅
Drag and drop to reorder columns.

**Implementation:**
- Use onColumnOrderChange
- Integrate with drag-drop library

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
│   │   ├── dropdown-menu/                  # Dropdown menu components
│   │   ├── input/                          # Input component
│   │   └── button/                         # Button component
│   │
│   └── data-table/                         # DataTable components
│       ├── README.md                       # This file
│       ├── DataTable.vue                  # ✅ MAIN UNIFIED COMPONENT
│       ├── DataTableBasic.vue             # ✅ Basic table
│       ├── DataTableWithSorting.vue       # ✅ With sorting only
│       ├── DataTableWithFiltering.vue     # ✅ With filtering only
│       ├── DataTableWithPagination.vue    # ✅ With pagination only
│       ├── Pagination.vue                 # ✅ Reusable pagination controls
│       └── index.ts                       # ✅ All exports
│
└── examples/
    └── data-table/                         # Example data and columns
        ├── types.ts                        # ✅ Payment interface
        ├── data.ts                         # ✅ Sample data
        ├── columns.ts                      # ✅ Basic columns
        ├── columns-sortable.ts            # ✅ With sorting
        ├── columns-with-selection.ts      # ✅ With row selection
        ├── DataTableExample.vue           # ✅ Usage examples
        └── DataTableWithCustomFilter.vue  # ✅ Custom filter examples
```

---

## Utility Functions

### ✅ Completed in `registry/lib/utils.ts`:

```typescript
// Class name merging utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// TanStack Table state updater utility
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

### ✅ All Required Components Added:

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
  "description": "Advanced DataTable with TanStack Table v8 - sorting, filtering, pagination, row selection, column visibility",
  "files": [
    "components/data-table/DataTable.vue",
    "components/data-table/Pagination.vue",
    "components/data-table/index.ts"
  ],
  "dependencies": ["@tanstack/vue-table", "lucide-vue-next"],
  "registryDependencies": ["utils", "table", "checkbox", "dropdown-menu", "button", "input"]
}
```

---

## References

### Official Documentation:
- shadcn-vue DataTable: https://www.shadcn-vue.com/docs/components/data-table.html
- TanStack Table: https://tanstack.com/table/latest/docs/introduction
- TanStack Table Vue: https://tanstack.com/table/latest/docs/framework/vue/vue-table

### Key Implementation Patterns:
1. **Generic component**: `<TData, TValue>` for type safety
2. **Feature toggles**: Enable/disable features independently
3. **Custom filter functions**: Full row data access for complex filtering
4. **Server-side pagination**: Control pagination from parent component
5. **Event system**: Emit events for state changes
6. **shadcn-vue integration**: Uses existing UI components

---

## 🎉 **PROJECT COMPLETE!**

### ✅ **All Core Features Implemented:**
1. ✅ Base table components - DONE
2. ✅ Basic DataTable - DONE
3. ✅ valueUpdater utility - DONE
4. ✅ Sorting (DataTableWithSorting.vue + columns-sortable.ts) - DONE
5. ✅ Filtering (DataTableWithFiltering.vue + custom filter functions) - DONE
6. ✅ Pagination (Pagination.vue + DataTableWithPagination.vue) - DONE
7. ✅ Row selection (columns-with-selection.ts + unified component) - DONE
8. ✅ Column visibility (unified component) - DONE
9. ✅ **Unified DataTable.vue (all features integrated)** - DONE
10. ✅ All required components in registry.json - DONE
11. ✅ Comprehensive examples - DONE

---

**Status:** ✅ **COMPLETE** (100%)
**Last Updated:** 2025-01-22
**Priority:** HIGH - DataTable is a core component for data-heavy applications

**The DataTable component system is now fully implemented and ready for production use!** 🚀
