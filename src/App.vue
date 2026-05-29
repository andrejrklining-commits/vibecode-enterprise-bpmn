<template>
  <div id="app" :class="{ dark: isDarkMode }" class="bg-white dark:bg-dark-900">
    <div class="min-h-screen">
      <nav class="sticky top-0 z-50 bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 shadow-sm">
        <div class="flex items-center justify-between px-6 py-4">
          <div class="flex items-center gap-3">
            <svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
            </svg>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">VibeCode BPMN</h1>
          </div>
          
          <div class="flex items-center gap-4">
            <button @click="appStore.toggleDarkMode" class="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition">
              <svg v-if="!appStore.isDarkMode" class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
              <svg v-else class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6m-1.78 7.78l-4.24-4.24m-5.08-5.08l-4.24-4.24"/>
              </svg>
            </button>
            
            <button @click="appStore.toggleSidebar" class="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition">
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div class="flex">
        <!-- Sidebar -->
        <aside v-if="appStore.sidebarOpen" class="w-64 bg-gray-50 dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
          <nav class="p-4 space-y-2">
            <router-link to="/" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-700 transition text-gray-700 dark:text-gray-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 16l-7-4m0 0V5m7 4l7-4m0 0v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9m9-4l-7 4"/></svg>
              <span>Dashboard</span>
            </router-link>

            <router-link to="/processes" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-700 transition text-gray-700 dark:text-gray-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              <span>Процессы</span>
            </router-link>

            <router-link to="/knowledge-base" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-700 transition text-gray-700 dark:text-gray-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747 0-5.002-4.5-10.747-10-10.747z"/></svg>
              <span>Knowledge Base</span>
            </router-link>

            <router-link to="/roles" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-700 transition text-gray-700 dark:text-gray-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 8.048M6.5 20H17.5a4 4 0 004-4V8a4 4 0 00-4-4H6.5a4 4 0 00-4 4v8a4 4 0 004 4z"/></svg>
              <span>Роли</span>
            </router-link>

            <router-link to="/departments" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-700 transition text-gray-700 dark:text-gray-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
              <span>Подразделения</span>
            </router-link>

            <router-link to="/analytics" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-700 transition text-gray-700 dark:text-gray-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
              <span>Аналитика</span>
            </router-link>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 p-6 overflow-auto h-[calc(100vh-4rem)]">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/appStore'

const appStore = useAppStore()
</script>

<style scoped>
:deep(.dark) {
  color-scheme: dark;
}
</style>
