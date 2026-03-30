// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
}

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_ERROR: 500
}

// API Endpoints
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    CHECK: '/auth/check'
  },
  CLIENTS: {
    LIST: '/clients/listClients',
    GET: (id) => `/clients/${id}`,
    CREATE: '/clients',
    UPDATE: (id) => `/clients/${id}`,
    DELETE: (id) => `/clients/${id}`,
    SEARCH: '/clients/search'
  },
  CONTRACTS: {
    LIST: '/contracts/listContracts',
    GET: (id) => `/contracts/${id}`,
    CREATE: '/contracts',
    UPDATE: (id) => `/contracts/${id}`,
    DELETE: (id) => `/contracts/${id}`,
    FOLLOW_UPS: (id) => `/contracts/${id}/follow-ups`
  },
  PROJECTS: {
    LIST: '/projects/listProjects',
    GET: (id) => `/projects/${id}`,
    CREATE: '/projects',
    UPDATE: (id) => `/projects/${id}`,
    DELETE: (id) => `/projects/${id}`
  },
  USERS: {
    LIST: '/users/listUsers',
    GET: (id) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
    CURRENT: '/users/me'
  }
}
