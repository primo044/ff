<template>
  <div class="dashboard-page page-enter-active">
    <!-- Statistics Dashboard -->
    <StatisticsDashboard />
  </div>
</template>

<script setup>
import StatisticsDashboard from '@/components/StatisticsDashboard.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.dashboard-page {
  animation: pageFadeIn 0.4s ease-out;
}

@keyframes pageFadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.subtitle {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0.3rem 0 0 0;
  font-weight: 400;
}
</style>
