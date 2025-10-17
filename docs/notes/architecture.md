# Architecture Notes

## CLI Separation Strategy

### Current Approach (Phase 1)
**Single Package (Monolithic)**

Wszystko w jednym repozytorium i jednym `package.json`:
- Registry components w `registry/`
- CLI w `cli/`
- Buildowane razem

**Zalety:**
- Prostsze w rozwoju na początku
- Łatwiejsze testowanie integracji
- Jeden package.json do zarządzania
- Szybszy start projektu

**Wady:**
- Większy rozmiar paczki
- CLI i komponenty w jednej wersji
- Trudniejsze wersjonowanie osobno

---

## Future Option: Separated Packages (Monorepo)

### Struktura monorepo:

```
vue-blocks-registry/
├── packages/
│   ├── cli/                           # @jm-sky/vue-blocks-cli
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── registry/                      # @jm-sky/vue-blocks-registry
│   │   ├── components/
│   │   ├── features/
│   │   ├── bundles/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── core/                          # @jm-sky/vue-blocks-core (opcjonalnie)
│       ├── types/
│       ├── utils/
│       └── package.json
│
├── package.json                       # Root package.json (workspace)
└── pnpm-workspace.yaml
```

### Zalety rozdzielenia:

1. **Niezależne wersjonowanie:**
   - CLI może mieć v2.0.0
   - Registry może mieć v1.5.0
   - Komponenty mogą być aktualizowane bez wydawania nowej wersji CLI

2. **Mniejsze rozmiary:**
   - CLI jest lekki (tylko logika instalacji)
   - Registry może być ciężki (wszystkie komponenty)
   - Użytkownicy instalują tylko CLI

3. **Łatwiejsze utrzymanie:**
   - Osobne testy dla CLI
   - Osobne testy dla komponentów
   - Łatwiejsze zarządzanie zależnościami

4. **Lepsze developer experience:**
   - Można rozwijać CLI bez przebudowywania registry
   - Można dodawać komponenty bez zmiany CLI

### Kiedy rozdzielić?

**Sygnały że czas na monorepo:**
- CLI ma >5 komend i staje się złożony
- Komponenty są często aktualizowane niezależnie od CLI
- Mamy wielu kontrybutorów pracujących na różnych częściach
- Rozmiar paczki npm przekracza 10MB
- Potrzebujemy różnych strategii wersjonowania

### Narzędzia do monorepo:

1. **pnpm workspaces** (rekomendacja)
   - Natywne wsparcie w pnpm
   - Najszybsze
   - Dobre dla małych-średnich projektów

2. **Turborepo**
   - Zaawansowane cachowanie
   - Świetne dla dużych projektów
   - Potrzebne gdy mamy wiele paczek

3. **Nx**
   - Najbardziej zaawansowane
   - Overkill dla małych projektów

### Migracja do monorepo:

```bash
# 1. Utwórz strukturę packages/
mkdir -p packages/cli packages/registry

# 2. Przenieś pliki
mv cli/ packages/cli/src
mv registry/ packages/registry/

# 3. Utwórz pnpm-workspace.yaml
echo "packages:
  - 'packages/*'" > pnpm-workspace.yaml

# 4. Zaktualizuj package.json w każdym package
# 5. Zaktualizuj importy i zależności
# 6. pnpm install
```

---

## Decision Log

**2025-10-17**: Wybrano **Single Package** approach dla Phase 1
- Prostszy start
- Łatwiejsze prototypowanie
- Możliwość późniejszej migracji do monorepo

**Kryteria do przejścia na monorepo:**
- [ ] CLI ma >5 komend
- [ ] Registry ma >20 komponentów
- [ ] Więcej niż 1 aktywny kontrybutor
- [ ] Potrzeba niezależnego wersjonowania
