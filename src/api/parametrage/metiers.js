import apiClient from '../client'

export const metiersAPI = {
  listMetiers: (page = 0, size = 10, filters = {}) =>
    apiClient.post('/metiers/listMetiers', filters, { params: { page, size } }),
    
  getActiveMetiers: () =>
    apiClient.get('/metiers/getActiveMetiers'),
    
  getMetier: (metierId) =>
    apiClient.get(`/metiers/getMetier/${metierId}`),
    
  createMetier: (data) =>
    apiClient.post('/metiers/addMetier', data),
    
  updateMetier: (metierId, data) =>
    apiClient.post(`/metiers/updateMetier/${metierId}`, data),
    
  deleteMetier: (metierId) =>
    apiClient.post(`/metiers/deleteMetier/${metierId}`),
    
  enableDisableMetier: (metierId, statusBool) =>
    apiClient.post(`/metiers/enableDisable/${metierId}`, { statusBool })
}
