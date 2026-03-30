/**
 * Global Error Handler Utility
 * Provides centralized error notification and logging
 */

import { toast } from 'vue3-toastify'
import { logger, LogLevel } from './logger'

/**
 * Error severity levels
 */
export const ErrorLevel = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  CRITICAL: 'critical'
}

/**
 * Log error using centralized logger
 */
function logError(level, message, details = null) {
  const logLevelMap = {
    [ErrorLevel.INFO]: LogLevel.INFO,
    [ErrorLevel.WARNING]: LogLevel.WARN,
    [ErrorLevel.ERROR]: LogLevel.ERROR,
    [ErrorLevel.CRITICAL]: LogLevel.ERROR
  }

  const logLevel = logLevelMap[level] || LogLevel.ERROR
  logger[logLevel === LogLevel.WARN ? 'warn' : logLevel === LogLevel.INFO ? 'info' : 'error'](message, details)
}

/**
 * Show error notification to user
 */
function showNotification(level, message) {
  const options = {
    autoClose: level === ErrorLevel.CRITICAL ? false : 4000,
    pauseOnHover: true
  }

  switch (level) {
    case ErrorLevel.INFO:
      toast.info(message, options)
      break
    case ErrorLevel.WARNING:
      toast.warning(message, options)
      break
    case ErrorLevel.ERROR:
      toast.error(message, options)
      break
    case ErrorLevel.CRITICAL:
      toast.error(`⚠️ ${message}`, { ...options, autoClose: false })
      break
    default:
      toast(message, options)
  }
}

/**
 * Handle API errors from axios
 * @param {Error} error - The axios error
 * @param {string} context - Where the error occurred
 * @returns {object} Formatted error object
 */
export function handleApiError(error, context = 'API Request') {
  const errorInfo = {
    status: error.response?.status,
    message: error.formattedMessage || error.message,
    context,
    timestamp: new Date().toISOString()
  }

  // Handle specific error codes
  switch (errorInfo.status) {
    case 400:
      logError(ErrorLevel.WARNING, `Bad Request: ${errorInfo.message}`, error.response?.data)
      showNotification(ErrorLevel.WARNING, `Invalid request: ${errorInfo.message}`)
      break

    case 401:
      logError(ErrorLevel.WARNING, 'Unauthorized access')
      // Don't show notification - axios interceptor handles redirect
      break

    case 403:
      logError(ErrorLevel.ERROR, 'Access Forbidden')
      showNotification(ErrorLevel.ERROR, 'You do not have permission to perform this action')
      break

    case 404:
      logError(ErrorLevel.WARNING, `Resource not found: ${errorInfo.message}`)
      showNotification(ErrorLevel.WARNING, 'Resource not found')
      break

    case 422:
      logError(ErrorLevel.WARNING, `Validation error: ${errorInfo.message}`, error.response?.data)
      showNotification(ErrorLevel.WARNING, `Validation error: ${errorInfo.message}`)
      break

    case 500:
    case 502:
    case 503:
      logError(ErrorLevel.CRITICAL, `Server error (${errorInfo.status}): ${errorInfo.message}`)
      showNotification(ErrorLevel.CRITICAL, 'Server error - please try again later')
      break

    default:
      logError(ErrorLevel.ERROR, errorInfo.message, errorInfo)
      showNotification(ErrorLevel.ERROR, errorInfo.message || 'An error occurred')
  }

  return errorInfo
}

/**
 * Handle service layer errors
 * @param {object} serviceResult - Result from service call
 * @param {string} context - Where the error occurred
 */
export function handleServiceError(serviceResult, context = 'Service') {
  if (serviceResult.success) {
    return true
  }

  const errorInfo = {
    message: serviceResult.error,
    context,
    timestamp: new Date().toISOString()
  }

  logError(ErrorLevel.ERROR, errorInfo.message, { context })
  showNotification(ErrorLevel.ERROR, serviceResult.error)

  return false
}

/**
 * Show info notification
 */
export function showInfo(message) {
  logError(ErrorLevel.INFO, message)
  showNotification(ErrorLevel.INFO, message)
}

/**
 * Show warning notification
 */
export function showWarning(message) {
  logError(ErrorLevel.WARNING, message)
  showNotification(ErrorLevel.WARNING, message)
}

/**
 * Show success notification
 */
export function showSuccess(message) {
  logError(ErrorLevel.INFO, message)
  toast.success(message, { autoClose: 3000, pauseOnHover: true })
}

/**
 * Show error notification
 */
export function showError(message) {
  logError(ErrorLevel.ERROR, message)
  showNotification(ErrorLevel.ERROR, message)
}

/**
 * Global Vue error handler
 * @param {Error} err
 * @param {object} instance - Vue component instance
 * @param {string} info - Error info
 */
export function setupGlobalErrorHandler(app) {
  app.config.errorHandler = (err, instance, info) => {
    const errorInfo = {
      message: err?.message || 'Unknown error',
      component: instance?.$options?.name || 'Unknown',
      lifecycle: info,
      timestamp: new Date().toISOString()
    }

    logError(
      ErrorLevel.ERROR,
      `Component error in ${errorInfo.component}`,
      errorInfo
    )

    // Only show user-facing error if not in dev (has proper message)
    if (err?.message && !err?.message?.includes('undefined')) {
      showNotification(ErrorLevel.ERROR, err.message)
    }
  }

  // Setup warning handler for development
  if (import.meta.env.DEV) {
    app.config.warnHandler = (msg, instance, trace) => {
      const component = instance?.$options?.name || 'Unknown'
      logError(ErrorLevel.WARNING, `[${component}] ${msg}`, { trace })
    }
  }
}

export default {
  handleApiError,
  handleServiceError,
  showInfo,
  showWarning,
  showSuccess,
  showError,
  setupGlobalErrorHandler,
  ErrorLevel
}
