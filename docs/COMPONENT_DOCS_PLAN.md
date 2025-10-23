# Component Documentation System Plan

## Overview

Create a comprehensive, shadcn-vue-inspired component documentation structure with individual pages for each component, featuring interactive previews and code examples.

## Architecture

### 1. Reusable Components

#### Tabs UI Component
- Generic tabs component for switching between views
- Support for Preview/Code switching
- Clean, accessible design using Reka UI primitives
- Location: `src/components/ui/tabs/`

#### CodePreview Component
- Combines preview area + code display with tabs
- Features:
  - **Preview tab** - Interactive component demonstration
  - **Code tab** - Syntax-highlighted source code
  - **Copy button** - Copy code to clipboard
  - **Optional StackBlitz button** - Can add later if needed
- Location: `src/components/demo/CodePreview.vue`

#### ComponentSection Wrapper
- Consistent section layout for documentation
- Headers, descriptions, content areas
- Location: `src/components/demo/ComponentSection.vue`

#### ComponentPage Layout
- Standard page layout for component documentation
- Includes page header, installation, usage, examples
- Location: `src/components/demo/ComponentPage.vue`

### 2. Component Documentation Structure

Each component documentation page will include:

1. **Page Header**
   - Component title
   - Brief description
   - Status/version info (optional)

2. **Preview Section**
   - Interactive preview with tabs (Preview/Code)
   - Multiple examples/variants
   - Live, interactive demos

3. **Installation Section**
   - CLI command: `vue-blocks-registry add <component>`
   - Dependencies list (if any)
   - Manual installation steps (optional)

4. **Usage Section**
   - Basic import example
   - Simple code examples
   - Props/API reference (optional)

5. **Examples Section**
   - Multiple use cases
   - Variants (primary, outline, destructive, etc.)
   - Different states (disabled, loading, etc.)
   - Complex compositions

### 3. Implementation Details

#### Technology Stack
- **No .md files** - All documentation in Vue components
- **Syntax highlighting** - Use `shiki` or `prismjs`
- **Copy to clipboard** - Native Clipboard API or `vue-clipboard3`
- **Existing UI components** - Leverage current component library

#### File Structure
```
src/
├── components/
│   ├── ui/
│   │   └── tabs/              # New Tabs component
│   └── demo/
│       ├── CodePreview.vue    # Preview + Code tabs
│       ├── ComponentSection.vue
│       └── ComponentPage.vue
├── pages/
│   └── demo/
│       └── components/
│           ├── AlertDocs.vue
│           ├── ButtonDocs.vue
│           ├── CardDocs.vue
│           └── ...
```

#### Routing
- Update `src/router/routes.ts`
- Pattern: `/demo/components/<component-name>`
- Examples:
  - `/demo/components/alert`
  - `/demo/components/button`
  - `/demo/components/card`

### 4. Features

#### Current Implementation
- ✅ Professional shadcn-vue-style layout
- ✅ Individual page per component
- ✅ Preview + Code tabs
- ✅ Copy button for code
- ✅ Clean, reusable architecture
- ✅ Easy to extend with new components

#### Future Enhancements (Optional)
- ⏳ StackBlitz integration for live editing
- ⏳ Search functionality
- ⏳ Theme switcher in preview
- ⏳ Props/API auto-generation from TypeScript
- ⏳ Responsive preview frame sizes

## Implementation Steps

1. ✅ Create Tabs UI component
2. ✅ Add copy-to-clipboard functionality
3. ✅ Create CodePreview component
4. ✅ Create ComponentSection wrapper
5. ✅ Create ComponentPage layout
6. ✅ Refactor Button documentation page
7. ✅ Create Alert documentation page
8. ✅ Create Card documentation page
9. ✅ Update navigation and routes
10. ✅ Add syntax highlighting

## Benefits

- **Professional appearance** - Matches industry-standard documentation (shadcn-vue, Radix UI)
- **Developer-friendly** - Easy to find examples and copy code
- **Maintainable** - Modular components, easy to update
- **Scalable** - Simple to add new component docs
- **No build complexity** - No markdown processing needed
- **Type-safe** - Full TypeScript support in Vue components

## Notes

- Keep components simple and focused
- Prioritize readability and usability
- Follow existing design system (Tailwind classes, color palette)
- Ensure accessibility (keyboard navigation, ARIA labels)
- Mobile-responsive design
