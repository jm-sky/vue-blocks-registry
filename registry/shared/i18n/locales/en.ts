// Registry i18n messages - English
// This file contains only messages for registry components (auth, common, validation, errors)
// Demo-specific messages should be in src/i18n/locales/

import { authEn } from '@registry/modules/auth/i18n/index'
import { logsEn } from '@registry/modules/logs/i18n'
import { settingsEn } from '@registry/modules/settings/i18n'
import { userEn } from '@registry/modules/user/i18n'

export default {
  common: {
    welcome: 'Welcome',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    confirm: 'Confirm',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    actions: 'Actions',
    yes: 'Yes',
    no: 'No',
    previous: 'Previous',
    next: 'Next',
    columns: 'Columns',
    open_menu: 'Open menu',
    copyToClipboard: {
      success: 'Copied to clipboard',
      copied: 'Copied',
      copy: 'Copy',
    },
  },
  validation: {
    required: 'This field is required',
    email: 'Invalid email address',
    min: 'Must be at least {min} characters',
    max: 'Must be at most {max} characters',
    password_mismatch: 'Passwords do not match',
    password_too_short: 'Password must be at least {min} characters',
    invalid_token: 'Invalid or expired token',
  },
  errors: {
    generic: 'An error occurred. Please try again',
    network: 'Network error. Please check your connection',
    unauthorized: 'You are not authorized to perform this action',
    not_found: 'Resource not found',
    server_error: 'Server error. Please try again later',
  },
  // Module locales (merged)
  ...authEn,
  ...userEn,
  ...settingsEn,
  ...logsEn,
}
