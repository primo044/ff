import apiClient from '../client'

export const clientContactsAPI = {
  listContacts: (page = 0, size = 10, filters = {}) =>
    apiClient.post('/clientsContacts/listContacts', filters, { params: { page, size } }),
    
  getActiveContacts: () =>
    apiClient.get('/clientsContacts/getActiveContacts'),
    
  getContactsByClient: (clientId) =>
    apiClient.get(`/clientsContacts/getContactsByClient/${clientId}`),
    
  getContact: (contactId) =>
    apiClient.get(`/clientsContacts/getContact/${contactId}`),
    
  createContact: (data) =>
    apiClient.post('/clientsContacts/addContact', data),
    
  updateContact: (contactId, data) =>
    apiClient.post(`/clientsContacts/updateContact/${contactId}`, data),
    
  deleteContact: (contactId) =>
    apiClient.post(`/clientsContacts/deleteContact/${contactId}`),
    
  enableDisableContact: (contactId, statusBool) =>
    apiClient.post(`/clientsContacts/enableDisable/${contactId}`, { statusBool })
}
