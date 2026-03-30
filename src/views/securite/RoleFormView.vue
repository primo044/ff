<template>
  <div class="form-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">{{ isEdit ? $t('management.editRole') : $t('management.createRole') }}</h2>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="libelle" class="form-label">{{ $t('common.create') }} {{ $t('nav.roles') }} *</label>
          <input
            id="libelle"
            v-model="formData.libelle"
            type="text"
            class="form-input"
            required
            placeholder="Enter role name"
          />
        </div>

        <div class="form-group">
          <label for="description" class="form-label">{{ $t('common.edit') }}</label>
          <textarea
            id="description"
            v-model="formData.description"
            class="form-textarea"
            placeholder="Enter description"
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? $t('actions.saving') : isEdit ? $t('actions.update') : $t('actions.create') }}
          </button>
          <router-link to="/roles" class="btn btn-secondary">{{ $t('actions.cancel') }}</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { rolesAPI } from '../../api'

const router = useRouter()
const route = useRoute()

const isEdit = ref(false)
const loading = ref(false)
const error = ref('')

const formData = ref({
  libelle: '',
  description: ''
})

const loadRole = async () => {
  try {
    const response = await rolesAPI.getRole(route.params.id)
    formData.value = {
      libelle: response.data.libelle,
      description: response.data.description || ''
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load role'
  }
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    if (isEdit.value) {
      await rolesAPI.updateRole(route.params.id, formData.value)
    } else {
      await rolesAPI.createRole(formData.value)
    }
    router.push('/roles')
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to save role'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (route.params.id) {
    isEdit.value = true
    loadRole()
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
