import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSectorStore = defineStore('sector', () => {
  const sectors = ref([])
  const currentSector = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(0)
  const pageSize = ref(10)
  const totalElements = ref(0)
  const totalPages = ref(0)

  // Getters
  const hasSectors = computed(() => sectors.value.length > 0)
  const isEmpty = computed(() => !loading.value && sectors.value.length === 0)
  const hasPrevious = computed(() => currentPage.value > 0)
  const hasNext = computed(() => currentPage.value < totalPages.value - 1)

  // Actions
  const setSectors = (data) => {
    sectors.value = data
    error.value = null
  }

  const setCurrentSector = (sector) => {
    currentSector.value = sector
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
    sectors.value = []
    currentSector.value = null
    loading.value = false
    error.value = null
    currentPage.value = 0
    pageSize.value = 10
    totalElements.value = 0
    totalPages.value = 0
  }

  return {
    sectors,
    currentSector,
    loading,
    error,
    currentPage,
    pageSize,
    totalElements,
    totalPages,
    hasSectors,
    isEmpty,
    hasPrevious,
    hasNext,
    setSectors,
    setCurrentSector,
    setPagination,
    setLoading,
    setError,
    clearError,
    reset
  }
})
