import apiClient from '../client'

export const roleRightsAPI = {
  getRoleDroits: (roleId) =>
    apiClient.get(`/securite/rolesDroits/getRoleDroits/${roleId}`),
    
  affecterDroit: (roleId, droitIds) => {
    // Log the request for debugging
    console.log('Sending affecterDroit request:', {
      url: `/securite/rolesDroits/affecterDroit/${roleId}`,
      payload: { ids: droitIds },
      roleId: roleId,
      droitIds: droitIds
    })
return apiClient.post(`/securite/rolesDroits/affecterDroit/${roleId}`, droitIds)
  },
    
  desaffecterDroit: (roleId, droitIds) =>
    apiClient.post(`/securite/rolesDroits/desaffecterDroit/${roleId}`, { ids: droitIds })
}
