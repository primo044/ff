<template>
  <div class="functions-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Functions Management</h2>
        <router-link to="/functions/create" class="btn btn-success">Add Function</router-link>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <div v-if="loading" class="loading-container">
        <div class="loading"></div>
        <p>Loading functions...</p>
      </div>

      <template v-else>
        <table v-if="functions.length" class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="func in functions" :key="func.id">
              <td>{{ func.id }}</td>
              <td>{{ func.libelle }}</td>
              <td>{{ func.description || '-' }}</td>
              <td>
                <span :class="['status', func.status ? 'active' : 'inactive']">
                  {{ func.status ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="actions">
                <router-link :to="`/functions/${func.id}/edit`" class="btn btn-primary btn-sm">Edit</router-link>
                <button @click="toggleFunction(func)" class="btn btn-sm" :class="func.status ? 'btn-secondary' : 'btn-success'">
                  {{ func.status ? 'Disable' : 'Enable' }}
                </button>
                <button @click="deleteFunction(func.id)" class="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="no-data">
          No functions found. <router-link to="/functions/create">Create one</router-link>
        </div>

        <div class="pagination">
          <button @click="previousPage" :disabled="currentPage === 0" class="pagination-item">Previous</button>
          <span class="pagination-info">Page {{ currentPage + 1 }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage >= totalPages - 1" class="pagination-item">Next</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { functionsAPI } from '../../../api'

const loading = ref(false)
const error = ref('')
const functions = ref([])
const currentPage = ref(0)
const totalPages = ref(0)
const pageSize = 10

const loadFunctions = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await functionsAPI.listFunctions(currentPage.value, pageSize)
    functions.value = response.data.content
    totalPages.value = response.data.totalPages
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load functions'
  } finally {
    loading.value = false
  }
}

const toggleFunction = async (func) => {
  try {
    await functionsAPI.enableDisableFunction(func.id, !func.status)
    await loadFunctions()
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to update function'
  }
}

const deleteFunction = async (funcId) => {
  if (confirm('Are you sure?')) {
    try {
      await functionsAPI.deleteFunction(funcId)
      await loadFunctions()
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete function'
    }
  }
}

const nextPage = async () => {
  currentPage.value++
  await loadFunctions()
}

const previousPage = async () => {
  if (currentPage.value > 0) {
    currentPage.value--
    await loadFunctions()
  }
}

onMounted(loadFunctions)
</script>

<style scoped>
.functions-container {
  max-width: 1200px;
  margin: 0 auto;
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
  flex-wrap: wrap;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}

.pagination-info {
  padding: 0.5rem 1rem;
  font-weight: 500;
}
</style>
