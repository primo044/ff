/**
 * Centralized Logger Utility
 * Provides consistent logging across the application with different severity levels
 */

export const LogLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
}

class Logger {
  constructor() {
    this.isDev = import.meta.env.DEV
    this.logHistoryLimit = 100
    this.history = []
  }

  /**
   * Format log message with timestamp and level
   */
  formatMessage(level, message, data = null) {
    const timestamp = new Date().toISOString()
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`
    
    return {
      timestamp,
      level,
      message,
      data,
      formatted: data 
        ? `${prefix} ${message} ${JSON.stringify(data)}`
        : `${prefix} ${message}`
    }
  }

  /**
   * Log entry to history (for debugging/monitoring)
   */
  addToHistory(logEntry) {
    this.history.push(logEntry)
    
    // Keep history size under control
    if (this.history.length > this.logHistoryLimit) {
      this.history.shift()
    }
  }

  /**
   * Log debug message
   */
  debug(message, data = null) {
    const logEntry = this.formatMessage(LogLevel.DEBUG, message, data)
    this.addToHistory(logEntry)
    
    if (this.isDev) {
      console.debug(logEntry.formatted, data || '')
    }
  }

  /**
   * Log info message
   */
  info(message, data = null) {
    const logEntry = this.formatMessage(LogLevel.INFO, message, data)
    this.addToHistory(logEntry)
    
    if (this.isDev) {
      console.log(logEntry.formatted, data || '')
    }
  }

  /**
   * Log warning message
   */
  warn(message, data = null) {
    const logEntry = this.formatMessage(LogLevel.WARN, message, data)
    this.addToHistory(logEntry)
    console.warn(logEntry.formatted, data || '')
  }

  /**
   * Log error message
   */
  error(message, error = null) {
    const logEntry = this.formatMessage(LogLevel.ERROR, message, error)
    this.addToHistory(logEntry)
    console.error(logEntry.formatted, error || '')
  }

  /**
   * Get log history
   */
  getHistory(level = null, limit = 50) {
    let logs = [...this.history]
    
    if (level) {
      logs = logs.filter(log => log.level === level)
    }
    
    return logs.slice(-limit)
  }

  /**
   * Clear log history
   */
  clearHistory() {
    this.history = []
  }

  /**
   * Export logs as JSON
   */
  exportLogs() {
    return JSON.stringify(this.history, null, 2)
  }
}

// Export singleton instance
export const logger = new Logger()

// Export default
export default logger
