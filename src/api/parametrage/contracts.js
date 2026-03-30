import apiClient from '../client'

export const contractsAPI = {
  listContracts: (page = 0, size = 10, filters = {}) =>
    apiClient.post('/contracts/listContracts', filters, { params: { page, size } }),

  getContract: (contractId) =>
    apiClient.get(`/contracts/${contractId}`),

  createContract: (contractData) =>
    apiClient.post('/contracts', contractData),

  updateContract: (contractId, contractData) =>
    apiClient.put(`/contracts/${contractId}`, contractData),

  deleteContract: (contractId) =>
    apiClient.delete(`/contracts/${contractId}`),

  getContractTypes: () =>
    apiClient.get('/contract-types'),

  getContractFollowUps: (contractId) =>
    apiClient.get(`/contracts/${contractId}/follow-ups`)
}
