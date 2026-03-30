import apiClient from '../client'

export const clientContractsAPI = {
  listContracts: (page = 0, size = 10, filters = {}) =>
    apiClient.post('/clientsContrats/listContrats', filters, { params: { page, size } }),
    
  getActiveContracts: () =>
    apiClient.get('/clientsContrats/getActiveContrats'),
    
  getContract: (contratId) =>
    apiClient.get(`/clientsContrats/getContrat/${contratId}`),
    
  createContract: (data) =>
    apiClient.post('/clientsContrats/addContrat', data),
    
  updateContract: (contratId, data) =>
    apiClient.post(`/clientsContrats/updateContrat/${contratId}`, data),
    
  deleteContract: (contratId) =>
    apiClient.post(`/clientsContrats/deleteContrat/${contratId}`),
    
  enableDisableContract: (contratId, statusBool) =>
    apiClient.post(`/clientsContrats/enableDisable/${contratId}`, { statusBool })
}
