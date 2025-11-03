// Registry i18n messages - Polish
// This file contains common messages shared across all registry components
// Module-specific messages (auth, logs, settings, user) are in their respective modules
// To use module translations, import and merge them in your project's i18n config
// Example: import { authPl } from '@/modules/auth/i18n'

export default {
  common: {
    welcome: 'Witaj',
    loading: 'Ładowanie...',
    error: 'Błąd',
    success: 'Sukces',
    cancel: 'Anuluj',
    save: 'Zapisz',
    delete: 'Usuń',
    edit: 'Edytuj',
    close: 'Zamknij',
    confirm: 'Potwierdź',
    search: 'Szukaj',
    filter: 'Filtruj',
    sort: 'Sortuj',
    actions: 'Akcje',
    yes: 'Tak',
    no: 'Nie',
    previous: 'Poprzedni',
    next: 'Następny',
    columns: 'Kolumny',
    open_menu: 'Otwórz menu',
    copyToClipboard: {
      success: 'Skopiowano do schowka',
      copied: 'Skopiowano',
      copy: 'Skopiuj',
    },
  },
  validation: {
    required: 'To pole jest wymagane',
    email: 'Nieprawidłowy adres email',
    min: 'Musi mieć co najmniej {min} znaków',
    max: 'Może mieć maksymalnie {max} znaków',
    password_mismatch: 'Hasła nie są identyczne',
    password_too_short: 'Hasło musi mieć co najmniej {min} znaków',
    invalid_token: 'Nieprawidłowy lub wygasły token',
  },
  errors: {
    generic: 'Wystąpił błąd. Spróbuj ponownie',
    network: 'Błąd sieci. Sprawdź połączenie internetowe',
    unauthorized: 'Nie masz uprawnień do wykonania tej akcji',
    not_found: 'Zasób nie został znaleziony',
    server_error: 'Błąd serwera. Spróbuj ponownie później',
  },
}
