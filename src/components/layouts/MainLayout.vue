<template>
  <v-layout>
    <!-- Custom Sidebar Navigation -->
    <aside class="sidebar" :class="{ 'sidebar--expanded': drawerOpen }">
      
      <!-- Sidebar Header: Logo & Search -->
      <div class="sidebar__header">
        <!-- Logo -->
        <div class="sidebar__logo" v-if="drawerOpen">
          <div class="logo-text">
            <span class="logo-brand"><span class="logo-erp">ERP</span><span class="logo-kay">KAY</span></span>
            <span class="logo-subtitle">Enterprise Resource Planning System</span>
          </div>
        </div>

        <!-- Search Bar -->
        <div v-if="drawerOpen" class="sidebar__search">
          <v-text-field
            placeholder="Search..."
            prepend-inner-icon="mdi-magnify"
            density="compact"
            rounded="lg"
            class="search-field"
            variant="outlined"
          />
        </div>
      </div>

      <!-- Sidebar Content -->
      <div class="sidebar__content">
        
        <!-- MAIN Section -->
        <div class="sidebar__section">
          <div v-if="drawerOpen" class="sidebar__section-label">MAIN</div>
          <v-list class="sidebar__list">
            <v-list-item
              to="/"
              class="sidebar__item"
              :class="{ 'sidebar__item--active': activeRoute === 'dashboard' }"
              prepend-icon="mdi-view-dashboard"
              title="Dashboard"
              @click="setActive('dashboard')"
            >
              <template #title v-if="!drawerOpen"></template>
            </v-list-item>
            <v-list-item
              class="sidebar__item"
              prepend-icon="mdi-pulse"
              title="Activity"
              @click="setActive('activity')"
            >
              <template #title v-if="!drawerOpen"></template>
            </v-list-item>
            <v-list-item
              class="sidebar__item"
              prepend-icon="mdi-chart-line"
              title="Statistic"
              @click="setActive('statistic')"
            >
              <template #title v-if="!drawerOpen"></template>
            </v-list-item>

            <v-list-item
              class="sidebar__item sidebar__item--badge"
              prepend-icon="mdi-clipboard-check"
              title="Tasks"
              @click="setActive('tasks')"
            >
              <template #append>
                <v-badge content="5" color="error" v-if="drawerOpen"></v-badge>
              </template>
              <template #title v-if="!drawerOpen"></template>
            </v-list-item>
          </v-list>
        </div>

        <!-- PARAMETRAGE Section -->
        <div class="sidebar__section">
          <div v-if="drawerOpen" class="sidebar__section-label">PARAMETRAGE</div>
          <v-list class="sidebar__list">
            <v-list-item
              to="/parametrage/clients"
              class="sidebar__item"
              prepend-icon="mdi-account-multiple"
              title="Clients"
              @click="setActive('clients')"
            >
              <template #title v-if="!drawerOpen"></template>
            </v-list-item>
            <v-list-item
              to="/parametrage/contracts"
              class="sidebar__item"
              prepend-icon="mdi-file-document"
              title="Contracts"
              @click="setActive('contracts')"
            >
              <template #title v-if="!drawerOpen"></template>
            </v-list-item>
            <v-list-item
              to="/parametrage/projects"
              class="sidebar__item"
              prepend-icon="mdi-folder"
              title="Projects"
              @click="setActive('projects')"
            >
              <template #title v-if="!drawerOpen"></template>
            </v-list-item>
            <v-list-item
              class="sidebar__item"
              prepend-icon="mdi-briefcase"
              title="Employees"
              @click="setActive('employees')"
            >
              <template #title v-if="!drawerOpen"></template>
            </v-list-item>
          </v-list>
        </div>

        <!-- SECURITY Section -->
        <div class="sidebar__section">
          <div v-if="drawerOpen" class="sidebar__section-label">SECURITY</div>
          <v-list class="sidebar__list">
            <v-list-item
              to="/securite/users"
              class="sidebar__item"
              prepend-icon="mdi-account"
              title="Users"
              @click="setActive('users')"
            >
              <template #title v-if="!drawerOpen"></template>
            </v-list-item>
            <v-list-item
              to="/securite/roles"
              class="sidebar__item"
              prepend-icon="mdi-shield-account"
              title="Roles"
              @click="setActive('roles')"
            >
              <template #title v-if="!drawerOpen"></template>
            </v-list-item>
            <v-list-item
              to="/securite/rights"
              class="sidebar__item"
              prepend-icon="mdi-lock"
              title="Rights"
              @click="setActive('rights')"
            >
              <template #title v-if="!drawerOpen"></template>
            </v-list-item>
          </v-list>
        </div>
      </div>

      <!-- Sidebar Footer: Recent Messages -->
      <div class="sidebar__footer">
        <div v-if="drawerOpen" class="sidebar__footer-header">
          <span>RECENT MESSAGES</span>
          <v-icon icon="mdi-chevron-down" class="sidebar__footer-toggle"></v-icon>
        </div>
        <div v-if="drawerOpen" class="sidebar__messages">
          <div class="message-item">
            <v-avatar size="40" color="info" class="initials">EG</v-avatar>
            <span>Erik Gunsel</span>
          </div>
          <div class="message-item">
            <v-avatar size="40" color="success" class="initials">ES</v-avatar>
            <span>Emily Smith</span>
          </div>
          <div class="message-item">
            <v-avatar size="40" color="warning" class="initials">AA</v-avatar>
            <span>Arthur Adelk</span>
          </div>
        </div>
      </div>

      <!-- Toggle Button -->
      <button class="sidebar__toggle" @click="toggleDrawer" :title="drawerOpen ? 'Collapse' : 'Expand'">
        <v-icon :icon="drawerOpen ? 'mdi-chevron-left' : 'mdi-chevron-right'" size="24"></v-icon>
      </button>
    </aside>

    <!-- Main Content -->
    <main class="main-wrapper">
      <v-main>
        <v-container fluid class="pa-6">
          <slot />
        </v-container>
      </v-main>
    </main>
  </v-layout>
</template>

<script setup>
import { ref } from 'vue'

const drawerOpen = ref(true)
const activeRoute = ref('dashboard')

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}

const setActive = (route) => {
  activeRoute.value = route
}
</script>

<style scoped>
/* ═════════════════════════════════════════════
   SIDEBAR LAYOUT
═════════════════════════════════════════════ */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 72px;
  background: linear-gradient(135deg, #0a1428 0%, #141d2d 100%);
  border-right: 1px solid rgba(0, 212, 245, 0.1);
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar--expanded {
  width: 280px;
}

/* ═════════════════════════════════════════════
   SIDEBAR HEADER
═════════════════════════════════════════════ */
.sidebar__header {
  padding: 20px 16px;
  border-bottom: 1px solid rgba(0, 212, 245, 0.1);
  flex-shrink: 0;
}

.sidebar__logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.logo-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.logo-brand {
  font-family: var(--font-syne);
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
  letter-spacing: 0.5px;
  display: flex;
  gap: 2px;
}

.logo-erp {
  color: #ffffff;
}

.logo-kay {
  color: #00d4f5;
}

.logo-subtitle {
  font-family: var(--font-dm-sans);
  font-weight: 400;
  font-size: 11px;
  color: #8ba0c4;
  letter-spacing: 0.3px;
  text-transform: none;
  line-height: 1.2;
  white-space: nowrap;
}

/* Search Bar */
.sidebar__search {
  width: 100%;
}

:deep(.search-field) {
  --v-field-stroke: rgba(0, 212, 245, 0.2);
}

:deep(.search-field .v-field__control) {
  background-color: rgba(255, 255, 255, 0.05) !important;
}

:deep(.search-field input) {
  font-size: 13px;
  color: #e8f0fe;
}

:deep(.search-field input::placeholder) {
  color: #8ba0c4 !important;
}

/* ═════════════════════════════════════════════
   SIDEBAR CONTENT
═════════════════════════════════════════════ */
.sidebar__content {
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;
}

.sidebar__content::-webkit-scrollbar {
  width: 6px;
}

.sidebar__content::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar__content::-webkit-scrollbar-thumb {
  background: rgba(0, 212, 245, 0.2);
  border-radius: 3px;
}

.sidebar__content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 212, 245, 0.3);
}

/* Section */
.sidebar__section {
  margin-bottom: 8px;
}

.sidebar__section-label {
  padding: 12px 16px 8px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #8ba0c4;
  font-family: var(--font-syne);
}

.sidebar__list {
  padding: 0;
  background: transparent !important;
}

/* ═════════════════════════════════════════════
   SIDEBAR ITEMS
═════════════════════════════════════════════ */
.sidebar__item {
  position: relative;
  margin: 0 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  --v-list-item-hover-opacity: 1;
  color: #8ba0c4 !important;
  height: 44px;
}

.sidebar__item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background-color: rgba(0, 212, 245, 0.2);
  border-radius: 6px;
  transition: width 0.2s ease;
  pointer-events: none;
}

.sidebar__item:hover {
  background-color: rgba(0, 212, 245, 0.08) !important;
  color: #00d4f5 !important;
}

.sidebar__item:hover::before {
  width: 100%;
}

.sidebar__item--active {
  background-color: rgba(0, 212, 245, 0.12) !important;
  color: #00d4f5 !important;
  font-weight: 500;
}

.sidebar__item--active::before {
  width: 100%;
}

.sidebar__item--active :deep(.v-list-item__prepend) {
  color: #00d4f5;
}

/* ═════════════════════════════════════════════
   SIDEBAR FOOTER
═════════════════════════════════════════════ */
.sidebar__footer {
  padding: 16px;
  border-top: 1px solid rgba(0, 212, 245, 0.1);
  flex-shrink: 0;
}

.sidebar__footer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #8ba0c4;
  margin-bottom: 12px;
}

.sidebar__footer-toggle {
  font-size: 18px;
  color: #8ba0c4;
  cursor: pointer;
  transition: color 0.2s ease;
}

.sidebar__footer-toggle:hover {
  color: #00d4f5;
}

.sidebar__messages {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  cursor: pointer;
  font-size: 13px;
  color: #e8f0fe;
  white-space: nowrap;
}

.message-item:hover {
  background-color: rgba(0, 212, 245, 0.08);
}

.message-item .initials {
  font-weight: 700;
  font-size: 12px;
  flex-shrink: 0;
}

/* ═════════════════════════════════════════════
   SIDEBAR TOGGLE
═════════════════════════════════════════════ */
.sidebar__toggle {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 212, 245, 0.1);
  border: 1px solid rgba(0, 212, 245, 0.2);
  color: #00d4f5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  padding: 0;
  font-size: 0;
}

.sidebar__toggle:hover {
  background-color: rgba(0, 212, 245, 0.2);
  border-color: rgba(0, 212, 245, 0.4);
}

/* ═════════════════════════════════════════════
   MAIN WRAPPER
═════════════════════════════════════════════ */
.main-wrapper {
  flex: 1;
  margin-left: 72px;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar--expanded ~ .main-wrapper {
  margin-left: 280px;
}

/* ═════════════════════════════════════════════
   MOBILE RESPONSIVE
═════════════════════════════════════════════ */
@media (max-width: 768px) {
  .sidebar {
    width: 0;
    visibility: hidden;
  }

  .sidebar--expanded {
    width: 100%;
    visibility: visible;
    z-index: 1000;
  }

  .main-wrapper {
    margin-left: 0;
  }

  .sidebar--expanded ~ .main-wrapper {
    margin-left: 0;
  }
}
</style>
