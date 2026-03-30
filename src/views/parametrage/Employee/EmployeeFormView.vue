<template>
  <div class="form-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">{{ isEdit ? 'Edit Employee' : 'Create Employee' }}</h2>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name" class="form-label">Name *</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            class="form-input"
            required
            placeholder="Enter employee name"
          />
        </div>

        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            class="form-input"
            placeholder="employee@example.com"
          />
        </div>

        <div class="form-group">
          <label for="departement" class="form-label">Department</label>
          <input
            id="departement"
            v-model="formData.departement"
            type="text"
            class="form-input"
            placeholder="Department name"
          />
        </div>

        <div class="form-group">
          <label for="position" class="form-label">Position</label>
          <input
            id="position"
            v-model="formData.position"
            type="text"
            class="form-input"
            placeholder="Job position"
          />
        </div>

        <div class="form-group">
          <label for="description" class="form-label">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            class="form-textarea"
            placeholder="Enter description"
          ></textarea>
        </div>

        <div class="form-group">
          <label style="display: flex; gap: 0.5rem; align-items: center;">
            <input v-model="formData.statusBool" type="checkbox" style="width: auto;" />
            <span class="form-label">Active</span>
          </label>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Saving...' : isEdit ? 'Update' : 'Create' }}
          </button>
          <router-link to="/employees" class="btn btn-secondary">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// import { employeesAPI } from '../../../api'

const router = useRouter()
const route = useRoute()

const isEdit = ref(false)
const loading = ref(false)
const error = ref('')

const formData = ref({
  name: '',
  email: '',
  departement: '',
  position: '',
  description: '',
  statusBool: true
})

const loadEmployee = async () => {
  try {
    // TODO: Implement when employees API is available
    // const response = await employeesAPI.getEmployee(route.params.id)
    // formData.value = {
    //   name: response.data.name || '',
    //   email: response.data.email || '',
    //   departement: response.data.departement || '',
    //   position: response.data.position || '',
    //   description: response.data.description || '',
    //   statusBool: response.data.status === 'Actif'
    // }
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load employee'
  }
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    // TODO: Implement when employees API is available
    // if (isEdit.value) {
    //   await employeesAPI.updateEmployee(route.params.id, formData.value)
    // } else {
    //   await employeesAPI.createEmployee(formData.value)
    // }
    router.push('/employees')
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to save employee'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (route.params.id) {
    isEdit.value = true
    loadEmployee()
  }
})
</script>

<style scoped>
.form-container {
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
}

.card {
  border-radius: var(--radius-md);
  background: var(--bg-surface);
  box-shadow: var(--shadow-card);
  border: 1px solid var(--border);
}

.card-header {
  padding: 2rem;
  border-bottom: 1px solid var(--border);
}

.card-title {
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-primary);
}

form {
  padding: 2rem;
}

.alert {
  padding: 1rem;
  border-radius: var(--radius-sm);
  margin-bottom: 1.5rem;
}

.alert-error {
  background: rgba(242, 84, 114, 0.1);
  border: 1px solid rgba(242, 84, 114, 0.3);
  color: var(--error);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-secondary);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 0.95rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(0, 112, 204, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.form-actions .btn {
  flex: 1;
  padding: 0.75rem 1.5rem;
}

/* ─── RESPONSIVE ──────────────────────────────────────── */
@media (max-width: 768px) {
  .form-container {
    padding: 0 1.5rem;
  }

  .card-header {
    padding: 1.5rem;
  }

  .card-title {
    font-size: 1.25rem;
  }

  form {
    padding: 1.5rem;
  }

  .form-label {
    font-size: 0.75rem;
  }

  .form-input,
  .form-textarea {
    padding: 0.75rem 0.9rem;
    font-size: 0.9rem;
  }

  .form-textarea {
    min-height: 100px;
  }

  .form-actions {
    flex-direction: column;
    gap: 0.75rem;
  }

  .form-actions .btn {
    padding: 0.7rem 1rem;
    width: 100%;
    font-size: 0.75rem;
  }
}

@media (max-width: 640px) {
  .form-container {
    padding: 0 1rem;
  }

  .card-header {
    padding: 1rem;
  }

  .card-title {
    font-size: 1.1rem;
  }

  form {
    padding: 1rem;
  }

  .form-group {
    margin-bottom: 1.25rem;
  }

  .form-label {
    font-size: 0.7rem;
    margin-bottom: 0.4rem;
  }

  .form-input,
  .form-textarea {
    padding: 0.7rem 0.8rem;
    font-size: 0.85rem;
  }

  .form-textarea {
    min-height: 80px;
  }

  .form-actions {
    margin-top: 1.5rem;
  }

  .form-actions .btn {
    padding: 0.65rem 0.5rem;
    font-size: 0.7rem;
  }
}
</style>