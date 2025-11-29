<script setup lang="ts">
import { ref } from 'vue'
import LinearTopBar from '@/components/linear/LinearTopBar.vue'
import LinearIconSidebar, { type LinearTab } from '@/components/linear/LinearIconSidebar.vue'
import LinearChatPanel from '@/components/linear/LinearChatPanel.vue'
import LinearWorkflowsPanel from '@/components/linear/LinearWorkflowsPanel.vue'
import LinearAppsPanel from '@/components/linear/LinearAppsPanel.vue'
import LinearModelsPanel from '@/components/linear/LinearModelsPanel.vue'
import LinearHistoryPanel from '@/components/linear/LinearHistoryPanel.vue'

const activeTab = ref<LinearTab>('chat')
</script>

<template>
  <div class="linear-view flex h-screen flex-col bg-zinc-950">
    <!-- Top Bar with Logo and Projects -->
    <LinearTopBar />

    <!-- Main Content -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left Icon Sidebar (Chat, Workflows, Apps) -->
      <LinearIconSidebar v-model:active-tab="activeTab" />

      <!-- Left Panel - switches based on active tab -->
      <LinearChatPanel v-if="activeTab === 'chat'" />
      <LinearWorkflowsPanel v-else-if="activeTab === 'workflows'" />
      <LinearAppsPanel v-else-if="activeTab === 'apps'" />
      <LinearModelsPanel v-else-if="activeTab === 'models'" />

      <!-- Right Main Area (generations) -->
      <LinearHistoryPanel />
    </div>
  </div>
</template>

<style scoped>
.linear-view {
  font-family: var(--font-sans, system-ui);
}
</style>
