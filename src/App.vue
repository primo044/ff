<template>
  <div id="app" class="app-container" :class="{ 'content-entering': !showSplash }">

    <!--
      ══════════════════════════════════════════════════
        SINGLE GLOBAL BACKGROUND
        One fixed layer behind the entire app.
        The sidebar and footer are fully transparent
        so everything shares the same bg seamlessly.
      ══════════════════════════════════════════════════
    -->

    <!-- Floating ambient orbs -->
    <div class="bg-orb bg-orb--1"></div>
    <div class="bg-orb bg-orb--2"></div>
    <div class="bg-orb bg-orb--3"></div>

    <!-- Splash Screen -->
    <SplashScreen v-if="showSplash" @ready="hideSplash" />

    <!-- Login View -->
    <template v-if="!authStore.isAuthenticated">
      <router-view />
    </template>

    <!-- Authenticated App Layout -->
    <template v-else>
      <AppLayout>
        <div class="app-wrapper">
          <main class="main-content">
            <router-view v-slot="{ Component }">
              <transition name="page" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </main>

          <!-- Footer — transparent, rides the same global bg -->
          <footer class="footer">
            <div class="footer__content">
              <div class="footer__section">
                <h4 class="footer__title">{{ t('footer.about') }}</h4>
                <p class="footer__text">{{ t('footer.aboutText') }}</p>
              </div>
              <div class="footer__section">
                <h4 class="footer__title">{{ t('footer.quickLinks') }}</h4>
                <ul class="footer__links">
                  <li><a href="#dashboard">{{ t('actions.dashboard') }}</a></li>
                  <li><a href="#clients">{{ t('actions.clients') }}</a></li>
                  <li><a href="#users">{{ t('actions.users') }}</a></li>
                  <li><a href="#settings">{{ t('actions.settings') }}</a></li>
                </ul>
              </div>
              <div class="footer__section">
                <h4 class="footer__title">{{ t('footer.support') }}</h4>
                <ul class="footer__links">
                  <li><a href="mailto:support@erpkay.com">{{ t('footer.emailSupport') }}</a></li>
                  <li><a href="#">{{ t('footer.documentation') }}</a></li>
                  <li><a href="#">{{ t('footer.contactUs') }}</a></li>
                </ul>
              </div>
            </div>
            <div class="footer__divider"></div>
            <div class="footer__bottom">
              <p class="footer__copyright">{{ t('footer.copyright') }}</p>
              <div class="footer__meta">
                <span class="footer__version">{{ t('footer.version') }}</span>
              </div>
            </div>
          </footer>
        </div>
      </AppLayout>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppLayout from './components/layouts/AppLayout.vue'
import SplashScreen from './components/layouts/SplashScreen.vue'

const authStore = useAuthStore()
const router = useRouter()
const { t } = useI18n()

const showSplash = ref(true)
const hideSplash = () => { showSplash.value = false }

const handleStorageChange = (e) => {
  if (e.key === 'token') {
    const newToken = localStorage.getItem('token')
    if (!newToken && authStore.token) {
      authStore.logout()
      router.push('/login')
    }
  }
}

onMounted(() => {
  document.documentElement.setAttribute('data-theme', 'dark')
  document.documentElement.classList.add('dark')
})

onUnmounted(() => { window.removeEventListener('storage', handleStorageChange) })

const logout = async () => {
  try {
    await authStore.logout()
    await new Promise(resolve => setTimeout(resolve, 100))
    await router.push('/login')
  } catch (error) {
    await router.push('/login')
  }
}
</script>

<style scoped>
/* ══════════════════════════════════════════════════════════
   GLOBAL BACKGROUND — defined once here, shared by ALL
   children (sidebar, main, footer) via transparency.

   The bg-orb divs and body::before in main.css provide
   the ambient radial gradients. We just make sure every
   panel that used to have its own solid/glass bg is now
   set to transparent so the single bg bleeds through.
══════════════════════════════════════════════════════════ */

/* ─── APP SHELL ─────────────────────────────────────────── */
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* No background here — body/main.css owns it */
}

.app-container.content-entering {
  animation: contentFadeInScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
}

main.main-content {
  flex: 1;
  padding: 2rem 2.5rem;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
}

/* ─── PAGE TRANSITIONS ──────────────────────────────────── */
.page-enter-active { animation: pageSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
.page-leave-active { animation: pageSlideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }

@keyframes pageSlideIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes pageSlideOut {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-20px); }
}
@keyframes contentFadeInScale {
  from { opacity: 0; transform: scale(0.95) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

/* ─── FOOTER — transparent, same bg as rest of app ──────── */
.footer {
  /* TRANSPARENT — global bg shows through */
  background: transparent;
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-family: var(--font-display);
  position: relative;
}

.footer__content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1440px;
  margin: 0 auto;
}

.footer__section {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  animation: slideInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;

  &:nth-child(2) { animation-delay: 0.1s; }
  &:nth-child(3) { animation-delay: 0.2s; }
}

.footer__title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0;
}

.footer__text {
  font-size: 0.85rem;
  line-height: 1.6;
  margin: 0;
  color: var(--text-muted);
}

.footer__links {
  list-style: none;
  padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 0.6rem;
}

.footer__links li {
  animation: slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  &:nth-child(2) { animation-delay: 0.1s; }
  &:nth-child(3) { animation-delay: 0.2s; }
}

.footer__links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.85rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: inline-flex; align-items: center; gap: 0.5rem;
}
.footer__links a:hover { color: var(--cyan); transform: translateX(4px); }
.footer__links a::before {
  content: '→'; position: absolute; left: -0.8rem;
  opacity: 0; transition: opacity 0.2s ease;
}
.footer__links a:hover::before { opacity: 1; }

.footer__divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-color), transparent);
  margin: 0 2rem;
}

.footer__bottom {
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 1rem;
  padding: 1.5rem 2rem;
  max-width: 1440px; margin: 0 auto; width: 100%;
  box-sizing: border-box; font-size: 0.85rem;
}

.footer__copyright { margin: 0; color: var(--text-tertiary); }
.footer__meta { display: flex; align-items: center; gap: 1.5rem; }
.footer__version {
  color: var(--text-tertiary);
  font-family: 'Courier New', monospace;
  font-size: 0.75rem; letter-spacing: 0.1em;
}

/* ─── RESPONSIVE ────────────────────────────────────────── */
@media (max-width: 768px) {
  main.main-content { padding: 1.5rem 1rem; }
  .footer__content  { padding: 1.5rem 1rem; }
  .footer__bottom   { padding: 1rem; }
}
@media (max-width: 640px) {
  main.main-content { padding: 1rem; }
  .footer__bottom   { flex-direction: column; align-items: flex-start; }
}
</style>