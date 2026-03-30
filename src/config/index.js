/**
 * Get API URL with validation
 * Throws error in production if VITE_API_URL is not set
 */
function getApiUrl() {
  const url = import.meta.env.VITE_API_URL
  
  // In production, API URL must be explicitly set
  if (import.meta.env.PROD && !url) {
    throw new Error(
      'VITE_API_URL environment variable is required in production. ' +
      'Please set it in your .env.production file. ' +
      'See .env.example for configuration instructions.'
    )
  }
  
  // In development, allow localhost fallback with warning
  if (import.meta.env.DEV && !url) {
    console.warn(
      '⚠️ VITE_API_URL not set. Using default: http://localhost:6668. ' +
      'Set VITE_API_URL in .env.development to override. ' +
      'See .env.example for configuration instructions.'
    )
    return 'http://localhost:6668'
  }
  
  return url
}

// Environment configuration
export const env = {
  dev: import.meta.env.DEV,
  prod: import.meta.env.PROD,
  apiUrl: getApiUrl(),
  appName: import.meta.env.VITE_APP_NAME || 'ERP KAY System',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  logLevel: import.meta.env.VITE_LOG_LEVEL || 'info'
}

// Feature flags
export const featureFlags = {
  enableDataVisualization: true,
  enableExcelExport: true,
  enableAdvancedFiltering: true,
  enableRoleBasedAccess: true,
  enableAuditLog: true,
  enableDarkMode: true,
  enableMultiLanguage: true
}

// API endpoints
export const apiEndpoints = {
  // Auth
  login: '/auth/login',
  logout: '/auth/logout',
  refresh: '/auth/refresh',

  // Users
  users: '/users',
  user: (id) => `/users/${id}`,
  createUser: '/users',
  updateUser: (id) => `/users/${id}`,
  deleteUser: (id) => `/users/${id}`,

  // Clients
  clients: '/clients',
  client: (id) => `/clients/${id}`,
  createClient: '/clients',
  updateClient: (id) => `/clients/${id}`,
  deleteClient: (id) => `/clients/${id}`,

  // Projects
  projects: '/projects',
  project: (id) => `/projects/${id}`,
  createProject: '/projects',
  updateProject: (id) => `/projects/${id}`,
  deleteProject: (id) => `/projects/${id}`,

  // Contracts
  contracts: '/contracts',
  contract: (id) => `/contracts/${id}`,
  createContract: '/contracts',
  updateContract: (id) => `/contracts/${id}`,
  deleteContract: (id) => `/contracts/${id}`,

  // Other resources
  roles: '/roles',
  permissions: '/permissions',
  functions: '/functions',
  sectors: '/sectors',
  organisms: '/organisms',
  contractTypes: '/contract-types',
  metiers: '/metiers'
}

// HTTP status messages
export const httpStatusMessages = {
  200: 'Success',
  201: 'Created',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  422: 'Validation Error',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable'
}

// Default pagination
export const defaultPagination = {
  pageSize: 10,
  availableSizes: [5, 10, 25, 50, 100]
}

// Validation rules
export const validationRules = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 50
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/
  },
  phone: {
    pattern: /^[\d\s\-\+\(\)]+$/,
    minLength: 10
  }
}

// Theme configuration
export const themeConfig = {
  light: {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    warning: '#FB8C00',
    info: '#2196F3',
    success: '#4CAF50'
  },
  dark: {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    warning: '#FB8C00',
    info: '#2196F3',
    success: '#4CAF50'
  }
}

export default env
