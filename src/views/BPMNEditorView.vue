<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">BPMN Редактор</h1>
      <div class="flex gap-2">
        <button @click="saveDiagram" class="btn btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          Сохранить
        </button>
        <button @click="exportBPMN" class="btn btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          Экспорт
        </button>
      </div>
    </div>

    <!-- BPMN Editor Container -->
    <div class="grid grid-cols-4 gap-6 h-[calc(100vh-200px)]">
      <!-- Palette/Toolbox -->
      <div class="card p-4 overflow-y-auto">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Элементы BPMN</h3>
        
        <!-- Tasks -->
        <div class="mb-4">
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Задачи</p>
          <div class="space-y-2">
            <div draggable class="p-3 bg-blue-100 dark:bg-blue-900 rounded cursor-move text-center text-sm font-medium text-blue-900 dark:text-blue-100 hover:shadow-md transition">
              Задача
            </div>
            <div draggable class="p-3 bg-green-100 dark:bg-green-900 rounded cursor-move text-center text-sm font-medium text-green-900 dark:text-green-100 hover:shadow-md transition">
              Пользовательская задача
            </div>
            <div draggable class="p-3 bg-purple-100 dark:bg-purple-900 rounded cursor-move text-center text-sm font-medium text-purple-900 dark:text-purple-100 hover:shadow-md transition">
              Сервисная задача
            </div>
          </div>
        </div>

        <!-- Events -->
        <div class="mb-4">
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">События</p>
          <div class="space-y-2">
            <div draggable class="p-3 bg-yellow-100 dark:bg-yellow-900 rounded cursor-move text-center text-sm font-medium text-yellow-900 dark:text-yellow-100 hover:shadow-md transition">
              Начало
            </div>
            <div draggable class="p-3 bg-red-100 dark:bg-red-900 rounded cursor-move text-center text-sm font-medium text-red-900 dark:text-red-100 hover:shadow-md transition">
              Конец
            </div>
          </div>
        </div>

        <!-- Gateways -->
        <div class="mb-4">
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Шлюзы</p>
          <div class="space-y-2">
            <div draggable class="p-3 bg-orange-100 dark:bg-orange-900 rounded cursor-move text-center text-sm font-medium text-orange-900 dark:text-orange-100 hover:shadow-md transition">
              Исключающий выбор
            </div>
            <div draggable class="p-3 bg-pink-100 dark:bg-pink-900 rounded cursor-move text-center text-sm font-medium text-pink-900 dark:text-pink-100 hover:shadow-md transition">
              Параллельный шлюз
            </div>
          </div>
        </div>
      </div>

      <!-- Canvas -->
      <div class="col-span-2 card p-4">
        <div id="bpmn-canvas" class="w-full h-full bg-gray-50 dark:bg-dark-700 rounded border border-gray-200 dark:border-dark-600 overflow-auto" @drop="handleDrop" @dragover.prevent>
          <canvas ref="canvas" class="w-full h-full"></canvas>
          <div class="text-center text-gray-400 dark:text-gray-500 pt-20">
            <p>Перетащите элементы сюда для создания диаграммы</p>
          </div>
        </div>
      </div>

      <!-- Properties Panel -->
      <div class="card p-4 overflow-y-auto">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Свойства</h3>
        
        <div v-if="selectedElement" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Название</label>
            <input v-model="selectedElement.name" type="text" class="input w-full text-sm">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Описание</label>
            <textarea v-model="selectedElement.description" class="input w-full text-sm h-24" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ответственный</label>
            <input v-model="selectedElement.responsible" type="text" class="input w-full text-sm">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SLA (часы)</label>
            <input v-model="selectedElement.sla" type="number" class="input w-full text-sm">
          </div>
          
          <button @click="deleteElement" class="btn btn-error w-full mt-4">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Удалить
          </button>
        </div>
        
        <div v-else class="text-gray-400 dark:text-gray-500 text-sm">
          <p>Выберите элемент на диаграмме для редактирования</p>
        </div>
      </div>
    </div>

    <!-- Versions Panel -->
    <div class="card p-4">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-3">История версий</h3>
      <div class="flex gap-2 overflow-x-auto pb-2">
        <button v-for="i in 5" :key="i" class="px-4 py-2 bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 rounded text-sm whitespace-nowrap transition">
          v{{ i }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const canvas = ref(null)
const selectedElement = ref(null)
const bpmnElements = reactive([])

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  const data = e.dataTransfer?.getData('text/plain')
  const x = e.clientX
  const y = e.clientY
  
  console.log('Dropped:', data, 'at', x, y)
  
  // Add element to canvas
  const element = {
    id: Date.now(),
    name: data,
    type: data,
    description: '',
    responsible: '',
    sla: 0,
    x,
    y
  }
  
  bpmnElements.push(element)
}

const saveDiagram = () => {
  console.log('Saving diagram...', bpmnElements)
  alert('Диаграмма сохранена!')
}

const exportBPMN = () => {
  console.log('Exporting BPMN...')
  const bpmnXml = JSON.stringify(bpmnElements, null, 2)
  const blob = new Blob([bpmnXml], { type: 'application/xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'process.bpmn'
  a.click()
}

const deleteElement = () => {
  if (selectedElement.value) {
    const index = bpmnElements.indexOf(selectedElement.value)
    if (index !== -1) {
      bpmnElements.splice(index, 1)
      selectedElement.value = null
    }
  }
}
</script>

<style scoped>
</style>
