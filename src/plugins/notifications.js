import Notifications from 'vue-awesome-notifications'

export const notificationsPlugin = Notifications

// Helper functions for common notifications
export const notify = {
  success: (title, message = '') => {
    return {
      title,
      message,
      type: 'success',
      duration: 3000
    }
  },
  error: (title, message = '') => {
    return {
      title,
      message,
      type: 'error',
      duration: 5000
    }
  },
  warning: (title, message = '') => {
    return {
      title,
      message,
      type: 'warning',
      duration: 4000
    }
  },
  info: (title, message = '') => {
    return {
      title,
      message,
      type: 'info',
      duration: 3000
    }
  }
}
