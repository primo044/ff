<template>
  <div class="form-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">{{ isEdit ? 'Edit Contact' : 'Create Contact' }}</h2>
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
          <label for="nomPrenom" class="form-label">Name *</label>
          <input
            id="nomPrenom"
            v-model="formData.nomPrenom"
            type="text"
            class="form-input"
            required
            placeholder="Enter contact name"
          />
        </div>

        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            class="form-input"
            placeholder="Enter email"
          />
        </div>

        <div class="form-group">
          <label for="telephone" class="form-label">Phone</label>
          <input
            id="telephone"
            v-model="formData.telephone"
            type="tel"
            class="form-input"
            placeholder="Enter phone number"
          />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Saving...' : isEdit ? 'Update' : 'Create' }}
          </button>
          <router-link to="/contacts" class="btn btn-secondary">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { clientContactsAPI, clientsAPI } from '../../../api'

const router = useRouter()
const route = useRoute()

const isEdit = ref(false)
const loading = ref(false)
const error = ref('')
const clients = ref([])

const formData = ref({
  clientId: null,
  nomPrenom: '',
  email: '',
  telephone: ''
})

const loadClients = async () => {
  try {
    const response = await clientsAPI.getActiveClients()
    clients.value = response.data
  } catch (err) {
    console.error('Failed to load clients:', err)
  }
}

const loadContact = async () => {
  try {
    const response = await clientContactsAPI.getContact(route.params.id)
    formData.value = {
      clientId: response.data.clientId,
      nomPrenom: response.data.nomPrenom,
      email: response.data.email || '',
      telephone: response.data.telephone || ''
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load contact'
  }
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    if (isEdit.value) {
      await clientContactsAPI.updateContact(route.params.id, formData.value)
    } else {
      await clientContactsAPI.createContact(formData.value)
    }
    router.push('/contacts')
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to save contact'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadClients()
  if (route.params.id) {
    isEdit.value = true
    loadContact()
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
