<template>
  <div class="client-projects-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Client Projects Management</h2>
        <router-link to="/client-projects/create" class="btn btn-success">Add Project</router-link>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <div v-if="loading" class="loading-container">
        <div class="loading"></div>
        <p>Loading projects...</p>
      </div>

      <template v-else>
        <table v-if="projects.length" class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Client</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.id">
              <td>{{ project.id }}</td>
              <td>{{ project.libelle }}</td>
              <td>{{ project.client?.libelle || '-' }}</td>
              <td>{{ project.description || '-' }}</td>
              <td>
                <span :class="['status', project.status ? 'active' : 'inactive']">
                  {{ project.status ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="actions">
                <router-link :to="`/client-projects/${project.id}/edit`" class="btn btn-primary btn-sm">Edit</router-link>
                <button @click="toggleProject(project)" class="btn btn-sm" :class="project.status ? 'btn-secondary' : 'btn-success'">
                  {{ project.status ? 'Disable' : 'Enable' }}
                </button>
                <button @click="deleteProject(project.id)" class="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="no-data">
          No projects found. <router-link to="/client-projects/create">Create one</router-link>
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
import { clientProjectsAPI } from '../../../api'

const loading = ref(false)
const error = ref('')
const projects = ref([])
const currentPage = ref(0)
const totalPages = ref(0)
const pageSize = 10

const loadProjects = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await clientProjectsAPI.listClientProjects(currentPage.value, pageSize)
    projects.value = response.data.content
    totalPages.value = response.data.totalPages
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load projects'
  } finally {
    loading.value = false
  }
}

const toggleProject = async (project) => {
  try {
    await clientProjectsAPI.enableDisableClientProject(project.id, !project.status)
    await loadProjects()
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to update project'
  }
}

const deleteProject = async (projectId) => {
  if (confirm('Are you sure?')) {
    try {
      await clientProjectsAPI.deleteClientProject(projectId)
      await loadProjects()
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete project'
    }
  }
}

const nextPage = async () => {
  currentPage.value++
  await loadProjects()
}

const previousPage = async () => {
  if (currentPage.value > 0) {
    currentPage.value--
    await loadProjects()
  }
}

onMounted(loadProjects)
</script>

<style scoped>
.client-projects-container {
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
