import apiClient from '../client'

export const organismsAPI = {
  listOrganisms: (page = 0, size = 10, filters = {}) =>
    apiClient.post('/organismes/listOrganismes', filters, { params: { page, size } }),
    
  getActiveOrganisms: () =>
    apiClient.get('/organismes/getActiveOrganismes'),
    
  getOrganism: (organismeId) =>
    apiClient.get(`/organismes/getOrganisme/${organismeId}`),
    
  createOrganism: (data) =>
    apiClient.post('/organismes/addOrganisme', data),
    
  updateOrganism: (organismeId, data) =>
    apiClient.post(`/organismes/updateOrganisme/${organismeId}`, data),
    
  deleteOrganism: (organismeId) =>
    apiClient.post(`/organismes/deleteOrganisme/${organismeId}`),
    
  enableDisableOrganism: (organismeId, statusBool) =>
    apiClient.post(`/organismes/enableDisable/${organismeId}`, { statusBool })
}
