<template>
  <div class="form-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">{{ isEdit ? 'Edit Contract' : 'Create Contract' }}</h2>
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
              placeholder="Enter contract code"
            />
          </div>

          <div class="form-group">
            <label for="libelle" class="form-label">Name *</label>
            <input
              id="libelle"
              v-model="formData.libelle"
              type="text"
              class="form-input"
              required
              placeholder="Enter contract name"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="numContrat" class="form-label">Contract Number *</label>
            <input
              id="numContrat"
              v-model="formData.numContrat"
              type="text"
              class="form-input"
              required
              placeholder="e.g., NUM-2024-001"
            />
          </div>

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
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="nbUtilisateur" class="form-label">Number of Users *</label>
            <input
              id="nbUtilisateur"
              v-model.number="formData.nbUtilisateur"
              type="number"
              class="form-input"
              required
              placeholder="0"
            />
          </div>

          <div class="form-group">
            <label for="organismeId" class="form-label">Organization *</label>
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

        <div class="form-row">
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
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="typeContratId" class="form-label">Contract Type *</label>
            <input
              id="typeContratId"
              v-model.number="formData.typeContratId"
              type="number"
              class="form-input"
              required
              placeholder="Type ID"
            />
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Saving...' : isEdit ? 'Update' : 'Create' }}
          </button>
          <router-link to="/contracts" class="btn btn-secondary">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { clientContractsAPI } from '../../../api'

const router = useRouter()
const route = useRoute()

const isEdit = ref(false)
const loading = ref(false)
const error = ref('')

const formData = ref({
  code: '',
  libelle: '',
  numContrat: '',
  mntContrat: 0,
  nbUtilisateur: 0,
  dateDebut: '',
  dateFin: '',
  organismeId: '',
  typeContratId: '',
  status: '1'
})

const loadContract = async () => {
  try {
    const response = await clientContractsAPI.getContract(route.params.id)
    formData.value = {
      code: response.data.code,
      libelle: response.data.libelle,
      numContrat: response.data.numContrat,
      mntContrat: response.data.mntContrat,
      nbUtilisateur: response.data.nbUtilisateur,
      dateDebut: response.data.dateDebut,
      dateFin: response.data.dateFin,
      organismeId: response.data.organismeId,
      typeContratId: response.data.typeContratId,
      status: response.data.status
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load contract'
  }
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    if (isEdit.value) {
      await clientContractsAPI.updateContract(route.params.id, formData.value)
    } else {
      await clientContractsAPI.createContract(formData.value)
    }
    router.push('/contracts')
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to save contract'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (route.params.id) {
    isEdit.value = true
    loadContract()
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