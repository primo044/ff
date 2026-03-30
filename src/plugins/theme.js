import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

// ─── DARK THEME ──────────────────────────────────────────────
const darkTheme = {
  dark: true,
  colors: {
    primary:    '#00d4f5',
    secondary:  '#7c5cbf',
    accent:     '#f5a623',
    surface:    '#080f1f',
    background: '#020817',
    error:      '#f25472',
    warning:    '#f5a623',
    info:       '#00d4f5',
    success:    '#4CAF50',

    'on-primary':    '#000000',
    'on-secondary':  '#ffffff',
    'on-surface':    '#e8f0fe',
    'on-background': '#e8f0fe',

    // Custom tokens
    'bg-void':         '#020817',
    'bg-deep':         '#080f1f',
    'text-primary':    '#e8f0fe',
    'text-secondary':  '#8ba0c4',
    'text-muted':      '#4a6080',
    'cyan':            '#00d4f5',
    'amber':           '#f5a623',
    'violet':          '#7c5cbf',
    'rose':            '#f25472',
  }
}



// ─── VUETIFY INSTANCE ─────────────────────────────────────────
export const vuetify = createVuetify({
  components,
  directives,

  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi }
  },

  theme: {
    defaultTheme: 'dark',
    themes: {
      dark:  darkTheme
    }
  },

  // Global component defaults — light-mode tuned
  defaults: {
    VCard: {
      elevation: 0,
      class: 'custom-v-card',
      rounded: 'lg',
    },

    VBtn: {
      elevation: 0,
      class: 'custom-v-btn',
      rounded: 'sm',
    },

    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      hideDetails: 'auto',
      rounded: 'sm',
      color: 'primary',
    },

    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
      hideDetails: 'auto',
      rounded: 'sm',
      color: 'primary',
    },

    VAutocomplete: {
      variant: 'outlined',
      density: 'comfortable',
      hideDetails: 'auto',
      rounded: 'sm',
      color: 'primary',
    },

    VTextarea: {
      variant: 'outlined',
      density: 'comfortable',
      hideDetails: 'auto',
      rounded: 'sm',
      color: 'primary',
    },

    VDataTable: {
      class: 'custom-v-table',
      hover: true,
    },

    VDataTableServer: {
      class: 'custom-v-table',
      hover: true,
    },

    VChip: {
      rounded: 'pill',
      size: 'small',
    },

    VAlert: {
      variant: 'tonal',
      rounded: 'md',
    },

    VTooltip: {
      location: 'top',
    },

    VNavigationDrawer: {
      elevation: 0,
    },

    VAppBar: {
      elevation: 0,
      flat: true,
    },

    VListItem: {
      rounded: 'sm',
      density: 'comfortable',
    },

    VDivider: {
      // inherits border-color from theme variables
    },

    VDialog: {
      maxWidth: '520',
    },

    VSnackbar: {
      location: 'bottom right',
      rounded: 'md',
    },

    VProgressLinear: {
      color: 'primary',
      rounded: true,
    },
  }
})