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
  },
}
