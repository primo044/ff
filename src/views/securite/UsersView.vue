<template>
  <div class="users-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Users Management</h2>
        <router-link to="/users/create" class="btn btn-success">Add User</router-link>
      </div>

      <div v-if="error" class="alert alert-error">
        {{ error }}
        <small v-if="debugInfo" style="display: block; margin-top: 0.5rem; opacity: 0.8;">
          Check browser console (F12) for detailed API response information
        </small>
      </div>

      <div v-if="loading" class="loading-container">
        <div class="loading"></div>
        <p>Loading users...</p>
      </div>

      <template v-else>
        <table v-if="userStore.users.length" class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Login</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in userStore.users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.login }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span :class="['status', isActive(user.status) ? 'active' : 'inactive']">
                  {{ formatStatus(user.status) }}
                </span>
              </td>
              <td class="actions">
                <router-link :to="`/users/${user.id}/edit`" class="btn btn-primary btn-sm">Edit</router-link>
                <button @click="toggleUser(user)" class="btn btn-sm btn-secondary">
                  {{ isActive(user.status) ? 'Disable' : 'Enable' }}
                </button>
                <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="no-data">
          No users found. <router-link to="/users/create">Create one</router-link>
        </div>

        <div class="pagination">
          <button @click="previousPage" :disabled="userStore.currentPage === 0" class="pagination-item">Previous</button>
          <span class="pagination-info">Page {{ userStore.currentPage + 1 }} of {{ userStore.totalPages }}</span>
          <button @click="nextPage" :disabled="userStore.currentPage >= userStore.totalPages - 1" class="pagination-item">Next</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usersAPI } from '../../api'
import { useUserStore } from '../../stores'

const userStore = useUserStore()
const loading = ref(false)
const error = ref('')
const debugInfo = ref(false)

const isActive = (status) => {
  // Log what we're checking
  console.log('isActive called with:', { status, type: typeof status })
  
  // Treat as INACTIVE only if explicitly false/0/disabled
  const inactiveValues = ['0', 0, false, 'false', 'INACTIVE', 'DISABLED', 'inactive', 'disabled']
  
  // If status is in inactive list, return false
  if (inactiveValues.includes(status)) {
    return false
  }
  
  // Otherwise, default to ACTIVE (true)
  // This handles null, undefined, empty string, or any other value
  return true
}

const formatStatus = (status) => {
  console.log('formatStatus called with:', { status, type: typeof status })
  
  // Treat as INACTIVE only if explicitly false/0/disabled
  const inactiveValues = ['0', 0, false, 'false', 'INACTIVE', 'DISABLED', 'inactive', 'disabled']
  
  return inactiveValues.includes(status) ? 'INACTIVE' : 'ACTIVE'
}

const loadUsers = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await usersAPI.listUsers(userStore.currentPage, userStore.pageSize)
    
    // Debug logging
    console.log('Users API Response:', response.data)
    console.log('Response structure:', {
      hasContent: !!response.data.content,
      contentType: typeof response.data.content,
      isArray: Array.isArray(response.data.content),
      contentLength: response.data.content?.length,
      fullResponse: response.data
    })
    
    // Handle different response formats
    if (Array.isArray(response.data.content)) {
      userStore.users = response.data.content
      // Log each user's status for debugging
      response.data.content.forEach(user => {
        console.log('User status debug:', {
          login: user.login,
          status: user.status,
          statusType: typeof user.status,
          allFields: user
        })
      })
    } else if (Array.isArray(response.data)) {
      userStore.users = response.data
    } else {
      console.warn('Unexpected response format:', response.data)
      error.value = 'Unexpected response format from server'
      userStore.users = []
    }
    
    userStore.totalElements = response.data.totalElements || 0
    userStore.totalPages = response.data.totalPages || 0
  } catch (err) {
    console.error('Error loading users:', err)
    console.error('Response data:', err.response?.data)
    error.value = err.response?.data?.message || err.message || 'Failed to load users'
    debugInfo.value = true
  } finally {
    loading.value = false
  }
}

const toggleUser = async (user) => {
  try {
    await usersAPI.enableDisableUser(user.id, !isActive(user.status))
    await loadUsers()
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to update user'
  }
}

const deleteUser = async (userId) => {
  if (confirm('Are you sure?')) {
    try {
      await usersAPI.deleteUser(userId)
      await loadUsers()
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete user'
    }
  }
}

const nextPage = async () => {
  userStore.currentPage++
  await loadUsers()
}

const previousPage = async () => {
  if (userStore.currentPage > 0) {
    userStore.currentPage--
    await loadUsers()
  }
}

onMounted(loadUsers)
</script>

<style scoped>
.users-container {
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

.pagination-info {
  padding: 0.5rem 1rem;
  font-weight: 500;
}
</style>
