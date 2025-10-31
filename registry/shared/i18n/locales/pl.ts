// Registry i18n messages - Polish
// This file contains only messages for registry components (auth, common, validation, errors)
// Demo-specific messages should be in src/i18n/locales/

import { authPl } from '@registry/modules/auth/i18n/index'
import { logsPl } from '@registry/modules/logs/i18n'
import { settingsPl } from '@registry/modules/settings/i18n'
import { userPl } from '@registry/modules/user/i18n'

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
  // Module locales (merged)
  ...authPl,
  ...userPl,
  ...settingsPl,
  ...logsPl,
}
