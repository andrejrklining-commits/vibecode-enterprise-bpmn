<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      <button @click="refreshData" class="btn btn-primary">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        Обновить
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Всего процессов</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.totalProcesses }}</p>
          </div>
          <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5a2 2 0 012 2h2a2 2 0 012-2"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Инструкции</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.totalInstructions }}</p>
          </div>
          <div class="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
            <svg class="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747 0-5.002-4.5-10.747-10-10.747z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Роли</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.totalRoles }}</p>
          </div>
          <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 8.048M6.5 20H17.5a4 4 0 004-4V8a4 4 0 00-4-4H6.5a4 4 0 00-4 4v8a4 4 0 004 4z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Подразделения</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.totalDepartments }}</p>
          </div>
          <div class="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
            <svg class="w-6 h-6 text-orange-600 dark:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Activity Chart -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Активность пользователей</h2>
        <div class="h-64 bg-gray-50 dark:bg-dark-700 rounded-lg flex items-center justify-center text-gray-400">
          <p>График активности (интеграция с API)</p>
        </div>
      </div>

      <!-- Process Status -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Статус процессов</h2>
        <div class="space-y-3">
          <div v-for="(count, status) in processStatus" :key="status" class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400 capitalize">{{ status }}</span>
            <div class="flex items-center gap-2">
              <div class="w-32 bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                <div class="bg-primary h-2 rounded-full" :style="{ width: `${(count / totalProcesses) * 100}%` }"></div>
              </div>
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="card p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Недавняя активность</h2>
      <div class="space-y-3">
        <div v-for="i in 5" :key="i" class="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg transition">
          <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <span class="text-sm font-semibold text-blue-600 dark:text-blue-300">A</span>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900 dark:text-white">Создан новый процесс</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">1 час назад</p>
          </div>
          <span class="badge badge-primary">Новое</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const stats = ref({
  totalProcesses: 12,
  totalInstructions: 45,
  totalRoles: 8,
  totalDepartments: 5
})

const processStatus = ref({
  active: 8,
  draft: 2,
  archived: 2
})

const totalProcesses = computed(() => Object.values(processStatus.value).reduce((a, b) => a + b, 0))

const refreshData = () => {
  console.log('Refreshing dashboard data...')
}

onMounted(() => {
  console.log('Dashboard loaded')
})
</script>

<style scoped>
</style>
