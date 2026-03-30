<template>
  <div class="content-layout">
    <!-- Page Header -->
    <div v-if="title" class="mb-6">
      <h1 class="text-h4 font-weight-bold mb-2">{{ title }}</h1>
      <p v-if="subtitle" class="text-subtitle1 text-medium-emphasis">{{ subtitle }}</p>
    </div>

    <!-- Breadcrumbs -->
    <v-breadcrumbs v-if="breadcrumbs?.length" :items="breadcrumbs" class="mb-6" />

    <!-- Content -->
    <div class="content">
      <slot />
    </div>

    <!-- Footer Actions -->
    <div v-if="$slots.actions" class="mt-8 d-flex justify-end gap-3">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  breadcrumbs: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.content-layout {
  padding: 2rem 0;
}

.content {
  min-height: 400px;
}
</style>
