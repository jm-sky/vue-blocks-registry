export const settingsPl = {
  settings: {
    page: {
      title: 'Ustawienia',
      subtitle: 'Minimalistyczne, eleganckie preferencje Twojego doświadczenia.',
      dark_mode_label: 'Tryb ciemny',
      save: 'Zapisz',
      loading: 'Ładowanie ustawień...',
      error_prefix: 'Błąd ładowania ustawień',
      saved_success: 'Ustawienia zapisane',
      sections: {
        preferences: {
          title: 'Preferencje',
          description: 'Zarządzaj ogólnymi preferencjami konta i ustawieniami',
        },
        theme: {
          title: 'Tryb ciemny',
          subtitle: 'Wybierz jasny lub ciemny motyw.',
          label: 'Motyw',
          placeholder: 'Wybierz motyw',
          group_label: 'Motywy',
          options: {
            light: 'Jasny',
            dark: 'Ciemny',
          },
        },
        locale: {
          title: 'Język',
          subtitle: 'Język używany w interfejsie.',
          label: 'Język',
          placeholder: 'Wybierz język',
          group_label: 'Języki',
          options: {
            en: 'English',
            pl: 'Polski',
          },
        },
      },
    },
    security: {
      title: 'Bezpieczeństwo',
      description: 'Zarządzaj bezpieczeństwem konta i uwierzytelnianiem dwuskładnikowym',
      setup: 'Włącz 2FA',
      manage: 'Zarządzaj 2FA',
      not_configured: 'Uwierzytelnianie dwuskładnikowe nie jest włączone. Włącz je dla lepszego bezpieczeństwa.',
      totp: {
        title: 'Aplikacja uwierzytelniająca',
        enabled: 'Włączona',
        disabled: 'Nie skonfigurowana',
      },
      passkeys: {
        title: 'Klucze dostępu',
        enabled: 'Włączone',
        disabled: 'Nie skonfigurowane',
        count: 'Zarejestrowano {count} klucz(y) dostępu',
      },
    },
    delete_account: {
      title: 'Usuń konto',
      description: 'Trwale usuń swoje konto i wszystkie powiązane dane',
      warning_title: 'Ostrzeżenie: Ta akcja nie może być cofnięta',
      warning_1: 'Wszystkie Twoje dane zostaną trwale usunięte',
      warning_2: 'Utracisz dostęp do wszystkich funkcji konta',
      warning_3: 'Ta akcja jest nieodwracalna',
      button: 'Usuń konto',
      modal: {
        title: 'Usuń konto',
        description: 'Czy na pewno chcesz usunąć swoje konto? Ta akcja nie może być cofnięta.',
        warning_title: 'Ważne',
        warning_text: 'Po usunięciu konta wszystkie Twoje dane, w tym informacje profilowe, ustawienia i inne powiązane dane, zostaną trwale usunięte i nie będzie można ich odzyskać.',
        confirmation_label: 'Wpisz DELETE, aby potwierdzić',
        confirmation_hint: 'Proszę wpisać "DELETE" (wielkimi literami) w powyższym polu, aby potwierdzić',
        confirm_checkbox: 'Rozumiem, że ta akcja jest trwała i nie może być cofnięta',
        cancel: 'Anuluj',
        delete_button: 'Usuń konto',
        success: 'Konto zostało pomyślnie usunięte',
        errors: {
          invalid_confirmation: 'Proszę wpisać DELETE i potwierdzić zrozumienie',
          generic: 'Wystąpił błąd podczas usuwania konta. Spróbuj ponownie.',
        },
      },
    },
  },
}
