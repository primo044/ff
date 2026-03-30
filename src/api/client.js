import axios from 'axios'

const API_BASE_URL = '/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add request interceptor to include token
apiClient.interceptors.request.use(
  (config) => {
    // Don't add token to login request
    if (config.url === '/auth/login') {
      console.group('[API-REQUEST] 🔐 LOGIN')
      console.log('URL:', config.url)
      console.log('Method:', config.method.toUpperCase())
      console.log('Headers:', config.headers)
      console.log('Data keys:', Object.keys(config.data || {}))
      console.groupEnd()
      return config
    }
    
    // Get token from localStorage
    let token = localStorage.getItem('token')
    
    console.group(`[API-REQUEST] ${config.method.toUpperCase()} ${config.url}`)
    console.log('Token in storage:', token ? `✅ (${token.length} chars)` : '❌ MISSING')
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('Authorization header set:', `Bearer ${token.substring(0, 30)}...`)
    }
    
    console.log('Full headers being sent:', config.headers)
    console.groupEnd()
    
    return config
  },
  (error) => Promise.reject(error)
)

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses
    console.log(`[API] ✅ Response ${response.status} from ${response.config.url}:`, {
      dataKeys: response.data ? Object.keys(response.data) : 'no data',
      hasToken: !!response.data?.token,
      tokenLength: response.data?.token?.length || 0
    })
    return response
  },
  (error) => {
    const errorStatus = error.response?.status || 'Unknown'
    const errorMessage = error.response?.data?.message || error.message || 'Unknown error'
    
    console.error(`[API-ERROR] ${errorStatus} from ${error.config?.url}:`, {
      method: error.config?.method?.toUpperCase(),
      message: errorMessage,
      fullErrorData: error.response?.data
    })
    
    // ONLY redirect to login on actual 401 with expired token
    if (error.response?.status === 401) {
      const token = localStorage.getItem('token')
      const currentPath = window.location.pathname
      const isPostRequest = error.config?.method?.toUpperCase() === 'POST'
      
      console.error(`[API-401] Unauthorized at ${currentPath}:`, {
        hasToken: !!token,
        isLoginPage: currentPath.includes('/login'),
        method: error.config?.method?.toUpperCase()
      })
      
      // For POST/PUT/DELETE requests, don't auto-redirect - let the component handle it
      if (isPostRequest) {
        console.warn('[API-401] POST method - letting component handle 401 error')
        return Promise.reject(error)
      }
      
      // Only redirect if we have a token that was rejected (token expired)
      if (token && !currentPath.includes('/login')) {
        console.warn('[API-401] 🔴 Token rejected by server - clearing and redirecting to login')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setTimeout(() => {
          window.location.href = '/login'
        }, 500)
      }
    }
    
    return Promise.reject(error)
  }
)

export default apiClient
