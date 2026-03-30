<template>
  <div class="contracts-page page-enter-active">
    <div class="card">
      <div class="card-header">
        <div>
          <h1 class="card-title">{{ $t('contracts.title') }}</h1>
          <p class="subtitle">{{ $t('contracts.subtitle') }}</p>
        </div>
        <button class="btn btn-primary" @click="handleCreateNew">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          {{ $t('actions.create') }}
        </button>
      </div>

      <div class="card-body">
        <ClientContractsView @create="handleCreateNew" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ClientContractsView from '@/views/ClientContractsView.vue'

const router = useRouter()
const { t } = useI18n()

const handleCreateNew = () => {
  router.push({ name: 'ClientContractForm', params: { id: 'new' } })
}
</script>

<style scoped>
.contracts-page {
  animation: pageFadeIn 0.4s ease-out;
}

@keyframes pageFadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.subtitle {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0.3rem 0 0 0;
  font-weight: 400;
}
</style>
