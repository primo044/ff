<template>
  <div class="login-page">
    <!-- Floating orbs -->
    <div class="orb orb--1"></div>
    <div class="orb orb--2"></div>
    <div class="orb orb--3"></div>

    <!-- Grid overlay -->
    <div class="grid-overlay"></div>

    <div class="login-wrapper">
      <!-- ─── LEFT DECORATIVE PANEL ─────────────────── -->
      <div class="login-panel" aria-hidden="true">
        <div class="panel-content">
          <div class="panel-logo">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="32" y="48" font-size="48" font-weight="bold" fill="currentColor" text-anchor="middle">K</text>
            </svg>
          </div>

          <h1 class="panel-title">ERP<br><span>KAY</span></h1>
          <p class="panel-subtitle">Enterprise Resource<br>Planning System</p>

          <div class="panel-stats">
            <div class="stat-item">
              <span class="stat-num">06</span>
              <span class="stat-label">Modules</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-num">∞</span>
              <span class="stat-label">Scale</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-num">24/7</span>
              <span class="stat-label">Uptime</span>
            </div>
          </div>

          <div class="panel-tags">
            <span class="tag">Spring Boot 4</span>
            <span class="tag">Java 17</span>
            <span class="tag">MySQL</span>
            <span class="tag">Vue 3</span>
          </div>
        </div>

        <!-- Animated circuit lines -->
        <svg class="circuit" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 100 L100 100 L100 200 L200 200"  stroke="currentColor" stroke-width="1" stroke-dasharray="4 4"/>
          <path d="M350 50 L350 150 L250 150 L250 300"  stroke="currentColor" stroke-width="1" stroke-dasharray="4 4"/>
          <path d="M50 400 L150 400 L150 300 L300 300"  stroke="currentColor" stroke-width="1" stroke-dasharray="4 4"/>
          <circle cx="100" cy="100" r="4" fill="currentColor"/>
          <circle cx="100" cy="200" r="4" fill="currentColor"/>
          <circle cx="250" cy="150" r="4" fill="currentColor"/>
          <circle cx="150" cy="400" r="4" fill="currentColor"/>
        </svg>
      </div>

      <!-- ─── RIGHT: FORM ───────────────────────────── -->
      <div class="login-form-wrap">
        <div class="login-card">
          <div class="login-card__header">
            <h2 class="login-title">Welcome back</h2>
            <p class="login-subtitle">Sign in to your account to continue</p>
          </div>

          <div v-if="error" class="alert alert-error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {{ error }}
          </div>

          <form @submit.prevent="handleLogin" class="login-form" novalidate>
            <div class="form-group">
              <label for="login" class="form-label">Login</label>
              <div class="input-icon-wrap">
                <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input
                  id="login"
                  v-model="credentials.login"
                  type="text"
                  class="form-input"
                  required
                  placeholder="Enter your login"
                  autocomplete="username"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <div class="input-icon-wrap">
                <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <input
                  id="password"
                  v-model="credentials.pwd"
                  :type="showPwd ? 'text' : 'password'"
                  class="form-input"
                  required
                  placeholder="Enter your password"
                  autocomplete="current-password"
                />
                <button type="button" class="input-icon-right" @click="showPwd = !showPwd" tabindex="-1">
                  <svg v-if="!showPwd" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
            </div>

            <button type="submit" class="btn-login" :disabled="loading">
              <span v-if="loading" class="loading loading--sm"></span>
              <template v-else>
                <span>Sign In</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </template>
            </button>
          </form>

          <p class="login-footer">
            Secured by <strong>ERP KAY</strong> · v4.0.3
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router    = useRouter()
const authStore = useAuthStore()
const showPwd   = ref(false)
const credentials = ref({ login: '', pwd: '' })
const loading   = ref(false)
const error     = ref('')

onMounted(() => {
  document.documentElement.setAttribute('data-theme', 'dark')
})

/* ── Login ─────────────────────────────────────────── */
const handleLogin = async () => {
  loading.value = true
  error.value   = ''
  const success = await authStore.login(credentials.value)
  if (success) {
    router.push('/dashboard')
  } else {
    error.value = authStore.error
  }
  loading.value = false
}
</script>

<style scoped>
/* ─── PAGE ──────────────────────────────────────────────── */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;
  background: var(--bg-void);
  transition: background 0.4s ease;
}

/* ─── ORBS ──────────────────────────────────────────────── */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  animation: float 8s ease-in-out infinite;
  transition: background 0.5s ease;
}
.orb--1 {
  width: 500px; height: 500px;
  top: -120px; left: -120px;
  animation-delay: 0s;
}
.orb--2 {
  width: 400px; height: 400px;
  bottom: -120px; right: -120px;
  animation-delay: -3s;
}
.orb--3 {
  width: 300px; height: 300px;
  top: 50%; right: 30%;
  animation-delay: -5s;
}

/* Dark orb colours */
.orb--1 { background: radial-gradient(circle, rgba(0,212,245,0.12), transparent 70%); }
.orb--2 { background: radial-gradient(circle, rgba(124,92,191,0.12), transparent 70%); }
.orb--3 { background: radial-gradient(circle, rgba(245,166,35,0.08), transparent 70%); }

@keyframes float {
  0%,100% { transform: translate(0,0) scale(1); }
  33%     { transform: translate(20px,-20px) scale(1.05); }
  66%     { transform: translate(-20px,20px) scale(0.95); }
}

/* ─── GRID OVERLAY ──────────────────────────────────────── */
.grid-overlay {
  position: absolute; inset: 0;
  pointer-events: none;
  transition: background 0.4s ease, opacity 0.4s ease;
  background-image:
    linear-gradient(rgba(0,212,245,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,212,245,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ─── WRAPPER ───────────────────────────────────────────── */
.login-wrapper {
  display: grid;
  grid-template-columns: 1fr 480px;
  max-width: 960px;
  width: 100%;
  border-radius: 24px;
  overflow: hidden;
  backdrop-filter: blur(20px);
  animation: wrapperReveal 0.7s cubic-bezier(0.34,1.3,0.64,1) both;
  position: relative;
  z-index: 1;
  transition: box-shadow 0.4s ease, border-color 0.4s ease;
}

[data-theme="dark"] .login-wrapper {
  background: rgba(8, 15, 31, 0.85);
  border: 1px solid rgba(0,212,245,0.12);
  box-shadow:
    0 30px 80px rgba(0,0,0,0.6),
    0 0 0 1px rgba(0,212,245,0.06),
    0 0 40px rgba(0,212,245,0.08);
}

@keyframes wrapperReveal {
  from { opacity: 0; transform: scale(0.9) translateY(30px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

/* ─── LEFT PANEL ────────────────────────────────────────── */
.login-panel {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: background 0.4s ease, border-color 0.4s ease;
}
[data-theme="dark"] .login-panel {
  background: linear-gradient(135deg, rgba(0,212,245,0.06) 0%, rgba(124,92,191,0.10) 100%);
  border-right: 1px solid rgba(0,212,245,0.12);
}

.panel-content {
  justify-content: center;
  gap: 2rem;
}

/* Panel logo */
.panel-logo {
  width: 52px; height: 52px;
  color: var(--cyan);
  filter: drop-shadow(0 0 12px var(--cyan-glow));
}

/* Panel title */
.panel-title {
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--text-primary);
}
.panel-title span {
  background: linear-gradient(135deg, var(--cyan), var(--amber));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.panel-subtitle {
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.6;
  font-weight: 300;
}

/* Stats */
.panel-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.stat-item { text-align: center; }
.stat-num {
  display: block;
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--cyan);
}
.stat-label {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.stat-divider {
  width: 1px; height: 40px;
  background: var(--border);
}

/* Tags */
.panel-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.tag {
  padding: 0.28rem 0.75rem;
  background: var(--cyan-dim);
  border: 1px solid var(--border);
  border-radius: 100px;
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--cyan);
  transition: background 0.3s, border-color 0.3s, color 0.3s;
}

/* Circuit SVG */
.circuit {
  position: absolute;
  bottom: 0; right: 0;
  width: 70%;
  color: var(--cyan);
  opacity: 0.18;
  animation: circuitDash 3s linear infinite;
}

@keyframes circuitDash { to { stroke-dashoffset: -20; } }

/* ─── RIGHT FORM ────────────────────────────────────────── */
.login-form-wrap {
  padding: 3rem;
  display: flex;
  align-items: center;
}

.login-card { width: 100%; }

.login-card__header { margin-bottom: 2.5rem; }

.login-title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}
.login-subtitle { color: var(--text-muted); font-size: 0.9rem; }

/* Input with icons */
.input-icon-wrap { position: relative; }
.input-icon {
  position: absolute;
  left: 1rem; top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
  z-index: 1;
  transition: color 0.2s;
}
.input-icon-right {
  position: absolute;
  right: 0.75rem; top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  display: flex;
  padding: 4px;
  transition: color 0.2s;
}
.input-icon-right:hover { color: var(--cyan); }
.input-icon-wrap:focus-within .input-icon { color: var(--cyan); }
.input-icon-wrap .form-input { padding-left: 2.75rem; }

/* ─── LOGIN BUTTON ──────────────────────────────────────── */
.btn-login {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.9rem 1.5rem;
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  cursor: pointer;
  margin-top: 0.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  background: linear-gradient(135deg, #0891b2, #00d4f5);
  color: #020817;
  box-shadow: 0 4px 20px rgba(0,212,245,0.3);
}

.btn-login::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.btn-login:hover { 
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0,212,245,0.5);
}
.btn-login:hover::before { opacity: 1; }
.btn-login:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

.loading--sm {
  width: 18px; height: 18px;
  border-width: 2px;
  border-color: rgba(255,255,255,0.25);
  border-top-color: #fff;
  box-shadow: none;
}
[data-theme="dark"] .loading--sm {
  border-color: rgba(2,8,23,0.25);
  border-top-color: #020817;
}

/* Footer */
.login-footer {
  text-align: center;
  margin-top: 2rem;
  font-size: 0.78rem;
  color: var(--text-muted);
}
.login-footer strong { color: var(--text-secondary); }

/* ─── RESPONSIVE ────────────────────────────────────────── */
@media (max-width: 768px) {
  .login-wrapper { grid-template-columns: 1fr; }
  .login-panel   { display: none; }
  .login-form-wrap { padding: 2.5rem 2rem; }
  .login-theme-toggle { top: 1rem; right: 1rem; }
}
</style>