import { ref, computed } from 'vue'

/**
 * Composable for managing common dialog/modal state patterns
 * Reduces duplication across forms and list views
 * 
 * @returns {Object} Dialog state and methods
 */
export const useDialog = (onConfirm) => {
  const isOpen = ref(false)
  const title = ref('')
  const message = ref('')
  const isLoading = ref(false)
  const error = ref(null)

  const open = (dialogTitle, dialogMessage) => {
    title.value = dialogTitle
    message.value = dialogMessage
    isOpen.value = true
    error.value = null
  }

  const close = () => {
    isOpen.value = false
    title.value = ''
    message.value = ''
    error.value = null
    isLoading.value = false
  }

  const confirm = async () => {
    if (!onConfirm) {
      close()
      return
    }

    isLoading.value = true
    error.value = null

    try {
      await onConfirm()
      close()
    } catch (err) {
      error.value = err.message || 'An error occurred'
    } finally {
      isLoading.value = false
    }
  }

  return {
    isOpen,
    title,
    message,
    isLoading,
    error,
    open,
    close,
    confirm
  }
}

/**
 * Composable for managing form input state
 * Handles validation, dirty tracking, and reset logic
 * 
 * @param {Object} initialValues - Initial form values
 * @returns {Object} Form state and methods
 */
export const useDialogForm = (initialValues = {}) => {
  const values = ref({ ...initialValues })
  const touched = ref({})
  const errors = ref({})
  const isDirty = computed(() => {
    return Object.keys(values.value).some(
      (key) => values.value[key] !== initialValues[key]
    )
  })

  const setValue = (field, value) => {
    values.value[field] = value
    touched.value[field] = true
  }

  const setError = (field, error) => {
    errors.value[field] = error
  }

  const reset = () => {
    values.value = { ...initialValues }
    touched.value = {}
    errors.value = {}
  }

  const clearErrors = () => {
    errors.value = {}
  }

  return {
    values,
    touched,
    errors,
    isDirty,
    setValue,
    setError,
    reset,
    clearErrors
  }
}
