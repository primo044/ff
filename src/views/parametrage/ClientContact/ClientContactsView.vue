<template>
  <div class="contacts-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Client Contacts Management</h2>
        <router-link to="/contacts/create" class="btn btn-success">Add Contact</router-link>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <div v-if="loading" class="loading-container">
        <div class="loading"></div>
        <p>Loading contacts...</p>
      </div>

      <template v-else>
        <table v-if="contacts.length" class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Client</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in contacts" :key="contact.id">
              <td>{{ contact.id }}</td>
              <td>{{ contact.nomPrenom }}</td>
              <td>{{ contact.client?.libelle || '-' }}</td>
              <td>{{ contact.email || '-' }}</td>
              <td>
                <span :class="['status', contact.status ? 'active' : 'inactive']">
                  {{ contact.status ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="actions">
                <router-link :to="`/contacts/${contact.id}/edit`" class="btn btn-primary btn-sm">Edit</router-link>
                <button @click="toggleContact(contact)" class="btn btn-sm" :class="contact.status ? 'btn-secondary' : 'btn-success'">
                  {{ contact.status ? 'Disable' : 'Enable' }}
                </button>
                <button @click="deleteContact(contact.id)" class="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="no-data">
          No contacts found. <router-link to="/contacts/create">Create one</router-link>
        </div>

        <div class="pagination">
          <button @click="previousPage" :disabled="currentPage === 0" class="pagination-item">Previous</button>
          <span class="pagination-info">Page {{ currentPage + 1 }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage >= totalPages - 1" class="pagination-item">Next</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { clientContactsAPI } from '../../../api'

const loading = ref(false)
const error = ref('')
const contacts = ref([])
const currentPage = ref(0)
const totalPages = ref(0)
const pageSize = 10

const loadContacts = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await clientContactsAPI.listContacts(currentPage.value, pageSize)
    contacts.value = response.data.content
    totalPages.value = response.data.totalPages
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load contacts'
  } finally {
    loading.value = false
  }
}

const toggleContact = async (contact) => {
  try {
    await clientContactsAPI.enableDisableContact(contact.id, !contact.status)
    await loadContacts()
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to update contact'
  }
}

const deleteContact = async (contactId) => {
  if (confirm('Are you sure?')) {
    try {
      await clientContactsAPI.deleteContact(contactId)
      await loadContacts()
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete contact'
    }
  }
}

const nextPage = async () => {
  currentPage.value++
  await loadContacts()
}

const previousPage = async () => {
  if (currentPage.value > 0) {
    currentPage.value--
    await loadContacts()
  }
}

onMounted(loadContacts)
</script>

<style scoped>
.contacts-container {
  max-width: 1200px;
  margin: 0 auto;
}

.no-data {
  text-align: center;
  padding: 2rem;
  color: #718096;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.status.active {
  background: #c6f6d5;
  color: #22543d;
}

.status.inactive {
  background: #fed7d7;
  color: #742a2a;
}

.actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}

.pagination-info {
  padding: 0.5rem 1rem;
  font-weight: 500;
}
</style>
