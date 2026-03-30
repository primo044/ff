import { Chart as ChartJS, registerables } from 'chart.js'
import ApexCharts from 'apexcharts'

// Register ChartJS components
ChartJS.register(...registerables)

// ApexCharts default options
export const apexChartsConfig = {
  chart: {
    fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    sparkline: {
      enabled: false
    },
    toolbar: {
      show: false
    }
  },
  colors: ['#1976D2', '#424242', '#82B1FF'],
  dataLabels: {
    enabled: false
  },
  grid: {
    show: true,
    borderColor: '#e0e0e0',
    strokeDashArray: 4,
    xaxis: {
      lines: {
        show: false
      }
    }
  },
  tooltip: {
    theme: 'light'
  }
}

export const chartsPlugin = {
  install(app) {
    app.config.globalProperties.$apexCharts = ApexCharts
    app.provide('apexChartsConfig', apexChartsConfig)
  }
}
