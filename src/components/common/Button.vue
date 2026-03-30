<template>
  <button
    :class="[
      'btn',
      `btn-${variant}`,
      `btn-${size}`,
      { 'is-loading': isLoading },
      { 'is-disabled': disabled }
    ]"
    :disabled="disabled || isLoading"
    @click="handleClick"
  >
    <span v-if="isLoading" class="spinner"></span>
    <slot v-if="!isLoading">{{ label }}</slot>
  </button>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: String,
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'danger', 'success'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  disabled: Boolean,
  isLoading: Boolean
})

const emit = defineEmits(['click'])

const handleClick = (e) => {
  // Add ripple effect
  const button = e.currentTarget
  const rect = button.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const ripple = document.createElement('span')
  ripple.className = 'ripple'
  ripple.style.left = `${x}px`
  ripple.style.top = `${y}px`

  button.appendChild(ripple)
  setTimeout(() => ripple.remove(), 600)

  emit('click', e)
}
</script>

<style scoped lang="scss">
.btn {
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;

  &.btn-primary {
    background: var(--primary);
    color: white;
    box-shadow: var(--shadow-card);

    &:hover:not(.is-disabled) {
      background: var(--primary-dark);
      transform: translateY(-2px) scale(1.02);
      box-shadow: var(--shadow-elevated);
    }

    &:active:not(.is-disabled) {
      transform: translateY(-1px) scale(0.98);
      box-shadow: var(--shadow-card);
    }

    &:focus {
      outline: none;
      box-shadow: var(--shadow-focus);
    }
  }

  &.btn-secondary {
    background: var(--secondary);
    color: white;
    box-shadow: var(--shadow-card);

    &:hover:not(.is-disabled) {
      background: var(--secondary-dark);
      transform: translateY(-2px) scale(1.02);
      box-shadow: var(--shadow-elevated);
    }

    &:active:not(.is-disabled) {
      transform: translateY(-1px) scale(0.98);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(91, 67, 163, 0.15), 0 0 0 1px rgba(91, 67, 163, 0.6);
    }
  }

  &.btn-danger {
    background: var(--error);
    color: white;
    box-shadow: var(--shadow-card);

    &:hover:not(.is-disabled) {
      background: var(--danger-dark);
      transform: translateY(-2px) scale(1.02);
      box-shadow: var(--shadow-elevated);
    }

    &:active:not(.is-disabled) {
      transform: translateY(-1px) scale(0.98);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(192, 37, 61, 0.15), 0 0 0 1px rgba(192, 37, 61, 0.6);
    }
  }

  &.btn-success {
    background: var(--success);
    color: white;
    box-shadow: var(--shadow-card);

    &:hover:not(.is-disabled) {
      background: var(--success-dark);
      transform: translateY(-2px) scale(1.02);
      box-shadow: var(--shadow-elevated);
    }

    &:active:not(.is-disabled) {
      transform: translateY(-1px) scale(0.98);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.15), 0 0 0 1px rgba(22, 163, 74, 0.6);
    }
  }

  &.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.btn-sm {
    padding: 6px 12px;
    font-size: 12px;
  }

  &.btn-md {
    padding: 10px 16px;
    font-size: 14px;
  }

  &.btn-lg {
    padding: 12px 20px;
    font-size: 16px;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  /* Ripple effect */
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  }
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
