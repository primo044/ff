// App Configuration
export const APP_CONFIG = {
  NAME: 'ERP KAY System',
  VERSION: '1.0.0',
  ENVIRONMENT: import.meta.env.MODE
}

// Pagination Defaults
export const PAGINATION = {
  DEFAULT_PAGE: 0,
  DEFAULT_SIZE: 10,
  AVAILABLE_SIZES: [5, 10, 25, 50, 100]
}

// User Roles
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE',
  USER: 'USER'
}

// Permission Actions
export const ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  MANAGE: 'manage'
}

// Resource Types for CASL
export const RESOURCES = {
  CLIENT: 'Client',
  CONTRACT: 'Contract',
  PROJECT: 'Project',
  USER: 'User',
  DASHBOARD: 'Dashboard'
}

// Status Enums
export const STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING',
  ARCHIVED: 'ARCHIVED'
}

// Sort Orders
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc'
}
