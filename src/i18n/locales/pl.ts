// Demo-specific i18n messages - Polish
// This file contains messages ONLY for the demo application
// These messages will NOT be published with the registry

export default {
  dashboard: {
    welcome: 'Witaj ponownie, {name}!',
    subtitle: 'To jest Twój panel. Oglądasz demo systemu uwierzytelniania Vue Blocks Registry.',
    stats: {
      user_id: 'ID użytkownika',
      email: 'Email',
      status: 'Status',
      session: 'Sesja',
    },
    status_values: {
      active: 'Aktywny',
      inactive: 'Nieaktywny',
      valid: 'Ważna',
    },
    quick_actions: {
      title: 'Szybkie akcje',
      change_password: {
        title: 'Zmień hasło',
        description: 'Zaktualizuj hasło do konta',
      },
      view_demo: {
        title: 'Zobacz demo',
        description: 'Przeglądaj demo komponentów',
      },
      auth_components: {
        title: 'Komponenty Auth',
        description: 'Zobacz moduł uwierzytelniania',
      },
    },
    user_info: {
      title: 'Informacje o użytkowniku',
      full_name: 'Imię i nazwisko',
      email_address: 'Adres email',
      user_id: 'ID użytkownika',
      auth_status: 'Status uwierzytelniania',
      authenticated: 'Uwierzytelniony',
      not_provided: 'Nie podano',
      profile_picture: 'Zdjęcie profilowe',
      avatar_generated: 'Wygenerowane automatycznie z UI Avatars',
    },
    demo_mode: {
      title: 'Tryb demo aktywny',
      description: 'Ten panel jest częścią demo Vue Blocks Registry. Jesteś zalogowany z użyciem mock authentication. Wszystkie dane są przechowywane w pamięci i zostaną zresetowane po odświeżeniu strony.',
    },
  },
  demo: {
    auth: {
      menu: {
        variants: 'Warianty',
        login_standard: 'Logowanie standardowe',
        login_official: 'Logowanie oficjalne',
      },
      docs_link: 'Dok. Auth',
    },
    hero: {
      welcome: 'Witaj w',
      subtitle: 'Odkryj naszą kolekcję gotowych komponentów UI, zaprojektowanych z myślą o nowoczesnych aplikacjach Vue.js',
      tech_stack: 'Używamy Tailwind CSS, Shadcn Vue, Vee Validate, Zod...',
      get_started: 'Rozpocznij',
      view_components: 'Zobacz Komponenty'
    },
    overview: {
      buttons: {
        title: 'Przyciski',
        description: 'Różnorodne style przycisków z wieloma wariantami i odmianami'
      },
      links: {
        title: 'Linki',
        description: 'Komponenty linków z efektami najechania i płynnymi przejściami'
      },
      layout: {
        title: 'Układ',
        description: 'Komponenty układu i kontenerów'
      },
      dataTable: {
        title: 'Tabela Danych',
        description: 'Zaawansowana tabela z sortowaniem i filtrowaniem'
      }
    },
    sidebar: {
      getting_started: 'Rozpocznij',
      overview: 'Przegląd',
      introduction: 'Wprowadzenie',
      components: 'Komponenty',
      button: 'Przycisk',
      links: 'Linki',
      layout: 'Układ',
      data_table: 'Tabela Danych',
      examples: 'Przykłady',
      dashboard: 'Panel',
      authentication: 'Uwierzytelnienie'
    },
    introduction: {
      title: 'Wprowadzenie',
      description: 'Poznaj Vue Blocks Registry - modularny system komponentów Vue 3',
      intro_text: 'Vue Blocks Registry to modularny system komponentów Vue 3 z gotowymi rozwiązaniami UI, layoutami i funkcjonalnościami.',
      what_is_title: 'Czym jest Vue Blocks Registry?',
      what_is_p1: 'Vue Blocks Registry nie jest biblioteką komponentów. To kolekcja komponentów wielokrotnego użytku, które możesz skopiować i wkleić do swoich aplikacji lub dodać za pomocą CLI.',
      what_is_p2: 'Podobnie jak shadcn/ui, kod jest Twój. Możesz go dostosować do swoich potrzeb.',
      features_title: 'Główne Funkcje',
      features: {
        ui_components: {
          title: 'Komponenty UI',
          items: ['Przyciski z wariantami', 'Formularze i pola input', 'Karty i kontenery', 'Tabele i listy']
        },
        layouts: {
          title: 'Layouty',
          items: ['PublicLayout', 'AuthenticatedLayout', 'GuestLayoutCentered', 'GuestLayoutTwoColumns']
        },
        auth_modules: {
          title: 'Moduły Uwierzytelniania',
          items: ['Logowanie/Rejestracja', 'Resetowanie hasła', 'Zmiana hasła', 'Chronione ścieżki']
        },
        data_table: {
          title: 'Tabela Danych',
          items: ['Sortowanie', 'Filtrowanie', 'Paginacja', 'Responsywność']
        }
      },
      technologies_title: 'Technologie',
      tech: {
        frontend: 'Frontend',
        frontend_items: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Reka UI'],
        tools: 'Narzędzia',
        tools_items: ['Vite', 'Vue Router', 'Pinia', 'Vee Validate + Zod']
      },
      installation_title: 'Instalacja',
      installation: {
        step1: {
          title: '1. Utwórz projekt',
          description: 'Rozpocznij od utworzenia nowego projektu Vue używając Vite:'
        },
        step2: {
          title: '2. Dodaj Tailwind CSS',
          description: 'Zamień wszystko w {file} na:'
        },
        step3: {
          title: '3. Edytuj tsconfig.json',
          description: 'Dodaj {baseUrl} i {paths} do sekcji {compilerOptions} w plikach {tsconfig} i {tsconfigApp}:'
        },
        step4: {
          title: '4. Zaktualizuj vite.config.ts',
          description: 'Dodaj następujący kod do {file}:'
        },
        step5: {
          title: '5. Uruchom CLI',
          description: 'Uruchom polecenie {command} aby skonfigurować projekt:'
        },
        step6: {
          title: '6. Dodaj komponenty',
          description: 'Możesz teraz zacząć dodawać komponenty do swojego projektu:'
        }
      },
      get_started_title: 'Rozpocznij',
      get_started_text: 'Wybierz kategorię komponentów z sidebar po lewej stronie, aby zobaczyć przykłady i kod.',
      view_components: 'Zobacz Komponenty',
      github_repo: 'Repozytorium GitHub'
    },
    components_page: {
      title: 'Komponenty',
      description: 'Wybierz komponent z listy poniżej lub użyj sidebar nawigacji.'
    },
    examples_page: {
      title: 'Przykłady',
      description: 'Przykłady użycia komponentów w rzeczywistych scenariuszach.',
      i18n_example: {
        title: 'Internacjonalizacja (i18n)',
        description: 'Wsparcie dla wielu języków z tłumaczeniami PL/EN'
      }
    },
    dashboard_example: {
      title: 'Przykładowy Panel',
      description: 'Przykładowy dashboard z komponentami nawigacji, widżetów i innymi elementami',
      coming_soon: 'Wkrótce... Przykład panelu będzie dostępny tutaj.',
      view_existing: 'Zobacz istniejący Panel'
    },
    auth_example: {
      title: 'Moduł Uwierzytelniania',
      description: 'Kompletny moduł uwierzytelniania z formularzami logowania, rejestracji i zarządzania hasłem',
      available_components: 'Dostępne komponenty',
      components: {
        login_form: {
          title: 'Formularz logowania',
          description: 'Formularz logowania z walidacją'
        },
        register_form: {
          title: 'Formularz rejestracji',
          description: 'Formularz rejestracji z potwierdzeniem hasła'
        },
        forgot_password: {
          title: 'Zapomniane hasło',
          description: 'Formularz resetowania hasła'
        },
        reset_password: {
          title: 'Resetowanie hasła',
          description: 'Formularz ustawiania nowego hasła'
        },
        change_password: {
          title: 'Zmiana hasła',
          description: 'Formularz zmiany hasła dla zalogowanych użytkowników'
        }
      },
      mock_api_info: 'Aplikacja działa w trybie demo z mock API (bez prawdziwego backendu). Możesz przetestować wszystkie funkcje auth!',
      features_title: 'Funkcjonalności',
      features: {
        pinia_store: 'Pinia store dla zarządzania stanem uwierzytelniania',
        composables: 'Composables (useAuth, useLogout)',
        validation: 'Walidacja formularzy z Zod i VeeValidate',
        api_integration: 'Integracja z API (axios)',
        typescript: 'TypeScript types dla User i Credentials',
        persistence: 'Trwałość w LocalStorage dla tokenu JWT'
      },
      demo_mode: {
        title: 'Tryb Demo - API Symulowane Aktywne',
        description: 'Aplikacja działa w trybie demo z mock API (bez prawdziwego backendu). Możesz przetestować wszystkie funkcje auth!',
        test_accounts: 'Testowe konta:',
        email: 'Email:',
        password: 'Hasło:',
        register_info: 'Możesz też zarejestrować nowe konto - zostanie zapisane w pamięci przeglądarki (tylko na czas sesji)'
      },
      installation: {
        title: 'Instalacja',
        full_module: {
          title: 'Pełny moduł (z UI):',
          description: 'Zawiera strony, formularze, layouty, store, serwisy i wszystkie zależności'
        },
        feature_only: {
          title: 'Tylko funkcjonalność (bez UI):',
          description: 'Zawiera tylko store, serwisy, composables i walidację - bez komponentów UI'
        }
      },
      production_config: {
        title: 'Konfiguracja dla produkcji',
        description: 'Aby podłączyć prawdziwy backend API, zmień w pliku',
        file: '.env',
        file_text: ':',
        backend_endpoints: 'Backend musi udostępniać endpointy:'
      },
      how_to_use: {
        title: 'Jak używać',
        description: 'Moduł auth jest dostępny w'
      }
    },
    showcase: {
      preview: 'Podgląd',
      installation: 'Instalacja',
      examples: 'Przykłady',
      button: {
        title: 'Przycisk',
        description: 'Wyświetla przycisk lub komponent wyglądający jak przycisk.',
        click_me: 'Kliknij mnie',
        variants: {
          title: 'Warianty',
          primary: 'Podstawowy',
          outline: 'Kontur',
          destructive: 'Destrukcyjny',
          secondary: 'Drugorzędny',
          ghost: 'Widmo',
          link: 'Link'
        },
        vibes: {
          title: 'Vibes (Unikalna Funkcja ✨)',
          description: 'Nasz komponent Button zawiera unikalne animacje "vibe", które dodają dodatkowego wizualnego uroku.',
          primary: 'Primary Vibe',
          outline: 'Outline Vibe',
          underline: 'Underline Vibe'
        },
        sizes: {
          title: 'Rozmiary',
          small: 'Mały',
          default: 'Domyślny',
          large: 'Duży'
        },
        states: {
          title: 'Stany',
          normal: 'Normalny',
          loading: 'Ładowanie',
          disabled: 'Wyłączony'
        }
      },
      link: {
        title: 'Linki',
        description: 'Linki routera z efektami najechania i płynnymi przejściami.',
        navigate_demo: 'Przejdź do Demo',
        external_link: 'Link Zewnętrzny',
        hover_link: {
          title: 'HoverLink',
          description: 'Wewnętrzny link routera z animowanym podkreśleniem przy najechaniu.',
          view_components: 'Zobacz Komponenty'
        },
        hover_link_external: {
          title: 'HoverLinkExternal',
          description: 'Link zewnętrzny z ikoną i animacją najechania.',
          vue_docs: 'Dokumentacja Vue.js',
          github: 'GitHub'
        },
        button_link: {
          title: 'ButtonLink',
          description: 'Link routera stylizowany jako przycisk. Łączy komponent Button z funkcjonalnością RouterLink.',
          primary: 'Link Podstawowy',
          outline: 'Link Kontur',
          secondary: 'Link Drugorzędny'
        },
        button_link_vibes: {
          title: 'ButtonLink z Vibes ✨',
          description: 'ButtonLink również wspiera unikalne animacje "vibe".',
          primary: 'Primary Vibe',
          outline: 'Outline Vibe',
          underline: 'Underline Vibe'
        }
      },
      layout: {
        title: 'Komponenty Layout',
        description: 'Komponenty układu, nawigacji i utility do budowania profesjonalnych aplikacji',
        scroll_to_top: {
          title: 'ScrollToTop',
          description: 'Przycisk fixed pojawia się po scroll > 300px z płynnym przewijaniem',
          scroll_info: 'Przewiń stronę w dół, aby zobaczyć przycisk ScrollToTop w prawym dolnym rogu'
        },
        page_card: {
          title: 'PageCard',
          description: 'Wrapper dla contentu z spójnym paddingiem i stylem',
          example_title: 'Przykładowa Zawartość Karty',
          example_text: 'To jest przykładowa zawartość PageCard. Możesz tu umieścić dowolną treść, tabele, formularze, etc.'
        },
        page_list_header: {
          title: 'PageListHeader',
          description: 'Header dla list pages z tytułem, licznikiem i slotem akcji',
          users: 'Użytkownicy',
          users_description: 'Lista wszystkich użytkowników w systemie',
          add_user: 'Dodaj Użytkownika',
          example_list: '(Przykładowa lista użytkowników...)'
        },
        page_list_wrapper: {
          title: 'PageListWrapper',
          description: 'Kombinacja PageCard + PageListHeader w jednym komponencie',
          projects: 'Projekty',
          projects_description: 'Wszystkie aktywne projekty',
          filter: 'Filtruj',
          new_project: 'Nowy Projekt',
          project_alpha: 'Projekt Alpha',
          project_beta: 'Projekt Beta',
          project_gamma: 'Projekt Gamma'
        },
        available_layouts: {
          title: 'Dostępne Layouty',
          description: 'Vue Blocks Registry oferuje 5 gotowych layoutów',
          view_link: 'Zobacz komponenty',
          public_layout: {
            title: 'PublicLayout',
            description: 'Prosty layout dla landing pages i stron publicznych'
          },
          authenticated_layout: {
            title: 'AuthenticatedLayout',
            description: 'Zaawansowany layout z MainNav, UserNav i dark mode toggle'
          },
          guest_centered: {
            title: 'GuestLayoutCentered',
            description: 'Wyśrodkowany layout z gradientowym tłem dla stron auth'
          },
          guest_glass: {
            title: 'GuestLayoutCenteredGlass',
            description: 'Efekt glass-morphism + wsparcie dla obrazu tła'
          },
          guest_two_columns: {
            title: 'GuestLayoutTwoColumns',
            description: 'Design split-screen z panelem brandingowym po lewej stronie'
          }
        }
      },
      data_table: {
        title: 'DataTable',
        description: 'Zaawansowana tabela z sortowaniem, filtrowaniem, paginacją i wyborem wierszy opartą na TanStack Table',
        full_featured: {
          title: 'Tabela z Pełnymi Funkcjami',
          description: 'Tabela z sortowaniem (kliknij nagłówek Email), filtrowaniem, paginacją, wyborem wierszy, przełącznikiem widoczności kolumn i menu akcji'
        },
        filter_placeholder: 'Filtruj emaile...',
        features: {
          title: 'Dołączone Funkcje',
          sorting: {
            title: 'Sortowanie',
            description: 'Kliknij nagłówki kolumn, aby sortować rosnąco/malejąco'
          },
          filtering: {
            title: 'Filtrowanie',
            description: 'Szukaj/filtruj według wartości kolumn (email w tym przykładzie)'
          },
          pagination: {
            title: 'Paginacja',
            description: 'Nawiguj przez strony przyciskami Poprzedni/Następny'
          },
          row_selection: {
            title: 'Wybór Wierszy',
            description: 'Wybieraj wiersze checkboxami (pojedynczo lub wszystkie)'
          },
          column_visibility: {
            title: 'Widoczność Kolumn',
            description: 'Przełączaj widoczność kolumn dropdownem "Kolumny"'
          },
          action_menu: {
            title: 'Menu Akcji',
            description: 'Akcje per-wiersz z menu dropdown (ikona 3 kropek)'
          }
        },
        tech_stack: {
          title: 'Stack Technologiczny'
        },
        usage: {
          title: 'Podstawowe Użycie'
        }
      }
    }
  },
  navigation: {
    home: 'Start',
    dashboard: 'Panel',
    profile: 'Profil',
    settings: 'Ustawienia',
    about: 'O nas',
    contact: 'Kontakt',
    docs: 'Dokumentacja',
    components: 'Komponenty',
    examples: 'Przykłady'
  },
  validation: {
    required: 'To pole jest wymagane',
    email: 'Proszę podać prawidłowy adres email',
    min_length: 'Musi mieć co najmniej {min} znaków',
    max_length: 'Może mieć maksymalnie {max} znaków',
    password_mismatch: 'Hasła nie są takie same',
    invalid_format: 'Nieprawidłowy format'
  },
  errors: {
    generic: 'Coś poszło nie tak',
    network: 'Błąd sieci. Sprawdź swoje połączenie',
    unauthorized: 'Nie masz uprawnień do wykonania tej akcji',
    not_found: 'Zasób nie został znaleziony',
    server_error: 'Błąd serwera. Spróbuj ponownie później'
  },
}
