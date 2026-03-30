import apiClient from '../client'

export const rolesAPI = {
  listRoles: (page = 0, size = 10, filters = {}) =>
    apiClient.post('/securite/roles/listRoles', filters, { params: { page, size } }),
    
  getActiveRoles: () =>
    apiClient.get('/securite/roles/getActiveRoles'),
    
  getRole: (roleId) =>
    apiClient.get(`/securite/roles/getRole/${roleId}`),
    
  createRole: (data) =>
    apiClient.post('/securite/roles/addRole', data),
    
  updateRole: (roleId, data) =>
    apiClient.post(`/securite/roles/updateRole/${roleId}`, data),
    
  deleteRole: (roleId) =>
    apiClient.post(`/securite/roles/deleteRole/${roleId}`)
}
