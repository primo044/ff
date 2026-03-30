/**
 * Form Validation Utilities
 * Provides reusable validation rules and helper functions
 */

/**
 * Validation result object
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether validation passed
 * @property {string|null} error - Error message if validation failed
 */

/**
 * Validators object containing reusable validation functions
 * Each validator takes a value and returns an error message or null
 */
export const validators = {
  /**
   * Required field validator
   */
  required: (value, fieldName = 'This field') => {
    if (value === null || value === undefined || value === '') {
      return `${fieldName} is required`
    }
    return null
  },

  /**
   * Email validator
   */
  email: (value) => {
    if (!value) return null
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
    return null
  },

  /**
   * Minimum length validator
   */
  minLength: (minLen, fieldName = 'This field') => {
    return (value) => {
      if (!value) return null
      if (value.length < minLen) {
        return `${fieldName} must be at least ${minLen} characters long`
      }
      return null
    }
  },

  /**
   * Maximum length validator
   */
  maxLength: (maxLen, fieldName = 'This field') => {
    return (value) => {
      if (!value) return null
      if (value.length > maxLen) {
        return `${fieldName} must not exceed ${maxLen} characters`
      }
      return null
    }
  },

  /**
   * Numeric validator
   */
  numeric: (value, fieldName = 'This field') => {
    if (!value) return null
    if (isNaN(value) || value === '') {
      return `${fieldName} must be a number`
    }
    return null
  },

  /**
   * Min value validator
   */
  minValue: (minVal, fieldName = 'This field') => {
    return (value) => {
      if (value === null || value === undefined || value === '') return null
      if (Number(value) < minVal) {
        return `${fieldName} must be at least ${minVal}`
      }
      return null
    }
  },

  /**
   * Max value validator
   */
  maxValue: (maxVal, fieldName = 'This field') => {
    return (value) => {
      if (value === null || value === undefined || value === '') return null
      if (Number(value) > maxVal) {
        return `${fieldName} must not exceed ${maxVal}`
      }
      return null
    }
  },

  /**
   * Pattern (regex) validator
   */
  pattern: (pattern, message = 'Invalid format') => {
    return (value) => {
      if (!value) return null
      if (!pattern.test(value)) {
        return message
      }
      return null
    }
  },

  /**
   * Custom validator
   */
  custom: (validatorFn, errorMessage) => {
    return (value) => {
      return validatorFn(value) ? null : errorMessage
    }
  }
}

/**
 * Compose multiple validators into a single validator function
 * @param {...Function} validatorFunctions - Validator functions to compose
 * @returns {Function} Combined validator that returns first error found
 */
export const composeValidators = (...validatorFunctions) => {
  return (value, allFormData) => {
    for (const validator of validatorFunctions) {
      const error = validator(value, allFormData)
      if (error) return error
    }
    return null
  }
}

/**
 * Create a validator that checks if field is unique by calling an async function
 * @param {Function} checkFn - Async function that returns true if valid (not taken)
 * @param {string} errorMessage - Error message if not unique
 * @returns {Function} Async validator function
 */
export const asyncUniqueValidator = (checkFn, errorMessage = 'This value is already taken') => {
  return async (value) => {
    if (!value) return null
    
    try {
      const isUnique = await checkFn(value)
      return isUnique ? null : errorMessage
    } catch (err) {
      console.error('Error checking uniqueness:', err)
      return null // Don't block submission on check error
    }
  }
}

/**
 * Validate a form object against a schema
 * @param {Object} formData - Form data to validate
 * @param {Object} schema - Validation schema {fieldName: validatorFn or [validatorFn, ...]}
 * @returns {Object} Errors object {fieldName: errorMessage}
 */
export const validateForm = (formData, schema) => {
  const errors = {}

  for (const [fieldName, validator] of Object.entries(schema)) {
    const value = formData[fieldName]
    
    if (Array.isArray(validator)) {
      // Multiple validators for same field
      for (const v of validator) {
        const error = v(value, formData)
        if (error) {
          errors[fieldName] = error
          break
        }
      }
    } else {
      // Single validator
      const error = validator(value, formData)
      if (error) {
        errors[fieldName] = error
      }
    }
  }

  return errors
}

/**
 * Check if validation errors object is empty
 */
export const hasValidationErrors = (errors) => {
  return Object.keys(errors).length > 0
}
