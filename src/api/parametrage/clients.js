import apiClient from '../client'

/**
 * @typedef {Object} Client
 * @property {number} id - Client ID
 * @property {string} code - Client code
 * @property {string} libelle - Client name
 * @property {boolean} active - Is client active
 * @property {string} [email] - Client email
 * @property {string} [phone] - Client phone
 * @property {string} [address] - Client address
 */

/**
 * @typedef {Object} ListResponse
 * @property {Client[]} content - Array of clients
 * @property {number} totalElements - Total number of clients
 * @property {number} totalPages - Total number of pages
 * @property {number} currentPage - Current page number
 */

/**
 * Clients API - Handles all client-related API operations
 * @type {Object}
 */
export const clientsAPI = {
  /**
   * List clients with pagination and filters
   * @param {number} page - Page number (0-indexed)
   * @param {number} size - Page size
   * @param {Object} filters - Filter criteria
   * @returns {Promise<{data: ListResponse}>}
   */
  listClients: (page = 0, size = 10, filters = {}) =>
    apiClient.post('/clients/listClients', filters, { params: { page, size } }),
  
  /**
   * Get all active clients
   * @returns {Promise<{data: Client[]}>}
   */
  getActiveClients: () =>
    apiClient.get('/clients/getActiveClients'),
  
  /**
   * Get a single client by ID
   * @param {number} clientId - Client ID
   * @returns {Promise<{data: Client}>}
   */
  getClient: (clientId) =>
    apiClient.get(`/clients/${clientId}`),

  /**
   * Create a new client
   * @param {Partial<Client>} clientData - Client data to create
   * @returns {Promise<{data: Client}>}
   */
  createClient: (clientData) =>
    apiClient.post('/clients', clientData),

  /**
   * Update an existing client
   * @param {number} clientId - Client ID
   * @param {Partial<Client>} clientData - Updated client data
   * @returns {Promise<{data: Client}>}
   */
  updateClient: (clientId, clientData) =>
    apiClient.put(`/clients/${clientId}`, clientData),

  /**
   * Delete a client
   * @param {number} clientId - Client ID
   * @returns {Promise<{data: void}>}
   */
  deleteClient: (clientId) =>
    apiClient.delete(`/clients/${clientId}`),

  /**
   * Search clients by query
   * @param {string} query - Search query
   * @returns {Promise<{data: Client[]}>}
   */
  searchClients: (query) =>
    apiClient.get('/clients/search', { params: { q: query } })
}
