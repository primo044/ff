import { ref, reactive, computed } from 'vue'
import { handleServiceError, showSuccess } from '@/utils/errorHandler'

/**
 * Composable for managing form state, validation, and submission
 * 
 * @param {Object} initialData - Initial form data
 * @param {Object} options - Configuration options
 * @param {Function} options.onSubmit - Async submit handler
 * @param {Object} options.validators - Field validators {fieldName: validatorFn}
 * @returns {Object} Composable with form state and methods
 */
export const useFormState = (initialData = {}, options = {}) => {
  const { onSubmit, validators = {} } = options

  // Form state
  const formData = reactive({ ...initialData })
  const originalData = ref({ ...initialData })
  const errors = reactive({})
  const touched = reactive({})
  const loading = ref(false)
  const submitError = ref(null)
  const submitSuccess = ref(false)

  // Computed properties
  const isDirty = computed(() => {
    return JSON.stringify(formData) !== JSON.stringify(originalData.value)
  })

  const hasErrors = computed(() => {
    return Object.keys(errors).some(field => errors[field])
  })

  const isValid = computed(() => {
    return !hasErrors.value
  })

  const canSubmit = computed(() => {
    return isDirty.value && isValid.value && !loading.value
  })

  /**
   * Validate a single field
   */
  const validateField = (fieldName) => {
    const validator = validators[fieldName]
    
    if (!validator) {
      delete errors[fieldName]
      return true
    }

    const error = validator(formData[fieldName], formData)
    
    if (error) {
      errors[fieldName] = error
      return false
    } else {
      delete errors[fieldName]
      return true
    }
  }

  /**
   * Validate all fields
   */
  const validateForm = () => {
    Object.keys(validators).forEach(field => validateField(field))
    return !hasErrors.value
  }

  /**
   * Handle field change and validation
   */
  const handleFieldChange = (fieldName, value) => {
    formData[fieldName] = value
    touched[fieldName] = true
    validateField(fieldName)
  }

  /**
   * Handle field blur
   */
  const handleFieldBlur = (fieldName) => {
    touched[fieldName] = true
    validateField(fieldName)
  }

  /**
   * Submit form
   */
  const submit = async () => {
    if (!validateForm()) {
      return false
    }

    loading.value = true
    submitError.value = null
    submitSuccess.value = false

    try {
      if (!onSubmit) {
        console.warn('No onSubmit handler provided to useFormState')
        return false
      }

      const result = await onSubmit(formData)

      if (result?.success) {
        submitSuccess.value = true
        originalData.value = { ...formData }
        showSuccess(result.message || 'Saved successfully')
        return true
      } else {
        submitError.value = result?.error || 'Failed to submit form'
        handleServiceError(result, 'Form Submission')
        return false
      }
    } catch (err) {
      console.error('Error submitting form:', err)
      submitError.value = 'An unexpected error occurred'
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Reset form to initial state
   */
  const reset = () => {
    Object.assign(formData, originalData.value)
    Object.keys(touched).forEach(field => delete touched[field])
    Object.keys(errors).forEach(field => delete errors[field])
    submitError.value = null
    submitSuccess.value = false
  }

  /**
   * Reset to current saved state (useful after successful submit)
   */
  const resetToSaved = () => {
    const saved = { ...originalData.value }
    Object.assign(formData, saved)
    Object.keys(errors).forEach(field => delete errors[field])
    submitError.value = null
  }

  /**
   * Set form data (useful for loading existing data)
   */
  const setFormData = (data) => {
    Object.assign(formData, data)
    originalData.value = { ...data }
    Object.keys(touched).forEach(field => delete touched[field])
    Object.keys(errors).forEach(field => delete errors[field])
  }

  /**
   * Get field error state
   */
  const getFieldError = (fieldName) => {
    return touched[fieldName] ? errors[fieldName] : null
  }

  /**
   * Get field touched state
   */
  const isFieldTouched = (fieldName) => {
    return !!touched[fieldName]
  }

  return {
    // State
    formData,
    errors,
    touched,
    loading,
    submitError,
    submitSuccess,
    isDirty,
    hasErrors,
    isValid,
    canSubmit,

    // Methods
    validateField,
    validateForm,
    handleFieldChange,
    handleFieldBlur,
    submit,
    reset,
    resetToSaved,
    setFormData,
    getFieldError,
    isFieldTouched
  }
}
