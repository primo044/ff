<template>
  <div class="rights-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">{{ $t('management.rightsManagement') }}</h2>
        <router-link to="/rights/create" class="btn btn-success">{{ $t('management.addRight') }}</router-link>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <div v-if="loading" class="loading-container">
        <div class="loading"></div>
        <p>{{ $t('common.loading') }}</p>
      </div>

      <template v-else>
        <table v-if="rightStore.rights.length" class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>{{ $t('actions.managementTitle') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="right in rightStore.rights" :key="right.id">
              <td>{{ right.id }}</td>
              <td>{{ right.libelle }}</td>
              <td class="actions">
                <router-link :to="`/rights/${right.id}/edit`" class="btn btn-primary btn-sm">{{ $t('actions.edit') }}</router-link>
                <button @click="deleteRight(right.id)" class="btn btn-danger btn-sm">{{ $t('actions.delete') }}</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="no-data">
          {{ $t('management.noRightsFound') }}. <router-link to="/rights/create">{{ $t('management.createOne') }}</router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { rightsAPI } from '../../api'
import { useRightStore } from '../../stores'

const rightStore = useRightStore()
const loading = ref(false)
const error = ref('')

const loadRights = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await rightsAPI.listRights(0, 100)
    rightStore.rights = response.data.content
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load rights'
  } finally {
    loading.value = false
  }
}

const deleteRight = async (rightId) => {
  if (confirm('Are you sure?')) {
    try {
      await rightsAPI.deleteRight(rightId)
      await loadRights()
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete right'
    }
  }
}

onMounted(loadRights)
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
}

.card-title {
  margin: 0;
}

.rights-container {
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
