/**
 * Centralized Service Layer
 * All API calls go through services with consistent error handling and response format
 */

import { authAPI, usersAPI, rightsAPI, rolesAPI, roleRightsAPI, userRightsAPI } from '@/api/securite'
import {
  clientsAPI,
  contractsAPI,
  employeesAPI,
  sectorsAPI,
  clientContactsAPI,
  clientProjectsAPI,
  functionsAPI,
  metiersAPI,
  projectsAPI,
  organismsAPI,
  clientContractsAPI,
  clientContractFollowUpAPI,
  contractTypesAPI
} from '@/api/parametrage'
import { clientService } from './clientService'

// Note: Direct API calls now used instead of service factory wrapper patterns
// The API modules provide sufficient error handling and consistency

/**
 * Response format for all service methods:
 * {
 *   success: boolean,
 *   data?: any,      // Only if success is true
 *   error?: string   // Only if success is false
 * }
 */

// ============ SECURITY SERVICES ============

export const authService = {
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

  async logout() {
    try {
      await authAPI.logout()
    } catch (error) {
      // Log but don't fail logout - always clear local storage
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    return { success: true }
  }
}

export const usersService = usersAPI
export const rightsService = rightsAPI
export const rolesService = rolesAPI
export const roleRightsService = roleRightsAPI
export const userRightsService = userRightsAPI

// ============ PARAMETRAGE SERVICES ============

export const clientsService = clientService
export const contractsService = contractsAPI
export const employeesService = employeesAPI
export const sectorsService = sectorsAPI
export const clientContactsService = clientContactsAPI
export const clientProjectsService = clientProjectsAPI
export const functionsService = functionsAPI
export const metiersService = metiersAPI
export const projectsService = projectsAPI
export const organismsService = organismsAPI
export const clientContractsService = clientContractsAPI
export const clientContractFollowUpService = clientContractFollowUpAPI
export const contractTypesService = contractTypesAPI

// ============ DEFAULT EXPORT ============
export default {
  // Security
  auth: authService,
  users: usersService,
  rights: rightsService,
  roles: rolesService,
  roleRights: roleRightsService,
  userRights: userRightsService,

  // Parametrage
  clients: clientsService,
  contracts: contractsService,
  employees: employeesService,
  sectors: sectorsService,
  clientContacts: clientContactsService,
  clientProjects: clientProjectsService,
  functions: functionsService,
  metiers: metiersService,
  projects: projectsService,
  organisms: organismsService,
  clientContracts: clientContractsService,
  clientContractFollowUp: clientContractFollowUpService,
  contractTypes: contractTypesService
}
