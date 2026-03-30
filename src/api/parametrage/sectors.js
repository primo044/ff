import apiClient from '../client'

export const sectorsAPI = {
  listSectors: (page = 0, size = 10, filters = {}) =>
    apiClient.post('/secteursActivites/listSecteurs', filters, { params: { page, size } }),
    
  getActiveSectors: () =>
    apiClient.get('/secteursActivites/getActiveSecteurs'),
    
  getSector: (secteurId) =>
    apiClient.get(`/secteursActivites/getSecteur/${secteurId}`),
    
  createSector: (data) =>
    apiClient.post('/secteursActivites/addSecteur', data),
    
  updateSector: (secteurId, data) =>
    apiClient.post(`/secteursActivites/updateSecteur/${secteurId}`, data),
    
  deleteSector: (secteurId) =>
    apiClient.post(`/secteursActivites/deleteSecteur/${secteurId}`),
    
  enableDisableSector: (secteurId, statusBool) =>
    apiClient.post(`/secteursActivites/enableDisable/${secteurId}`, { statusBool })
}
