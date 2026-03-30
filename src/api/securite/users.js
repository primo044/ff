import apiClient from '../client'

export const usersAPI = {
  listUsers: (page = 0, size = 10, filters = {}) =>
    apiClient.post('/securite/users/listUsers', filters, { params: { page, size } }),
    
  getActiveUsers: () =>
    apiClient.get('/securite/users/getActiveUsers'),
    
  getUser: (userId) =>
    apiClient.get(`/securite/users/getUser/${userId}`),
    
  createUser: (data) =>
    apiClient.post('/securite/users/addUser', data),
    
  updateUser: (userId, data) =>
    apiClient.post(`/securite/users/updateUser/${userId}`, data),
    
  deleteUser: (userId) =>
    apiClient.post(`/securite/users/deleteUser/${userId}`),
    
  enableDisableUser: (userId, statusBool) =>
    apiClient.post(`/securite/users/enableDisable/${userId}`, { statusBool }),
    
  resetPassword: (userId) =>
    apiClient.post(`/securite/users/resetPwd/${userId}`),

  getCurrentUser: () =>
    apiClient.get('/users/me'),

  getUserRoles: (userId) =>
    apiClient.get(`/users/${userId}/roles`)
}
