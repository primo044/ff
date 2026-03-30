<template>
  <div class="dashboard">
    <!-- Search bar -->
    <div class="search-bar">
      <div class="search-bar__wrapper">
        <svg class="search-bar__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          class="search-bar__input"
          placeholder="Search clients, contracts, projects, users..."
          @keyup.enter="handleSearch"
        />
        <button v-if="searchQuery" @click="clearSearch" class="search-bar__clear">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Module cards grid -->
    <div class="modules-grid">
      <router-link
        v-for="(mod, i) in filteredModules"
        :key="mod.path"
        :to="mod.path"
        class="module-card"
        :style="{ '--delay': `${i * 0.07}s`, '--accent': mod.color }"
      >
        <div class="module-card__bg"></div>
        <div class="module-card__icon" v-html="mod.icon"></div>
        <div class="module-card__body">
          <h3 class="module-card__title">{{ mod.title }}</h3>
          <p class="module-card__desc">{{ mod.desc }}</p>
        </div>
        <div class="module-card__arrow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
        <div class="module-card__glow"></div>
      </router-link>
    </div>

    <!-- No results message -->
    <div v-if="searchQuery && filteredModules.length === 0" class="no-results">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      <h3>No modules found</h3>
      <p>Try searching for "clients", "contracts", "users", or "projects"</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useI18n } from 'vue-i18n'

const authStore = useAuthStore()
const { t } = useI18n()
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value)
  }
}

const clearSearch = () => {
  searchQuery.value = ''
}

const modules = [
  {
    path: '/clients',
    title: t('modules.clients.title'),
    desc: t('modules.clients.desc'),
    color: '#00d4f5',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/>
      <path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>`
  },
  {
    path: '/contacts',
    title: t('modules.contacts.title'),
    desc: t('modules.contacts.desc'),
    color: '#ec4899',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
    </svg>`
  },
  {
    path: '/contracts',
    title: t('modules.contracts.title'),
    desc: t('modules.contracts.desc'),
    color: '#f59e0b',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="12" y1="11" x2="12" y2="17"/>
      <line x1="9" y1="14" x2="15" y2="14"/>
    </svg>`
  },
  {
    path: '/contract-followups',
    title: t('modules.followups.title'),
    desc: t('modules.followups.desc'),
    color: '#06b6d4',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="1"/>
      <circle cx="19" cy="12" r="1"/>
      <circle cx="5" cy="12" r="1"/>
      <path d="M3 6l3-3m15 0l3 3m-3 12l3 3m-15 0l3-3"/>
    </svg>`
  },
  {
    path: '/contract-types',
    title: t('modules.contractTypes.title'),
    desc: t('modules.contractTypes.desc'),
    color: '#8b5cf6',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="4" width="18" height="16" rx="2"/>
      <path d="M9 9h6M9 13h6M9 17h4"/>
    </svg>`
  },
  {
    path: '/client-projects',
    title: t('modules.clientProjects.title'),
    desc: t('modules.clientProjects.desc'),
    color: '#8b5cf6',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>`
  },
  {
    path: '/users',
    title: t('modules.users.title'),
    desc: t('modules.users.desc'),
    color: '#a78bfa',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>`
  },
  {
    path: '/roles',
    title: t('modules.roles.title'),
    desc: t('modules.roles.desc'),
    color: '#f59e0b',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>`
  },
  {
    path: '/rights',
    title: t('modules.rights.title'),
    desc: t('modules.rights.desc'),
    color: '#f25472',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>`
  },
  {
    path: '/sectors',
    title: t('modules.sectors.title'),
    desc: t('modules.sectors.desc'),
    color: '#10b981',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    </svg>`
  },
  {
    path: '/employees',
    title: t('modules.employees.title'),
    desc: t('modules.employees.desc'),
    color: '#3b82f6',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <line x1="19" y1="8" x2="19" y2="14"/>
      <line x1="22" y1="11" x2="16" y2="11"/>
    </svg>`
  },
  {
    path: '/functions',
    title: t('modules.functions.title'),
    desc: t('modules.functions.desc'),
    color: '#06b6d4',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"/>
      <polyline points="12 12 20 7.5"/>
      <polyline points="12 12 12 21"/>
      <polyline points="12 12 4 7.5"/>
    </svg>`
  },
  {
    path: '/metiers',
    title: t('modules.metiers.title'),
    desc: t('modules.metiers.desc'),
    color: '#f97316',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M6 9h12M6 9l1.5-4.5h9l1.5 4.5M6 9v8a2 2 0 002 2h8a2 2 0 002-2V9"/>
      <circle cx="8" cy="15" r="1"/><circle cx="16" cy="15" r="1"/>
    </svg>`
  },
  {
    path: '/projects',
    title: t('modules.projects.title'),
    desc: t('modules.projects.desc'),
    color: '#14b8a6',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18M9 3v18"/>
    </svg>`
  },
  {
    path: '/organisms',
    title: t('modules.organizations.title'),
    desc: t('modules.organizations.desc'),
    color: '#6366f1',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
    </svg>`
  },
]

// Filter modules based on search query
const filteredModules = computed(() => {
  if (!searchQuery.value.trim()) {
    return modules
  }
  
  const query = searchQuery.value.toLowerCase().trim()
  return modules.filter(mod => 
    mod.title.toLowerCase().includes(query) ||
    mod.desc.toLowerCase().includes(query)
  )
})


</script>

<style scoped>
.dashboard { display: flex; flex-direction: column; gap: 2rem; }

/* ─── SEARCH BAR ────────────────────────────────────────── */
.search-bar {
  position: relative;
  animation: cardReveal 0.5s ease both;
}

.search-bar__wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1.5rem;
  background: linear-gradient(135deg, rgba(0, 212, 245, 0.06) 0%, rgba(124, 92, 191, 0.08) 100%);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all 0.3s ease;
}

.search-bar__wrapper:focus-within {
  border-color: var(--cyan);
  box-shadow: 0 0 20px rgba(0, 212, 245, 0.2), 0 0 0 1px var(--cyan);
  background: var(--cyan-dim);
}

.search-bar__icon {
  color: var(--text-muted);
  flex-shrink: 0;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.search-bar__wrapper:focus-within .search-bar__icon {
  color: var(--cyan);
  opacity: 1;
}

.search-bar__input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: var(--font-display);
  font-size: 0.95rem;
  color: var(--text-primary);
  placeholder-color: var(--text-muted);
  padding: 0.25rem 0;
}

.search-bar__input::placeholder {
  color: var(--text-muted);
  opacity: 0.7;
}

.search-bar__clear {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  padding: 0.25rem;
  transition: all 0.2s;
  flex-shrink: 0;
}

.search-bar__clear:hover {
  color: var(--cyan);
  transform: rotate(90deg);
}

/* ─── NO RESULTS MESSAGE ────────────────────────────────── */
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, rgba(0, 212, 245, 0.05) 0%, rgba(124, 92, 191, 0.05) 100%);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  border-radius: var(--radius-xl);
  color: var(--text-muted);
  animation: cardReveal 0.3s ease both;
}

.no-results svg {
  color: var(--cyan);
  opacity: 0.4;
  width: 56px;
  height: 56px;
}

.no-results h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  font-family: var(--font-display);
}

.no-results p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
  text-align: center;
}

/* ─── MODULES GRID ──────────────────────────────────────── */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.module-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  animation: cardReveal 0.5s ease both;
  animation-delay: var(--delay);
  backdrop-filter: blur(20px);
  cursor: pointer;
}

.module-card__bg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at top left, color-mix(in srgb, var(--accent) 8%, transparent), transparent 60%);
  opacity: 0;
  transition: opacity 0.35s;
}

.module-card:hover {
  border-color: var(--accent);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--accent), 0 0 20px color-mix(in srgb, var(--accent) 20%, transparent);
}

.module-card:hover .module-card__bg { opacity: 1; }
.module-card:hover .module-card__arrow { transform: translateX(4px); opacity: 1; color: var(--accent); }
.module-card:hover .module-card__glow { opacity: 1; }

/* Top line that slides in on hover */
.module-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 0; height: 2px;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
  transition: width 0.35s ease;
  border-radius: 2px;
}
.module-card:hover::before { width: 100%; }

.module-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px; height: 56px;
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
  color: var(--accent);
  flex-shrink: 0;
  transition: all 0.3s;
  position: relative;
  z-index: 1;
}

.module-card:hover .module-card__icon {
  box-shadow: 0 0 20px color-mix(in srgb, var(--accent) 30%, transparent);
}

.module-card__body {
  flex: 1;
  position: relative;
  z-index: 1;
}

.module-card__title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
  transition: color 0.2s;
}
.module-card:hover .module-card__title { color: var(--accent); }

.module-card__desc {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.module-card__arrow {
  color: var(--text-muted);
  opacity: 0.4;
  transition: all 0.3s;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.module-card__glow {
  position: absolute;
  bottom: -30px; right: -30px;
  width: 100px; height: 100px;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent) 15%, transparent), transparent 70%);
  opacity: 0;
  transition: opacity 0.35s;
  pointer-events: none;
}

/* ─── INFO SECTION ──────────────────────────────────────── */
.info-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.9rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 100px;
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #34d399;
}
.info-badge__dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 6px #34d399;
  animation: pulse-green 2s ease infinite;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.25rem 1.5rem;
  background: var(--bg-deep);
  transition: background 0.2s;
}
.info-item:hover { background: var(--bg-glass-hover); }

.info-item__label {
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.info-item__value {
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--cyan);
}

/* ─── RESPONSIVE ────────────────────────────────────────── */
@media (max-width: 1024px) {
  .modules-grid { grid-template-columns: repeat(2, 1fr); }
  .info-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .search-bar__wrapper {
    padding: 0.75rem 1.25rem;
  }
  .search-bar__input {
    font-size: 0.9rem;
  }
}

@media (max-width: 640px) {
  .modules-grid { grid-template-columns: 1fr; }
  .info-grid { grid-template-columns: 1fr; }
  .search-bar__wrapper {
    padding: 0.65rem 1rem;
  }
  .search-bar__input {
    font-size: 0.85rem;
  }
}
</style>