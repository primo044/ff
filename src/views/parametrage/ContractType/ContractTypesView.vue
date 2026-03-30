<template>
  <div class="types-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Contract Types</h2>
        <router-link to="/contract-types/create" class="btn btn-success">Add Type</router-link>
      </div>

      <div v-if="error" class="alert alert-error">
        {{ error }}
      </div>

      <div v-if="loading" class="loading-container">
        <div class="loading"></div>
        <p>Loading contract types...</p>
      </div>

      <template v-else>
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            class="form-input"
            placeholder="Search contract types..."
            @input="handleSearch"
          />
        </div>

        <table v-if="types.length" class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Validity (months)</th>
              <th>Context</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="type in types" :key="type.id">
              <td>{{ type.id }}</td>
              <td>{{ type.libelle }}</td>
              <td>{{ type.nbMoisValidte }}</td>
              <td>{{ type.context }}</td>
              <td>
                <span :class="['status', type.status ? 'active' : 'inactive']">
                  {{ type.status ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="actions">
                <router-link :to="`/contract-types/${type.id}/edit`" class="btn btn-primary btn-sm">Edit</router-link>
                <button @click="toggleType(type)" class="btn btn-sm" :class="type.status ? 'btn-secondary' : 'btn-success'">
                  {{ type.status ? 'Disable' : 'Enable' }}
                </button>
                <button @click="deleteType(type.id)" class="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="no-data">
          No contract types found. <router-link to="/contract-types/create">Create one</router-link>
        </div>

        <div class="pagination">
          <button
            @click="previousPage"
            :disabled="currentPage === 0"
            class="pagination-item"
          >
            Previous
          </button>
          <span class="pagination-info">
            Page {{ currentPage + 1 }} of {{ totalPages }}
          </span>
          <button
            @click="nextPage"
            :disabled="currentPage >= totalPages - 1"
            class="pagination-item"
          >
            Next
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../../stores/auth'
import { contractTypesAPI } from '../../../api'

const authStore = useAuthStore()
const loading = ref(false)
const error = ref('')
const searchQuery = ref('')
const searchTimeout = ref(null)
const types = ref([])
const currentPage = ref(0)
const totalPages = ref(1)
const pageSize = ref(10)

const loadTypes = async (page = 0) => {
  if (!authStore.token) {
    error.value = 'Not authenticated. Please login first.'
    console.warn('[ContractTypesView] No token available, skipping API call')
    return
  }
  
  loading.value = true
  error.value = ''
  console.log('[ContractTypesView] Loading contract types with token length:', authStore.token.length)
  
  try {
    const response = await contractTypesAPI.listContractTypes(page, pageSize.value)
    console.log('[ContractTypesView] ✅ Success loading contract types:', response.data)
    types.value = response.data.content || []
    currentPage.value = response.data.currentPage || 0
    totalPages.value = response.data.totalPages || 1
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message || 'Failed to load contract types'
    error.value = errorMsg
    console.error('[ContractTypesView] ❌ Error loading contract types:', {
      status: err.response?.status,
      message: errorMsg,
      fullError: err.response?.data
    })
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  // Clear existing timeout to debounce
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
  
  // Reset to first page immediately
  currentPage.value = 0
  
  // Debounce the actual fetch by 300ms
  searchTimeout.value = setTimeout(() => {
    loadTypes(0).catch((err) => {
      console.error('Error during search', err)
    })
  }, 300)
}

const nextPage = async () => {
  if (currentPage.value < totalPages.value - 1) {
    await loadTypes(currentPage.value + 1)
  }
}

const previousPage = async () => {
  if (currentPage.value > 0) {
    await loadTypes(currentPage.value - 1)
  }
}

const toggleType = async (type) => {
  try {
    await contractTypesAPI.setContractTypeStatus(type.id, type.status ? '0' : '1')
    await loadTypes(currentPage.value)
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to update contract type'
  }
}

const deleteType = async (typeId) => {
  if (!confirm('Are you sure you want to delete this contract type?')) return
  try {
    await contractTypesAPI.deleteContractType(typeId)
    await loadTypes(currentPage.value)
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to delete contract type'
  }
}

onMounted(() => loadTypes())
</script>

<style scoped>
.types-container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.search-box {
  margin-bottom: 1rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.95rem;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

.table thead {
  background: rgba(0, 0, 0, 0.1);
}

.table th {
  padding: 1rem 2rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid var(--border);
  min-width: 150px;
}

.table td {
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border);
  min-width: 150px;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.85rem;
  font-weight: 500;
}

.status.active {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.status.inactive {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: none;
  display: inline-block;
  transition: all 0.2s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover {
  background: #059669;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover {
  background: #4b5563;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.85rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination-item {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  background: var(--bg-primary);
  color: var(--text-primary);
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-item:hover:not(:disabled) {
  background: var(--bg-secondary);
}

.pagination-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
}

.loading {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.no-data {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
}

.alert {
  padding: 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}

.alert-error {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}
</style>
