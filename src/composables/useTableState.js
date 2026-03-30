import { ref, computed } from 'vue'

/**
 * Composable for managing table/list view state
 * Includes filtering, sorting, and pagination helpers
 * 
 * @param {Array} items - Initial items array
 * @param {Object} options - Configuration options
 * @returns {Object} Table state and methods
 */
export const useTableState = (items = [], options = {}) => {
  const {
    sortField = null,
    sortOrder = 'asc',
    filterText = ''
  } = options

  const currentItems = ref(items)
  const filteredItems = ref(items)
  const selectedRows = ref([])
  const currentSortField = ref(sortField)
  const currentSortOrder = ref(sortOrder)
  const currentFilterText = ref(filterText)

  const isAllSelected = computed(() => {
    return currentItems.value.length > 0 &&
      selectedRows.value.length === currentItems.value.length
  })

  const hasSelectedRows = computed(() => selectedRows.value.length > 0)

  const updateItems = (newItems) => {
    currentItems.value = newItems
    filteredItems.value = newItems
  }

  const sort = (field) => {
    if (currentSortField.value === field) {
      currentSortOrder.value = currentSortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      currentSortField.value = field
      currentSortOrder.value = 'asc'
    }
  }

  const filter = (searchText) => {
    currentFilterText.value = searchText.toLowerCase()
    // Override in parent component for custom filtering logic
  }

  const toggleRowSelection = (rowId) => {
    const index = selectedRows.value.indexOf(rowId)
    if (index > -1) {
      selectedRows.value.splice(index, 1)
    } else {
      selectedRows.value.push(rowId)
    }
  }

  const toggleAllSelection = () => {
    if (isAllSelected.value) {
      selectedRows.value = []
    } else {
      selectedRows.value = currentItems.value.map(item => item.id)
    }
  }

  const clearSelection = () => {
    selectedRows.value = []
  }

  return {
    currentItems,
    filteredItems,
    selectedRows,
    currentSortField,
    currentSortOrder,
    currentFilterText,
    isAllSelected,
    hasSelectedRows,
    updateItems,
    sort,
    filter,
    toggleRowSelection,
    toggleAllSelection,
    clearSelection
  }
}

/**
 * Composable for managing bulk actions on selected items
 * 
 * @param {Function} actionFn - Async function to perform on items
 * @returns {Object} Bulk action state and methods
 */
export const useBulkAction = (actionFn) => {
  const isLoading = ref(false)
  const error = ref(null)
  const successCount = ref(0)
  const failureCount = ref(0)

  const execute = async (items) => {
    if (!items || items.length === 0) {
      error.value = 'No items selected'
      return false
    }

    isLoading.value = true
    error.value = null
    successCount.value = 0
    failureCount.value = 0

    try {
      for (const item of items) {
        try {
          await actionFn(item)
          successCount.value++
        } catch (err) {
          console.error(`Failed to process item ${item.id}:`, err)
          failureCount.value++
        }
      }
      return true
    } catch (err) {
      error.value = err.message || 'Bulk action failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const reset = () => {
    isLoading.value = false
    error.value = null
    successCount.value = 0
    failureCount.value = 0
  }

  return {
    isLoading,
    error,
    successCount,
    failureCount,
    execute,
    reset
  }
}
