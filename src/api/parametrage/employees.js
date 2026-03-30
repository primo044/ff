import apiClient from '../client'

export const employeesAPI = {
  listEmployees: (page = 0, size = 10, filters = {}) =>
    apiClient.post('/employes/listEmployes', filters, { params: { page, size } }),
    
  getActiveEmployees: () =>
    apiClient.get('/employes/getActiveEmployes'),
    
  getEmployee: (employeId) =>
    apiClient.get(`/employes/getEmploye/${employeId}`),
    
  createEmployee: (data) =>
    apiClient.post('/employes/addEmploye', data),
    
  updateEmployee: (employeId, data) =>
    apiClient.post(`/employes/updateEmploye/${employeId}`, data),
    
  deleteEmployee: (employeId) =>
    apiClient.post(`/employes/deleteEmploye/${employeId}`),
    
  enableDisableEmployee: (employeId, statusBool) =>
    apiClient.post(`/employes/enableDisable/${employeId}`, { statusBool })
}
