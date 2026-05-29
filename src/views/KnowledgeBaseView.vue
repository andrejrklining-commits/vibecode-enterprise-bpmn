<template>
  <div class="space-y-6">
    <!-- Header with Search -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Knowledge Base</h1>
      <button @click="showCreateModal = true" class="btn btn-primary">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Новая инструкция
      </button>
    </div>

    <!-- Search Bar -->
    <div class="relative">
      <svg class="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Поиск инструкций..." 
        class="input pl-10 w-full"
      >
    </div>

    <!-- Instructions Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="instruction in filteredInstructions" :key="instruction.id" class="card p-6 hover:shadow-lg transition cursor-pointer" @click="viewInstruction(instruction)">
        <div class="flex items-start justify-between mb-3">
          <h3 class="font-semibold text-gray-900 dark:text-white">{{ instruction.name }}</h3>
          <button @click.stop="deleteInstruction(instruction.id)" class="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded">
            <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
        
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ instruction.description }}</p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span v-for="tag in instruction.tags" :key="tag" class="badge badge-primary text-xs">{{ tag }}</span>
        </div>
        
        <div class="flex items-center justify-between text-xs text-gray-500">
          <span>v{{ instruction.version }}</span>
          <span>{{ formatDate(instruction.updatedAt) }}</span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredInstructions.length === 0" class="card p-12 text-center">
      <svg class="w-16 h-16 mx-auto text-gray-300 dark:text-dark-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747 0-5.002-4.5-10.747-10-10.747z"/>
      </svg>
      <p class="text-gray-500 dark:text-gray-400 mb-4">Инструкции не найдены</p>
      <button @click="showCreateModal = true" class="btn btn-primary">Создать первую инструкцию</button>
    </div>

    <!-- View Modal -->
    <div v-if="viewingInstruction" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-dark-800 rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ viewingInstruction.name }}</h2>
          <button @click="viewingInstruction = null" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div v-html="viewingInstruction.content" class="prose dark:prose-invert mb-6"></div>
        
        <div class="flex gap-3">
          <button @click="editInstruction(viewingInstruction)" class="btn btn-primary">Редактировать</button>
          <button @click="viewingInstruction = null" class="btn btn-secondary">Закрыть</button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-dark-800 rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">{{ editingInstruction ? 'Редактирование' : 'Новая инструкция' }}</h2>
        
        <form @submit.prevent="saveInstruction" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Название</label>
            <input v-model="formData.name" type="text" class="input w-full" required>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Описание</label>
            <textarea v-model="formData.description" class="input w-full h-20" required></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Содержание (Markdown)</label>
            <textarea v-model="formData.content" class="input w-full h-40 font-mono text-sm" required></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Теги (через запятую)</label>
            <input v-model="tagInput" type="text" placeholder="tag1, tag2, tag3" class="input w-full">
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

const searchQuery = ref('')
const showCreateModal = ref(false)
const editingInstruction = ref(null)
const viewingInstruction = ref(null)
const tagInput = ref('')

const instructions = ref([
  {
    id: 1,
    name: 'Процесс обработки заказа',
    description: 'Инструкция по обработке и выполнению клиентских заказов',
    content: '# Процесс обработки заказа\n\n1. Получить заказ\n2. Проверить наличие\n3. Подготовить к отправке',
    type: 'process',
    author: 'Админ',
    version: 2,
    updatedAt: '2024-05-28',
    tags: ['продажи', 'логистика']
  },
  {
    id: 2,
    name: 'Регламент принятия платежей',
    description: 'Полный регламент по работе с платежами и счетами',
    content: '# Регламент платежей\n\n- Принимаем карты\n- Принимаем переводы\n- Выставляем счета',
    type: 'regulation',
    author: 'Финан',
    version: 1,
    updatedAt: '2024-05-20',
    tags: ['финансы', 'платежи']
  }
])

const formData = ref({
  name: '',
  description: '',
  content: '',
  type: 'instruction'
})

const filteredInstructions = computed(() => {
  return instructions.value.filter(i =>
    i.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    i.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    i.tags.some(t => t.toLowerCase().includes(searchQuery.value.toLowerCase()))
  )
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU')
}

const viewInstruction = (instruction: any) => {
  viewingInstruction.value = instruction
}

const editInstruction = (instruction: any) => {
  editingInstruction.value = instruction
  formData.value = { ...instruction }
  tagInput.value = instruction.tags.join(', ')
  viewingInstruction.value = null
  showCreateModal.value = true
}

const saveInstruction = () => {
  const tags = tagInput.value.split(',').map(t => t.trim()).filter(Boolean)
  
  if (editingInstruction.value) {
    const index = instructions.value.findIndex(i => i.id === editingInstruction.value.id)
    if (index !== -1) {
      instructions.value[index] = {
        ...instructions.value[index],
        ...formData.value,
        tags,
        version: instructions.value[index].version + 1,
        updatedAt: new Date().toISOString().split('T')[0]
      }
    }
  } else {
    instructions.value.push({
      id: Math.max(...instructions.value.map(i => i.id), 0) + 1,
      ...formData.value,
      author: 'Текущий пользователь',
      version: 1,
      updatedAt: new Date().toISOString().split('T')[0],
      tags
    })
  }
  
  showCreateModal.value = false
  editingInstruction.value = null
  formData.value = { name: '', description: '', content: '', type: 'instruction' }
  tagInput.value = ''
}

const deleteInstruction = (id: number) => {
  if (confirm('Вы уверены?')) {
    instructions.value = instructions.value.filter(i => i.id !== id)
  }
}
</script>

<style scoped>
</style>
