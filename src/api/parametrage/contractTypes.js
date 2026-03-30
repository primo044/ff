import apiClient from '../client'

export const contractTypesAPI = {
  listContractTypes: (page = 0, size = 10, filters = {}) =>
    apiClient.post('/typesContrats/listTypesContrats', filters, { params: { page, size } }),
    
  getActiveContractTypes: () =>
    apiClient.get('/typesContrats/getActiveTypesContrats'),
    
  getContractType: (typeContratId) =>
    apiClient.get(`/typesContrats/getTypeContrat/${typeContratId}`),
    
  createContractType: (data) =>
    apiClient.post('/typesContrats/addTypeContrat', data),
    
  updateContractType: (typeContratId, data) =>
    apiClient.post(`/typesContrats/updateTypeContrat/${typeContratId}`, data),
    
  deleteContractType: (typeContratId) =>
    apiClient.post(`/typesContrats/deleteTypeContrat/${typeContratId}`),
    
  setContractTypeStatus: (typeContratId, status) =>
    apiClient.post(`/typesContrats/setTypeContratStatus/${typeContratId}`, { status })
}
