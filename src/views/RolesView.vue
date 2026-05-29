<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Роли и должности</h1>
      <button @click="showCreateModal = true" class="btn btn-primary">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Новая роль
      </button>
    </div>

    <!-- Roles Table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-dark-700 border-b border-gray-200 dark:border-dark-600">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Должность</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Подразделение</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Руководитель</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Процессы</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Действия</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-dark-600">
            <tr v-for="role in roles" :key="role.id" class="hover:bg-gray-50 dark:hover:bg-dark-700 transition">
              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ role.name }}</td>
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{{ role.department }}</td>
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{{ role.head || '—' }}</td>
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{{ role.processes.length }}</td>
              <td class="px-6 py-4 flex gap-2">
                <button @click="editRole(role)" class="p-2 hover:bg-gray-200 dark:hover:bg-dark-600 rounded">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button @click="deleteRole(role.id)" class="p-2 hover:bg-gray-200 dark:hover:bg-dark-600 rounded">
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

    <!-- RACI Matrix -->
    <div class="card p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Матрица RACI</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 dark:bg-dark-700">
            <tr>
              <th class="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Задача</th>
              <th v-for="role in roles.slice(0, 4)" :key="role.id" class="px-4 py-2 text-center font-medium text-gray-700 dark:text-gray-300">{{ role.name }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-dark-600">
            <tr v-for="i in 4" :key="i">
              <td class="px-4 py-2 text-gray-900 dark:text-white">Задача {{ i }}</td>
              <td v-for="j in 4" :key="`${i}-${j}`" class="px-4 py-2 text-center">
                <select class="input px-2 py-1 text-xs w-20">
                  <option value="">—</option>
                  <option value="R">R</option>
                  <option value="A">A</option>
                  <option value="C">C</option>
                  <option value="I">I</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-dark-800 rounded-lg p-8 max-w-md w-full">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">{{ editingRole ? 'Редактирование' : 'Новая роль' }}</h2>
        
        <form @submit.prevent="saveRole" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Должность</label>
            <input v-model="formData.name" type="text" class="input w-full" required>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Подразделение</label>
            <input v-model="formData.department" type="text" class="input w-full" required>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Руководитель</label>
            <input v-model="formData.head" type="text" class="input w-full">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Обязанности</label>
            <textarea v-model="formData.responsibilities" class="input w-full h-24"></textarea>
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
import { ref } from 'vue'

const showCreateModal = ref(false)
const editingRole = ref(null)

const roles = ref([
  {
    id: 1,
    name: 'Менеджер продаж',
    department: 'Продажи',
    head: 'Иван Петров',
    responsibilities: 'Управление продажами, работа с клиентами',
    processes: [1, 2],
    instructions: [1, 3]
  },
  {
    id: 2,
    name: 'Специалист по найму',
    department: 'HR',
    head: 'Мария Сидорова',
    responsibilities: 'Набор кадров, интервью',
    processes: [2],
    instructions: [2, 4]
  },
  {
    id: 3,
    name: 'Бухгалтер',
    department: 'Финансы',
    head: 'Петр Иванов',
    responsibilities: 'Учет, подготовка отчетов',
    processes: [3],
    instructions: [5]
  }
])

const formData = ref({
  name: '',
  department: '',
  head: '',
  responsibilities: ''
})

const editRole = (role: any) => {
  editingRole.value = role
  formData.value = { ...role }
  showCreateModal.value = true
}

const saveRole = () => {
  if (editingRole.value) {
    const index = roles.value.findIndex(r => r.id === editingRole.value.id)
    if (index !== -1) {
      roles.value[index] = { ...roles.value[index], ...formData.value }
    }
  } else {
    roles.value.push({
      id: Math.max(...roles.value.map(r => r.id), 0) + 1,
      ...formData.value,
      processes: [],
      instructions: []
    })
  }
  
  showCreateModal.value = false
  editingRole.value = null
  formData.value = { name: '', department: '', head: '', responsibilities: '' }
}

const deleteRole = (id: number) => {
  if (confirm('Вы уверены?')) {
    roles.value = roles.value.filter(r => r.id !== id)
  }
}
</script>

<style scoped>
</style>
