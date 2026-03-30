import apiClient from '../client'

export const clientProjectsAPI = {
  listClientProjects: (page = 0, size = 10, filters = {}) =>
    apiClient.post('/clientsProjets/listClientsProjets', filters, { params: { page, size } }),
    
  getActiveClientProjects: () =>
    apiClient.get('/clientsProjets/getActiveClientsProjets'),
    
  getClientProject: (clientProjetId) =>
    apiClient.get(`/clientsProjets/getClientProjet/${clientProjetId}`),
    
  createClientProject: (data) =>
    apiClient.post('/clientsProjets/addClientProjet', data),
    
  updateClientProject: (clientProjetId, data) =>
    apiClient.post(`/clientsProjets/updateClientProjet/${clientProjetId}`, data),
    
  deleteClientProject: (clientProjetId) =>
    apiClient.post(`/clientsProjets/deleteClientProjet/${clientProjetId}`),
    
  enableDisableClientProject: (clientProjetId, statusBool) =>
    apiClient.post(`/clientsProjets/enableDisable/${clientProjetId}`, { statusBool })
}
