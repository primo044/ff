<template>
  <div class="clients-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Clients Management</h2>
        <router-link to="/clients/create" class="btn btn-success">
          <span class="icon">+</span> Add Client
        </router-link>
      </div>

      <!-- Error Alert with Dismiss -->
      <div v-if="error" class="alert alert-error" role="alert">
        <div class="alert-content">
          <strong>Error:</strong> {{ error }}
        </div>
        <button @click="clearError" class="alert-dismiss" aria-label="Close error alert">
          ×
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-container" role="status" aria-live="polite">
        <div class="loading-spinner"></div>
        <p>Loading clients...</p>
      </div>

      <!-- Main Content -->
      <template v-else>
        <!-- Search Box -->
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            class="form-input"
            placeholder="Search clients by name..."
            aria-label="Search clients"
            @input="handleSearch"
          />
        </div>

        <!-- Clients Table -->
        <div v-if="clients.length > 0" class="table-wrapper">
          <table class="table" role="grid">
            <thead>
              <tr role="row">
                <th scope="col">ID</th>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col" class="actions-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="client in clients" :key="client.id" role="row">
                <td>{{ client.id }}</td>
                <td>{{ client.code }}</td>
                <td><strong>{{ client.libelle }}</strong></td>
                <td>
                  <span 
                    :class="['status-badge', { 
                      'status-active': client.active, 
                      'status-inactive': !client.active 
                    }]"
                    :aria-label="`Status: ${client.active ? 'Active' : 'Inactive'}`"
                  >
                    {{ client.active ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="actions">
                  <router-link 
                    :to="`/clients/${client.id}/edit`" 
                    class="btn btn-primary btn-sm"
                    :aria-label="`Edit ${client.libelle}`"
                  >
                    Edit
                  </router-link>
                  <button 
                    @click="toggleClient(client)" 
                    :disabled="getActionLoading(client.id).value"
                    class="btn btn-sm"
                    :class="client.active ? 'btn-secondary' : 'btn-success'"
                    :aria-label="`${client.active ? 'Disable' : 'Enable'} ${client.libelle}`"
                  >
                    {{ client.active ? 'Disable' : 'Enable' }}
                  </button>
                  <button 
                    @click="deleteClient(client)" 
                    :disabled="getActionLoading(client.id).value"
                    class="btn btn-danger btn-sm"
                    :aria-label="`Delete ${client.libelle}`"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
          <div class="empty-state-icon">📋</div>
          <h3>No clients found</h3>
          <p v-if="searchQuery">
            No results for "{{ searchQuery }}". 
            <button @click="searchQuery = ''; handleSearch()" class="link-button">Clear search</button>
          </p>
          <p v-else>
            Get started by <router-link to="/clients/create" class="link-button">creating your first client</router-link>
          </p>
        </div>

        <!-- Pagination -->
        <div v-if="clients.length > 0" class="pagination-container" role="navigation" aria-label="Pagination">
          <button
            @click="previousPage"
            :disabled="currentPage === 0 || loading"
            class="btn btn-sm"
            aria-label="Previous page"
          >
            ← Previous
          </button>
          <span class="pagination-info" aria-live="polite">
            Page {{ currentPage + 1 }} of {{ totalPages }}
          </span>
          <button
            @click="nextPage"
            :disabled="currentPage >= totalPages - 1 || loading"
            class="btn btn-sm"
            aria-label="Next page"
          >
            Next →
          </button>
        </div>
      </template>

      <!-- Confirm Delete Dialog -->
      <ConfirmDialog 
        v-model="confirmDialog.isOpen"
        :title="confirmDialog.title"
        :message="confirmDialog.message"
        confirm-text="Delete"
        cancel-text="Cancel"
        color="error"
        @confirm="confirmDelete"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDataFetch, useActionLoading } from '@/composables'
import { ConfirmDialog } from '@/components/dialogs'
import { clientsService } from '@/services'
import { showSuccess } from '@/utils/errorHandler'
import { logger } from '@/utils/logger'

// Data fetching
const searchQuery = ref('')
const searchTimeout = ref(null)
const {
  data: clients,
  loading,
  error,
  currentPage,
  pageSize,
  totalPages,
  fetch: fetchClients,
  clearError
} = useDataFetch(
  async (page, size, filters) => {
    return await clientsService.getClients(page, size, filters)
  },
  { initialPage: 0, initialPageSize: 10, autoFetch: false }
)

// Action loading states
const { isLoading: getActionLoading } = useActionLoading()

// Confirm dialog
const confirmDialog = ref({
  isOpen: false,
  title: 'Delete Client',
  message: '',
  clientToDelete: null
})

/**
 * Load clients with optional filters
 */
const loadClients = async () => {
  const filters = searchQuery.value ? { name: searchQuery.value } : {}
  await fetchClients(filters)
}

/**
 * Handle search with pagination reset and debouncing
 */
const handleSearch = () => {
  // Clear existing timeout to debounce
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
  
  // Reset pagination on new search
  currentPage.value = 0
  
  // Debounce the actual fetch by 300ms
  searchTimeout.value = setTimeout(() => {
    loadClients().catch((err) => {
      logger.error('Error during search', err)
    })
  }, 300)
}

/**
 * Toggle client active/inactive status
 */
const toggleClient = async (client) => {
  const actionLoading = getActionLoading(client.id)
  actionLoading.value = true

  try {
    const updateData = { ...client, active: !client.active }
    const result = await clientsService.updateClient(client.id, updateData)

    if (result.success) {
      showSuccess(`Client ${client.active ? 'disabled' : 'enabled'} successfully`)
      await loadClients()
    } else {
      logger.error('Toggle client failed', result)
    }
  } catch (err) {
    logger.error('Error toggling client', err)
  } finally {
    actionLoading.value = false
  }
}

/**
 * Open delete confirmation dialog
 */
const deleteClient = (client) => {
  confirmDialog.value = {
    isOpen: true,
    title: 'Delete Client',
    message: `Are you sure you want to delete "${client.libelle}"? This action cannot be undone.`,
    clientToDelete: client
  }
}

/**
 * Confirm and execute delete
 */
const confirmDelete = async () => {
  const client = confirmDialog.value.clientToDelete
  const actionLoading = getActionLoading(client.id)
  actionLoading.value = true

  try {
    const result = await clientsService.deleteClient(client.id)

    if (result.success) {
      showSuccess('Client deleted successfully')
      await loadClients()
    } else {
      logger.error('Delete client failed', result)
    }
  } catch (err) {
    logger.error('Error deleting client', err)
  } finally {
    actionLoading.value = false
    confirmDialog.value.isOpen = false
    confirmDialog.value.clientToDelete = null
  }
}

/**
 * Navigate to next page
 */
const nextPage = async () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++
    try {
      await loadClients()
    } catch (err) {
      logger.error('Error loading next page', err)
      currentPage.value-- // Revert on error
    }
  }
}

/**
 * Navigate to previous page
 */
const previousPage = async () => {
  if (currentPage.value > 0) {
    currentPage.value--
    try {
      await loadClients()
    } catch (err) {
      logger.error('Error loading previous page', err)
      currentPage.value++ // Revert on error
    }
  }
}

onMounted(() => {
  loadClients().catch((err) => {
    logger.error('Error loading clients on mount', err)
  })
})
</script>

<style scoped>
.clients-container {
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

.search-box {
  margin-bottom: 1.5rem;
}

.search-box .form-input {
  max-width: 400px;
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
  color: #54742a;
}

.actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}

.pagination-info {
  padding: 0.5rem 1rem;
  font-weight: 500;
}

.pagination-container {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
}
</style>
