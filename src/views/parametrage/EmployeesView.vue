<template>
  <div class="employees-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Employees</h2>
        <router-link to="/employees/create" class="btn btn-success">Add Employee</router-link>
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
                <router-link :to="`/employees/${employee.id}/edit`" class="btn btn-primary btn-sm">Edit</router-link>
                <button @click="confirmDelete(employee)" class="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="no-data">
          No employees found. <router-link to="/employees/create">Create one</router-link>
        </div>
      </template>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click.self="cancelDelete">
      <div class="modal">
        <div class="modal-title">Confirm Delete</div>
        <div class="modal-body">
          <p>Are you sure you want to delete <strong>{{ deleteCandidate?.nomPrenom || deleteCandidate?.prenom }} {{ deleteCandidate?.nom || deleteCandidate?.libelle }}</strong>?</p>
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
import { useAuthStore } from '../../stores/auth'
import { employeesAPI } from '../../api'
import { useEmployeeStore } from '../../stores'

const authStore = useAuthStore()
const employeeStore = useEmployeeStore()
const loading = ref(false)
const submitting = ref(false)
const error = ref('')
const success = ref('')
const showDeleteConfirm = ref(false)
const deleteCandidate = ref(null)

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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  max-width: 500px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.modal-body {
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.modal-footer {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.95rem;
  text-decoration: none;
  display: inline-block;
  transition: all 0.2s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-secondary {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--bg-quaternary);
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #dc2626;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.alert {
  padding: 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}

.alert-error {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.alert-success {
  background: #dcfce7;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover {
  background: #059669;
}

.no-data {
  padding: 2rem;
  text-align: center;
  color: var(--text-muted);
}

.no-data a {
  color: #3b82f6;
  text-decoration: none;
}

.no-data a:hover {
  text-decoration: underline;
}
</style>
