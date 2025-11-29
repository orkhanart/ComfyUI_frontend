<script setup lang="ts">
import { ref, computed } from 'vue'
import Popover from 'primevue/popover'

export interface Workflow {
  id: string
  name: string
  description: string
  icon: string
  category: 'image' | 'video' | 'audio' | 'text'
}

export interface AgentMode {
  id: string
  name: string
  description: string
  icon: string
}

const props = defineProps<{
  workflows: Workflow[]
  selectedWorkflowId: string
  agentModes: AgentMode[]
  selectedModeId: string
  showParameters: boolean
}>()

const emit = defineEmits<{
  'update:selectedWorkflowId': [id: string]
  'update:selectedModeId': [id: string]
  'update:showParameters': [show: boolean]
  browseWorkflows: []
}>()

const workflowSelectorRef = ref()
const modeSelectorRef = ref()

const selectedWorkflow = computed(() =>
  props.workflows.find(w => w.id === props.selectedWorkflowId)
)

const selectedMode = computed(() =>
  props.agentModes.find(m => m.id === props.selectedModeId)
)

const imageWorkflows = computed(() =>
  props.workflows.filter(w => w.category === 'image')
)

const videoWorkflows = computed(() =>
  props.workflows.filter(w => w.category === 'video')
)

function toggleWorkflowSelector(event: Event): void {
  workflowSelectorRef.value?.toggle(event)
}

function selectWorkflow(id: string): void {
  emit('update:selectedWorkflowId', id)
  workflowSelectorRef.value?.hide()
}

function toggleModeSelector(event: Event): void {
  modeSelectorRef.value?.toggle(event)
}

function selectMode(id: string): void {
  emit('update:selectedModeId', id)
  modeSelectorRef.value?.hide()
}
</script>

<template>
  <div class="flex items-center gap-1.5">
    <!-- Workflow Selector -->
    <button
      class="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-2 py-1.5 text-xs text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200"
      @click="toggleWorkflowSelector"
    >
      <i :class="['pi', selectedWorkflow?.icon, 'text-[10px]']" />
      <span>{{ selectedWorkflow?.name }}</span>
      <i class="pi pi-chevron-down text-[10px] text-zinc-500" />
    </button>

    <!-- Mode Selector -->
    <button
      class="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-2 py-1.5 text-xs text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200"
      @click="toggleModeSelector"
    >
      <i :class="['pi', selectedMode?.icon, 'text-[10px]']" />
      <span>{{ selectedMode?.name }}</span>
      <i class="pi pi-chevron-down text-[10px] text-zinc-500" />
    </button>

    <div class="flex-1" />

    <!-- Parameters Toggle -->
    <button
      v-tooltip.top="'Parameters'"
      :class="[
        'flex h-7 w-7 items-center justify-center rounded-lg transition-colors',
        showParameters
          ? 'bg-zinc-700 text-zinc-200'
          : 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300'
      ]"
      @click="emit('update:showParameters', !showParameters)"
    >
      <i class="pi pi-sliders-h text-xs" />
    </button>

    <!-- Workflow Selector Popover -->
    <Popover ref="workflowSelectorRef" class="w-64">
      <div class="flex flex-col">
        <div class="border-b border-zinc-800 px-3 py-2">
          <p class="text-[10px] font-medium uppercase tracking-wide text-zinc-500">Select Workflow</p>
        </div>
        <div class="max-h-72 overflow-y-auto p-2">
          <!-- Image workflows -->
          <p class="mb-1 px-2 text-[10px] font-medium uppercase tracking-wide text-zinc-500">Image</p>
          <button
            v-for="wf in imageWorkflows"
            :key="wf.id"
            :class="[
              'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors',
              wf.id === selectedWorkflowId
                ? 'bg-zinc-800 text-zinc-200'
                : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300'
            ]"
            @click="selectWorkflow(wf.id)"
          >
            <i :class="['pi', wf.icon, 'text-xs']" />
            <div class="flex-1">
              <p class="text-xs font-medium">{{ wf.name }}</p>
              <p class="text-[10px] text-zinc-500">{{ wf.description }}</p>
            </div>
            <i v-if="wf.id === selectedWorkflowId" class="pi pi-check text-[10px] text-zinc-400" />
          </button>

          <!-- Video workflows -->
          <p v-if="videoWorkflows.length" class="mb-1 mt-2 px-2 text-[10px] font-medium uppercase tracking-wide text-zinc-500">Video</p>
          <button
            v-for="wf in videoWorkflows"
            :key="wf.id"
            :class="[
              'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors',
              wf.id === selectedWorkflowId
                ? 'bg-zinc-800 text-zinc-200'
                : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300'
            ]"
            @click="selectWorkflow(wf.id)"
          >
            <i :class="['pi', wf.icon, 'text-xs']" />
            <div class="flex-1">
              <p class="text-xs font-medium">{{ wf.name }}</p>
              <p class="text-[10px] text-zinc-500">{{ wf.description }}</p>
            </div>
            <i v-if="wf.id === selectedWorkflowId" class="pi pi-check text-[10px] text-zinc-400" />
          </button>
        </div>
        <div class="border-t border-zinc-800 p-2">
          <button
            class="flex w-full items-center justify-center gap-2 rounded-lg px-2.5 py-2 text-xs text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
            @click="emit('browseWorkflows')"
          >
            <i class="pi pi-folder-open text-[10px]" />
            <span>Browse all workflows...</span>
          </button>
        </div>
      </div>
    </Popover>

    <!-- Mode Selector Popover -->
    <Popover ref="modeSelectorRef" class="w-56">
      <div class="flex flex-col">
        <div class="border-b border-zinc-800 px-3 py-2">
          <p class="text-[10px] font-medium uppercase tracking-wide text-zinc-500">Agent Mode</p>
        </div>
        <div class="p-2">
          <button
            v-for="mode in agentModes"
            :key="mode.id"
            :class="[
              'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors',
              mode.id === selectedModeId
                ? 'bg-zinc-800 text-zinc-200'
                : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300'
            ]"
            @click="selectMode(mode.id)"
          >
            <i :class="['pi', mode.icon, 'text-xs']" />
            <div class="flex-1">
              <p class="text-xs font-medium">{{ mode.name }}</p>
              <p class="text-[10px] text-zinc-500">{{ mode.description }}</p>
            </div>
            <i v-if="mode.id === selectedModeId" class="pi pi-check text-[10px] text-zinc-400" />
          </button>
        </div>
      </div>
    </Popover>
  </div>
</template>
