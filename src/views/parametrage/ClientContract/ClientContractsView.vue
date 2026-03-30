<template>
  <div class="contracts-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Client Contracts</h2>
        <router-link to="/contracts/create" class="btn btn-success">Add Contract</router-link>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <div v-if="loading" class="loading-container">
        <div class="loading"></div>
        <p>Loading contracts...</p>
      </div>

      <template v-else>
        <table v-if="contracts.length" class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Number</th>
              <th>Amount</th>
              <th>Users</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contract in contracts" :key="contract.id">
              <td>{{ contract.id }}</td>
              <td>{{ contract.code }}</td>
              <td>{{ contract.numContrat }}</td>
              <td>${{ contract.mntContrat?.toLocaleString() }}</td>
              <td>{{ contract.nbUtilisateur }}</td>
              <td>
                <span :class="['status', contract.status ? 'active' : 'inactive']">
                  {{ contract.status ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="actions">
                <router-link :to="`/contracts/${contract.id}/edit`" class="btn btn-primary btn-sm">Edit</router-link>
                <button @click="toggleContract(contract)" class="btn btn-sm btn-secondary">
                  {{ contract.status ? 'Disable' : 'Enable' }}
                </button>
                <button @click="deleteContract(contract.id)" class="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="no-data">
          No contracts found. <router-link to="/contracts/create">Create one</router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { clientContractsAPI } from '../../../api'

const loading = ref(false)
const error = ref('')
const contracts = ref([])

const loadContracts = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await clientContractsAPI.listContracts(0, 100)
    contracts.value = response.data.content || []
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load contracts'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const toggleContract = async (contract) => {
  try {
    await clientContractsAPI.enableDisableContract(contract.id, !contract.status)
    await loadContracts()
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to update contract'
  }
}

const deleteContract = async (contractId) => {
  if (!confirm('Are you sure you want to delete this contract?')) return
  try {
    await clientContractsAPI.deleteContract(contractId)
    await loadContracts()
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to delete contract'
  }
}

onMounted(() => loadContracts())
</script>

<style scoped>
.contracts-container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  min-width: 100%;
}

.table th,
.table td {
  padding: 0.75rem 1rem;
  text-align: left;
}

.no-data {
  text-align: center;
  padding: 2rem;
  color: #718096;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.status.active {
  background: #c6f6d5;
  color: #22543d;
}

.status.inactive {
  background: #fed7d7;
  color: #742a2a;
}

.actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: nowrap;
  white-space: nowrap;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}
</style>
