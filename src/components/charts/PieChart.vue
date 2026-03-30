<template>
  <div class="chart-container">
    <div v-if="loading" class="chart-loading">
      <div class="spinner"></div>
      <p>{{ $t('dashboard.loading') }}</p>
    </div>
    <Pie v-else :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    default: 'Chart'
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 15,
        font: {
          size: 12,
          weight: '500'
        },
        usePointStyle: true
      }
    },
    title: {
      display: true,
      text: props.title,
      font: {
        size: 14,
        weight: 'bold'
      },
      padding: 15
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleFont: { size: 13 },
      bodyFont: { size: 12 },
      cornerRadius: 4
    }
  }
}))

const chartData = computed(() => props.data)
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 50%;
  height: 50%;
  min-height: 220px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
