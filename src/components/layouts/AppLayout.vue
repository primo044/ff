<template>
  <div class="app-layout">

    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'sidebar--collapsed': sidebarCollapsed }">

      <!-- Logo -->
      <div class="sidebar-logo">
        <transition name="fade">
          <div v-if="!sidebarCollapsed" class="logo-text">
            <div class="logo-name"><span class="logo-erp">ERP</span><span class="logo-kay">KAY</span></div>
            <div class="logo-sub">Enterprise Resource Planning System</div>
          </div>
        </transition>
        <button
          class="sidebar-toggle"
          @click="sidebarCollapsed = !sidebarCollapsed"
          title="Toggle sidebar"
        >
          <svg
            width="15" height="15" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2.5"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      </div>

      <!-- Search Bar -->
      <transition name="fade">
        <div v-if="!sidebarCollapsed" class="sidebar-search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="search-icon">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="search-input"
            @keydown.escape="searchQuery = ''"
          />
          <button v-if="searchQuery" class="search-clear" @click="searchQuery = ''">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </transition>

      <!-- Navigation Menu -->
      <nav class="sidebar-nav">

        <!-- MAIN Section -->
        <div class="nav-section">
          <div v-if="!sidebarCollapsed" class="nav-section-label">MAIN</div>

          <!-- Dashboard -->
          <div class="nav-tooltip-wrap" @mouseenter="collapsed_tooltip = 'dashboard'" @mouseleave="collapsed_tooltip = null">
            <router-link to="/dashboard" class="nav-item" :class="{ 'nav-item--active': isActive('/dashboard') }">
              <span class="active-bar"></span>
              <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span v-if="!sidebarCollapsed" class="nav-label">Dashboard</span>
            </router-link>
            <div v-if="sidebarCollapsed && collapsed_tooltip === 'dashboard'" class="nav-tooltip">Dashboard</div>
          </div>
        </div>

        <!-- Dashboard -->
        <!-- <div class="nav-tooltip-wrap" @mouseenter="collapsed_tooltip = 'dashboard'" @mouseleave="collapsed_tooltip = null">
          <router-link to="/dashboard" class="nav-item" :class="{ 'nav-item--active': isActive('/dashboard') }">
            <span class="active-bar"></span>
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span v-if="!sidebarCollapsed" class="nav-label">Dashboard</span>
          </router-link>
          <div v-if="sidebarCollapsed && collapsed_tooltip === 'dashboard'" class="nav-tooltip">Dashboard</div>
        </div> -->

        <!-- Statistics Section -->
        <div class="nav-section" v-show="!searchQuery || filteredStatistics.length">
          <button
            v-if="!sidebarCollapsed"
            @click="expandedSections.statistics = !expandedSections.statistics"
            class="nav-section-header"
            :class="{ 'nav-section-header--expanded': expandedSections.statistics }"
          >
            <span class="nav-section-title">{{ $t('nav.statistics') }}</span>
            <svg class="toggle-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div v-else class="nav-section-divider"></div>
          <transition name="section-expand">
            <div v-if="expandedSections.statistics || sidebarCollapsed" class="nav-section-items">
              <div v-for="item in filteredStatistics" :key="item.to" class="nav-tooltip-wrap" @mouseenter="collapsed_tooltip = item.to" @mouseleave="collapsed_tooltip = null">
                <router-link :to="item.to" class="nav-item" :class="{ 'nav-item--active': isActive(item.to) }">
                  <span class="active-bar"></span>
                  <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" v-html="item.iconPaths"></svg>
                  <span v-if="!sidebarCollapsed" class="nav-label">{{ item.label }}</span>
                </router-link>
                <div v-if="sidebarCollapsed && collapsed_tooltip === item.to" class="nav-tooltip">{{ item.label }}</div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Parametrage Section -->
        <div class="nav-section" v-show="!searchQuery || filteredParametrage.length">
          <button
            v-if="!sidebarCollapsed"
            @click="expandedSections.parametrage = !expandedSections.parametrage"
            class="nav-section-header"
            :class="{ 'nav-section-header--expanded': expandedSections.parametrage }"
          >
            <span class="nav-section-title">{{ $t('nav.parametrage') }}</span>
            <svg class="toggle-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div v-else class="nav-section-divider"></div>
          <transition name="section-expand">
            <div v-if="expandedSections.parametrage || sidebarCollapsed" class="nav-section-items">
              <div v-for="item in filteredParametrage" :key="item.to" class="nav-tooltip-wrap" @mouseenter="collapsed_tooltip = item.to" @mouseleave="collapsed_tooltip = null">
                <router-link :to="item.to" class="nav-item" :class="{ 'nav-item--active': isActive(item.to) }">
                  <span class="active-bar"></span>
                  <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" v-html="item.iconPaths"></svg>
                  <span v-if="!sidebarCollapsed" class="nav-label">{{ item.label }}</span>
                </router-link>
                <div v-if="sidebarCollapsed && collapsed_tooltip === item.to" class="nav-tooltip">{{ item.label }}</div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Security Section -->
        <div class="nav-section" v-show="!searchQuery || filteredSecurity.length">
          <button
            v-if="!sidebarCollapsed"
            @click="expandedSections.security = !expandedSections.security"
            class="nav-section-header"
            :class="{ 'nav-section-header--expanded': expandedSections.security }"
          >
            <span class="nav-section-title">{{ $t('nav.security') }}</span>
            <svg class="toggle-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div v-else class="nav-section-divider"></div>
          <transition name="section-expand">
            <div v-if="expandedSections.security || sidebarCollapsed" class="nav-section-items">
              <div v-for="item in filteredSecurity" :key="item.to" class="nav-tooltip-wrap" @mouseenter="collapsed_tooltip = item.to" @mouseleave="collapsed_tooltip = null">
                <router-link :to="item.to" class="nav-item" :class="{ 'nav-item--active': isActive(item.to) }">
                  <span class="active-bar"></span>
                  <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" v-html="item.iconPaths"></svg>
                  <span v-if="!sidebarCollapsed" class="nav-label">{{ item.label }}</span>
                </router-link>
                <div v-if="sidebarCollapsed && collapsed_tooltip === item.to" class="nav-tooltip">{{ item.label }}</div>
              </div>
            </div>
          </transition>
        </div>

        <!-- No results -->
        <div v-if="searchQuery && !filteredParametrage.length && !filteredSecurity.length && !filteredStatistics.length" class="search-empty">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span>No results for "{{ searchQuery }}"</span>
        </div>

      </nav>

      <!-- User Profile Card -->
      <div class="sidebar-profile" :class="{ 'sidebar-profile--collapsed': sidebarCollapsed }">
        <div class="profile-avatar">
          <span class="profile-initials">{{ userInitials }}</span>
          <span class="profile-status"></span>
        </div>
        <transition name="fade">
          <div v-if="!sidebarCollapsed" class="profile-info">
            <div class="profile-name">{{ userName }}</div>
            <div class="profile-role">{{ userRole }}</div>
          </div>
        </transition>
        <transition name="fade">
          <button v-if="!sidebarCollapsed" class="profile-logout" @click="handleLogout" :title="$t('auth.logout')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 8 20 12 16 16"></polyline>
              <line x1="12" y1="12" x2="20" y2="12"></line>
            </svg>
          </button>
        </transition>
      </div>

    </aside>

    <!-- Main Content -->
    <main class="main-content">

      <!-- Breadcrumb Header -->
      <header class="page-header">
        <nav class="breadcrumb" aria-label="breadcrumb">
          <router-link to="/dashboard" class="breadcrumb-home">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
          </router-link>
          <template v-for="(crumb, i) in breadcrumbs" :key="crumb.path">
            <svg class="breadcrumb-sep" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
            <router-link v-if="i < breadcrumbs.length - 1" :to="crumb.path" class="breadcrumb-item">{{ crumb.label }}</router-link>
            <span v-else class="breadcrumb-item breadcrumb-item--current">{{ crumb.label }}</span>
          </template>
        </nav>
        
        <!-- Theme Toggle -->
        <ThemeToggle />
      </header>

      <slot/>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import ThemeToggle from '@/components/ThemeToggle.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { t } = useI18n()

const sidebarCollapsed = ref(false)
const searchQuery = ref('')
const collapsed_tooltip = ref(null)
const expandedSections = ref({ parametrage: true, security: true, statistics: false })

const applyTheme = (t) => {
  document.documentElement.setAttribute('data-theme', t)
}

const userName     = computed(() => authStore.user?.name || 'Admin User')
const userRole     = computed(() => authStore.user?.role || 'Administrator')
const userInitials = computed(() =>
  userName.value.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
)

const parametrageItems = computed(() => [
  { to: '/clients',            label: t('modules.clients.title'),   iconPaths: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>` },
  { to: '/contacts',           label: t('modules.contacts.title'),  iconPaths: `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>` },
  { to: '/contracts',          label: t('modules.contracts.title'), iconPaths: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="11" x2="12" y2="17"></line><polyline points="9 14 12 11 15 14"></polyline>` },
  { to: '/client-projects',    label: t('modules.projects.title'),  iconPaths: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>` },
  { to: '/contract-followups', label: t('modules.followups.title'), iconPaths: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>` },
  { to: '/employees',          label: t('nav.employees'),           iconPaths: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>` },
  { to: '/functions',          label: t('modules.functions.title'), iconPaths: `<path d="M6 9l6-7 6 7v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V9m0 0h12m-6 0V4m0 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"></path>` },
  { to: '/sectors',            label: t('modules.sectors.title'),   iconPaths: `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>` },
])

const securityItems = computed(() => [
  { to: '/users',  label: t('modules.users.title'),  iconPaths: `<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="10" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>` },
  { to: '/roles',  label: t('modules.roles.title'),  iconPaths: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>` },
  { to: '/rights', label: t('modules.rights.title'), iconPaths: `<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>` },
])

const statisticsItems = computed(() => [
  { to: '/statistics/clients',   label: t('dashboard.clientStatus'),     iconPaths: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>` },
  { to: '/statistics/employees', label: t('dashboard.employeeBySector'), iconPaths: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>` },
  { to: '/statistics/projects',  label: t('dashboard.projectStatus'),    iconPaths: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>` },
  { to: '/statistics/contracts', label: t('dashboard.contractStatus'),   iconPaths: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="11" x2="12" y2="17"></line><polyline points="9 14 12 11 15 14"></polyline>` },
  { to: '/statistics/users',     label: t('dashboard.userByRole'),       iconPaths: `<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="10" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>` },
])

const filteredParametrage = computed(() => {
  if (!searchQuery.value) return parametrageItems.value
  return parametrageItems.value.filter(i => i.label.toLowerCase().includes(searchQuery.value.toLowerCase()))
})
const filteredSecurity = computed(() => {
  if (!searchQuery.value) return securityItems.value
  return securityItems.value.filter(i => i.label.toLowerCase().includes(searchQuery.value.toLowerCase()))
})
const filteredStatistics = computed(() => {
  if (!searchQuery.value) return statisticsItems.value
  return statisticsItems.value.filter(i => i.label.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

const routeLabels = {
  dashboard: 'Dashboard', clients: 'Clients', contacts: 'Contacts',
  contracts: 'Contracts', 'client-projects': 'Projects',
  'contract-followups': 'Follow-ups', employees: 'Employees',
  sectors: 'Sectors', users: 'Users', roles: 'Roles', rights: 'Rights',
  statistics: 'Statistics', projects: 'Projects Statistics',
}
const breadcrumbs = computed(() =>
  route.path.split('/').filter(Boolean).map((seg, i, arr) => ({
    path: '/' + arr.slice(0, i + 1).join('/'),
    label: routeLabels[seg] || seg.charAt(0).toUpperCase() + seg.slice(1),
  }))
)

const isActive = (path) => route.path.startsWith(path)

const handleLogout = async () => {
  try {
    await authStore.logout()
    await new Promise(resolve => setTimeout(resolve, 100))
    await router.push('/login')
  } catch (error) {
    await router.push('/login')
  }
}

const onKeydown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
    e.preventDefault()
    sidebarCollapsed.value = !sidebarCollapsed.value
  }
}

onMounted(() => {
  document.documentElement.setAttribute('data-theme', 'dark')
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
/* ─── LAYOUT ──────────────────────────────────────────── */
.app-layout {
  position: relative;
  display: flex;
  min-height: 100vh;
  overflow: hidden;
}

/* ─── SIDEBAR — transparent, rides the global bg ─────── */
.sidebar {
  position: relative;
  width: 280px;
  min-width: 280px;
  /* TRANSPARENT — the global body bg shows through */
  background: transparent;
  border-right: 1px solid rgba(0, 212, 245, 0.12);
  display: flex;
  flex-direction: column;
  transition:
    width     0.28s cubic-bezier(0.4, 0, 0.2, 1),
    min-width 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  z-index: 100;
  flex-shrink: 0;
}
.sidebar--collapsed { width: 72px; min-width: 72px; }

/* ─── LOGO ────────────────────────────────────────────── */
.sidebar-logo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 14px;
  border-bottom: 1px solid rgba(0, 212, 245, 0.12);
  min-height: 64px;
  flex-shrink: 0;
  gap: 8px;
}
.sidebar--collapsed .sidebar-logo {
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  padding: 14px 0;
}
.logo-text { display: flex; flex-direction: column; gap: 2px; overflow: hidden; }
.logo-name { font-size: 18px; font-weight: 700; color: var(--text-primary); white-space: nowrap; letter-spacing: 0.2px; }
.logo-erp { color: var(--text-primary); }
.logo-kay { color: #00d4f5; margin-left: 2px; }
.logo-accent { color: #00d4f5; }
.logo-sub { font-size: 11px; color: var(--text-tertiary); text-transform: none; letter-spacing: 0.3px; white-space: nowrap; line-height: 1.2; font-weight: 400; }

/* ─── TOGGLE ──────────────────────────────────────────── */
.sidebar-toggle {
  width: 28px; height: 28px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 212, 245, 0.2);
  border-radius: 7px; color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.sidebar-toggle:hover { background: rgba(0, 212, 245, 0.1); color: #00d4f5; border-color: #00d4f5; }

/* ─── SEARCH ──────────────────────────────────────────── */
.sidebar-search {
  display: flex; align-items: center; gap: 8px;
  margin: 10px 10px 4px;
  padding: 7px 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(0, 212, 245, 0.15);
  border-radius: 8px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.sidebar-search:focus-within {
  border-color: #00d4f5;
  box-shadow: 0 0 0 3px rgba(0, 212, 245, 0.12);
}
.search-icon { color: var(--text-tertiary); flex-shrink: 0; }
.search-input {
  flex: 1; border: none; background: transparent;
  font-size: 13px; color: var(--text-primary); outline: none; min-width: 0;
}
.search-input::placeholder { color: var(--text-tertiary); }
.search-clear {
  display: flex; align-items: center; justify-content: center;
  background: none; border: none; color: var(--text-tertiary);
  cursor: pointer; padding: 2px; border-radius: 4px; transition: color 0.15s;
}
.search-clear:hover { color: var(--text-primary); }
.search-empty {
  display: flex; flex-direction: column; align-items: center;
  gap: 8px; padding: 28px 16px;
  color: var(--text-tertiary); font-size: 13px; opacity: 0.7;
}

/* ─── NAVIGATION ──────────────────────────────────────── */
.sidebar-nav {
  flex: 1; padding: 8px;
  display: flex; flex-direction: column; gap: 2px;
  overflow-y: auto; overflow-x: hidden;
}
.sidebar-nav::-webkit-scrollbar { width: 4px; }
.sidebar-nav::-webkit-scrollbar-track { background: transparent; }
.sidebar-nav::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 4px; }

/* ─── SECTION LABEL ───────────────────────────────────── */
.nav-section-label {
  padding: 12px 16px 8px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text-secondary);
  font-family: var(--font-syne);
}

/* ─── SECTION ─────────────────────────────────────────── */
.nav-section { display: flex; flex-direction: column; margin-top: 6px; }
.nav-section-divider { height: 1px; background: rgba(0, 212, 245, 0.12); margin: 8px 10px; opacity: 0.5; }
.nav-section-header {
  display: flex; align-items: center; justify-content: space-between;
  gap: 6px; padding: 6px 10px;
  background: none; border: none;
  color: var(--text-tertiary); cursor: pointer; width: 100%;
  font-size: 10.5px; text-transform: uppercase;
  letter-spacing: 0.7px; font-weight: 700;
  border-radius: 6px; transition: color 0.2s, background 0.2s;
}
.nav-section-header:hover { color: var(--text-primary); background: rgba(255,255,255,0.05); }
.toggle-icon { transition: transform 0.22s ease; flex-shrink: 0; }
.nav-section-header--expanded .toggle-icon { transform: rotate(180deg); }
.nav-section-items { display: flex; flex-direction: column; gap: 1px; }

/* ─── TOOLTIP ─────────────────────────────────────────── */
.nav-tooltip-wrap { position: relative; display: block; }
.nav-tooltip {
  position: absolute; left: calc(100% + 10px); top: 50%;
  transform: translateY(-50%);
  background: var(--text-primary); color: var(--bg-secondary);
  padding: 5px 10px; border-radius: 7px;
  font-size: 12.5px; font-weight: 500;
  white-space: nowrap; pointer-events: none;
  z-index: 9999; box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  animation: tooltipIn 0.14s ease;
}
.nav-tooltip::before {
  content: ''; position: absolute; right: 100%; top: 50%;
  transform: translateY(-50%);
  border: 5px solid transparent; border-right-color: var(--text-primary);
}
@keyframes tooltipIn {
  from { opacity: 0; transform: translateY(-50%) translateX(-5px); }
  to   { opacity: 1; transform: translateY(-50%) translateX(0); }
}

/* ─── NAV ITEM ────────────────────────────────────────── */
.nav-item {
  position: relative;
  display: flex; align-items: center; gap: 10px;
  padding: 9px 10px;
  color: var(--text-secondary); text-decoration: none;
  border-radius: 7px;
  transition: background 0.18s, color 0.18s;
  cursor: pointer; white-space: nowrap;
  min-height: 38px; overflow: hidden;
}
.sidebar--collapsed .nav-item { justify-content: center; padding: 9px; }
.nav-item:hover { background: rgba(255,255,255,0.07); color: var(--text-primary); }
.nav-item--active { 
  background-color: rgba(0, 212, 245, 0.12) !important;
  color: #00d4f5 !important;
  font-weight: 500;
}
.nav-item--active .nav-icon { color: #00d4f5; }
.nav-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background-color: #f25472;
  color: white;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  margin-left: auto;
}
.active-bar {
  position: absolute; left: 0; top: 50%;
  transform: translateY(-50%) scaleY(0);
  width: 3px; height: 60%;
  background: #00d4f5; border-radius: 0 3px 3px 0;
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.nav-item--active .active-bar { transform: translateY(-50%) scaleY(1); }
.nav-icon { width: 18px; height: 18px; flex-shrink: 0; color: currentColor; }
.nav-label { font-size: 13.5px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }

/* ─── USER PROFILE & MESSAGES ─────────────────────────── */
.sidebar-messages {
  padding: 12px;
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
}

.messages-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.messages-header svg {
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.2s;
}

.messages-header svg:hover {
  color: #00d4f5;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 13px;
  color: var(--text-primary);
}

.message-item:hover {
  background-color: rgba(0, 212, 245, 0.08);
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 11px;
  color: white;
  flex-shrink: 0;
}

.message-avatar.eg {
  background: linear-gradient(135deg, #ff9a56 0%, #f5a623 100%);
}

.message-avatar.es {
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
}

.message-avatar.aa {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.message-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ─── USER PROFILE ────────────────────────────────────── */
.sidebar-profile {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 12px 14px;
  border-top: 1px solid rgba(0, 212, 245, 0.12);
  flex-shrink: 0;
}
.sidebar-profile--collapsed { justify-content: center; }
.profile-avatar {
  position: relative; width: 34px; height: 34px; border-radius: 50%;
  background: linear-gradient(135deg, #00d4f5, #0099cc);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.profile-initials { font-size: 12px; font-weight: 700; color: white; letter-spacing: 0.5px; }
.profile-status {
  position: absolute; bottom: 1px; right: 1px;
  width: 9px; height: 9px; border-radius: 50%;
  background: #22c55e; border: 2px solid transparent;
}
.profile-info { flex: 1; overflow: hidden; }
.profile-name { font-size: 13px; font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.profile-role { font-size: 11px; color: var(--text-tertiary); margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.profile-logout {
  width: 30px; height: 30px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: none; border: 1px solid var(--border-color);
  border-radius: 7px; color: var(--text-secondary);
  cursor: pointer; transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.profile-logout:hover { background: #f25472; color: white; border-color: #f25472; }

/* ─── MAIN CONTENT ────────────────────────────────────── */
.main-content {
  flex: 1; display: flex; flex-direction: column;
  overflow: auto; min-width: 0; position: relative; z-index: 1;
}

/* ─── PAGE HEADER ─────────────────────────────────────── */
.page-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 24px;
  background: transparent;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0; min-height: 50px;
  position: relative; z-index: 10;
}
.breadcrumb { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
.breadcrumb-sep { color: var(--text-tertiary); flex-shrink: 0; }
.breadcrumb-home {
  display: flex; align-items: center;
  color: var(--text-tertiary); text-decoration: none;
  padding: 4px; border-radius: 5px; transition: color 0.15s, background 0.15s;
}
.breadcrumb-home:hover { color: #00d4f5; background: rgba(0, 212, 245, 0.08); }
.breadcrumb-item {
  font-size: 13px; color: var(--text-secondary);
  text-decoration: none; padding: 3px 5px;
  border-radius: 5px; transition: color 0.15s, background 0.15s;
}
.breadcrumb-item:hover { color: #00d4f5; background: rgba(0, 212, 245, 0.08); }
.breadcrumb-item--current { color: var(--text-primary); font-weight: 600; }
a.breadcrumb-item--current { pointer-events: none; }

/* ─── THEME TOGGLE ────────────────────────────────────── */
.theme-toggle {
  display: flex; align-items: center;
  background: var(--bg-glass);
  border: 1px solid var(--border);
  border-radius: 100px; padding: 0.4rem 0.9rem;
  cursor: pointer; backdrop-filter: blur(12px);
  transition: all 0.3s ease; font-family: var(--font-display); margin-left: auto;
}
.theme-toggle:hover { border-color: var(--cyan); box-shadow: 0 0 14px var(--cyan-glow); background: var(--cyan-dim); }
.theme-toggle__icon {
  display: flex; align-items: center; gap: 0.45rem;
  font-size: 0.74rem; font-weight: 700;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--text-secondary);
  animation: iconIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.theme-toggle:hover .theme-toggle__icon { color: var(--cyan); }
@keyframes iconIn {
  from { opacity: 0; transform: scale(0.7) rotate(-15deg); }
  to   { opacity: 1; transform: scale(1) rotate(0deg); }
}

/* ─── TRANSITIONS ─────────────────────────────────────── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.section-expand-enter-active,
.section-expand-leave-active { transition: opacity 0.2s ease, max-height 0.25s ease; overflow: hidden; max-height: 600px; }
.section-expand-enter-from,
.section-expand-leave-to { opacity: 0; max-height: 0; }

/* ─── RESPONSIVE ──────────────────────────────────────── */
@media (max-width: 768px) {
  .sidebar { position: fixed; left: 0; top: 0; height: 100vh; box-shadow: 2px 0 20px rgba(0,0,0,0.12); }
  .main-content { margin-left: 72px; }
  .sidebar:not(.sidebar--collapsed) ~ .main-content { margin-left: 260px; }
}
@media (max-width: 480px) {
  .sidebar:not(.sidebar--collapsed) { position: fixed; width: 260px; min-width: 260px; }
  .main-content { margin-left: 0; }
}
</style>