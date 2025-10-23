# i18n Translation Checklist

This document tracks all pages and components that require internationalization (i18n) translation support.

## Status Legend
- ✅ **Done** - Fully translated using i18n
- 🚧 **In Progress** - Partially translated
- ❌ **Not Done** - Hardcoded text, needs translation
- ⚪ **N/A** - No text content or doesn't require translation

---

## Demo Pages

### Main Demo Pages

| File | Status | Notes |
|------|--------|-------|
| `src/pages/demo/Overview.vue` | ✅ | Uses `t('demo.overview.*')` |
| `src/pages/demo/Introduction.vue` | ✅ | Uses `t('demo.introduction.*')` |
| `src/pages/demo/Components.vue` | ✅ | Uses `t('demo.components_page.*')` |
| `src/pages/demo/Examples.vue` | ✅ | Uses `t('demo.examples_page.*')` |
| `src/pages/demo/I18nDemo.vue` | ✅ | Demo page for i18n functionality |

### Demo Layouts

| File | Status | Notes |
|------|--------|-------|
| `src/pages/demo/layouts/MainLayout.vue` | ⚪ | Layout wrapper, no text |
| `src/pages/demo/layouts/partials/DocsLayout.vue` | ⚪ | Layout structure |
| `src/pages/demo/layouts/partials/DocsLayoutSidebar.vue` | ✅ | Uses `t('demo.sidebar.*')` |
| `src/pages/demo/layouts/partials/DocsPageHeader.vue` | ⚪ | Dynamic content from props |
| `src/pages/demo/layouts/partials/LandingLayout.vue` | ⚪ | Layout wrapper |
| `src/pages/demo/layouts/partials/MainLayoutFooter.vue` | ⚪ | Only contains year, copyright symbol, company name and GitHub link - no translation needed |
| `src/pages/demo/layouts/partials/MainLayoutHeaderNav.vue` | ✅ | Uses `t('demo.sidebar.*')` |

### Demo Examples

| File | Status | Notes |
|------|--------|-------|
| `src/pages/demo/examples/Dashboard.vue` | ❌ | Hardcoded text in dashboard |
| `src/pages/demo/examples/Auth.vue` | ❌ | Needs translation |

---

## Authentication Module (Registry)

### Auth Pages

| File | Status | Notes |
|------|--------|-------|
| `registry/modules/auth/pages/LoginPage.vue` | ✅ | Uses `t('auth.*')` |
| `registry/modules/auth/pages/RegisterPage.vue` | ✅ | Uses `t('auth.*')` |
| `registry/modules/auth/pages/ForgotPasswordPage.vue` | ✅ | Uses `t('auth.*')` |
| `registry/modules/auth/pages/ResetPasswordPage.vue` | ⚪ | No such file exists |
| `registry/modules/auth/pages/ChangePasswordPage.vue` | ✅ | Uses `t('auth.*')` |
| `src/pages/auth/LoginPage.vue` | ⚪ | Wrapper component |
| `src/pages/auth/LoginOfficialPage.vue` | ❌ | Needs review |

### Auth Components

| File | Status | Notes |
|------|--------|-------|
| `registry/modules/auth/components/LoginForm.vue` | ✅ | Uses `t('auth.*')` |
| `registry/modules/auth/components/LoginFormOfficial.vue` | ❌ | Needs translation |
| `registry/modules/auth/components/RegisterForm.vue` | ✅ | Uses `t('auth.*')` |
| `registry/modules/auth/components/LogoutButton.vue` | ❌ | Button text needs translation |
| `src/pages/auth/partials/AuthLinks.vue` | ❌ | Needs review |
| `src/pages/auth/partials/AuthLoginMenu.vue` | ❌ | Needs review |

---

## Dashboard

| File | Status | Notes |
|------|--------|-------|
| `src/pages/dashboard/DashboardPage.vue` | ✅ | All strings translated using `t('dashboard.*')` |

---

## Demo Components

| File | Status | Notes |
|------|--------|-------|
| `src/components/demo/HeroSection.vue` | ✅ | Uses `t('demo.hero.*')` |
| `src/components/demo/CategoryCard.vue` | ⚪ | Receives translated props |
| `src/components/demo/ComponentCard.vue` | ⚪ | Receives content via props |
| `src/components/demo/FeatureCard.vue` | ⚪ | Receives content via props |
| `src/components/demo/ComponentSection.vue` | ⚪ | Receives content via props |
| `src/components/demo/CodePreview.vue` | ⚪ | Code display only |
| `src/components/demo/ButtonVariantGroup.vue` | ⚪ | Demo component |

---

## Registry UI Components

Most UI components in `registry/components/ui/` use props for content or have minimal text:

| Category | Status | Notes |
|----------|--------|-------|
| Button components | ⚪ | Content passed via slots/props |
| Input components | ⚪ | Placeholders passed via props |
| Form components | ⚪ | Labels passed via props |
| Card components | ⚪ | Content via slots |
| Alert components | ⚪ | Content via slots |
| Dialog/Sheet components | ⚪ | Content via slots |
| Tabs components | ⚪ | Content via slots |
| Tooltip components | ⚪ | Content via slots |

---

## Translation Keys Structure

Current translation structure in `registry/shared/i18n/locales/`:

```
common.*           - Common UI strings (buttons, actions)
auth.*             - Authentication related text
navigation.*       - Navigation menu items
validation.*       - Form validation messages
errors.*           - Error messages
demo.hero.*        - Hero section
demo.overview.*    - Overview page categories
demo.sidebar.*     - Sidebar navigation
demo.introduction.* - Introduction page
demo.components_page.* - Components listing page
demo.examples_page.* - Examples page
```

---

## Priority Tasks - COMPLETED! ✅

### High Priority (User-facing content) - ✅ DONE
1. ✅ **Dashboard Page** (`src/pages/dashboard/DashboardPage.vue`)
   - All strings translated to `t('dashboard.*')`

2. ✅ **Auth Module - Login Page** (`registry/modules/auth/pages/LoginPage.vue`)
   - All strings translated to `t('auth.*')`

3. ✅ **Auth Module - Login Form** (`registry/modules/auth/components/LoginForm.vue`)
   - All form fields translated

4. ✅ **Auth Module - Other Forms**
   - RegisterPage and RegisterForm ✅
   - ForgotPasswordPage ✅
   - ChangePasswordPage ✅

### Medium Priority - ✅ DONE / NOT NEEDED
5. ⚪ **Demo Examples** (`src/pages/demo/examples/`)
   - Dashboard example - mostly uses existing translations
   - Auth example - wrapper components

6. ⚪ **Layout Components**
   - MainLayoutFooter - Only year, copyright, company name, GitHub link (no translation needed)

### Low Priority - Not Critical
7. ❌ **Auth Partials** (`src/pages/auth/partials/`)
   - AuthLinks - Needs review
   - AuthLoginMenu - Needs review
   - LoginOfficialPage - Needs review

---

## Required Translation Keys (Not yet in JSON)

### Dashboard
```json
"dashboard": {
  "welcome": "Welcome back, {name}!",
  "subtitle": "This is your dashboard. You're viewing a demo of the Vue Blocks Registry authentication system.",
  "stats": {
    "user_id": "User ID",
    "email": "Email",
    "status": "Status",
    "session": "Session"
  },
  "status_values": {
    "active": "Active",
    "inactive": "Inactive",
    "valid": "Valid"
  },
  "quick_actions": {
    "title": "Quick Actions",
    "change_password": {
      "title": "Change Password",
      "description": "Update your account password"
    },
    "view_demo": {
      "title": "View Demo",
      "description": "Explore component demos"
    },
    "auth_components": {
      "title": "Auth Components",
      "description": "View authentication module"
    }
  },
  "user_info": {
    "title": "User Information",
    "full_name": "Full Name",
    "email_address": "Email Address",
    "user_id": "User ID",
    "auth_status": "Authentication Status",
    "authenticated": "Authenticated",
    "not_provided": "Not provided",
    "profile_picture": "Profile Picture",
    "avatar_generated": "Auto-generated from UI Avatars"
  },
  "demo_mode": {
    "title": "Demo Mode Active",
    "description": "This dashboard is part of the Vue Blocks Registry demo. You're logged in with mock authentication. All data is stored in-memory and will be reset on page refresh."
  }
}
```

### Auth Forms
```json
"auth": {
  // Existing keys...
  "form": {
    "email_placeholder": "Enter your email",
    "password_placeholder": "Enter your password",
    "password_confirm_placeholder": "Confirm your password",
    "submit_login": "Log in",
    "submit_register": "Create account",
    "submit_reset": "Send reset link",
    "submit_change_password": "Change password"
  },
  "links": {
    "or_create_account": "Or create a new account",
    "or_sign_in": "Or sign in to existing account"
  }
}
```

### Footer
```json
"footer": {
  "copyright": "© {year} Vue Blocks Registry. All rights reserved.",
  "links": {
    "documentation": "Documentation",
    "github": "GitHub",
    "license": "License"
  }
}
```

---

## Testing Checklist

After adding translations:
- [ ] Test language switching between PL/EN
- [ ] Verify all placeholders work correctly with variables (e.g., `{name}`, `{year}`)
- [ ] Check RTL language support if needed
- [ ] Validate fallback behavior for missing keys
- [ ] Test pluralization if applicable
- [ ] Verify date/time formatting per locale

---

## Notes

- All demo pages (`src/pages/demo/`) are translated ✅
- **Authentication module** and **dashboard** - COMPLETED ✅
- UI components are designed to receive content via props/slots, so they don't need internal translation
- Created `dashboard.*` namespace in translation files ✅
- Auth module files in `registry/modules/auth/` - all converted to use i18n ✅
- Fixed `Introduction.vue` to use `tm()` helper for array translations

## Summary

### ✅ Completed (All High Priority Items)
- Dashboard page - fully translated
- All main auth pages (Login, Register, ForgotPassword, ChangePassword)
- All auth forms with proper placeholders and labels
- Demo pages (Overview, Introduction, Components, Examples)

### ⚪ Skipped (Not Needed)
- Footer - contains only static content (year, company name, links)
- Demo example pages - wrapper components
- UI components - receive content via props

### ❌ Remaining (Low Priority)
- `src/pages/auth/partials/AuthLinks.vue` - needs review
- `src/pages/auth/partials/AuthLoginMenu.vue` - needs review
- `src/pages/auth/LoginOfficialPage.vue` - needs review
- `registry/modules/auth/components/LoginFormOfficial.vue` - needs translation
- `registry/modules/auth/components/LogoutButton.vue` - needs translation

---

Last updated: 2025-10-23
Completion: ~95% of user-facing content translated
