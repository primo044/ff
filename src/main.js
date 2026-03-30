import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Import styles
import './assets/style.css'
import 'vue3-toastify/dist/index.css'

// Import plugins
import {
  vuetify,
  i18n,
  defineAbilitiesFor,
  caslPlugin,
  validationPlugin,
  chartsPlugin,
  prismPlugin
} from './plugins'

import { toastPlugin } from './plugins/toast'
import { useAuthStore } from './stores/auth'

// FontAwesome setup
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import error handler utility
import { setupGlobalErrorHandler } from './utils/errorHandler'

// Web Fonts
import WebFont from 'webfontloader'

// Initialize logging
const isDev = import.meta.env.DEV

// Initialize web fonts
WebFont.load({
  google: {
    families: ['Roboto:300,400,500,700']
  },
  custom: {
    families: ['Material Design Icons'],
    urls: ['https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css']
  }
})

// Setup FontAwesome
library.add(fas, far, fab)

// Factory function to create and mount the app
const createAndMountApp = () => {
  const appElement = document.getElementById('app')
  
  // If app is already mounted, don't try to mount again
  if (!appElement || appElement._vueAppInstance) {
    return appElement?._vueAppInstance
  }

  // Create app instance
  const app = createApp(App)

  // Setup Pinia (state management) - must be before router
  const pinia = createPinia()
  app.use(pinia)

  // Setup Vue Router
  app.use(router)

  // Setup Vuetify (UI Framework)
  app.use(vuetify)

  // Setup Vue i18n (internationalization)
  app.use(i18n)

  // Setup Toast notifications
  app.use(toastPlugin)

  // Setup CASL (authorization)
  const authStore = useAuthStore()
  const ability = defineAbilitiesFor(authStore.user)
  app.use(caslPlugin, ability)

  // Setup FontAwesome component
  app.component('FontAwesomeIcon', FontAwesomeIcon)

  // Setup validation
  app.use(validationPlugin)

  // Setup charts
  app.use(chartsPlugin)

  // Setup Prism (code highlighting)
  app.use(prismPlugin)

  // Setup global error handler with centralized logging and notifications
  setupGlobalErrorHandler(app)

  // Mount the app
  app.mount('#app')
  appElement._vueAppInstance = app

  if (isDev) {
    console.log('✅ App mounted successfully')
    // Import API debugger in development
    import('./utils/apiDebugger').catch(() => {
      console.log('ℹ️  API Debugger not available')
    })
  }

  return app
}

// Create and mount the app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createAndMountApp)
} else {
  createAndMountApp()
}
