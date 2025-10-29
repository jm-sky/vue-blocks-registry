# Vue Blocks Registry

### 🧩 What is `vue-blocks-registry`

`vue-blocks-registry` is a modular system for Vue 3 projects that combines UI components, functional features, and complete page bundles into reusable building blocks.
It's inspired by **shadcn-vue**, but goes beyond UI — providing ready-to-use logic, stores, routes, and API layers.

You can use it to quickly assemble new projects or standardize architecture across multiple apps.

![Vue Blocks Registry](public/hero.jpg)

---

### 🚀 Quick Start

**Option 1: Automated Setup (Recommended)**

Create a new project with everything configured automatically:

```bash
# Create a new Vue 3 project with shadcn-vue and vue-blocks-registry
npx vue-blocks-registry setup my-app

# Or include foundational files (main.ts, App.vue, etc.)
npx vue-blocks-registry setup my-app --scaffold

# Navigate to your project
cd my-app

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

**Option 2: Manual Setup**

If you already have a Vue 3 project, or prefer manual setup:

1. **Create a Vue 3 project:**
   ```bash
   pnpm create vue@latest
   ```

2. **Configure shadcn-vue:**
   Follow the [shadcn-vue installation guide](https://www.shadcn-vue.com/docs/installation/vite.html) to set up Tailwind CSS and shadcn-vue components.

3. **Initialize vue-blocks-registry:**
   ```bash
   npx vue-blocks-registry init
   ```

---

### 💡 Usage Examples

```bash
# Add a component
npx vue-blocks-registry add button

# Add an authentication feature (store, service, composables)
npx vue-blocks-registry add authFeat

# Add a full ready-to-use auth module (pages + routes + logic)
npx vue-blocks-registry add authFull

# Generate foundational files (main.ts, App.vue, etc.)
npx vue-blocks-registry scaffold
```

**📦 Available on npm:** [vue-blocks-registry](https://www.npmjs.com/package/vue-blocks-registry)

---

### 🧱 Structure

* **components/** – UI primitives (buttons, inputs, dialogs)
* **features/** – functional units (auth, billing, user profile)
* **bundles/** – full flows (login pages, dashboards, onboarding)
* **templates/** – complete app starters

---

### 📚 Documentation

- [Installation Guide](#installation)
- [Available Components](#components)
- [CLI Commands](#cli-commands)
- [Contributing](#contributing)

### 🔧 Installation

```bash
# Install globally (optional)
npm install -g vue-blocks-registry

# Or use directly with npx (recommended)
npx vue-blocks-registry init
```

### 📋 CLI Commands

```bash
# Create a new project with everything configured
vue-blocks-registry setup <project-name>

# Initialize existing project configuration
vue-blocks-registry init

# Add components/features/bundles
vue-blocks-registry add <name>

# Generate foundational files (main.ts, App.vue, etc.)
vue-blocks-registry scaffold

# List available items
vue-blocks-registry list

# Get help
vue-blocks-registry --help
```

### 📦 Package Manager Support

The CLI automatically detects and uses the package manager in your project:

- **pnpm** (detected by `pnpm-lock.yaml`)
- **yarn** (detected by `yarn.lock`) 
- **npm** (detected by `package-lock.json` or as fallback)

When you run `vue-blocks-registry add <component>`, it will:
1. Detect your package manager
2. Install any required dependencies using the appropriate command
3. Copy component files to your project

No need to worry about having the "wrong" package manager installed!

### 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
