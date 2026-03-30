<template>
  <div class="form-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">{{ isEdit ? 'Edit Function' : 'Create Function' }}</h2>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="libelle" class="form-label">Name *</label>
          <input
            id="libelle"
            v-model="formData.libelle"
            type="text"
            class="form-input"
            required
            placeholder="Enter function name"
          />
        </div>

        <div class="form-group">
          <label for="code" class="form-label">Code</label>
          <input
            id="code"
            v-model="formData.code"
            type="text"
            class="form-input"
            placeholder="Function code"
          />
        </div>

        <div class="form-group">
          <label for="departement" class="form-label">Department</label>
          <input
            id="departement"
            v-model="formData.departement"
            type="text"
            class="form-input"
            placeholder="Department name"
          />
        </div>

        <div class="form-group">
          <label for="categorie" class="form-label">Category</label>
          <input
            id="categorie"
            v-model="formData.categorie"
            type="text"
            class="form-input"
            placeholder="Category"
          />
        </div>

        <div class="form-group">
          <label for="niveau" class="form-label">Level</label>
          <input
            id="niveau"
            v-model="formData.niveau"
            type="text"
            class="form-input"
            placeholder="Hierarchy level"
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

        <div class="form-group">
          <label style="display: flex; gap: 0.5rem; align-items: center;">
            <input v-model="formData.statusBool" type="checkbox" style="width: auto;" />
            <span class="form-label">Active</span>
          </label>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Saving...' : isEdit ? 'Update' : 'Create' }}
          </button>
          <router-link to="/functions" class="btn btn-secondary">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { functionsAPI } from '../../../api'

const router = useRouter()
const route = useRoute()

const isEdit = ref(false)
const loading = ref(false)
const error = ref('')

const formData = ref({
  libelle: '',
  code: '',
  departement: '',
  categorie: '',
  niveau: '',
  description: '',
  statusBool: true
})

const loadFunction = async () => {
  try {
    const response = await functionsAPI.getFunction(route.params.id)
    formData.value = {
      libelle: response.data.libelle || '',
      code: response.data.code || '',
      departement: response.data.departement || '',
      categorie: response.data.categorie || '',
      niveau: response.data.niveau || '',
      description: response.data.description || '',
      statusBool: response.data.status === 'Actif'
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load function'
  }
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    if (isEdit.value) {
      await functionsAPI.updateFunction(route.params.id, formData.value)
    } else {
      await functionsAPI.createFunction(formData.value)
    }
    router.push('/functions')
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to save function'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (route.params.id) {
    isEdit.value = true
    loadFunction()
  }
})
</script>

<style scoped>
.form-container {
  width: 100%;
  margin: 0 auto;
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