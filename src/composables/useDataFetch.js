import { ref, computed } from 'vue'
import { handleServiceError, showSuccess } from '@/utils/errorHandler'

/**
 * Composable for managing async data fetching with loading, error, and success states
 * Handles pagination, search, and filters automatically
 * 
 * @param {Function} fetchFn - Async function that performs the fetch
 * @param {Object} options - Configuration options
 * @param {number} options.initialPage - Starting page (default: 0)
 * @param {number} options.initialPageSize - Items per page (default: 10)
 * @param {boolean} options.autoFetch - Auto-fetch on mount (default: true)
 * @returns {Object} Composable with data, loading, error states and methods
 */
export const useDataFetch = (fetchFn, options = {}) => {
  const { 
    initialPage = 0, 
    initialPageSize = 10,
    autoFetch = true
  } = options

  // State
  const data = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(initialPage)
  const pageSize = ref(initialPageSize)
  const totalElements = ref(0)
  const totalPages = ref(0)

  // Computed pagination properties
  const hasPrevious = computed(() => currentPage.value > 0)
  const hasNext = computed(() => currentPage.value < totalPages.value - 1)
  const isEmpty = computed(() => !loading.value && data.value.length === 0)

  // Guard against concurrent requests to prevent recursive updates
  let isFetching = false

  /**
   * Execute the fetch function
   * @param {Object} filters - Optional filters to apply
   * @returns {Promise<void>}
   */
  const fetch = async (filters = {}) => {
    // Prevent concurrent fetch calls - strict check
    if (isFetching) {
      console.warn('[useDataFetch] Fetch already in progress, ignoring concurrent call')
      return
    }

    isFetching = true
    loading.value = true
    error.value = null

    try {
      const result = await fetchFn(
        currentPage.value,
        pageSize.value,
        filters
      )

      // Only update state if we're still the active fetch
      if (isFetching) {
        if (result && result.success) {
          // Handle paginated response
          if (result.data && result.data.content) {
            data.value = result.data.content
            totalPages.value = result.data.totalPages || 1
            totalElements.value = result.data.totalElements || data.value.length
          } else if (result.data) {
            // Handle simple array response
            data.value = Array.isArray(result.data) ? result.data : []
            totalPages.value = 1
            totalElements.value = data.value.length
          } else {
            data.value = []
          }
          error.value = null
        } else if (result) {
          // Service returned an error response
          handleServiceError(result, 'Fetch Data')
          error.value = result.error || 'Failed to load data'
          data.value = []
        } else {
          // No result returned
          error.value = 'No response received from server'
          data.value = []
        }
      }
    } catch (err) {
      if (isFetching) {
        console.error('Unexpected error fetching data:', err)
        error.value = 'An unexpected error occurred while loading data'
        data.value = []
      }
    } finally {
      isFetching = false
      loading.value = false
    }
  }

  /**
   * Refetch current page
   */
  const refetch = async (filters = {}) => {
    await fetch(filters)
  }

  /**
   * Go to next page and fetch
   */
  const nextPage = async (filters = {}) => {
    if (hasNext.value) {
      currentPage.value++
      await fetch(filters)
    }
  }

  /**
   * Go to previous page and fetch
   */
  const previousPage = async (filters = {}) => {
    if (hasPrevious.value) {
      currentPage.value--
      await fetch(filters)
    }
  }

  /**
   * Go to specific page
   */
  const goToPage = async (page, filters = {}) => {
    if (page >= 0 && page < totalPages.value) {
      currentPage.value = page
      await fetch(filters)
    }
  }

  /**
   * Reset to first page
   */
  const reset = async (filters = {}) => {
    currentPage.value = initialPage
    await fetch(filters)
  }

  /**
   * Clear error message
   */
  const clearError = () => {
    error.value = null
  }

  return {
    // State
    data,
    loading,
    error,
    currentPage,
    pageSize,
    totalElements,
    totalPages,
    isEmpty,
    hasPrevious,
    hasNext,
    
    // Methods
    fetch,
    refetch,
    nextPage,
    previousPage,
    goToPage,
    reset,
    clearError
  }
}
