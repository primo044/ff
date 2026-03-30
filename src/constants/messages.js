// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful',
  LOGOUT: 'Logged out successfully',
  CREATE: 'Record created successfully',
  UPDATE: 'Record updated successfully',
  DELETE: 'Record deleted successfully',
  SAVE: 'Changes saved successfully'
}

// Error Messages
export const ERROR_MESSAGES = {
  LOGIN_FAILED: 'Login failed. Please check your credentials.',
  INVALID_CREDENTIALS: 'Invalid username or password',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  NOT_AUTHORIZED: 'You do not have permission to perform this action',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check the form for errors',
  RECORD_NOT_FOUND: 'Record not found',
  RECORD_IN_USE: 'This record is in use and cannot be deleted'
}

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
  PHONE: 'Please enter a valid phone number',
  MIN_LENGTH: (n) => `Must be at least ${n} characters`,
  MAX_LENGTH: (n) => `Must not exceed ${n} characters`,
  PATTERN: 'Invalid format'
}

// Confirmation Messages
export const CONFIRM_MESSAGES = {
  DELETE: 'Are you sure you want to delete this record?',
  LOGOUT: 'Are you sure you want to log out?',
  DISCARD: 'You have unsaved changes. Do you want to discard them?'
}
