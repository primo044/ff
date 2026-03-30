<template>
  <div class="form-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">{{ isEdit ? $t('management.editUser') : $t('management.createUser') }}</h2>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <form @submit.prevent="handleSubmit">
        <div class="form-row">
          <div class="form-group">
            <label for="login" class="form-label">Login *</label>
            <input
              id="login"
              v-model="formData.login"
              type="text"
              class="form-input"
              required
              placeholder="Enter login"
              :disabled="isEdit"
            />
          </div>

          <div class="form-group">
            <label for="email" class="form-label">{{ $t('auth.email') }} *</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              class="form-input"
              required
              placeholder="Enter email"
            />
          </div>
        </div>

        <div v-if="!isEdit" class="form-row">
          <div class="form-group">
            <label for="pwd" class="form-label">{{ $t('auth.password') }} *</label>
            <input
              id="pwd"
              v-model="formData.pwd"
              type="password"
              class="form-input"
              required
              placeholder="Enter password"
            />
          </div>

          <div class="form-group">
            <label for="libelle" class="form-label">{{ $t('common.edit') }}</label>
            <input
              id="libelle"
              v-model="formData.libelle"
              type="text"
              class="form-input"
              placeholder="Enter display name"
            />
          </div>
        </div>

        <div v-if="!isEdit" class="form-row">
          <div class="form-group">
            <label for="idRole" class="form-label">{{ $t('nav.roles') }} *</label>
            <select
              id="idRole"
              v-model.number="formData.idRole"
              class="form-input"
              required
            >
              <option value="">{{ $t('common.create') }}</option>
              <option v-for="role in roles" :key="role.id" :value="role.id">
                {{ role.libelle }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="status" class="form-label">{{ $t('common.edit') }}</label>
            <select
              id="status"
              v-model="formData.status"
              class="form-input"
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? $t('actions.saving') : isEdit ? $t('actions.update') : $t('actions.create') }}
          </button>
          <router-link to="/users" class="btn btn-secondary">{{ $t('actions.cancel') }}</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usersAPI, rolesAPI } from '../../api'

const router = useRouter()
const route = useRoute()

const isEdit = ref(false)
const loading = ref(false)
const error = ref('')
const roles = ref([])

const formData = ref({
  login: '',
  email: '',
  pwd: '',
  libelle: '',
  idRole: null,
  status: '1'
})

const loadRoles = async () => {
  try {
    const response = await rolesAPI.getActiveRoles()
    roles.value = response.data
  } catch (err) {
    console.error('Failed to load roles:', err)
  }
}

const loadUser = async () => {
  try {
    const response = await usersAPI.getUser(route.params.id)
    formData.value = {
      login: response.data.login,
      email: response.data.email,
      libelle: response.data.libelle || '',
      pwd: '',
      idRole: response.data.role?.id,
      status: response.data.status || '1'
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load user'
  }
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    if (isEdit.value) {
      await usersAPI.updateUser(route.params.id, formData.value)
    } else {
      // For create, send all required fields
      const createData = {
        login: formData.value.login,
        email: formData.value.email,
        pwd: formData.value.pwd,
        libelle: formData.value.libelle || formData.value.login,
        idRole: formData.value.idRole || 1,
        status: formData.value.status
      }
      await usersAPI.createUser(createData)
    }
    router.push('/users')
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to save user'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadRoles()
  if (route.params.id) {
    isEdit.value = true
    loadUser()
  }
})
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-row .form-group {
  margin-bottom: 0;
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
