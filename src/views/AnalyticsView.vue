<template>
  <div class="space-y-6">
    <!-- Header -->
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Аналитика</h1>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="card p-6">
        <p class="text-sm text-gray-600 dark:text-gray-400">Процессы без владельца</p>
        <p class="text-3xl font-bold text-red-600 mt-2">2</p>
      </div>
      <div class="card p-6">
        <p class="text-sm text-gray-600 dark:text-gray-400">Устаревшие инструкции</p>
        <p class="text-3xl font-bold text-yellow-600 mt-2">5</p>
      </div>
      <div class="card p-6">
        <p class="text-sm text-gray-600 dark:text-gray-400">Использование процессов</p>
        <p class="text-3xl font-bold text-green-600 mt-2">87%</p>
      </div>
      <div class="card p-6">
        <p class="text-sm text-gray-600 dark:text-gray-400">Процессы без KPI</p>
        <p class="text-3xl font-bold text-orange-600 mt-2">3</p>
      </div>
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Process Usage Heatmap -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Heatmap использования</h2>
        <div class="space-y-3">
          <div v-for="process in processes" :key="process.id" class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400 w-32">{{ process.name }}</span>
            <div class="flex-1 mx-4">
              <div class="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                <div 
                  class="bg-primary h-2 rounded-full transition-all" 
                  :style="{ width: process.usage + '%' }"
                ></div>
              </div>
            </div>
            <span class="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">{{ process.usage }}%</span>
          </div>
        </div>
      </div>

      <!-- Activity Timeline -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Активность по дням</h2>
        <div class="h-64 bg-gray-50 dark:bg-dark-700 rounded-lg flex items-center justify-center text-gray-400">
          <p>График активности (интеграция с API)</p>
        </div>
      </div>
    </div>

    <!-- Issues and Recommendations -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Проблемы</h2>
        <div class="space-y-3">
          <div class="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <svg class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <div>
              <p class="text-sm font-medium text-red-900 dark:text-red-100">Процесс "Найм" без владельца</p>
              <p class="text-xs text-red-700 dark:text-red-200">Требуется назначение ответственного</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <svg class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
            </svg>
            <div>
              <p class="text-sm font-medium text-yellow-900 dark:text-yellow-100">Инструкция устарела</p>
              <p class="text-xs text-yellow-700 dark:text-yellow-200">"Регламент платежей" не обновлялась 3 месяца</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Рекомендации</h2>
        <div class="space-y-3">
          <div class="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <div>
              <p class="text-sm font-medium text-blue-900 dark:text-blue-100">Добавить KPI к процессам</p>
              <p class="text-xs text-blue-700 dark:text-blue-200">3 процесса без целевых показателей</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <div>
              <p class="text-sm font-medium text-green-900 dark:text-green-100">Оптимизация процесса "Продажи"</p>
              <p class="text-xs text-green-700 dark:text-green-200">Потенциал экономии времени: 15%</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Statistics -->
    <div class="card p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Детальная статистика</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 dark:bg-dark-700">
            <tr>
              <th class="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Процесс</th>
              <th class="px-4 py-2 text-center font-medium text-gray-700 dark:text-gray-300">Использование</th>
              <th class="px-4 py-2 text-center font-medium text-gray-700 dark:text-gray-300">Среднее время</th>
              <th class="px-4 py-2 text-center font-medium text-gray-700 dark:text-gray-300">Ошибки</th>
              <th class="px-4 py-2 text-center font-medium text-gray-700 dark:text-gray-300">KPI</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-dark-600">
            <tr v-for="process in processes" :key="process.id">
              <td class="px-4 py-2 text-gray-900 dark:text-white">{{ process.name }}</td>
              <td class="px-4 py-2 text-center text-gray-600 dark:text-gray-400">{{ process.usage }}%</td>
              <td class="px-4 py-2 text-center text-gray-600 dark:text-gray-400">{{ process.avgTime }}м</td>
              <td class="px-4 py-2 text-center text-gray-600 dark:text-gray-400">{{ process.errors }}</td>
              <td class="px-4 py-2 text-center">
                <span v-if="process.kpi" class="badge badge-success">✓</span>
                <span v-else class="badge badge-error">✗</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const processes = ref([
  { id: 1, name: 'Процесс продаж', usage: 92, avgTime: 15, errors: 2, kpi: true },
  { id: 2, name: 'Найм сотрудников', usage: 45, avgTime: 120, errors: 1, kpi: true },
  { id: 3, name: 'Обработка счетов', usage: 78, avgTime: 30, errors: 0, kpi: false },
  { id: 4, name: 'Отпуска и больничные', usage: 88, avgTime: 20, errors: 3, kpi: true },
  { id: 5, name: 'Закупки', usage: 65, avgTime: 45, errors: 1, kpi: false }
])
</script>

<style scoped>
</style>
