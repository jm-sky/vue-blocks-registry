export const settingsEn = {
  settings: {
    page: {
      title: 'Settings',
      subtitle: 'Minimal, elegant preferences for your experience.',
      dark_mode_label: 'Dark mode',
      save: 'Save',
      loading: 'Loading settings...',
      error_prefix: 'Error loading settings',
      saved_success: 'Settings saved',
      sections: {
        theme: {
          title: 'Dark mode',
          subtitle: 'Choose light or dark theme.',
          label: 'Theme',
          placeholder: 'Select a theme',
          group_label: 'Themes',
          options: {
            light: 'Light',
            dark: 'Dark',
          },
        },
        locale: {
          title: 'Locale',
          subtitle: 'Language used across the interface.',
          label: 'Language',
          placeholder: 'Select a locale',
          group_label: 'Locales',
          options: {
            en: 'English',
            pl: 'Polski',
          },
        },
      },
    },
    security: {
      title: 'Security',
      description: 'Manage your account security and two-factor authentication',
      setup: 'Enable 2FA',
      manage: 'Manage 2FA',
      not_configured: 'Two-factor authentication is not enabled. Enable it for enhanced security.',
      totp: {
        title: 'Authenticator App',
        enabled: 'Enabled',
        disabled: 'Not configured',
      },
      passkeys: {
        title: 'Passkeys',
        enabled: 'Enabled',
        disabled: 'Not configured',
        count: '{count} passkey(s) registered',
      },
    },
  },
}
