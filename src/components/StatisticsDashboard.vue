<template>
  <div class="statistics-dashboard">
    <!-- Error Message -->
    <div v-if="error" class="error-banner">
      <div class="error-content">
        <svg class="error-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>{{ error }}</span>
        <button @click="clearError" class="error-close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="dashboard-loading">
      <div class="spinner"></div>
      <p>{{ $t('dashboard.loadingStatistics') }}</p>
    </div>

    <!-- Dashboard Content -->
    <div v-else class="dashboard-content">
      <!-- Charts Grid -->
      <section class="charts-section">
        <h3 class="section-title">{{ $t('dashboard.analytics') }}</h3>
        <div class="charts-grid">
          <!-- Combo Chart (Bar + Line) -->
          <div class="chart-card combo-chart-card">
            <ComboChart
              :data="comboChartData"
              :title="$t('dashboard.analytics')"
              :loading="loading"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDashboardStats } from '@/composables/useDashboardStats'
import { ComboChart } from '@/components/charts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const {
  loading,
  error,
  clearError,
  clientStats,
  employeeStats,
  userStats,
  projectStats,
  contractStats,
  clientStatusChart,
  employeeBySectorChart,
  userByRoleChart,
  projectStatusChart,
  contractStatusChart,
  fetchAllStats
} = useDashboardStats()

const refreshData = async () => {
  await fetchAllStats()
}

const comboChartData = computed(() => {
  if (!employeeBySectorChart.value || !userByRoleChart.value) {
    return null
  }

  // Combine employee by sector (bar) and user by role (line) data
  const labels = employeeBySectorChart.value.labels || []
  
  return {
    labels,
    datasets: [
      {
        label: t('dashboard.employeeBySector') || 'Employees by Sector',
        data: employeeBySectorChart.value.datasets?.[0]?.data || [],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: '#3b82f6',
        borderWidth: 2,
        type: 'bar'
      },
      {
        label: t('dashboard.userByRole') || 'Users by Role',
        data: userByRoleChart.value.datasets?.[0]?.data || [],
        borderColor: '#ef4444',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
        type: 'line'
      }
    ]
  }
})
</script>

<style scoped>
.statistics-dashboard {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.3) 0%, rgba(30, 64, 175, 0.2) 100%);
  min-height: 100vh;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
}

/* Error Banner */
.error-banner {
  background: rgba(254, 226, 226, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(254, 202, 202, 0.3);
  border-radius: 8px;
  margin-bottom: 24px;
  padding: 16px;
}

.error-content {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #991b1b;
}

.error-icon {
  flex-shrink: 0;
  color: #dc2626;
}

.error-close {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
  padding: 4px;
  color: #991b1b;
  transition: color 0.2s;
}

.error-close:hover {
  color: #7f1d1d;
}

/* Loading State */
.dashboard-loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 600px;
  gap: 20px;
}

.spinner {
  width: 48px;
  height: 48px;
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

/* Header */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.dashboard-title {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.dashboard-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.refresh-btn:hover:not(:disabled) {
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  transform: translateY(-2px);
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Sections */
.charts-section {
  margin-bottom: 48px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(0, 212, 245, 0.3);
}

/* Charts Grid */
.charts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.chart-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  min-height: 500px;
}

.chart-card:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.15);
}

@media (max-width: 1024px) {
  .statistics-dashboard {
    padding: 16px;
  }

  .charts-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
  }

  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .refresh-btn {
    align-self: flex-start;
  }
}

@media (max-width: 640px) {
  .statistics-dashboard {
    padding: 12px;
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-title {
    font-size: 24px;
  }

  .section-title {
    font-size: 16px;
  }
}
</style>
