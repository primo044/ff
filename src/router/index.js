import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../pages/DashboardPage.vue'),
    meta: { requiresAuth: true, layout: 'app' }
  },
  // Statistics routes
  {
    path: '/statistics/clients',
    name: 'ClientsStatistics',
    component: () => import('../pages/statistics/ClientsStatisticsPage.vue'),
    meta: { requiresAuth: true, layout: 'app' }
  },
  {
    path: '/statistics/employees',
    name: 'EmployeesStatistics',
    component: () => import('../pages/statistics/EmployeesStatisticsPage.vue'),
    meta: { requiresAuth: true, layout: 'app' }
  },
  {
    path: '/statistics/projects',
    name: 'ProjectsStatistics',
    component: () => import('../pages/statistics/ProjectsStatisticsPage.vue'),
    meta: { requiresAuth: true, layout: 'app' }
  },
  {
    path: '/statistics/contracts',
    name: 'ContractsStatistics',
    component: () => import('../pages/statistics/ContractsStatisticsPage.vue'),
    meta: { requiresAuth: true, layout: 'app' }
  },
  {
    path: '/statistics/users',
    name: 'UsersStatistics',
    component: () => import('../pages/statistics/UsersStatisticsPage.vue'),
    meta: { requiresAuth: true, layout: 'app' }
  },
  // Clients routes
  {
    path: '/clients',
    name: 'Clients',
    component: () => import('../views/parametrage/Client/ClientsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/clients/create',
    name: 'CreateClient',
    component: () => import('../views/parametrage/Client/ClientFormView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/clients/:id/edit',
    name: 'EditClient',
    component: () => import('../views/parametrage/Client/ClientFormView.vue'),
    meta: { requiresAuth: true }
  },
  // Client Projects routes
  {
    path: '/client-projects',
    name: 'ClientProjects',
    component: () => import('../views/parametrage/ClientProject/ClientProjectsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/client-projects/create',
    name: 'CreateClientProject',
    component: () => import('../views/parametrage/ClientProject/ClientProjectFormView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/client-projects/:id/edit',
    name: 'EditClientProject',
    component: () => import('../views/parametrage/ClientProject/ClientProjectFormView.vue'),
    meta: { requiresAuth: true }
  },
  // Client Contracts routes
  {
    path: '/contracts',
    name: 'ClientContracts',
    component: () => import('../views/parametrage/ClientContract/ClientContractsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/contracts/create',
    name: 'CreateContract',
    component: () => import('../views/parametrage/ClientContract/ClientContractFormView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/contracts/:id/edit',
    name: 'EditContract',
    component: () => import('../views/parametrage/ClientContract/ClientContractFormView.vue'),
    meta: { requiresAuth: true }
  },
  // Contract Follow-ups routes
  {
    path: '/contract-followups',
    name: 'ContractFollowUps',
    component: () => import('../views/parametrage/ClientContractFollowUp/ClientContractFollowUpView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/contract-followups/create',
    name: 'CreateFollowUp',
    component: () => import('../views/parametrage/ClientContractFollowUp/ClientContractFollowUpFormView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/contract-followups/:id/edit',
    name: 'EditFollowUp',
    component: () => import('../views/parametrage/ClientContractFollowUp/ClientContractFollowUpFormView.vue'),
    meta: { requiresAuth: true }
  },
  // Contract Types routes
  {
    path: '/contract-types',
    name: 'ContractTypes',
    component: () => import('../views/parametrage/ContractType/ContractTypesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/contract-types/create',
    name: 'CreateContractType',
    component: () => import('../views/parametrage/ContractType/ContractTypeFormView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/contract-types/:id/edit',
    name: 'EditContractType',
    component: () => import('../views/parametrage/ContractType/ContractTypeFormView.vue'),
    meta: { requiresAuth: true }
  },
  // Users routes
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/securite/UsersView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/users/create',
    name: 'CreateUser',
    component: () => import('../views/securite/UserFormView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/users/:id/edit',
    name: 'EditUser',
    component: () => import('../views/securite/UserFormView.vue'),
    meta: { requiresAuth: true }
  },
  // Roles routes
  {
    path: '/roles',
    name: 'Roles',
    component: () => import('../views/securite/RolesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/roles/create',
    name: 'CreateRole',
    component: () => import('../views/securite/RoleFormView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/roles/:id/edit',
    name: 'EditRole',
    component: () => import('../views/securite/RoleFormView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/roles/:id/rights',
    name: 'RoleRights',
    component: () => import('../views/securite/RoleRightsView.vue'),
    meta: { requiresAuth: true }
  },
  // Rights routes
  {
    path: '/rights',
    name: 'Rights',
    component: () => import('../views/securite/RightsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/rights/create',
    name: 'CreateRight',
    component: () => import('../views/securite/RightFormView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/rights/:id/edit',
    name: 'EditRight',
    component: () => import('../views/securite/RightFormView.vue'),
    meta: { requiresAuth: true }
  },
  // Sectors routes
  {
    path: '/sectors',
    name: 'Sectors',
    component: () => import('../views/parametrage/sector/SectorsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/sectors/create',
    name: 'CreateSector',
    component: () => import('../views/parametrage/sector/SectorFormView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/sectors/:id/edit',
    name: 'EditSector',
    component: () => import('../views/parametrage/sector/SectorFormView.vue'),
    meta: { requiresAuth: true }
  },
  // Employees routes
  {
    path: '/employees',
    name: 'Employees',
    component: () => import('../views/parametrage/EmployeesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/employees/create',
    name: 'CreateEmployee',
    component: () => import('../views/parametrage/Employee/EmployeeFormView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/employees/:id/edit',
    name: 'EditEmployee',
    component: () => import('../views/parametrage/Employee/EmployeeFormView.vue'),
    meta: { requiresAuth: true }
  },
  // Client Contacts routes
  {
    path: '/contacts',
    name: 'ClientContacts',
    component: () => import('../views/parametrage/ClientContact/ClientContactsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/contacts/create',
    name: 'CreateContact',
    component: () => import('../views/parametrage/ClientContact/ClientContactFormView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/contacts/:id/edit',
    name: 'EditContact',
    component: () => import('../views/parametrage/ClientContact/ClientContactFormView.vue'),
    meta: { requiresAuth: true }
  },
  // Functions routes
  {
    path: '/functions',
    name: 'Functions',
    component: () => import('../views/parametrage/Function/FunctionsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/functions/create',
    name: 'CreateFunction',
    component: () => import('../views/parametrage/Function/FunctionFormView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/functions/:id/edit',
    name: 'EditFunction',
    component: () => import('../views/parametrage/Function/FunctionFormView.vue'),
    meta: { requiresAuth: true }
  },
  // Metiers routes
  {
    path: '/metiers',
    name: 'Metiers',
    component: () => import('../views/parametrage/MetiersView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/metiers/create',
    name: 'CreateMetier',
    component: () => import('../views/parametrage/MetierFormView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/metiers/:id/edit',
    name: 'EditMetier',
    component: () => import('../views/parametrage/MetierFormView.vue'),
    meta: { requiresAuth: true }
  },
  // Projects routes
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/parametrage/project/ProjectsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/projects/create',
    name: 'CreateProject',
    component: () => import('../views/parametrage/project/ProjectFormView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/projects/:id/edit',
    name: 'EditProject',
    component: () => import('../views/parametrage/project/ProjectFormView.vue'),
    meta: { requiresAuth: true }
  },
  // Organisms routes
  {
    path: '/organisms',
    name: 'Organisms',
    component: () => import('../views/parametrage/organisme/OrganismsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/organisms/create',
    name: 'CreateOrganism',
    component: () => import('../views/parametrage/organisme/OrganismFormView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/organisms/:id/edit',
    name: 'EditOrganism',
    component: () => import('../views/parametrage/organisme/OrganismFormView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Get token from localStorage (source of truth)
  const tokenInStorage = localStorage.getItem('token')
  
  // Safety check: sync localStorage with store if store is empty
  if (tokenInStorage && !authStore.token) {
    console.warn('[Router Guard] ⚠️ RECOVERING: Token found in storage, syncing to auth store')
    authStore.token = tokenInStorage
    const userInStorage = localStorage.getItem('user')
    if (userInStorage) {
      try {
        authStore.user = JSON.parse(userInStorage)
      } catch (e) {
        console.error('[Router Guard] Failed to parse user from storage')
      }
    }
  }
  
  // Use localStorage as the source of truth (more reliable during logout)
  const hasValidToken = !!tokenInStorage
  const requiresAuth = to.meta.requiresAuth
  
  console.log('[Router Guard]', {
    to: to.path,
    from: from.path,
    hasValidToken,
    requiresAuth,
    tokenInStore: !!authStore.token,
    tokenInStorage: !!tokenInStorage
  })
  
  // Route requires auth but user is not authenticated
  if (requiresAuth && !hasValidToken) {
    console.warn('[Router Guard] ❌ Route requires auth but not authenticated, redirecting to login')
    next('/login')
  }
  // User trying to access login page while authenticated
  else if (to.path === '/login' && hasValidToken) {
    console.log('[Router Guard] ℹ️ User already authenticated, redirecting to dashboard')
    next('/dashboard')
  }
  // Allow login page access for unauthenticated users, and normal navigation for authenticated
  else {
    console.log('[Router Guard] ✅ Allowing navigation to', to.path)
    next()
  }
})

export default router
