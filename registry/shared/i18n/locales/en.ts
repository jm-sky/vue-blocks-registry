// Registry i18n messages - English
// This file contains common messages shared across all registry components
// Module-specific messages (auth, logs, settings, user) are in their respective modules
// To use module translations, import and merge them in your project's i18n config
// Example: import { authEn } from '@/modules/auth/i18n'

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
    min_length: 'Must be at least {min} characters',
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
}
