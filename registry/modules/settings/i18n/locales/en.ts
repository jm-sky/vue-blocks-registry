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
        preferences: {
          title: 'Preferences',
          description: 'Manage your general account preferences and settings',
        },
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
    delete_account: {
      title: 'Delete Account',
      description: 'Permanently delete your account and all associated data',
      warning_title: 'Warning: This action cannot be undone',
      warning_1: 'All your data will be permanently deleted',
      warning_2: 'You will lose access to all your account features',
      warning_3: 'This action is irreversible',
      button: 'Delete Account',
      modal: {
        title: 'Delete Account',
        description: 'Are you sure you want to delete your account? This action cannot be undone.',
        warning_title: 'Important',
        warning_text: 'Once you delete your account, all your data, including profile information, settings, and any other associated data, will be permanently removed and cannot be recovered.',
        confirmation_label: 'Type DELETE to confirm',
        confirmation_hint: 'Please type "DELETE" (all caps) in the field above to confirm',
        confirm_checkbox: 'I understand that this action is permanent and cannot be undone',
        cancel: 'Cancel',
        delete_button: 'Delete Account',
        success: 'Account has been successfully deleted',
        errors: {
          invalid_confirmation: 'Please type DELETE and confirm your understanding',
          generic: 'An error occurred while deleting your account. Please try again.',
        },
      },
    },
  },
}
