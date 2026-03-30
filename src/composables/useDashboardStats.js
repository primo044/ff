import { ref, computed, onMounted } from 'vue'
import { useClientStore } from '@/stores/modules/client'
import { useEmployeeStore } from '@/stores/modules/employee'
import { useUserStore } from '@/stores/modules/user'
import { useRoleStore } from '@/stores/modules/role'
import { useSectorStore } from '@/stores/modules/sector'
import * as apiEndpoints from '@/api'

/**
 * Composable for dashboard statistics
 * Handles fetching and processing data for various dashboard charts
 */
export const useDashboardStats = () => {
  const clientStore = useClientStore()
  const employeeStore = useEmployeeStore()
  const userStore = useUserStore()
  const roleStore = useRoleStore()
  const sectorStore = useSectorStore()

  const loading = ref(false)
  const error = ref(null)

  // Stats data
  const clientStats = ref({
    total: 0,
    active: 0,
    inactive: 0,
    byStatus: []
  })

  const employeeStats = ref({
    total: 0,
    active: 0,
    inactive: 0,
    bySector: []
  })

  const userStats = ref({
    total: 0,
    active: 0,
    inactive: 0,
    byRole: []
  })

  const projectStats = ref({
    total: 0,
    active: 0,
    inactive: 0
  })

  const contractStats = ref({
    total: 0,
    active: 0,
    byType: []
  })

  // Computed charts data
  const clientStatusChart = computed(() => ({
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        label: 'Clients by Status',
        data: [clientStats.value.active, clientStats.value.inactive],
        backgroundColor: ['#10b981', '#ef4444'],
        borderColor: ['#059669', '#dc2626'],
        borderWidth: 2
      }
    ]
  }))

  const employeeBySectorChart = computed(() => ({
    labels: employeeStats.value.bySector.map(item => item.name),
    datasets: [
      {
        label: 'Employees by Sector',
        data: employeeStats.value.bySector.map(item => item.count),
        backgroundColor: [
          '#3b82f6',
          '#8b5cf6',
          '#ec4899',
          '#f59e0b',
          '#10b981',
          '#06b6d4'
        ],
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 2
      }
    ]
  }))

  const userByRoleChart = computed(() => ({
    labels: userStats.value.byRole.map(item => item.name),
    datasets: [
      {
        label: 'Users by Role',
        data: userStats.value.byRole.map(item => item.count),
        backgroundColor: [
          '#1f2937',
          '#4f46e5',
          '#059669',
          '#dc2626',
          '#f59e0b'
        ],
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 2
      }
    ]
  }))

  const projectStatusChart = computed(() => ({
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        label: 'Projects by Status',
        data: [projectStats.value.active, projectStats.value.inactive],
        backgroundColor: ['#3b82f6', '#9ca3af'],
        borderColor: ['#1e40af', '#6b7280'],
        borderWidth: 2
      }
    ]
  }))

  const contractStatusChart = computed(() => ({
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        label: 'Contracts by Status',
        data: [contractStats.value.total - contractStats.value.active, contractStats.value.active],
        backgroundColor: ['#f59e0b', '#06b6d4'],
        borderColor: ['#d97706', '#0891b2'],
        borderWidth: 2
      }
    ]
  }))

  // Overview metrics
  const overviewMetrics = computed(() => [
    {
      title: 'Total Clients',
      value: clientStats.value.total,
      icon: 'users',
      color: 'blue',
      trend: '+5%'
    },
    {
      title: 'Active Employees',
      value: employeeStats.value.active,
      icon: 'briefcase',
      color: 'green',
      trend: '+2%'
    },
    {
      title: 'Active Projects',
      value: projectStats.value.active,
      icon: 'project',
      color: 'purple',
      trend: '+8%'
    },
    {
      title: 'Active Contracts',
      value: contractStats.value.active,
      icon: 'file-text',
      color: 'orange',
      trend: '+3%'
    },
    {
      title: 'Total Users',
      value: userStats.value.total,
      icon: 'user',
      color: 'red',
      trend: '+1%'
    }
  ])

  /**
   * Fetch clients statistics
   */
  const fetchClientStats = async () => {
    try {
      const response = await apiEndpoints.clientsAPI.getActiveClients()
      const clients = response.data

      clientStats.value.total = clients.length
      clientStats.value.active = clients.filter(c => c.active).length
      clientStats.value.inactive = clients.length - clientStats.value.active
    } catch (err) {
      console.error('Error fetching client stats:', err)
      error.value = 'Failed to fetch client statistics'
    }
  }

  /**
   * Fetch employees statistics
   */
  const fetchEmployeeStats = async () => {
    try {
      const response = await apiEndpoints.employeesAPI.getActiveEmployees()
      const employees = response.data

      employeeStats.value.total = employees.length
      employeeStats.value.active = employees.filter(e => e.active).length
      employeeStats.value.inactive = employees.length - employeeStats.value.active

      // Group by sector
      const sectorMap = new Map()
      employees.forEach(emp => {
        const sectorName = emp.sector?.libelle || 'Unknown'
        if (sectorMap.has(sectorName)) {
          sectorMap.set(sectorName, sectorMap.get(sectorName) + 1)
        } else {
          sectorMap.set(sectorName, 1)
        }
      })

      employeeStats.value.bySector = Array.from(sectorMap, ([name, count]) => ({
        name,
        count
      }))
    } catch (err) {
      console.error('Error fetching employee stats:', err)
      error.value = 'Failed to fetch employee statistics'
    }
  }

  /**
   * Fetch users statistics
   */
  const fetchUserStats = async () => {
    try {
      const response = await apiEndpoints.usersAPI.listUsers(0, 1000)
      const users = response.data.content

      userStats.value.total = users.length
      userStats.value.active = users.filter(u => u.active).length
      userStats.value.inactive = users.length - userStats.value.active

      // Group by role
      const roleMap = new Map()
      users.forEach(user => {
        const roleName = user.role?.libelle || 'No Role'
        if (roleMap.has(roleName)) {
          roleMap.set(roleName, roleMap.get(roleName) + 1)
        } else {
          roleMap.set(roleName, 1)
        }
      })

      userStats.value.byRole = Array.from(roleMap, ([name, count]) => ({
        name,
        count
      })).slice(0, 5) // Limit to top 5 roles
    } catch (err) {
      console.error('Error fetching user stats:', err)
      error.value = 'Failed to fetch user statistics'
    }
  }

  /**
   * Fetch projects statistics
   */
  const fetchProjectStats = async () => {
    try {
      const response = await apiEndpoints.projectsAPI.getActiveProjects()
      const projects = response.data

      projectStats.value.total = projects.length
      projectStats.value.active = projects.filter(p => p.active).length
      projectStats.value.inactive = projects.length - projectStats.value.active
    } catch (err) {
      console.error('Error fetching project stats:', err)
      error.value = 'Failed to fetch project statistics'
    }
  }

  /**
   * Fetch contracts statistics
   */
  const fetchContractStats = async () => {
    try {
      const response = await apiEndpoints.clientContractsAPI.getActiveContracts()
      const contracts = response.data

      contractStats.value.total = contracts.length
      contractStats.value.active = contracts.filter(c => c.active).length
    } catch (err) {
      console.error('Error fetching contract stats:', err)
      error.value = 'Failed to fetch contract statistics'
    }
  }

  /**
   * Fetch all statistics
   */
  const fetchAllStats = async () => {
    loading.value = true
    error.value = null

    try {
      await Promise.all([
        fetchClientStats(),
        fetchEmployeeStats(),
        fetchUserStats(),
        fetchProjectStats(),
        fetchContractStats()
      ])
    } catch (err) {
      error.value = 'Failed to fetch dashboard statistics'
      console.error('Dashboard stats error:', err)
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  onMounted(() => {
    fetchAllStats()
  })

  return {
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
    overviewMetrics,
    fetchAllStats,
    fetchClientStats,
    fetchEmployeeStats,
    fetchUserStats,
    fetchProjectStats,
    fetchContractStats
  }
}
