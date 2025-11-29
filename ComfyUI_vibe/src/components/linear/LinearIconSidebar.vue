<script setup lang="ts">
import { ref } from 'vue'

export type LinearTab = 'chat' | 'workflows' | 'apps' | 'models'

const props = defineProps<{
  activeTab?: LinearTab
}>()

const emit = defineEmits<{
  'update:activeTab': [tab: LinearTab]
}>()

const isExpanded = ref(false)

const tabs: Array<{ id: LinearTab; icon: string; label: string }> = [
  { id: 'chat', icon: 'pi-comments', label: 'Chat' },
  { id: 'workflows', icon: 'pi-play', label: 'Workflows' },
  { id: 'apps', icon: 'pi-th-large', label: 'Apps' },
  { id: 'models', icon: 'pi-box', label: 'Models' },
]

function selectTab(tab: LinearTab): void {
  emit('update:activeTab', tab)
}

function toggleExpand(): void {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <aside
    :class="[
      'flex h-full flex-col border-r border-zinc-800 bg-zinc-900 py-2 transition-all duration-200',
      isExpanded ? 'w-36' : 'w-12'
    ]"
  >
    <!-- Tab Buttons -->
    <div class="flex flex-col gap-1 px-1">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        v-tooltip.right="!isExpanded ? tab.label : undefined"
        :class="[
          'flex h-10 items-center gap-3 rounded-lg transition-colors',
          isExpanded ? 'px-3' : 'justify-center',
          props.activeTab === tab.id
            ? 'bg-zinc-800 text-zinc-100'
            : 'text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300'
        ]"
        @click="selectTab(tab.id)"
      >
        <i :class="['pi', tab.icon, 'text-base shrink-0']" />
        <span
          v-if="isExpanded"
          class="truncate text-xs font-medium"
        >
          {{ tab.label }}
        </span>
      </button>
    </div>

    <!-- Spacer -->
    <div class="flex-1" />

    <!-- Bottom Actions -->
    <div class="flex flex-col gap-1 px-1">
      <!-- Collapse/Expand Toggle -->
      <button
        v-tooltip.right="isExpanded ? 'Collapse' : 'Expand'"
        :class="[
          'flex h-10 items-center gap-3 rounded-lg text-zinc-500 transition-colors hover:bg-zinc-800/50 hover:text-zinc-300',
          isExpanded ? 'px-3' : 'justify-center'
        ]"
        @click="toggleExpand"
      >
        <i :class="['pi text-base shrink-0', isExpanded ? 'pi-chevron-left' : 'pi-chevron-right']" />
        <span v-if="isExpanded" class="text-xs font-medium">Collapse</span>
      </button>

      <!-- Settings -->
      <button
        v-tooltip.right="!isExpanded ? 'Settings' : undefined"
        :class="[
          'flex h-10 items-center gap-3 rounded-lg text-zinc-500 transition-colors hover:bg-zinc-800/50 hover:text-zinc-300',
          isExpanded ? 'px-3' : 'justify-center'
        ]"
      >
        <i class="pi pi-cog text-base shrink-0" />
        <span v-if="isExpanded" class="text-xs font-medium">Settings</span>
      </button>
    </div>
  </aside>
</template>
