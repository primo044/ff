import { ref } from 'vue'

/**
 * Composable for managing confirm dialog state and actions
 * 
 * Usage:
 * const { isOpen, title, message, onConfirm, openDialog, closeDialog, confirm, cancel } = useConfirmDialog()
 * 
 * In template:
 * <ConfirmDialog 
 *   v-model="isOpen"
 *   :title="title"
 *   :message="message"
 *   @confirm="confirm"
 *   @cancel="cancel"
 * />
 * 
 * In script:
 * const handleDelete = async (item) => {
 *   const confirmed = await openDialog({
 *     title: 'Delete Item',
 *     message: `Are you sure you want to delete "${item.name}"?`
 *   })
 *   
 *   if (confirmed) {
 *     await deleteItem(item.id)
 *   }
 * }
 */
export const useConfirmDialog = () => {
  const isOpen = ref(false)
  const title = ref('')
  const message = ref('')
  const confirmLabel = ref('Confirm')
  const cancelLabel = ref('Cancel')
  
  let resolvePromise = null
  let rejectPromise = null

  /**
   * Open dialog and return a promise
   * @param {Object} options - Dialog configuration
   * @param {string} options.title - Dialog title
   * @param {string} options.message - Dialog message
   * @param {string} options.confirmLabel - Confirm button label (default: 'Confirm')
   * @param {string} options.cancelLabel - Cancel button label (default: 'Cancel')
   * @returns {Promise<boolean>} - Resolves to true if confirmed, false if cancelled
   */
  const openDialog = (options) => {
    return new Promise((resolve, reject) => {
      title.value = options.title || ''
      message.value = options.message || ''
      confirmLabel.value = options.confirmLabel || 'Confirm'
      cancelLabel.value = options.cancelLabel || 'Cancel'
      
      resolvePromise = resolve
      rejectPromise = reject
      isOpen.value = true
    })
  }

  /**
   * Close dialog
   */
  const closeDialog = () => {
    isOpen.value = false
    resolvePromise = null
    rejectPromise = null
  }

  /**
   * Confirm action
   */
  const confirm = () => {
    resolvePromise?.(true)
    closeDialog()
  }

  /**
   * Cancel action
   */
  const cancel = () => {
    resolvePromise?.(false)
    closeDialog()
  }

  return {
    isOpen,
    title,
    message,
    confirmLabel,
    cancelLabel,
    openDialog,
    closeDialog,
    confirm,
    cancel
  }
}
