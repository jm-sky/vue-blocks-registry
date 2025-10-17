## 🧱 Koncepcja: `registry`

Twoje repozytorium będzie zawierało:

1. **komponenty UI** (atomiczne – jak w shadcn-vue),
2. **feature-paczki (średnie klocki)** – kompletne moduły z logiką, composables, store’ami, API,
3. **feature-zestawy (duże klocki)** – pełne implementacje z routingiem, stronami, integracjami.

---

## 📂 Struktura repozytorium

```
registry/
├─ components/                     # Małe klocki (UI)
│  ├─ ui/
│  │  ├─ button/
│  │  │  ├─ index.ts
│  │  │  ├─ Button.vue
│  │  │  └─ button.css
│  │  ├─ input/
│  │  └─ ...
│  ├─ form/
│  └─ dialog/
│
├─ features/                       # Średnie klocki (feature-level)
│  ├─ authFeat/
│  │  ├─ lib/apiClient.ts
│  │  ├─ types/auth.types.ts
│  │  ├─ stores/authStore.ts
│  │  ├─ services/authService.ts
│  │  ├─ composables/useLogout.ts
│  │  └─ index.ts                   # Eksporty, setup feature
│  ├─ billingFeat/
│  ├─ userProfileFeat/
│  └─ ...
│
├─ bundles/                        # Duże klocki (złożone zestawy)
│  ├─ authFull/
│  │  ├─ imports/ (linkuje do feature + UI)
│  │  ├─ pages/
│  │  │  ├─ LoginPage.vue
│  │  │  ├─ RegisterPage.vue
│  │  │  └─ ForgotPasswordPage.vue
│  │  ├─ routes/authRoutes.ts
│  │  ├─ index.ts
│  │  └─ readme.md
│  ├─ dashboardFull/
│  └─ ...
│
├─ templates/                      # Całe app skeletons / boilerplates
│  ├─ saas-app/
│  ├─ admin-dashboard/
│  └─ landing-page/
│
├─ scripts/
│  ├─ install-component.ts          # CLI helper (np. jak "npx shadcn-vue add button")
│  ├─ install-feature.ts
│  └─ ...
│
└─ registry.json                    # Manifest całego rejestru
```

---

## ⚙️ `registry.json` (manifest)

Podobnie jak u shadcn-vue, możesz mieć manifest do automatycznej instalacji (np. przez CLI):

```json
{
  "components": {
    "button": {
      "path": "components/ui/button",
      "category": "ui"
    },
    "input": {
      "path": "components/ui/input",
      "category": "ui"
    }
  },
  "features": {
    "authFeat": {
      "path": "features/authFeat",
      "description": "Basic authentication logic and API layer"
    }
  },
  "bundles": {
    "authFull": {
      "path": "bundles/authFull",
      "dependsOn": ["authFeat"],
      "description": "Authentication pages and routes ready to plug in"
    }
  }
}
```

---

## 🔌 Instalacja komponentu/feature przez CLI

Możesz stworzyć prosty CLI (np. `registry-cli`) do dodawania komponentów do projektu, np.:

```bash
npx registry add button
npx registry add authFeat
npx registry add authFull
```

CLI:

* kopiuje pliki z registry do projektu,
* może aktualizować `registry-lock.json`,
* może mieć flagi (`--overwrite`, `--force`, `--dry-run`).

---

## 💡 Nazewnictwo i konwencje

| Typ              | Przykład   | Zawartość                               |
| ---------------- | ---------- | --------------------------------------- |
| **UI komponent** | `Button`   | tylko `.vue`, CSS, prosty index         |
| **Feature**      | `authFeat` | logika, store, composables, API         |
| **Bundle**       | `authFull` | strony, routy, integracje, UI + feature |
| **Template**     | `saas-app` | gotowy starter z kilkoma bundles        |

---

## 🚀 Bonus: sposób na instalowanie w projekcie

W docelowej aplikacji (np. `saasbase-web`) możesz mieć plik `.registryrc.json`:

```json
{
  "registry": "https://github.com/yourname/registry",
  "features": ["authFeat", "userProfileFeat"],
  "components": ["button", "input"]
}
```

A potem prosty skrypt:

```bash
npx registry sync
```

który pobiera aktualne wersje i aktualizuje komponenty (np. przez `git sparse-checkout` albo `unpkg`/`raw.githubusercontent.com`).

---

## ✨ Dlaczego to ma sens

* Masz **jedno źródło prawdy** dla UI i logiki.
* Łatwo aktualizujesz feature w wielu projektach.
* Możesz publikować poszczególne feature’y jako paczki npm, jeśli chcesz.
* Możesz miksować **komponenty, logikę i routing** bez duplikowania kodu.

