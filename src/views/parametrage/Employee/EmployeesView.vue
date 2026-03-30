<template>
  <div class="employees-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Employees</h2>
        <button @click="openAddModal" class="btn btn-success">Add Employee</button>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>
      <div v-if="success" class="alert alert-success">{{ success }}</div>

      <div v-if="loading" class="loading-container">
        <div class="loading"></div>
        <p>Loading employees...</p>
      </div>

      <template v-else>
        <table v-if="employeeStore.employees.length" class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employeeStore.employees" :key="employee.id">
              <td>{{ employee.id }}</td>
              <td>{{ employee.nomPrenom || employee.libelle }}</td>
              <td>{{ employee.email || '-' }}</td>
              <td>
                <span :class="['status', employee.status === 'Actif' ? 'active' : 'inactive']">
                  {{ employee.status }}
                </span>
              </td>
              <td class="actions">
                <button @click="openEditModal(employee)" class="btn btn-primary btn-sm">Edit</button>
                <button @click="confirmDelete(employee)" class="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="no-data">
          No employees found. <a href="#" @click.prevent="openAddModal">Create one</a>
        </div>
      </template>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-title">{{ isEditing ? 'Edit Employee' : 'Add Employee' }}</div>
        
        <div class="modal-body">
          <form @submit.prevent="saveEmployee" class="form-grid">
            <div class="form-group">
              <label class="form-label">First Name *</label>
              <input v-model="formData.prenom" type="text" class="form-input" placeholder="First name" required />
              <span v-if="formErrors.prenom" style="color: var(--rose); font-size: 0.8rem; margin-top: 0.25rem; display: block;">{{ formErrors.prenom }}</span>
            </div>

            <div class="form-group">
              <label class="form-label">Last Name *</label>
              <input v-model="formData.nom" type="text" class="form-input" placeholder="Last name" required />
              <span v-if="formErrors.nom" style="color: var(--rose); font-size: 0.8rem; margin-top: 0.25rem; display: block;">{{ formErrors.nom }}</span>
            </div>

            <div class="form-group">
              <label class="form-label">Email</label>
              <input v-model="formData.email" type="email" class="form-input" placeholder="email@example.com" />
            </div>

            <div class="form-group">
              <label class="form-label">Phone</label>
              <input v-model="formData.telephone" type="tel" class="form-input" placeholder="+1234567890" />
            </div>

            <div class="form-group">
              <label class="form-label">CIN</label>
              <input v-model="formData.cin" type="text" class="form-input" placeholder="CIN" />
            </div>

            <div class="form-group">
              <label class="form-label">Matricule</label>
              <input v-model="formData.matricule" type="text" class="form-input" placeholder="Matricule" />
            </div>

            <div class="form-group form-full">
              <label class="form-label" style="display: flex; gap: 0.5rem; align-items: center;">
                <input v-model="formData.statusBool" type="checkbox" style="width: auto;" />
                <span>Active</span>
              </label>
            </div>

            <div v-if="formErrors.submit" style="color: var(--rose); font-size: 0.9rem; margin-bottom: 1.5rem; grid-column: 1/-1;">{{ formErrors.submit }}</div>

            <div style="grid-column: 1/-1;">
              <div class="modal-footer">
                <button type="submit" :disabled="submitting" class="btn btn-primary">
                  {{ submitting ? 'Saving...' : isEditing ? 'Update' : 'Create' }}
                </button>
                <button type="button" @click="closeModal" class="btn btn-secondary">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click.self="cancelDelete">
      <div class="modal">
        <div class="modal-title">Confirm Delete</div>
        <div class="modal-body">
          <p>Are you sure you want to delete <strong>{{ deleteCandidate?.nomPrenom || deleteCandidate?.libelle }}</strong>?</p>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem;">This action cannot be undone.</p>
        </div>
        <div class="modal-footer">
          <button @click="deleteEmployee" :disabled="submitting" class="btn btn-danger">
            {{ submitting ? 'Deleting...' : 'Delete' }}
          </button>
          <button @click="cancelDelete" class="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../../stores/auth'
import { employeesAPI } from '../../../api'
import { useEmployeeStore } from '../../../stores'

const authStore = useAuthStore()
const employeeStore = useEmployeeStore()
const loading = ref(false)
const submitting = ref(false)
const error = ref('')
const success = ref('')
const showModal = ref(false)
const showDeleteConfirm = ref(false)
const isEditing = ref(false)
const deleteCandidate = ref(null)

const formData = ref({
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  cin: '',
  matricule: '',
  statusBool: true
})

const formErrors = ref({})

const loadEmployees = async () => {
  if (!authStore.token) {
    error.value = 'Not authenticated. Please login first.'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    const response = await employeesAPI.listEmployees(0, 100)
    
    if (Array.isArray(response.data)) {
      employeeStore.employees = response.data
    } else if (response.data.content) {
      employeeStore.employees = response.data.content
    } else {
      employeeStore.employees = response.data
    }
    
    console.log('[EmployeesView] Employees loaded:', employeeStore.employees.length)
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load employees'
    console.error('[EmployeesView] Error:', error.value)
  } finally {
    loading.value = false
  }
}

const openAddModal = () => {
  isEditing.value = false
  formData.value = { prenom: '', nom: '', email: '', telephone: '', cin: '', matricule: '', statusBool: true }
  formErrors.value = {}
  showModal.value = true
}

const openEditModal = (employee) => {
  isEditing.value = true
  formData.value = {
    id: employee.id,
    prenom: employee.prenom || '',
    nom: employee.nom || '',
    email: employee.email || '',
    telephone: employee.telephone || '',
    cin: employee.cin || '',
    matricule: employee.matricule || '',
    statusBool: employee.status === 'Actif'
  }
  formErrors.value = {}
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  formData.value = {}
  formErrors.value = {}
}

const saveEmployee = async () => {
  formErrors.value = {}
  
  // Validation
  if (!formData.value.prenom?.trim()) {
    formErrors.value.prenom = 'First name is required'
  }
  if (!formData.value.nom?.trim()) {
    formErrors.value.nom = 'Last name is required'
  }
  
  if (Object.keys(formErrors.value).length > 0) return
  
  submitting.value = true
  success.value = ''
  
  try {
    if (isEditing.value) {
      await employeesAPI.updateEmployee(formData.value.id, formData.value)
      success.value = 'Employee updated successfully!'
    } else {
      await employeesAPI.createEmployee(formData.value)
      success.value = 'Employee created successfully!'
    }
    
    closeModal()
    await loadEmployees()
    
    setTimeout(() => success.value = '', 3000)
  } catch (err) {
    formErrors.value.submit = err.response?.data?.message || 'Operation failed'
    console.error('[EmployeesView] Error:', formErrors.value.submit)
  } finally {
    submitting.value = false
  }
}

const confirmDelete = (employee) => {
  deleteCandidate.value = employee
  showDeleteConfirm.value = true
}

const cancelDelete = () => {
  deleteCandidate.value = null
  showDeleteConfirm.value = false
}

const deleteEmployee = async () => {
  submitting.value = true
  
  try {
    await employeesAPI.deleteEmployee(deleteCandidate.value.id)
    success.value = 'Employee deleted successfully!'
    
    cancelDelete()
    await loadEmployees()
    
    setTimeout(() => success.value = '', 3000)
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to delete employee'
    console.error('[EmployeesView] Delete error:', error.value)
  } finally {
    submitting.value = false
  }
}

onMounted(loadEmployees)
</script>

<style scoped>
.employees-container {
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

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-full {
  grid-column: 1 / -1;
}
</style>
