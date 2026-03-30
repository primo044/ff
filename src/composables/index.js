// Re-export all composables
export { usePagination } from './usePagination'
export { useDataFetch } from './useDataFetch'
export { useFormState } from './useFormState'
export { useConfirmDialog } from './useConfirmDialog'
export { useActionLoading } from './useActionLoading'
export { useDialog, useDialogForm } from './useDialog'
export { useTableState, useBulkAction } from './useTableState'

/**
 * Composable for managing loading and error states
 */
export const useAsync = (asyncFunction) => {
  const loading = ref(false)
  const error = ref(null)
  const data = ref(null)

  const execute = async (...args) => {
    loading.value = true
    error.value = null
    try {
      data.value = await asyncFunction(...args)
      return data.value
    } catch (err) {
      error.value = err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    loading.value = false
    error.value = null
    data.value = null
  }

  return {
    loading,
    error,
    data,
    execute,
    reset
  }
}

/**
 * Composable for managing form state
 */
export const useForm = (initialValues = {}) => {
  const values = ref({ ...initialValues })
  const errors = ref({})
  const touched = ref({})
  const isSubmitting = ref(false)

  const setFieldValue = (field, value) => {
    values.value[field] = value
  }

  const setFieldError = (field, error) => {
    errors.value[field] = error
  }

  const setFieldTouched = (field) => {
    touched.value[field] = true
  }

  const setErrors = (newErrors) => {
    errors.value = newErrors
  }

  const resetForm = () => {
    values.value = { ...initialValues }
    errors.value = {}
    touched.value = {}
    isSubmitting.value = false
  }

  const getFieldProps = (field) => {
    return {
      modelValue: values.value[field],
      'onUpdate:modelValue': (v) => setFieldValue(field, v),
      onBlur: () => setFieldTouched(field),
      error: !!errors.value[field],
      errorMessages: errors.value[field] ? [errors.value[field]] : []
    }
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    setErrors,
    resetForm,
    getFieldProps
  }
}

/**
 * Composable for authorization checks
 */
export const useAuthorization = () => {
  const authStore = useAuthStore()

  const hasRole = (role) => {
    if (!authStore.user) return false
    return authStore.user.roles?.includes(role) || false
  }

  const hasAnyRole = (roles) => {
    if (!authStore.user) return false
    return roles.some((role) => authStore.user.roles?.includes(role))
  }

  const hasAllRoles = (roles) => {
    if (!authStore.user) return false
    return roles.every((role) => authStore.user.roles?.includes(role))
  }

  const isAdmin = computed(() => hasRole('ADMIN'))
  const isManager = computed(() => hasRole('MANAGER'))
  const isEmployee = computed(() => hasRole('EMPLOYEE'))

  return {
    hasRole,
    hasAnyRole,
    hasAllRoles,
    isAdmin,
    isManager,
    isEmployee
  }
}

/**
 * Composable for managing filters
 */
export const useFilters = (initialFilters = {}) => {
  const filters = ref({ ...initialFilters })

  const setFilter = (key, value) => {
    filters.value[key] = value
  }

  const removeFilter = (key) => {
    delete filters.value[key]
  }

  const clearFilters = () => {
    filters.value = {}
  }

  const hasFilters = computed(() => Object.keys(filters.value).length > 0)

  const queryString = computed(() => {
    const params = new URLSearchParams()
    Object.entries(filters.value).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params.append(key, value)
      }
    })
    return params.toString()
  })

  return {
    filters,
    setFilter,
    removeFilter,
    clearFilters,
    hasFilters,
    queryString
  }
}
