import apiClient from '../client'

export const clientContractFollowUpAPI = {
  listFollowUps: (page = 0, size = 10, filters = {}) =>
    apiClient.post('/clientsContratsSuivi/listSuivis', filters, { params: { page, size } }),
    
  getActiveFollowUps: () =>
    apiClient.get('/clientsContratsSuivi/getActiveSuivis'),
    
  getFollowUpsByContract: (clientsContratsId) =>
    apiClient.get(`/clientsContratsSuivi/getSuivisByContrat/${clientsContratsId}`),
    
  getFollowUp: (suiviId) =>
    apiClient.get(`/clientsContratsSuivi/getSuivi/${suiviId}`),
    
  createFollowUp: (data) =>
    apiClient.post('/clientsContratsSuivi/addSuivi', data),
    
  updateFollowUp: (suiviId, data) =>
    apiClient.post(`/clientsContratsSuivi/updateSuivi/${suiviId}`, data),
    
  deleteFollowUp: (suiviId) =>
    apiClient.post(`/clientsContratsSuivi/deleteSuivi/${suiviId}`),
    
  enableDisableFollowUp: (suiviId, statusBool) =>
    apiClient.post(`/clientsContratsSuivi/enableDisable/${suiviId}`, { statusBool })
}
