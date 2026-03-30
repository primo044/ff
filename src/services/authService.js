import { authAPI } from '@/api'
import { jwtDecode } from 'jwt-decode'

/**
 * @typedef {Object} Credentials
 * @property {string} login - Username or email
 * @property {string} pwd - Password
 */

/**
 * @typedef {Object} User
 * @property {number} id - User ID
 * @property {string} username - Username
 * @property {string} email - User email
 * @property {Array<string>} roles - User roles
 */

/**
 * @typedef {Object} AuthResponse
 * @property {boolean} success - Operation success
 * @property {Object} [data] - Auth data (token, user info)
 * @property {string} [data.token] - JWT token
 * @property {User} [data.user] - User information
 * @property {string} [error] - Error message
 */

/**
 * Authentication Service - Handles login, logout, and token verification
 * @type {Object}
 */
export const authService = {
  /**
   * Authenticate user with credentials
   * @param {Credentials} credentials - User credentials
   * @returns {Promise<AuthResponse>}
   */
  async login(credentials) {
    try {
      const response = await authAPI.login(credentials)
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data))
        return { success: true, data: response.data }
      }
      return { success: false, error: 'No token received' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  /**
   * Logout user and clear session
   * @returns {Promise<{success: boolean}>}
   */
  async logout() {
    try {
      // Call backend logout endpoint to invalidate token on server
      await authAPI.logout()
    } catch (error) {
      // Silently fail - logout always clears local storage regardless
    } finally {
      // Always clear local storage regardless of server response
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },

  /**
   * Check if stored JWT token is still valid
   * @returns {boolean} True if token exists and not expired
   */
  isTokenValid() {
    const token = localStorage.getItem('token')
    if (!token) return false
    
    try {
      const decoded = jwtDecode(token)
      return decoded.exp * 1000 > Date.now()
    } catch {
      return false
    }
  },

  /**
   * Retrieve stored user from localStorage
   * @returns {User|null} User object or null
   */
  getStoredUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  /**
   * Retrieve stored JWT token from localStorage
   * @returns {string|null} JWT token or null
   */
  getStoredToken() {
    return localStorage.getItem('token')
  }
}
