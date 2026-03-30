<template>
  <v-dialog
    :model-value="modelValue"
    max-width="420"
    persistent
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <Transition name="dialog">
      <v-card v-if="modelValue" class="confirm-dialog-card">

        <div class="dialog-body">
          <div class="icon-circle">
            <v-icon size="18" color="#A32D2D">mdi-delete-outline</v-icon>
          </div>
          <div class="dialog-text">
            <p class="dialog-title">{{ title }}</p>
            <p class="dialog-message">{{ message }}</p>
            <p class="dialog-warning">This action cannot be undone.</p>
          </div>
        </div>

        <v-divider />

        <v-card-actions class="dialog-actions">
          <v-btn class="cancel-btn" variant="outlined" size="small" @click="$emit('update:modelValue', false)">
            {{ cancelText }}
          </v-btn>
          <v-btn class="confirm-btn" size="small" prepend-icon="mdi-delete-outline" @click="$emit('confirm')">
            {{ confirmText }}
          </v-btn>
        </v-card-actions>

      </v-card>
    </Transition>
  </v-dialog>
</template>

<script setup>
defineProps({
  modelValue:  { type: Boolean, required: true },
  title:       { type: String,  default: 'Confirm' },
  message:     { type: String,  required: true },
  confirmText: { type: String,  default: 'Yes' },
  cancelText:  { type: String,  default: 'No' },
  color:       { type: String,  default: 'error' }
})

defineEmits(['update:modelValue', 'confirm'])
</script>

<style>
/* ── Dialog enter/leave animation ── */
.dialog-enter-active {
  animation: dialog-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dialog-leave-active {
  animation: dialog-out 0.18s cubic-bezier(0.4, 0, 1, 1);
}

@keyframes dialog-in {
  from {
    opacity: 0;
    transform: scale(0.88) translateY(12px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes dialog-out {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.92) translateY(8px);
  }
}

/* ── Icon pulse on open ── */
.dialog-enter-active .icon-circle {
  animation: icon-pulse 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both;
}

@keyframes icon-pulse {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* ── Text stagger on open ── */
.dialog-enter-active .dialog-title {
  animation: fade-up 0.3s ease 0.1s both;
}

.dialog-enter-active .dialog-message {
  animation: fade-up 0.3s ease 0.17s both;
}

.dialog-enter-active .dialog-warning {
  animation: fade-up 0.3s ease 0.22s both;
}

.dialog-enter-active .dialog-actions {
  animation: fade-up 0.3s ease 0.26s both;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Card ── */
.confirm-dialog-card {
  border-radius: 16px !important;
  overflow: hidden !important;
}

.dialog-body {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 24px 24px 16px;
}

.icon-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #FCEBEB;
  border: 1px solid #F7C1C1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.dialog-text {
  flex: 1;
}

.dialog-title {
  font-size: 15px;
  font-weight: 500;
  margin: 0 0 6px;
  color: #1a202c;
}

.dialog-message {
  font-size: 14px;
  color: #4a5568;
  margin: 0;
  line-height: 1.6;
}

.dialog-warning {
  font-size: 13px;
  color: #a0aec0;
  margin: 8px 0 0;
}

.dialog-actions {
  padding: 12px 20px !important;
  justify-content: flex-end !important;
  gap: 8px !important;
}

/* ── Cancel button ── */
.cancel-btn {
  color: #718096 !important;
  border-color: #cbd5e0 !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
  font-size: 13px !important;
  background: transparent !important;
  transition: all 0.2s ease !important;
}

.cancel-btn:hover,
.cancel-btn:focus,
.cancel-btn:active {
  color: #4a5568 !important;
  background: #f7fafc !important;
  border-color: #a0aec0 !important;
}

.cancel-btn .v-btn__overlay {
  display: none !important;
}

/* ── Confirm button ── */
.confirm-btn {
  background: #A32D2D !important;
  color: #F7C1C1 !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  transition: all 0.2s ease !important;
}

.confirm-btn:hover,
.confirm-btn:focus,
.confirm-btn:active {
  background: #7F1F1F !important;
  color: #F7C1C1 !important;
  transform: scale(1.03);
}

.confirm-btn:active {
  transform: scale(0.97) !important;
}

.confirm-btn .v-btn__overlay {
  display: none !important;
}
</style>