<template>
  <!-- Empty component - dark mode applied globally -->
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Apply dark theme globally
  document.documentElement.classList.add('dark-theme')
  localStorage.setItem('theme', 'dark')
})
</script>
