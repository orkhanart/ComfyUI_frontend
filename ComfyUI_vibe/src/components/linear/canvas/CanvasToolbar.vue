<script setup lang="ts">
import { ref } from 'vue'

type ToolId = 'select' | 'group' | 'ungroup' | 'section' | 'note' | 'annotation' | 'text' | 'pen' | 'highlighter'

const activeTool = ref<ToolId>('select')

const tools: Array<{ id: ToolId; icon: string; label: string; dividerAfter?: boolean }> = [
  { id: 'select', icon: 'pi-arrow-up-left', label: 'Select' },
  { id: 'group', icon: 'pi-objects-column', label: 'Group', dividerAfter: false },
  { id: 'ungroup', icon: 'pi-table', label: 'Ungroup', dividerAfter: true },
  { id: 'section', icon: 'pi-stop', label: 'Section' },
  { id: 'note', icon: 'pi-bookmark', label: 'Sticky Note' },
  { id: 'annotation', icon: 'pi-comment', label: 'Annotation', dividerAfter: true },
  { id: 'text', icon: 'pi-at', label: 'Text' },
  { id: 'pen', icon: 'pi-pencil', label: 'Pen' },
  { id: 'highlighter', icon: 'pi-eraser', label: 'Highlighter' },
]

const emit = defineEmits<{
  selectTool: [tool: ToolId]
}>()

function selectTool(tool: ToolId): void {
  activeTool.value = tool
  emit('selectTool', tool)
}
</script>

<template>
  <div class="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
    <div class="flex items-center gap-0.5 rounded-xl border border-zinc-800 bg-zinc-900/95 p-1.5 shadow-lg backdrop-blur">
      <template v-for="tool in tools" :key="tool.id">
        <button
          v-tooltip.top="tool.label"
          :class="[
            'flex h-8 w-8 items-center justify-center rounded-lg transition-all',
            activeTool === tool.id
              ? 'bg-zinc-700 text-zinc-100'
              : 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300'
          ]"
          @click="selectTool(tool.id)"
        >
          <i :class="['pi', tool.icon, 'text-sm']" />
        </button>
        <div v-if="tool.dividerAfter" class="mx-1 h-5 w-px bg-zinc-700" />
      </template>
    </div>
  </div>
</template>
