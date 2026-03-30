<template>
  <div>
    <!-- Toolbar -->
    <v-toolbar flat class="mb-4">
      <v-text-field
        v-model="search"
        append-inner-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        density="compact"
        class="flex-grow-1 mr-4"
        @input="filterItems"
      />
      <slot name="toolbar" />
    </v-toolbar>

    <!-- Table -->
    <v-data-table
      :headers="headers"
      :items="filteredItems"
      :items-per-page="itemsPerPage"
      :page="page"
      :sort-by="sortBy"
      :loading="loading"
      class="elevation-1"
      @update:page="page = $event"
      @update:sort-by="sortBy = $event"
    >
      <!-- Dynamic slots for columns -->
      <template v-for="header in headers" :key="header.key" #[`item.${header.key}`]="{ item }">
        <slot :name="`item.${header.key}`" :item="item">
          {{ item[header.key] }}
        </slot>
      </template>

      <!-- Actions column -->
      <template v-if="showActions" #[`item.actions`]="{ item }">
        <div class="d-flex gap-2">
          <v-btn
            icon="mdi-pencil"
            size="small"
            variant="text"
            color="primary"
            @click="$emit('edit', item)"
          />
          <v-btn
            icon="mdi-delete"
            size="small"
            variant="text"
            color="error"
            @click="$emit('delete', item)"
          />
        </div>
      </template>

      <!-- Empty state -->
      <template #no-data>
        <v-empty-state
          headline="No data available"
          description="Start by creating a new record"
          image-height="200"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  headers: {
    type: Array,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  itemsPerPage: {
    type: Number,
    default: 10
  },
  loading: {
    type: Boolean,
    default: false
  },
  showActions: {
    type: Boolean,
    default: true
  }
})

defineEmits(['edit', 'delete'])

const search = ref('')
const page = ref(1)
const sortBy = ref([])

const filteredItems = computed(() => {
  if (!search.value) return props.items

  const query = search.value.toLowerCase()
  return props.items.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(query)
    )
  )
})

const filterItems = () => {
  page.value = 1
}
</script>
