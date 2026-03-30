import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useRightStore = defineStore('right', () => {
  const rights = ref([])
  const currentRight = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(0)
  const pageSize = ref(10)
  const totalElements = ref(0)
  const totalPages = ref(0)

  // Getters
  const hasRights = computed(() => rights.value.length > 0)
  const isEmpty = computed(() => !loading.value && rights.value.length === 0)
  const hasPrevious = computed(() => currentPage.value > 0)
  const hasNext = computed(() => currentPage.value < totalPages.value - 1)

  // Actions
  const setRights = (data) => {
    rights.value = data
    error.value = null
  }

  const setCurrentRight = (right) => {
    currentRight.value = right
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
    rights.value = []
    currentRight.value = null
    loading.value = false
    error.value = null
    currentPage.value = 0
    pageSize.value = 10
    totalElements.value = 0
    totalPages.value = 0
  }

  return {
    rights,
    currentRight,
    loading,
    error,
    currentPage,
    pageSize,
    totalElements,
    totalPages,
    hasRights,
    isEmpty,
    hasPrevious,
    hasNext,
    setRights,
    setCurrentRight,
    setPagination,
    setLoading,
    setError,
    clearError,
    reset
  }
})
