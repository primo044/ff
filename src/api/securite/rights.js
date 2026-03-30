import apiClient from '../client'

export const rightsAPI = {
  listRights: (page = 0, size = 10, filters = {}) =>
    apiClient.post('/securite/droits/listDroits', filters, { params: { page, size } }),
    
  getRight: (droitId) =>
    apiClient.get(`/securite/droits/getDroit/${droitId}`),
    
  createRight: (data) =>
    apiClient.post('/securite/droits/addDroit', data),
    
  updateRight: (droitId, data) =>
    apiClient.post(`/securite/droits/updateDroit/${droitId}`, data),
    
  deleteRight: (droitId) =>
    apiClient.post(`/securite/droits/deleteDroit/${droitId}`)
}
