import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useEmployeeStore = defineStore('employee', () => {
  const employees = ref([])
  const currentEmployee = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(0)
  const pageSize = ref(10)
  const totalElements = ref(0)
  const totalPages = ref(0)

  // Getters
  const hasEmployees = computed(() => employees.value.length > 0)
  const isEmpty = computed(() => !loading.value && employees.value.length === 0)
  const hasPrevious = computed(() => currentPage.value > 0)
  const hasNext = computed(() => currentPage.value < totalPages.value - 1)

  // Actions
  const setEmployees = (data) => {
    employees.value = data
    error.value = null
  }

  const setCurrentEmployee = (employee) => {
    currentEmployee.value = employee
  }

  const setPagination = (page, size, totalElements, totalPages) => {
    currentPage.value = page
    pageSize.value = size
    totalElements.value = totalElements
    totalPages.value = totalPages
  }

  const setLoading = (state) => {
    loading.value = state
  }

  const setError = (err) => {
    error.value = err
  }

  const clearError = () => {
    error.value = null
  }

  const reset = () => {
    employees.value = []
    currentEmployee.value = null
    loading.value = false
    error.value = null
    currentPage.value = 0
    pageSize.value = 10
    totalElements.value = 0
    totalPages.value = 0
  }

  return {
    employees,
    currentEmployee,
    loading,
    error,
    currentPage,
    pageSize,
    totalElements,
    totalPages,
    hasEmployees,
    isEmpty,
    hasPrevious,
    hasNext,
    setEmployees,
    setCurrentEmployee,
    setPagination,
    setLoading,
    setError,
    clearError,
    reset
  }
})
