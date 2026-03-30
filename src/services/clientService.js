import { clientsAPI } from '@/api/parametrage'

export const clientService = {
  async getClients(page = 0, size = 10, filters = {}) {
    try {
      const response = await clientsAPI.listClients(page, size, filters)
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  async getClient(clientId) {
    try {
      const response = await clientsAPI.getClient(clientId)
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  async createClient(clientData) {
    try {
      const response = await clientsAPI.createClient(clientData)
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  async updateClient(clientId, clientData) {
    try {
      const response = await clientsAPI.updateClient(clientId, clientData)
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  async deleteClient(clientId) {
    try {
      await clientsAPI.deleteClient(clientId)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}
