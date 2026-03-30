import axios from 'axios'
import { useAuthStore } from '../stores/auth'
import env from '../config'

/**
 * Axios instance with interceptors for:
 * - Adding auth tokens to requests
 * - Handling auth errors (401)
 * - Global error formatting
 */
export const axiosInstance = axios.create({
  baseURL: env.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor - Add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Response interceptor - Handle errors globally
 * - 401: Redirect to login
 * - 403: Forbidden access
 * - 404: Resource not found
 * - 5xx: Server errors
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLogoutRequest = error.config?.url?.includes('/auth/logout')
    
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401 && !isLogoutRequest) {
      const authStore = useAuthStore()
      authStore.logout()
      window.location.href = '/login'
      return Promise.reject(error)
    }

    // Format error message for better UX
    const errorMessage = error.response?.data?.message ||
                        error.response?.data?.error ||
                        error.message ||
                        'An unexpected error occurred'

    // Attach formatted error to response for service layer
    error.formattedMessage = errorMessage
    error.statusCode = error.response?.status

    return Promise.reject(error)
  }
)

export default axiosInstance
