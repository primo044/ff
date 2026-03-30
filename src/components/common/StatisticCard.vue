<template>
  <div class="statistic-card" :class="`card-${color}`">
    <div class="card-header">
      <div class="card-icon">
        <i :class="`fas fa-${icon}`"></i>
      </div>
      <div class="card-trend" :class="trendPositive ? 'trend-positive' : 'trend-negative'">
        {{ trend }}
      </div>
    </div>
    
    <div class="card-body">
      <h3 class="card-title">{{ title }}</h3>
      <div class="card-value">{{ formattedValue }}</div>
    </div>

    <div class="card-footer">
      <p class="card-subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  icon: {
    type: String,
    default: 'chart-bar'
  },
  color: {
    type: String,
    enum: ['blue', 'green', 'purple', 'orange', 'red', 'cyan'],
    default: 'blue'
  },
  trend: {
    type: String,
    default: '+0%'
  },
  subtitle: {
    type: String,
    default: 'This month'
  }
})

const formattedValue = computed(() => {
  const num = props.value
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
})

const trendPositive = computed(() => {
  return !props.trend.startsWith('-')
})
</script>

<style scoped>
.statistic-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #f0f1f3 100%);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  cursor: pointer;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.statistic-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-color: #d1d5db;
}

/* Color variants */
.card-blue .card-icon {
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
}

.card-green .card-icon {
  background: linear-gradient(135deg, #10b981 0%, #047857 100%);
}

.card-purple .card-icon {
  background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%);
}

.card-orange .card-icon {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.card-red .card-icon {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.card-cyan .card-icon {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-trend {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
}

.trend-positive {
  background-color: #d1fae5;
  color: #047857;
}

.trend-negative {
  background-color: #fee2e2;
  color: #dc2626;
}

.card-body {
  margin-bottom: 12px;
}

.card-title {
  font-size: 13px;
  color: #6b7280;
  letter-spacing: 0.5px;
  margin: 0;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 8px;
}

.card-value {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
}

.card-footer {
  border-top: 1px solid #e5e7eb;
  padding-top: 12px;
}

.card-subtitle {
  font-size: 11px;
  color: #9ca3af;
  margin: 0;
  font-weight: 500;
}

@media (max-width: 640px) {
  .statistic-card {
    padding: 16px;
  }

  .card-value {
    font-size: 24px;
  }

  .card-icon {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
}
</style>
