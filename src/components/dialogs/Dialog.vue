<template>
  <v-dialog
    :model-value="modelValue"
    :max-width="maxWidth"
    :persistent="persistent"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-card>
      <!-- Header -->
      <v-card-title class="d-flex justify-space-between align-center">
        <span>{{ title }}</span>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          @click="$emit('update:modelValue', false)"
        />
      </v-card-title>

      <!-- Divider -->
      <v-divider />

      <!-- Content -->
      <v-card-text>
        <slot />
      </v-card-text>

      <!-- Divider -->
      <v-divider />

      <!-- Actions -->
      <v-card-actions class="justify-end gap-2">
        <v-btn
          variant="text"
          @click="$emit('update:modelValue', false)"
        >
          {{ cancelText }}
        </v-btn>
        <v-btn
          variant="elevated"
          color="primary"
          @click="$emit('confirm')"
          :loading="loading"
        >
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Dialog'
  },
  maxWidth: {
    type: [String, Number],
    default: 500
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  persistent: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue', 'confirm'])
</script>
