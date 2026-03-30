<template>
  <div class="roles-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">{{ $t('management.rolesManagement') }}</h2>
        <router-link to="/roles/create" class="btn btn-success">{{ $t('management.addRole') }}</router-link>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <ConfirmDialog
        v-model="deleteConfirmDialog.isOpen"
        :title="deleteConfirmDialog.title"
        :message="deleteConfirmDialog.message"
        confirm-text="Delete"
        cancel-text="Cancel"
        color="error"
        @confirm="deleteConfirmDialog.confirm"
      />
      
      <div v-if="loading" class="loading-container">
        <div class="loading"></div>
        <p>{{ $t('common.loading') }}</p>
      </div>

      <template v-else>
        <table v-if="roleStore.roles.length" class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>{{ $t('actions.managementTitle') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="role in roleStore.roles" :key="role.id">
              <td>{{ role.id }}</td>
              <td>{{ role.libelle }}</td>
              <td class="actions">
                <router-link :to="`/roles/${role.id}/edit`" class="btn btn-primary btn-sm">{{ $t('actions.edit') }}</router-link>
                <router-link :to="`/roles/${role.id}/rights`" class="btn btn-info btn-sm">{{ $t('management.manageRights') }}</router-link>
                <button @click="deleteRole(role.id)" class="btn btn-danger btn-sm">{{ $t('actions.delete') }}</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="no-data">
          {{ $t('management.noRolesFound') }}. <router-link to="/roles/create">{{ $t('management.createOne') }}</router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { rolesAPI } from '../../api'
import { useRoleStore } from '../../stores'
import ConfirmDialog from '../../components/dialogs/ConfirmDialog.vue'

const roleStore = useRoleStore()
const loading = ref(false)
const error = ref('')

const deleteConfirmDialog = reactive({
  isOpen: false,
  title: 'Delete Role',
  message: '',
  roleId: null,
  confirm: deleteConfirmed
})

const loadRoles = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await rolesAPI.getActiveRoles()
    roleStore.roles = response.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load roles'
  } finally {
    loading.value = false
  }
}

const deleteRole = (roleId) => {
  const role = roleStore.roles.find(r => r.id === roleId)
  deleteConfirmDialog.roleId = roleId
  deleteConfirmDialog.message = `Are you sure you want to delete the role "${role?.libelle || 'Unknown'}"?`
  deleteConfirmDialog.isOpen = true
}

async function deleteConfirmed() {
  try {
    await rolesAPI.deleteRole(deleteConfirmDialog.roleId)
    await loadRoles()
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to delete role'
  }
  deleteConfirmDialog.isOpen = false
}

onMounted(loadRoles)
</script>

<style scoped>
.roles-container {
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

.btn-info {
  background: #4299e1;
  color: white;
}

.btn-info:hover {
  background: #3182ce;
}
</style>
