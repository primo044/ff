<template>
  <transition name="splash-fade">
    <div v-if="isVisible" class="splash-screen">
      <!-- Floating orbs -->
      <div class="splash-orb splash-orb--1"></div>
      <div class="splash-orb splash-orb--2"></div>
      <div class="splash-orb splash-orb--3"></div>

      <!-- Grid overlay -->
      <div class="splash-grid-overlay"></div>

      <!-- Content -->
      <div class="splash-content">
        <!-- Brand text -->
        <div class="splash-branding">
          <h1 class="splash-title">
            ERP<br><span>KAY</span>
          </h1>
          <p class="splash-subtitle">Enterprise Resource Planning System</p>
        </div>

        <!-- Loading indicator -->
        <div class="splash-loader-wrapper">
          <div class="splash-loader"></div>
          <p class="splash-loader-text">{{ loadingText }}</p>
        </div>

        <!-- Version -->
        <div class="splash-version">
          <span>v4.0.3</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  duration: {
    type: Number,
    default: 2500
  }
})

const emit = defineEmits(['ready'])

const isVisible = ref(true)
const loadingText = ref('Initializing...')
const loadingTexts = [
  'Initializing...',
  'Loading modules...',
  'Preparing dashboard...',
  'Almost there...'
]
let textIndex = 0
let textTimer = null
let hideTimer = null

onMounted(() => {
  // Rotate loading text
  textTimer = setInterval(() => {
    textIndex = (textIndex + 1) % loadingTexts.length
    loadingText.value = loadingTexts[textIndex]
  }, 600)

  // Hide splash after duration
  hideTimer = setTimeout(() => {
    isVisible.value = false
    emit('ready')
  }, props.duration)
})

onUnmounted(() => {
  if (textTimer) clearInterval(textTimer)
  if (hideTimer) clearTimeout(hideTimer)
})
</script>

<style scoped>
/* ─── SPLASH SCREEN CONTAINER ───────────────────────────── */
.splash-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-void);
  overflow: hidden;
  animation: splashEnter 0.6s cubic-bezier(0.34, 1.3, 0.64, 1) backwards;
}

@keyframes splashEnter {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* ─── ORBS ──────────────────────────────────────────────── */
.splash-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  animation: splashFloat 8s ease-in-out infinite;
  transition: background 0.5s ease;
}
.splash-orb--1 {
  width: 500px;
  height: 500px;
  top: -120px;
  left: -120px;
  animation-delay: 0s;
}
.splash-orb--2 {
  width: 400px;
  height: 400px;
  bottom: -120px;
  right: -120px;
  animation-delay: -3s;
}
.splash-orb--3 {
  width: 300px;
  height: 300px;
  top: 50%;
  right: 30%;
  animation-delay: -5s;
}

/* Dark orb colours */
[data-theme="dark"] .splash-orb--1 {
  background: radial-gradient(circle, rgba(0, 212, 245, 0.12), transparent 70%);
}
[data-theme="dark"] .splash-orb--2 {
  background: radial-gradient(circle, rgba(124, 92, 191, 0.12), transparent 70%);
}
[data-theme="dark"] .splash-orb--3 {
  background: radial-gradient(circle, rgba(245, 166, 35, 0.08), transparent 70%);
}

@keyframes splashFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(20px, -20px) scale(1.05);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.95);
  }
}

/* ─── GRID OVERLAY ──────────────────────────────────────── */
.splash-grid-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: background 0.4s ease, opacity 0.4s ease;
  background-image:
    linear-gradient(rgba(0, 212, 245, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 245, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ─── CONTENT ───────────────────────────────────────────── */
.splash-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  text-align: center;
  animation: contentBounceIn 0.7s cubic-bezier(0.34, 1.3, 0.64, 1) backwards;
  animation-delay: 0.2s;
}

@keyframes contentBounceIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* ─── BRANDING ──────────────────────────────────────────── */
.splash-branding {
  animation: brandingFadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.15s backwards;
}

.splash-title {
  font-family: var(--font-display);
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--text-primary);
  margin: 0;
  padding: 0;
}

.splash-title span {
  background: linear-gradient(135deg, var(--cyan), var(--amber));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease-in-out infinite;
}

.splash-subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.6;
  font-weight: 300;
  margin: 0.75rem 0 0 0;
  padding: 0;
}

@keyframes brandingFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradientShift {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.1);
  }
}

/* ─── LOADER ────────────────────────────────────────────── */
.splash-loader-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  animation: loaderFadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.35s backwards;
}

@keyframes loaderFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.splash-loader {
  position: relative;
  width: 120px;
  height: 3px;
  background: rgba(0, 112, 204, 0.1);
  border-radius: 100px;
  overflow: hidden;
}

[data-theme="dark"] .splash-loader {
  background: rgba(0, 212, 245, 0.15);
}

.splash-loader::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    var(--cyan),
    transparent
  );
  animation: lineLoad 1.5s ease-in-out infinite;
}

@keyframes lineLoad {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.splash-loader-text {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin: 0;
  padding: 0;
  min-width: 160px;
  animation: textBlink 0.6s ease-in-out infinite;
}

@keyframes textBlink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* ─── VERSION ───────────────────────────────────────────── */
.splash-version {
  position: absolute;
  bottom: 2rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  animation: versionFadeIn 1s ease-out 0.5s backwards;
}

@keyframes versionFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* ─── TRANSITION ────────────────────────────────────────── */
.splash-fade-enter-active {
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.splash-fade-leave-active {
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.splash-fade-enter-from {
  opacity: 0;
}

.splash-fade-leave-to {
  opacity: 0;
}
</style>
