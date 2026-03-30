import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useRoleStore = defineStore('role', () => {
  const roles = ref([])
  const currentRole = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(0)
  const pageSize = ref(10)
  const totalElements = ref(0)
  const totalPages = ref(0)

  // Getters
  const hasRoles = computed(() => roles.value.length > 0)
  const isEmpty = computed(() => !loading.value && roles.value.length === 0)
  const hasPrevious = computed(() => currentPage.value > 0)
  const hasNext = computed(() => currentPage.value < totalPages.value - 1)

  // Actions
  const setRoles = (data) => {
    roles.value = data
    error.value = null
  }

  const setCurrentRole = (role) => {
    currentRole.value = role
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
    roles.value = []
    currentRole.value = null
    loading.value = false
    error.value = null
    currentPage.value = 0
    totalPages.value = 0
    totalElements.value = 0
  }

  return {
    // State
    roles,
    currentRole,
    loading,
    error,
    currentPage,
    pageSize,
    totalElements,
    totalPages,
    // Getters
    hasRoles,
    isEmpty,
    hasPrevious,
    hasNext,
    // Actions
    setRoles,
    setCurrentRole,
    setPagination,
    setLoading,
    setError,
    clearError,
    reset
  }
})
