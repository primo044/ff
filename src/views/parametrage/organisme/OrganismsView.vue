<template>
  <div class="organisms-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Organizations Management</h2>
        <router-link to="/organisms/create" class="btn btn-success">Add Organization</router-link>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <div v-if="loading" class="loading-container">
        <div class="loading"></div>
        <p>Loading organizations...</p>
      </div>

      <template v-else>
        <table v-if="organisms.length" class="table">
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
            <tr v-for="organism in organisms" :key="organism.id">
              <td>{{ organism.id }}</td>
              <td>{{ organism.libelle }}</td>
              <td>{{ organism.description || '-' }}</td>
              <td>
                <span :class="['status', organism.status ? 'active' : 'inactive']">
                  {{ organism.status ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="actions">
                <router-link :to="`/organisms/${organism.id}/edit`" class="btn btn-primary btn-sm">Edit</router-link>
                <button @click="toggleOrganism(organism)" class="btn btn-sm" :class="organism.status ? 'btn-secondary' : 'btn-success'">
                  {{ organism.status ? 'Disable' : 'Enable' }}
                </button>
                <button @click="deleteOrganism(organism.id)" class="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="no-data">
          No organizations found. <router-link to="/organisms/create">Create one</router-link>
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
import { organismsAPI } from '../../../api'

const loading = ref(false)
const error = ref('')
const organisms = ref([])
const currentPage = ref(0)
const totalPages = ref(0)
const pageSize = 10

const loadOrganisms = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await organismsAPI.listOrganisms(currentPage.value, pageSize)
    organisms.value = response.data.content
    totalPages.value = response.data.totalPages
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load organizations'
  } finally {
    loading.value = false
  }
}

const toggleOrganism = async (organism) => {
  try {
    await organismsAPI.enableDisableOrganism(organism.id, !organism.status)
    await loadOrganisms()
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to update organization'
  }
}

const deleteOrganism = async (organismId) => {
  if (confirm('Are you sure?')) {
    try {
      await organismsAPI.deleteOrganism(organismId)
      await loadOrganisms()
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete organization'
    }
  }
}

const nextPage = async () => {
  currentPage.value++
  await loadOrganisms()
}

const previousPage = async () => {
  if (currentPage.value > 0) {
    currentPage.value--
    await loadOrganisms()
  }
}

onMounted(loadOrganisms)
</script>

<style scoped>
.organisms-container {
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
