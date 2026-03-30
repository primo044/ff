import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref([])
  const currentUser = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(0)
  const pageSize = ref(10)
  const totalElements = ref(0)
  const totalPages = ref(0)

  // Getters
  const hasUsers = computed(() => users.value.length > 0)
  const isEmpty = computed(() => !loading.value && users.value.length === 0)
  const hasPrevious = computed(() => currentPage.value > 0)
  const hasNext = computed(() => currentPage.value < totalPages.value - 1)

  // Actions
  const setUsers = (data) => {
    users.value = data
    error.value = null
  }

  const setCurrentUser = (user) => {
    currentUser.value = user
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
    users.value = []
    currentUser.value = null
    loading.value = false
    error.value = null
    currentPage.value = 0
    totalPages.value = 0
    totalElements.value = 0
  }

  return {
    // State
    users,
    currentUser,
    loading,
    error,
    currentPage,
    pageSize,
    totalElements,
    totalPages,
    // Getters
    hasUsers,
    isEmpty,
    hasPrevious,
    hasNext,
    // Actions
    setUsers,
    setCurrentUser,
    setPagination,
    setLoading,
    setError,
    clearError,
    reset
  }
})
