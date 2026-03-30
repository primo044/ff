<template>
  <div class="form-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">{{ isEdit ? 'Edit Follow-up' : 'Create Follow-up' }}</h2>
      </div>

      <div v-if="error" class="alert alert-error">
        {{ error }}
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-row">
          <div class="form-group">
            <label for="code" class="form-label">Code *</label>
            <input
              id="code"
              v-model="formData.code"
              type="text"
              class="form-input"
              required
              placeholder="Enter follow-up code"
            />
          </div>

          <div class="form-group">
            <label for="licenceCle" class="form-label">License Key *</label>
            <input
              id="licenceCle"
              v-model="formData.licenceCle"
              type="text"
              class="form-input"
              required
              placeholder="e.g., KEY-GGL-2024-Q1"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="mntContrat" class="form-label">Amount *</label>
            <input
              id="mntContrat"
              v-model.number="formData.mntContrat"
              type="number"
              class="form-input"
              required
              step="0.01"
              placeholder="0.00"
            />
          </div>

          <div class="form-group">
            <label for="dateDebut" class="form-label">Start Date *</label>
            <input
              id="dateDebut"
              v-model="formData.dateDebut"
              type="datetime-local"
              class="form-input"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="dateFin" class="form-label">End Date *</label>
            <input
              id="dateFin"
              v-model="formData.dateFin"
              type="datetime-local"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label for="clientsContratsId" class="form-label">Client Contract ID *</label>
            <input
              id="clientsContratsId"
              v-model.number="formData.clientsContratsId"
              type="number"
              class="form-input"
              required
              placeholder="Contract ID"
            />
          </div>
        </div>

        <div class="form-row">
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
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Saving...' : isEdit ? 'Update' : 'Create' }}
          </button>
          <router-link to="/contract-followups" class="btn btn-secondary">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { clientContractFollowUpAPI } from '../../../api'

const router = useRouter()
const route = useRoute()

const isEdit = ref(false)
const loading = ref(false)
const error = ref('')

const formData = ref({
  code: '',
  licenceCle: '',
  mntContrat: 0,
  dateDebut: '',
  dateFin: '',
  clientsContratsId: '',
  organismeId: '',
  status: '1'
})

const loadFollowUp = async () => {
  try {
    const response = await clientContractFollowUpAPI.getFollowUp(route.params.id)
    formData.value = {
      code: response.data.code,
      licenceCle: response.data.licenceCle,
      mntContrat: response.data.mntContrat,
      dateDebut: response.data.dateDebut,
      dateFin: response.data.dateFin,
      clientsContratsId: response.data.clientsContratsId,
      organismeId: response.data.organismeId,
      status: response.data.status
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load follow-up'
  }
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    if (isEdit.value) {
      await clientContractFollowUpAPI.updateFollowUp(route.params.id, formData.value)
    } else {
      await clientContractFollowUpAPI.createFollowUp(formData.value)
    }
    router.push('/contract-followups')
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to save follow-up'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (route.params.id) {
    isEdit.value = true
    loadFollowUp()
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