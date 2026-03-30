import apiClient from '../client'

export const authAPI = {
  login: (credentials) => 
    apiClient.post('/auth/login', credentials),
    
  logout: async () => {
    try {
      console.log('[AuthAPI] 🔴 Calling logout endpoint...')
      // Attempt to call logout endpoint to invalidate token on server
      // Note: The 401 status is expected if token is invalid/expired on the backend
      const response = await apiClient.post('/auth/logout', {}, {
        skipErrorLog: true
      })
      console.log('[AuthAPI] ✅ Logout endpoint called successfully')
      return response
    } catch (error) {
      // Log quietly - 401 is expected if token is already invalid on server
      const status = error.response?.status
      if (status === 401) {
        console.log('[AuthAPI] ℹ️ Token already invalid on server (401)')
      } else {
        console.log('[AuthAPI] ℹ️ Logout endpoint error:', error.message)
      }
      // Don't throw - let localStorage cleanup happen anyway
      return null
    }
  },

  refresh: () =>
    apiClient.post('/auth/refresh'),

  checkAuth: () =>
    apiClient.get('/auth/check')
}
