import apiClient from '../client'

export const functionsAPI = {
  listFunctions: (page = 0, size = 10, filters = {}) =>
    apiClient.post('/fonctions/listFonctions', filters, { params: { page, size } }),
    
  getActiveFunctions: () =>
    apiClient.get('/fonctions/getActiveFonctions'),
    
  getFunction: (fonctionId) =>
    apiClient.get(`/fonctions/getFonction/${fonctionId}`),
    
  createFunction: (data) =>
    apiClient.post('/fonctions/addFonction', data),
    
  updateFunction: (fonctionId, data) =>
    apiClient.post(`/fonctions/updateFonction/${fonctionId}`, data),
    
  deleteFunction: (fonctionId) =>
    apiClient.post(`/fonctions/deleteFonction/${fonctionId}`),
    
  enableDisableFunction: (fonctionId, statusBool) =>
    apiClient.post(`/fonctions/enableDisable/${fonctionId}`, { statusBool })
}
