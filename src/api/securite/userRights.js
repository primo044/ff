import apiClient from '../client'

export const userRightsAPI = {
  getUserDroits: (userId, roleId) =>
    apiClient.post(`/securite/usersDroits/getUserDroits/${userId}`, { roleId }),
    
  affecterDroit: (roleId, droitIds) =>
    apiClient.post(`/securite/usersDroits/affecterDroit/${roleId}`, { ids: droitIds }),
    
  desaffecterDroit: (roleId, droitIds) =>
    apiClient.post(`/securite/usersDroits/desaffecterDroit/${roleId}`, { ids: droitIds })
}
