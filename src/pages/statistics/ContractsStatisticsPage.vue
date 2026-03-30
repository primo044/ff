<template>
  <div class="statistics-page">
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">{{ $t('dashboard.contractStatus') }}</h1>
        <p class="page-subtitle">{{ $t('dashboard.totalContracts') }}</p>
      </div>
      <button 
        @click="refreshData" 
        class="refresh-btn"
        :disabled="loading"
        :title="$t('dashboard.refresh')"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path>
        </svg>
        {{ $t('dashboard.refresh') }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>{{ $t('dashboard.loading') }}</p>
    </div>

    <!-- Error Banner -->
    <div v-else-if="error" class="error-banner">
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

    <!-- Content -->
    <div v-else class="statistics-content">
      <!-- Key Metric Cards -->
      <div class="metrics-group">
        <div class="metric-card highlight">
          <span class="metric-label">{{ $t('dashboard.totalContracts') }}</span>
          <span class="metric-value">{{ contractStats.total }}</span>
        </div>
        <div class="metric-card">
          <span class="metric-label">{{ $t('dashboard.active') }}</span>
          <span class="metric-value success">{{ contractStats.active }}</span>
        </div>
      </div>

      <!-- Chart Section -->
      <div class="chart-section">
        <h2 class="section-title">{{ $t('dashboard.contractStatus') }}</h2>
        <PieChart
          :data="contractStatusChart"
          :title="$t('dashboard.contractStatus')"
          :loading="loading"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDashboardStats } from '@/composables/useDashboardStats'
import { PieChart } from '@/components/charts'

const {
  loading,
  error,
  clearError,
  contractStats,
  contractStatusChart,
  fetchContractStats
} = useDashboardStats()

const refreshData = async () => {
  await fetchContractStats()
}
</script>

<style scoped>
.statistics-page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.3) 0%, rgba(30, 64, 175, 0.2) 100%);
  min-height: 100vh;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.refresh-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  position: relative;
  overflow: hidden;
}

.refresh-btn svg {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.refresh-btn:hover:not(:disabled) {
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.5);
  transform: translateY(-1px);
  background: linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%);
}

.refresh-btn:hover:not(:disabled) svg {
  transform: rotate(180deg);
}

.refresh-btn:active:not(:disabled) {
  transform: translateY(0);
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
}

.refresh-btn:disabled svg {
  animation: spin 2s linear infinite;
}

.loading-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
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
  margin-left: auto;
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: #991b1b;
  transition: color 0.2s;
}

.error-close:hover {
  color: #7f1d1d;
}

.statistics-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.metrics-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.metric-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.metric-card:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.15);
  transform: translateY(-2px);
}

.metric-card.highlight {
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  border: none;
  color: white;
}

.metric-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.7);
}

.metric-card.highlight .metric-label {
  color: rgba(255, 255, 255, 0.9);
}

.metric-value {
  font-size: 32px;
  font-weight: 700;
  color: white;
}

.metric-card.highlight .metric-value {
  color: white;
}

.metric-value.success {
  color: #10b981;
}

.metric-value.danger {
  color: #ef4444;
}

.chart-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(0, 212, 245, 0.3);
}

@media (max-width: 768px) {
  .statistics-page {
    padding: 16px;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .refresh-btn {
    align-self: flex-start;
  }

  .metrics-group {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: 22px;
  }
}
</style>
