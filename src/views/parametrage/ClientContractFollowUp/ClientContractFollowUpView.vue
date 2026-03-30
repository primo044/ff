<template>
  <div class="followup-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Contract Follow-ups</h2>
        <router-link to="/contract-followups/create" class="btn btn-success">Add Follow-up</router-link>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <div v-if="loading" class="loading-container">
        <div class="loading"></div>
        <p>Loading follow-ups...</p>
      </div>

      <template v-else>
        <table v-if="followUps.length" class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>License Key</th>
              <th>Amount</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="followup in followUps" :key="followup.id">
              <td>{{ followup.id }}</td>
              <td>{{ followup.code }}</td>
              <td>{{ followup.licenceCle }}</td>
              <td>${{ followup.mntContrat?.toLocaleString() }}</td>
              <td>{{ formatDate(followup.dateDebut) }}</td>
              <td>{{ formatDate(followup.dateFin) }}</td>
              <td>
                <span :class="['status', followup.status ? 'active' : 'inactive']">
                  {{ followup.status ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="actions">
                <router-link :to="`/contract-followups/${followup.id}/edit`" class="btn btn-primary btn-sm">Edit</router-link>
                <button @click="toggleFollowUp(followup)" class="btn btn-sm btn-secondary">
                  {{ followup.status ? 'Disable' : 'Enable' }}
                </button>
                <button @click="deleteFollowUp(followup.id)" class="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="no-data">
          No follow-ups found. <router-link to="/contract-followups/create">Create one</router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { clientContractFollowUpAPI } from '../../../api'

const loading = ref(false)
const error = ref('')
const followUps = ref([])

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const loadFollowUps = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await clientContractFollowUpAPI.listFollowUps(0, 100)
    followUps.value = response.data.content || []
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load follow-ups'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const toggleFollowUp = async (followup) => {
  try {
    await clientContractFollowUpAPI.enableDisableFollowUp(followup.id, !followup.status)
    await loadFollowUps()
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to update follow-up'
  }
}

const deleteFollowUp = async (followupId) => {
  if (!confirm('Are you sure you want to delete this follow-up?')) return
  try {
    await clientContractFollowUpAPI.deleteFollowUp(followupId)
    await loadFollowUps()
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to delete follow-up'
  }
}

onMounted(() => loadFollowUps())
</script>

<style scoped>
.followup-container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  min-width: 100%;
}

.table th,
.table td {
  padding: 0.75rem 1rem;
  text-align: left;
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
  flex-wrap: nowrap;
  white-space: nowrap;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}
</style>
