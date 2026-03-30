<template>
  <div class="chart-container">
    <div v-if="loading" class="chart-loading">
      <div class="spinner"></div>
      <p>{{ $t('dashboard.loading') }}</p>
    </div>
    <Chart v-else :type="chartType" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Chart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
)

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    default: 'Combo Chart'
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const chartType = 'bar'

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top',
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
  },
  scales: {
    x: {
      stacked: false,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
        drawBorder: false
      }
    },
    y: {
      stacked: false,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
        drawBorder: false
      }
    }
  }
}))

const chartData = computed(() => {
  if (!props.data) return null
  
  const dataWithTypes = {
    ...props.data,
    datasets: props.data.datasets?.map((dataset, index) => ({
      ...dataset,
      type: index === 0 ? 'bar' : 'line',
      borderColor: dataset.borderColor || '#3b82f6',
      backgroundColor: dataset.backgroundColor || (index === 0 ? 'rgba(59, 130, 246, 0.5)' : 'transparent'),
      fill: index === 0 ? true : false,
      tension: index === 0 ? 0 : 0.3,
      pointRadius: index === 0 ? 0 : 4,
      pointHoverRadius: index === 0 ? 0 : 6
    })) || []
  }
  
  return dataWithTypes
})
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
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
