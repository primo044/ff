<template>
  <div class="form-group">
    <label :for="id" class="form-label" :class="{ 'is-required': required }">
      {{ label }}
    </label>

    <input
      :id="id"
      v-bind="$attrs"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      class="form-input"
      :class="{ 'is-error': error, 'is-disabled': disabled }"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    />

    <span v-if="error" class="form-error">{{ error }}</span>
    <small v-if="hint" class="form-hint">{{ hint }}</small>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  modelValue: [String, Number],
  placeholder: String,
  error: String,
  hint: String,
  required: Boolean,
  disabled: Boolean
})

defineEmits(['update:modelValue', 'blur', 'focus'])
</script>

<style scoped lang="scss">
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  animation: slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  .form-label {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 6px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &.is-required::after {
      content: ' *';
      color: var(--error);
    }
  }

  .form-input {
    padding: 10px 12px;
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 14px;
    color: var(--text-primary);
    background: var(--surface);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: var(--shadow-input);
    position: relative;

    &:hover:not(.is-error):not(.is-disabled) {
      border-color: var(--border-hover);
      transform: scale(1.01);
      box-shadow: 
        var(--shadow-input),
        0 0 12px rgba(0, 112, 204, 0.08);
    }

    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: var(--shadow-focus);
      transform: scale(1.01);
      animation: borderGlow 2s ease-in-out infinite;
    }

    &.is-error {
      border-color: var(--error);
      background: rgba(192, 37, 61, 0.02);

      &:focus {
        box-shadow: 0 0 0 3px rgba(192, 37, 61, 0.15), 0 0 0 1px rgba(192, 37, 61, 0.6);
        animation: shake 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
    }

    &.is-disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background: rgba(0, 0, 0, 0.03);
    }
  }

  .form-error {
    font-size: 12px;
    color: var(--error);
    margin-top: 6px;
    animation: slideInDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 500;
  }

  .form-hint {
    margin-top: 6px;
    font-weight: 500;
  }

  .form-hint {
    font-size: 13px;
    color: var(--text-muted);
    margin-top: 6px;
  }
}
</style>
