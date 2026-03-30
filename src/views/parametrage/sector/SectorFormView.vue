<template>
  <div class="form-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">{{ isEdit ? 'Edit Sector' : 'Create Sector' }}</h2>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="libelle" class="form-label">Sector Name *</label>
          <input
            id="libelle"
            v-model="formData.libelle"
            type="text"
            class="form-input"
            required
            placeholder="Enter sector name"
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
          <router-link to="/sectors" class="btn btn-secondary">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { sectorsAPI } from '../../../api'

const router = useRouter()
const route = useRoute()

const isEdit = ref(false)
const loading = ref(false)
const error = ref('')

const formData = ref({
  libelle: '',
  description: ''
})

const loadSector = async () => {
  try {
    const response = await sectorsAPI.getSector(route.params.id)
    formData.value = {
      libelle: response.data.libelle,
      description: response.data.description || ''
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load sector'
  }
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    if (isEdit.value) {
      await sectorsAPI.updateSector(route.params.id, formData.value)
    } else {
      await sectorsAPI.createSector(formData.value)
    }
    router.push('/sectors')
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to save sector'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (route.params.id) {
    isEdit.value = true
    loadSector()
  }
})
</script>

<style scoped>
.form-container {
width: 100%;
  margin: 0 auto
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
