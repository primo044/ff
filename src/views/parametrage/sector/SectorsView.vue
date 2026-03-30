<template>
  <div class="sectors-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Sectors Management</h2>
        <router-link to="/sectors/create" class="btn btn-success">Add Sector</router-link>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <div v-if="loading" class="loading-container">
        <div class="loading"></div>
        <p>Loading sectors...</p>
      </div>

      <template v-else>
        <table v-if="sectorStore.sectors.length" class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sector in sectorStore.sectors" :key="sector.id">
              <td>{{ sector.id }}</td>
              <td>{{ sector.libelle }}</td>
              <td>
                <span :class="['status', sector.active ? 'active' : 'inactive']">
                  {{ sector.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="actions">
                <router-link :to="`/sectors/${sector.id}/edit`" class="btn btn-primary btn-sm">Edit</router-link>
                <button @click="toggleSector(sector)" class="btn btn-sm btn-secondary">
                  {{ sector.active ? 'Disable' : 'Enable' }}
                </button>
                <button @click="deleteSector(sector.id)" class="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="no-data">
          No sectors found. <router-link to="/sectors/create">Create one</router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { sectorsAPI } from '../../../api'
import { useSectorStore } from '../../../stores'

const sectorStore = useSectorStore()
const loading = ref(false)
const error = ref('')

const loadSectors = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await sectorsAPI.listSectors(0, 100)
    sectorStore.sectors = response.data.content
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load sectors'
  } finally {
    loading.value = false
  }
}

const toggleSector = async (sector) => {
  try {
    await sectorsAPI.enableDisableSector(sector.id, !sector.active)
    await loadSectors()
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to update sector'
  }
}

const deleteSector = async (sectorId) => {
  if (confirm('Are you sure?')) {
    try {
      await sectorsAPI.deleteSector(sectorId)
      await loadSectors()
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete sector'
    }
  }
}

onMounted(loadSectors)
</script>

<style scoped>
.sectors-container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 1rem 2rem;
  text-align: left;
  min-width: 150px;
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
