import apiClient from '../client'

export const projectsAPI = {
  listProjects: (page = 0, size = 10, filters = {}) =>
    apiClient.post('/projets/listProjets', filters, { params: { page, size } }),
    
  getActiveProjects: () =>
    apiClient.get('/projets/getActiveProjets'),
    
  getProject: (projetId) =>
    apiClient.get(`/projets/getProjet/${projetId}`),
    
  createProject: (data) =>
    apiClient.post('/projets/addProjet', data),
    
  updateProject: (projetId, data) =>
    apiClient.post(`/projets/updateProjet/${projetId}`, data),
    
  deleteProject: (projetId) =>
    apiClient.post(`/projets/deleteProjet/${projetId}`),
    
  enableDisableProject: (projetId, statusBool) =>
    apiClient.post(`/projets/enableDisable/${projetId}`, { statusBool })
}
