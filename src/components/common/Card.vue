<template>
  <div class="card" :class="{ 'is-loading': isLoading }">
    <div v-if="showHeader" class="card-header">
      <h3>{{ title }}</h3>
      <button v-if="closeBtn" class="close-btn" @click="$emit('close')">
        <i class="fa fa-times"></i>
      </button>
    </div>

    <div class="card-body">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>

    <div v-if="isLoading" class="card-overlay">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  isLoading: Boolean,
  closeBtn: Boolean,
  showHeader: {
    type: Boolean,
    default: true
  }
})

defineEmits(['close'])
</script>

<style scoped lang="scss">
.card {
  background: var(--surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  border: 1px solid var(--border);
  position: relative;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover:not(.is-loading) {
    transform: translateY(-8px);
    box-shadow: 
      0 0 0 1px rgba(0, 112, 204, 0.15),
      0 8px 24px rgba(0, 112, 204, 0.12),
      0 16px 48px rgba(0, 112, 204, 0.08);
    border: 1px solid rgba(0, 112, 204, 0.15);
  }

  &.is-loading {
    pointer-events: none;
    opacity: 0.6;
    animation: pulse 1.5s ease-in-out infinite;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid var(--border);
    border-radius: var(--radius-md) var(--radius-md) 0 0;
    background: linear-gradient(
      135deg,
      rgba(0, 112, 204, 0.03) 0%,
      rgba(91, 67, 163, 0.02) 100%
    );
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--text-secondary);
      font-size: 18px;
      transition: all 0.2s var(--transition-fast);
      border-radius: var(--radius-sm);
      padding: 4px;
      position: relative;
      overflow: hidden;

      &:hover {
        color: var(--text-primary);
        background: rgba(0, 112, 204, 0.08);
        transform: scale(1.1) rotate(90deg);
      }

      &:focus {
        outline: none;
        box-shadow: var(--shadow-focus);
      }
    }
  }

  .card-body {
    padding: 16px;
    animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;
  }

  .card-footer {
    padding: 16px;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    animation: slideInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
  }

  .card-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 8px;

    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid rgba(0, 0, 0, 0.1);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
