import { ref, computed } from 'vue'

/**
 * Composable for managing pagination state
 * Use this with useDataFetch or manage pagination manually
 * 
 * @param {number} initialPage - Starting page (default: 0)
 * @param {number} initialSize - Items per page (default: 10)
 * @returns {Object} Pagination state and methods
 */
export const usePagination = (initialPage = 0, initialSize = 10) => {
  const currentPage = ref(initialPage)
  const pageSize = ref(initialSize)
  const totalElements = ref(0)

  const totalPages = computed(() => {
    return Math.ceil(totalElements.value / pageSize.value)
  })

  const hasPrevious = computed(() => currentPage.value > 0)
  const hasNext = computed(() => currentPage.value < totalPages.value - 1)

  const nextPage = () => {
    if (hasNext.value) currentPage.value++
  }

  const previousPage = () => {
    if (hasPrevious.value) currentPage.value--
  }

  const goToPage = (page) => {
    if (page >= 0 && page < totalPages.value) {
      currentPage.value = page
    }
  }

  const reset = () => {
    currentPage.value = initialPage
  }

  return {
    currentPage,
    pageSize,
    totalElements,
    totalPages,
    hasPrevious,
    hasNext,
    nextPage,
    previousPage,
    goToPage,
    reset
  }
}
