/**
 * API Debugger - Test API calls directly from browser console
 * Usage: window.testAPI.testEmployees()
 */

import apiClient from '../api/client'

export const apiDebugger = {
  // Test login
  async testLogin(username = 'admin', password = 'Admin@123') {
    console.group('=== TEST: Login ===')
    console.log('Testing login with:', { username, password })
    
    try {
      const response = await apiClient.post('/auth/login', {
        login: username,
        pwd: password
      })
      console.log('✅ Login success:', response.data)
      
      // Manually save token
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          roles: response.data.roles || []
        }))
        console.log('✅ Token saved to localStorage')
        console.log('Token preview:', response.data.token.substring(0, 50) + '...')
      }
      console.groupEnd()
      return response.data
    } catch (error) {
      console.error('❌ Login failed:', {
        status: error.response?.status,
        data: error.response?.data
      })
      console.groupEnd()
      throw error
    }
  },

  // Test Employees endpoint
  async testEmployees() {
    console.group('=== TEST: GET /api/param/employes/getActiveEmployes ===')
    const token = localStorage.getItem('token')
    console.log('Token in storage:', token ? `✅ Found (${token.length} chars)` : '❌ NOT FOUND')
    
    try {
      console.log('Sending request...')
      const response = await apiClient.get('/param/employes/getActiveEmployes')
      console.log('✅ SUCCESS:', response.status)
      console.log('Response data:', response.data)
      console.groupEnd()
      return response.data
    } catch (error) {
      console.error('❌ FAILED:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      })
      console.groupEnd()
      throw error
    }
  },

  // Test Contract Types endpoint
  async testContractTypes(page = 0, size = 10) {
    console.group(`=== TEST: POST /api/param/typesContrats/listTypesContrats (page=${page}, size=${size}) ===`)
    const token = localStorage.getItem('token')
    console.log('Token in storage:', token ? `✅ Found (${token.length} chars)` : '❌ NOT FOUND')
    
    try {
      console.log('Sending request...')
      const response = await apiClient.post('/param/typesContrats/listTypesContrats', {}, { params: { page, size } })
      console.log('✅ SUCCESS:', response.status)
      console.log('Response data:', response.data)
      console.groupEnd()
      return response.data
    } catch (error) {
      console.error('❌ FAILED:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      })
      console.groupEnd()
      throw error
    }
  },

  // Check auth status
  checkAuth() {
    console.group('=== AUTH STATUS CHECK ===')
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    console.log('📋 LocalStorage Status:')
    console.log('  Token:', token ? `✅ Found (${token.length} chars)` : '❌ NOT FOUND')
    console.log('  User:', user ? '✅ Found' : '❌ NOT FOUND')
    
    if (token) {
      console.log('\n🔑 Token Details:')
      console.log('  First 50 chars:', token.substring(0, 50))
      console.log('  Last 20 chars:', '...' + token.substring(token.length - 20))
      console.log('  Would send as: Bearer ' + token.substring(0, 20) + '...')
    }
    
    if (user) {
      console.log('\n👤 User Details:', JSON.parse(user))
    }
    
    console.groupEnd()
  },

  // Clear all auth
  clearAuth() {
    console.log('🗑️ Clearing all auth data')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    console.log('✅ Auth cleared')
  }
}

// Make it available globally in development
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  window.testAPI = apiDebugger
  console.log('🔧 API Debugger loaded! Use window.testAPI.testEmployees() or window.testAPI.testContractTypes()')
}

export default apiDebugger
