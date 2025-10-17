# Vue Blocks Registry

### 🧩 What is `vue-blocks-registry`

`vue-blocks-registry` is a modular system for Vue 3 projects that combines UI components, functional features, and complete page bundles into reusable building blocks.
It’s inspired by **shadcn-vue**, but goes beyond UI — providing ready-to-use logic, stores, routes, and API layers.

You can use it to quickly assemble new projects or standardize architecture across multiple apps.

---

### 💡 Example

```bash
# Add a component
npx vue-blocks-registry add button

# Add an authentication feature (store, service, composables)
npx vue-blocks-registry add authFeat

# Add a full ready-to-use auth module (pages + routes + logic)
npx vue-blocks-registry add authFull
```

---

### 🧱 Structure

* **components/** – UI primitives (buttons, inputs, dialogs)
* **features/** – functional units (auth, billing, user profile)
* **bundles/** – full flows (login pages, dashboards, onboarding)
* **templates/** – complete app starters
