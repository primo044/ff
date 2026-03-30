<template>
  <div class="role-rights-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Manage Role Rights</h2>
        <router-link to="/roles" class="btn btn-secondary">Back to Roles</router-link>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>
      <div v-if="success" class="alert alert-success">{{ success }}</div>

      <div v-if="loading" class="loading-container">
        <div class="loading"></div>
        <p>Loading rights...</p>
      </div>

      <template v-else>
        <div class="rights-container-wrapper">
          <!-- Assigned Rights Section -->
          <div class="rights-section assigned-section">
            <h3>Droits Affectés ({{ assignedRights.length }})</h3>
            <div class="rights-list">
              <div
                v-for="(right, index) in assignedRights"
                :key="`assigned-${right.id}`"
                class="right-item assigned"
              >
                <span class="right-number">{{ index + 1 }}</span>
                <span class="right-name">{{ right.libelle }}</span>
                <span class="right-code">{{ right.code }}</span>
                <input
                  :id="`right-${right.id}`"
                  type="checkbox"
                  checked
                  @change="toggleRight(right.id, true)"
                  class="right-checkbox"
                />
              </div>
              <div v-if="assignedRights.length === 0" class="no-rights">
                Aucun droit affecté
              </div>
            </div>
          </div>

          <!-- Unassigned Rights Section -->
          <div class="rights-section unassigned-section">
            <h3>Droits Non Affectés ({{ unassignedRights.length }})</h3>
            <div class="rights-list">
              <div
                v-for="(right, index) in unassignedRights"
                :key="`unassigned-${right.id}`"
                class="right-item unassigned"
              >
                <span class="right-number">{{ assignedRights.length + index + 1 }}</span>
                <span class="right-name">{{ right.libelle }}</span>
                <span class="right-code">{{ right.code }}</span>
                <input
                  :id="`right-${right.id}`"
                  type="checkbox"
                  @change="toggleRight(right.id, false)"
                  class="right-checkbox"
                />
              </div>
              <div v-if="unassignedRights.length === 0" class="no-rights">
                Tous les droits sont affectés
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button @click="saveRights" class="btn btn-primary btn-large" :disabled="saving">
            {{ saving ? 'Saving...' : 'Save Rights' }}
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { rightsAPI, roleRightsAPI } from '../../api'
import { useAuthStore } from '../../stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const saving = ref(false)
const error = ref('')
const success = ref('')
const availableRights = ref([])
const assignedRightsList = ref([])  // Store all assigned rights from API
const selectedRights = ref(new Set())

// Computed properties to separate assigned and unassigned rights
const assignedRights = computed(() => {
  // Show rights that are in assignedRightsList
  return assignedRightsList.value
})

const unassignedRights = computed(() => {
  // Show available rights that are NOT in the selected set
  const assignedIds = new Set(assignedRightsList.value.map(r => r.id))
  return availableRights.value.filter(right => !assignedIds.has(right.id))
})

const isRightSelected = (rightId) => {
  return selectedRights.value.has(rightId)
}

const toggleRight = (rightId, isAssigned) => {
  if (isAssigned) {
    // Remove from assigned list
    assignedRightsList.value = assignedRightsList.value.filter(r => r.id !== rightId)
  } else {
    // Add to assigned list - find the right from available rights
    const right = availableRights.value.find(r => r.id === rightId)
    if (right) {
      assignedRightsList.value.push(right)
    }
  }
}

const loadRights = async () => {
  loading.value = true
  error.value = ''
  try {
    // Load current role rights - this endpoint returns both assigned and unassigned
    const roleRightsResponse = await roleRightsAPI.getRoleDroits(route.params.id)
    console.log('getRoleDroits response:', roleRightsResponse.data)
    
    const data = roleRightsResponse.data
    
    // The API returns both droitAffectes and droitsNonAffectes
    // Use them directly instead of computing
    assignedRightsList.value = data.droitAffectes || []
    availableRights.value = data.droitsNonAffectes || []
    
    console.log('%c✓ Rights loaded:', 'color: green; font-weight: bold;', {
      assignedCount: assignedRightsList.value.length,
      unassignedCount: availableRights.value.length,
      totalAvailable: (assignedRightsList.value.length + availableRights.value.length)
    })
  } catch (err) {
    console.error('Error loading rights:', err)
    error.value = err.response?.data?.message || 'Failed to load rights'
  } finally {
    loading.value = false
  }
}

const saveRights = async () => {
  saving.value = true
  error.value = ''
  success.value = ''

  try {
    // Extract IDs from the assigned rights list
    const rightsIds = assignedRightsList.value.map(right => right.id)
    
    console.log('Save attempt:', {
      roleId: route.params.id,
      rightsCount: rightsIds.length,
      rightsIds: rightsIds,
      hasToken: !!authStore.token,
      userId: authStore.user?.id
    })
    
    await roleRightsAPI.affecterDroit(route.params.id, rightsIds)
    success.value = 'Rights saved successfully!'
    setTimeout(() => {
      router.push('/roles')
    }, 1500)
  } catch (err) {
    console.error('Full error object:', err)
    console.error('Error response:', err.response)
    console.error('Error status:', err.response?.status)
    console.error('Error data:', err.response?.data)
    
    // More detailed error messages
    let errorMessage = 'Failed to save rights'
    
    if (err.response?.status === 401) {
      // On a 401 error, it could be:
      // 1. Session expired (token invalid)
      // 2. Permission denied (user lacks ROLES_UPDATE permission)
      
      // Check if this is a permission issue (trying to perform an action)
      // vs actually expired session (tried to load a page)
      const errorData = err.response?.data
      
      if (errorData?.message === 'Unauthorized' || errorData?.code === 'UNAUTHORIZED') {
        // This is likely a permission issue, not session expiration
        // Don't logout - just show the error message
        errorMessage = 'You do not have permission to modify role rights. You need the ROLES_UPDATE permission. Contact your administrator.'
        console.warn('[PERMISSION] User lacks ROLES_UPDATE permission')
      } else {
        // Actual session expiration
        errorMessage = 'Your session has expired. Please login again to continue.'
        authStore.logout()
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    } else if (err.response?.status === 403) {
      errorMessage = 'Forbidden: You do not have permission to modify role rights. You need the ROLES_UPDATE permission.'
    } else if (err.response?.data?.message) {
      errorMessage = err.response.data.message
    } else if (err.message) {
      errorMessage = err.message
    }
    
    error.value = errorMessage
  } finally {
    saving.value = false
  }
}

onMounted(loadRights)
</script>

<style scoped>
.role-rights-container {
  width: 120%;
  margin-left: -10%;
}

.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.card-title {
  margin: 0;
  font-size: 1.875rem;
  color: #1a365d;
  font-weight: 600;
}

.rights-container-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
}

.rights-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.rights-section h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #2d3748;
  font-weight: 600;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
}

.assigned-section h3 {
  border-bottom-color: #48bb78;
  color: #22543d;
}

.unassigned-section h3 {
  border-bottom-color: #ed8936;
  color: #7c2d12;
}

.rights-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.rights-list::-webkit-scrollbar {
  width: 8px;
}

.rights-list::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.rights-list::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

.rights-list::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

.right-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #f9fafb;
  transition: all 0.2s;
}

.right-item.assigned {
  background: #f0fdf4;
  border-color: #86efac;
}

.right-item.assigned:hover {
  background: #dcfce7;
  border-color: #4ade80;
}

.right-item.unassigned {
  background: #fffbf0;
  border-color: #fed7aa;
}

.right-item.unassigned:hover {
  background: #fef3c7;
  border-color: #fb923c;
}

.right-number {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  width: 28px;
  height: 28px;
  background: #cbd5e0;
  color: #1a202c;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
}

.right-item.assigned .right-number {
  background: #4ade80;
  color: white;
}

.right-item.unassigned .right-number {
  background: #fb923c;
  color: white;
}

.right-name {
  flex: 1;
  font-weight: 500;
  color: #1f2937;
  min-width: 150px;
}

.right-code {
  padding: 0.25rem 0.5rem;
  background: #e2e8f0;
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: monospace;
  color: #4b5563;
  white-space: nowrap;
  min-width: 100px;
  text-align: right;
}

.right-item.assigned .right-code {
  background: #dcfce7;
  color: #166534;
}

.right-item.unassigned .right-code {
  background: #fef3c7;
  color: #b45309;
}

.right-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #3182ce;
}

.no-rights {
  padding: 2rem 1rem;
  text-align: center;
  color: #a0aec0;
  font-style: italic;
  background: #f7fafc;
  border: 1px dashed #cbd5e0;
  border-radius: 6px;
}

.form-actions {
  padding: 2rem;
  border-top: 1px solid #e2e8f0;
  text-align: left;
}

.btn-large {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
}

.btn-primary {
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover:not(:disabled) {
  background: #2c5aa0;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: #e2e8f0;
  color: #2d3748;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.3s;
}

.btn-secondary:hover {
  background: #cbd5e0;
}

.alert {
  padding: 1rem;
  margin: 1rem 2rem 0;
  border-radius: 6px;
  border-left: 4px solid;
}

.alert-error {
  background: #fef2f2;
  border-color: #f87171;
  color: #991b1b;
}

.alert-success {
  background: #f0fdf4;
  border-color: #86efac;
  color: #166534;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1rem;
}

.loading {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top-color: #3182ce;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1024px) {
  .rights-container-wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
