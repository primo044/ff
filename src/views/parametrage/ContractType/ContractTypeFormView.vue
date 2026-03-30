<template>
  <div class="form-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">{{ isEdit ? 'Edit Contract Type' : 'Create Contract Type' }}</h2>
      </div>

      <div v-if="error" class="alert alert-error">
        {{ error }}
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="libelle" class="form-label">Name *</label>
          <input
            id="libelle"
            v-model="formData.libelle"
            type="text"
            class="form-input"
            required
            placeholder="e.g., CDI, CDD, Freelance"
          />
        </div>

        <div class="form-group">
          <label for="nbMoisValidte" class="form-label">Validity (months) *</label>
          <input
            id="nbMoisValidte"
            v-model.number="formData.nbMoisValidte"
            type="number"
            class="form-input"
            required
            min="0"
            placeholder="36"
          />
        </div>

        <div class="form-group">
          <label for="context" class="form-label">Context</label>
          <input
            id="context"
            v-model="formData.context"
            type="text"
            class="form-input"
            placeholder="e.g., Permanent, Temporary"
          />
        </div>

        <div class="form-group">
          <label for="organismeId" class="form-label">Organization ID *</label>
          <input
            id="organismeId"
            v-model.number="formData.organismeId"
            type="number"
            class="form-input"
            required
            placeholder="Organization ID"
          />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Saving...' : isEdit ? 'Update' : 'Create' }}
          </button>
          <router-link to="/contract-types" class="btn btn-secondary">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { contractTypesAPI } from '../../../api'

const router = useRouter()
const route = useRoute()

const isEdit = ref(false)
const loading = ref(false)
const error = ref('')

const formData = ref({
  libelle: '',
  nbMoisValidte: 0,
  context: '',
  organismeId: '',
  status: '1'
})

const loadType = async () => {
  try {
    const response = await contractTypesAPI.getContractType(route.params.id)
    formData.value = {
      libelle: response.data.libelle,
      nbMoisValidte: response.data.nbMoisValidte,
      context: response.data.context || '',
      organismeId: response.data.organismeId,
      status: response.data.status
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load contract type'
  }
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    if (isEdit.value) {
      await contractTypesAPI.updateContractType(route.params.id, formData.value)
    } else {
      await contractTypesAPI.createContractType(formData.value)
    }
    router.push('/contract-types')
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to save contract type'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (route.params.id) {
    isEdit.value = true
    loadType()
  }
})
</script>

<style scoped>
.form-container {
  width: 100%;
  margin: 0 auto;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
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