import { ref, computed } from 'vue'

/**
 * Composable for managing loading state of individual actions (e.g., delete, update)
 * Useful for tracking which item is currently being processed
 * 
 * Usage:
 * const { isLoading, start, end, toggle } = useActionLoading()
 * 
 * Then in handlers:
 * const deleteItem = async (id) => {
 *   isLoading(id).value = true
 *   try {
 *     await api.delete(id)
 *   } finally {
 *     isLoading(id).value = false
 *   }
 * }
 */
export const useActionLoading = () => {
  const loadingMap = ref({})

  /**
   * Get loading state for an action ID
   */
  const isLoading = (id) => {
    if (!loadingMap.value[id]) {
      loadingMap.value[id] = ref(false)
    }
    return loadingMap.value[id]
  }

  /**
   * Set loading state to true
   */
  const start = (id) => {
    isLoading(id).value = true
  }

  /**
   * Set loading state to false
   */
  const end = (id) => {
    isLoading(id).value = false
  }

  /**
   * Toggle loading state
   */
  const toggle = (id) => {
    isLoading(id).value = !isLoading(id).value
  }

  /**
   * Check if any action is loading
   */
  const isAnyLoading = computed(() => {
    return Object.values(loadingMap.value).some(state => state?.value)
  })

  /**
   * Clear all loading states
   */
  const clearAll = () => {
    loadingMap.value = {}
  }

  return {
    isLoading,
    start,
    end,
    toggle,
    isAnyLoading,
    clearAll
  }
}
