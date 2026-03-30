<template>
  <div class="error-boundary">
    <!-- Error State -->
    <div v-if="hasError" class="error-boundary__container">
      <div class="error-boundary__content">
        <div class="error-boundary__icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </div>
        <h2 class="error-boundary__title">Oops! Something Went Wrong</h2>
        <p class="error-boundary__message">{{ message }}</p>
        
        <!-- Error Details (Dev Only) -->
        <details v-if="isDev && error" class="error-boundary__details">
          <summary>View Error Details</summary>
          <pre class="error-boundary__stack">{{ error.stack || error.message }}</pre>
        </details>

        <!-- Actions -->
        <div class="error-boundary__actions">
          <button @click="resetError" class="btn btn-primary">
            Try Again
          </button>
          <router-link to="/dashboard" class="btn btn-secondary">
            Go to Dashboard
          </router-link>
        </div>
      </div>
    </div>

    <!-- Normal Content -->
    <slot v-else />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorBoundary',
  
  props: {
    message: {
      type: String,
      default: 'An unexpected error occurred. Please try again or contact support if the problem persists.'
    }
  },

  data() {
    return {
      hasError: false,
      error: null,
      isDev: import.meta.env.DEV
    }
  },

  watch: {
    '$route'() {
      this.resetError()
    }
  },

  methods: {
    resetError() {
      this.hasError = false
      this.error = null
    },

    captureError(err) {
      console.error('[ErrorBoundary]', err)
      this.error = err
      this.hasError = true
    }
  },

  errorCaptured(err, instance, info) {
    // Capture any error thrown in child components
    console.error('[ErrorBoundary] Caught error:', err, info)
    this.captureError(err)
    // Return false to prevent error from propagating further
    return false
  }
})
</script>

<style scoped>
.error-boundary {
  width: 100%;
  height: 100%;
}

.error-boundary__container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
}

.error-boundary__content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 3rem 2rem;
  max-width: 500px;
  text-align: center;
}

.error-boundary__icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  color: #dc3545;
  animation: pulse 2s infinite;
}

.error-boundary__icon svg {
  width: 100%;
  height: 100%;
}

.error-boundary__title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1rem 0;
  color: #333;
}

.error-boundary__message {
  color: #666;
  margin: 1rem 0 2rem;
  line-height: 1.6;
}

.error-boundary__details {
  margin: 1.5rem 0;
  text-align: left;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  cursor: pointer;
}

.error-boundary__details summary {
  font-weight: 500;
  color: #495057;
  user-select: none;
}

.error-boundary__stack {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #fff;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.75rem;
  max-height: 200px;
  overflow-y: auto;
  color: #d32f2f;
}

.error-boundary__actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .error-boundary__container {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  }

  .error-boundary__content {
    background: #2d2d2d;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }

  .error-boundary__title {
    color: #fff;
  }

  .error-boundary__message {
    color: #ccc;
  }

  .error-boundary__details {
    background: #1a1a1a;
    border-color: #444;
  }

  .error-boundary__details summary {
    color: #aaa;
  }

  .error-boundary__stack {
    background: #333;
    color: #ff6b6b;
  }
}
</style>
