<template>
  <v-container class="py-5">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center">
            <font-awesome-icon icon="fa-solid fa-chart-line" class="mr-2" />
            {{ $t('common.home') }}
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <!-- Chart Example -->
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <h3 class="mb-3">{{ $t('common.search') }} Stats</h3>
                <v-spacer></v-spacer>
              </v-col>
              <v-col cols="12" md="6">
                <!-- ApexChart Example -->
                <apexchart
                  type="area"
                  :options="chartOptions"
                  :series="chartSeries"
                  height="300"
                />
              </v-col>
            </v-row>

            <!-- Form Example -->
            <v-form @submit.prevent="handleSubmit" class="mt-6">
              <h3 class="mb-3">{{ $t('auth.login') }} Form</h3>

              <v-text-field
                v-bind="getFieldProps('email')"
                label="Email"
                type="email"
                outlined
                dense
                class="mb-3"
                @blur="setFieldTouched('email')"
              />

              <v-text-field
                v-bind="getFieldProps('password')"
                label="Password"
                type="password"
                outlined
                dense
                class="mb-3"
                @blur="setFieldTouched('password')"
              />

              <v-btn
                type="submit"
                color="primary"
                :loading="isSubmitting"
                class="mr-2"
              >
                {{ $t('auth.login') }}
              </v-btn>

              <v-btn @click="resetForm" variant="outlined">
                {{ $t('common.cancel') }}
              </v-btn>
            </v-form>

            <!-- Authorization Example -->
            <v-divider class="my-6"></v-divider>

            <h3 class="mb-3">Authorization Example</h3>
            <v-alert
              v-if="isAdmin"
              color="info"
              variant="outlined"
              class="mb-3"
            >
              <font-awesome-icon icon="fa-solid fa-shield" class="mr-2" />
              You are an admin
            </v-alert>

            <v-alert
              v-if="isManager"
              color="warning"
              variant="outlined"
              class="mb-3"
            >
              You are a manager
            </v-alert>

            <!-- Filters Example -->
            <v-divider class="my-6"></v-divider>

            <h3 class="mb-3">Filters Example</h3>
            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="filters.status"
                  :items="['Active', 'Inactive', 'Pending']"
                  label="Status"
                  outlined
                  dense
                  clearable
                  @update:model-value="setFilter('status', $event)"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="filters.search"
                  label="Search"
                  outlined
                  dense
                  clearable
                  @update:model-value="setFilter('search', $event)"
                />
              </v-col>
            </v-row>

            <v-btn
              v-if="hasFilters"
              variant="outlined"
              color="error"
              size="small"
              @click="clearFilters"
              class="mt-3"
            >
              Clear Filters
            </v-btn>

            <v-alert
              v-if="hasFilters"
              color="info"
              variant="outlined"
              class="mt-3"
            >
              Query: {{ queryString }}
            </v-alert>

            <!-- Data Table with Pagination Example -->
            <v-divider class="my-6"></v-divider>

            <h3 class="mb-3">Data Table Example</h3>
            <v-data-table
              :items="sampleData"
              :headers="[
                { text: 'ID', value: 'id' },
                { text: 'Name', value: 'name' },
                { text: 'Email', value: 'email' },
                { text: 'Status', value: 'status' }
              ]"
              :items-per-page="pageSize"
            >
              <template #item.status="{ item }">
                <v-chip
                  :color="item.status === 'Active' ? 'success' : 'warning'"
                  :text-color="'white'"
                >
                  {{ item.status }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useForm, useFilters, usePagination, useAuthorization } from '@/composables'
import { dateUtils, stringUtils, numberUtils } from '@/utils/formatters'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import Vue3ApexCharts from 'vue3-apexcharts'

const { t } = useI18n()
const { isAdmin, isManager } = useAuthorization()
const { values, errors, isSubmitting, setFieldValue, setFieldTouched, getFieldProps, resetForm } = 
  useForm({ email: '', password: '' })
const { filters, setFilter, clearFilters, hasFilters, queryString } = useFilters()
const { pageSize, currentPage } = usePagination(0, 10)

// Chart setup
const chartOptions = ref({
  chart: { type: 'area', toolbar: { show: false } },
  xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr'] },
  colors: ['#1976D2'],
  dataLabels: { enabled: false }
})

const chartSeries = ref([
  {
    name: 'Sales',
    data: [30, 40, 35, 50]
  }
])

// Sample data
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', status: 'Inactive' }
]

// Form submit handler
const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('Form submitted successfully!')
    resetForm()
  } catch (error) {
    toast.error('An error occurred')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.v-chart-container {
  max-width: 100%;
}
</style>
