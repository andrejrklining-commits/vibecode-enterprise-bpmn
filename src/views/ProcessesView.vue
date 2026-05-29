<template>
  <div class="space-y-6">
    <!-- Header with Actions -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Бизнес-процессы</h1>
      <button @click="showCreateModal = true" class="btn btn-primary">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Новый процесс
      </button>
    </div>

    <!-- Search and Filters -->
    <div class="flex gap-4">
      <div class="flex-1 relative">
        <svg class="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Поиск процессов..." 
          class="input pl-10 w-full"
        >
      </div>
      <select v-model="selectedStatus" class="input px-4">
        <option value="">Все статусы</option>
        <option value="active">Активные</option>
        <option value="draft">Черновики</option>
        <option value="archived">В архиве</option>
      </select>
    </div>

    <!-- Processes Table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-dark-700 border-b border-gray-200 dark:border-dark-600">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Название</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Код</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Владелец</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Статус</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Версия</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Действия</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-dark-600">
            <tr v-for="process in filteredProcesses" :key="process.id" class="hover:bg-gray-50 dark:hover:bg-dark-700 transition">
              <td class="px-6 py-4">
                <button @click="selectProcess(process)" class="text-primary hover:underline font-medium">
                  {{ process.name }}
                </button>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{{ process.code }}</td>
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{{ process.owner }}</td>
              <td class="px-6 py-4">
                <span :class="['badge', `badge-${getStatusColor(process.status)}`]">
                  {{ process.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">v{{ process.version }}</td>
              <td class="px-6 py-4 flex gap-2">
                <button @click="editProcess(process)" class="p-2 hover:bg-gray-200 dark:hover:bg-dark-600 rounded transition">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button @click="deleteProcess(process.id)" class="p-2 hover:bg-gray-200 dark:hover:bg-dark-600 rounded transition">
                  <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredProcesses.length === 0" class="card p-12 text-center">
      <svg class="w-16 h-16 mx-auto text-gray-300 dark:text-dark-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
      <p class="text-gray-500 dark:text-gray-400 mb-4">Процессы не найдены</p>
      <button @click="showCreateModal = true" class="btn btn-primary">Создать первый процесс</button>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-dark-800 rounded-lg p-8 max-w-md w-full">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">{{ editingProcess ? 'Редактирование' : 'Новый процесс' }}</h2>
        
        <form @submit.prevent="saveProcess" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Название</label>
            <input v-model="formData.name" type="text" class="input w-full" required>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Код</label>
            <input v-model="formData.code" type="text" class="input w-full" required>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Владелец</label>
            <input v-model="formData.owner" type="text" class="input w-full" required>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Статус</label>
            <select v-model="formData.status" class="input w-full">
              <option value="draft">Черновик</option>
              <option value="active">Активный</option>
              <option value="archived">В архиве</option>
            </select>
          </div>

          <div class="flex gap-3">
            <button type="submit" class="btn btn-primary flex-1">Сохранить</button>
            <button type="button" @click="showCreateModal = false" class="btn btn-secondary flex-1">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const selectedStatus = ref('')
const showCreateModal = ref(false)
const editingProcess = ref(null)

const processes = ref([
  { id: 1, name: 'Процесс продаж', code: 'SALES', owner: 'Иван Петров', status: 'active', version: 2, category: 'Продажи' },
  { id: 2, name: 'Найм сотрудников', code: 'HIRING', owner: 'Мария Сидорова', status: 'active', version: 1, category: 'HR' },
  { id: 3, name: 'Обработка счетов', code: 'INVOICE', owner: 'Петр Иванов', status: 'draft', version: 3, category: 'Финансы' },
])

const formData = ref({
  name: '',
  code: '',
  owner: '',
  status: 'draft'
})

const filteredProcesses = computed(() => {
  return processes.value.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          p.code.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !selectedStatus.value || p.status === selectedStatus.value
    return matchesSearch && matchesStatus
  })
})

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'success'
    case 'draft': return 'warning'
    case 'archived': return 'error'
    default: return 'primary'
  }
}

const selectProcess = (process: any) => {
  router.push(`/process/${process.id}/edit`)
}

const editProcess = (process: any) => {
  editingProcess.value = process
  formData.value = { ...process }
  showCreateModal.value = true
}

const saveProcess = () => {
  if (editingProcess.value) {
    const index = processes.value.findIndex(p => p.id === editingProcess.value.id)
    if (index !== -1) {
      processes.value[index] = { ...processes.value[index], ...formData.value }
    }
  } else {
    processes.value.push({
      id: Math.max(...processes.value.map(p => p.id)) + 1,
      ...formData.value,
      version: 1,
      category: ''
    })
  }
  showCreateModal.value = false
  editingProcess.value = null
  formData.value = { name: '', code: '', owner: '', status: 'draft' }
}

const deleteProcess = (id: number) => {
  if (confirm('Вы уверены?')) {
    processes.value = processes.value.filter(p => p.id !== id)
  }
}
</script>

<style scoped>
</style>
