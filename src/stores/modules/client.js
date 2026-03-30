import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useClientStore = defineStore('client', () => {
  const clients = ref([])
  const currentClient = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(0)
  const pageSize = ref(10)
  const totalElements = ref(0)
  const totalPages = ref(0)

  // Getters
  const hasClients = computed(() => clients.value.length > 0)
  const isEmpty = computed(() => !loading.value && clients.value.length === 0)
  const hasPrevious = computed(() => currentPage.value > 0)
  const hasNext = computed(() => currentPage.value < totalPages.value - 1)

  // Actions
  const setClients = (data) => {
    clients.value = data
    error.value = null
  }

  const setCurrentClient = (client) => {
    currentClient.value = client
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
    clients.value = []
    currentClient.value = null
    loading.value = false
    error.value = null
    currentPage.value = 0
    totalPages.value = 0
    totalElements.value = 0
  }

  return {
    // State
    clients,
    currentClient,
    loading,
    error,
    currentPage,
    pageSize,
    totalElements,
    totalPages,
    // Getters
    hasClients,
    isEmpty,
    hasPrevious,
    hasNext,
    // Actions
    setClients,
    setCurrentClient,
    setPagination,
    setLoading,
    setError,
    clearError,
    reset
  }
})
