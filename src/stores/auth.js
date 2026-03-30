import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { authAPI } from '../api'

export const useAuthStore = defineStore('auth', () => {
  // Initialize from localStorage
  const storedToken = localStorage.getItem('token')
  const storedUser = localStorage.getItem('user')
  
  const token = ref(storedToken || null)
  const user = ref(storedUser ? JSON.parse(storedUser) : null)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => {
    // Check token.value first
    if (token.value) {
      return true
    }
    
    // Check localStorage directly (source of truth during logout)
    const tokenInStorage = localStorage.getItem('token')
    if (tokenInStorage && !token.value) {
      // Sync from localStorage if store lost token
      console.warn('[AuthStore] ⚠️ Syncing token from localStorage')
      token.value = tokenInStorage
      const userInStorage = localStorage.getItem('user')
      if (userInStorage) {
        try {
          user.value = JSON.parse(userInStorage)
        } catch (e) {
          console.error('[AuthStore] Failed to parse user from storage')
        }
      }
      return true
    }
    
    // No token anywhere = not authenticated
    return false
  })

  const login = async (credentials) => {
    loading.value = true
    error.value = null
    try {
      const response = await authAPI.login(credentials)
      
      // Extract token from response
      const tokenValue = response.data.token
      
      if (!tokenValue) {
        error.value = 'Invalid login response - no token received'
        return false
      }
      
      // Set both ref and localStorage
      token.value = tokenValue
      user.value = {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        roles: response.data.roles || []
      }
      
      // Save to localStorage
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
      
      return true
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Login failed'
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      console.log('[AuthStore] 🔴 Logout started')
      // Call API logout (which handles server invalidation)
      try {
        await authAPI.logout()
        console.log('[AuthStore] ✅ Server logout completed')
      } catch (error) {
        // API errors are expected during logout - just log and continue
        console.log('[AuthStore] ℹ️ Server logout error (expected):', error.message)
      }
    } finally {
      // Always clear the in-memory state first
      console.log('[AuthStore] 🔴 Clearing in-memory state...')
      token.value = null
      user.value = null
      
      // Trick to ensure watchers execute
      await new Promise(resolve => setTimeout(resolve, 10))
      
      // Explicitly clear localStorage to prevent race conditions
      console.log('[AuthStore] 🔴 Clearing localStorage...')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      console.log('[AuthStore] ✅ Logout complete - all state cleared')
    }
  }

  // Watch token changes and keep localStorage in sync
  watch(token, (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  })

  // Watch user changes and keep localStorage in sync
  watch(user, (newUser) => {
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser))
    } else {
      localStorage.removeItem('user')
    }
  })

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout
  }
})
