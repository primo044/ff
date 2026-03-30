<template>
  <div class="form-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">{{ isEdit ? 'Edit Project' : 'Create Project' }}</h2>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="clientId" class="form-label">Client *</label>
          <select
            id="clientId"
            v-model.number="formData.clientId"
            class="form-input"
            required
          >
            <option value="">Select a client</option>
            <option v-for="client in clients" :key="client.id" :value="client.id">
              {{ client.libelle }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="libelle" class="form-label">Project Name *</label>
          <input
            id="libelle"
            v-model="formData.libelle"
            type="text"
            class="form-input"
            required
            placeholder="Enter project name"
          />
        </div>

        <div class="form-group">
          <label for="description" class="form-label">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            class="form-textarea"
            placeholder="Enter description"
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Saving...' : isEdit ? 'Update' : 'Create' }}
          </button>
          <router-link to="/client-projects" class="btn btn-secondary">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { clientProjectsAPI, clientsAPI } from '../../../api'

const router = useRouter()
const route = useRoute()

const isEdit = ref(false)
const loading = ref(false)
const error = ref('')
const clients = ref([])

const formData = ref({
  clientId: null,
  libelle: '',
  description: ''
})

const loadClients = async () => {
  try {
    const response = await clientsAPI.getActiveClients()
    clients.value = response.data
  } catch (err) {
    console.error('Failed to load clients:', err)
  }
}

const loadProject = async () => {
  try {
    const response = await clientProjectsAPI.getClientProject(route.params.id)
    formData.value = {
      clientId: response.data.clientId,
      libelle: response.data.libelle,
      description: response.data.description || ''
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load project'
  }
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    if (isEdit.value) {
      await clientProjectsAPI.updateClientProject(route.params.id, formData.value)
    } else {
      await clientProjectsAPI.createClientProject(formData.value)
    }
    router.push('/client-projects')
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to save project'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadClients()
  if (route.params.id) {
    isEdit.value = true
    loadProject()
  }
})
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.form-actions .btn {
  flex: 1;
  padding: 0.75rem;
}
</style>
