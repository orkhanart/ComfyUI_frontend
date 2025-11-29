<script setup lang="ts">
import { ref } from 'vue'
import LinearTopBar from '@/components/linear/LinearTopBar.vue'
import LinearIconSidebar, { type LinearTab } from '@/components/linear/LinearIconSidebar.vue'
import LinearCreationPanel from '@/components/linear/LinearCreationPanel.vue'
import LinearChatPanel from '@/components/linear/LinearChatPanel.vue'
import LinearHistoryPanel from '@/components/linear/LinearHistoryPanel.vue'

const activeTab = ref<LinearTab>('tool')
</script>

<template>
  <div class="linear-view flex h-screen flex-col bg-zinc-950">
    <!-- Top Bar with Logo and Projects -->
    <LinearTopBar />

    <!-- Main Content -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left Icon Sidebar (Projects, Chat, Tool, Apps, Workflow) -->
      <LinearIconSidebar v-model:active-tab="activeTab" />

      <!-- Left Panel - switches based on active tab -->
      <LinearChatPanel v-if="activeTab === 'chat'" />
      <LinearCreationPanel v-else />

      <!-- Right Main Area (queue/history) -->
      <LinearHistoryPanel />
    </div>
  </div>
</template>

<style scoped>
.linear-view {
  font-family: var(--font-sans, system-ui);
}
</style>
