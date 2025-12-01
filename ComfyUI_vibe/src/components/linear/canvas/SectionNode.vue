<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { CANVAS_LAYOUT, SECTION_COLORS } from '@/types/linearCanvas'
import type { SectionHeaderData } from '@/types/linearCanvas'

interface Props {
  id: string
  data: SectionHeaderData
  selected?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  rename: [id: string, name: string]
  resize: [id: string, width: number, height: number]
  delete: [id: string]
  changeColor: [id: string, color: string]
  toggleCollapse: [id: string]
}>()

// Editing state
const isEditing = ref(false)
const editName = ref(props.data.name)
const showColorPicker = ref(false)

// Resize state
const isResizing = ref(false)
const resizeHandle = ref<'e' | 'se' | 's' | null>(null)
const startSize = ref({ width: 0, height: 0 })
const startPos = ref({ x: 0, y: 0 })

// Computed dimensions
const width = computed(() => props.data.width)
const height = computed(() => props.data.collapsed ? CANVAS_LAYOUT.SECTION_HEADER_HEIGHT : props.data.height)

// Watch for external name changes
watch(() => props.data.name, (newName) => {
  editName.value = newName
})

function startEditing(): void {
  isEditing.value = true
  editName.value = props.data.name
}

function finishEditing(): void {
  if (editName.value.trim() && editName.value !== props.data.name) {
    emit('rename', props.id, editName.value.trim())
  }
  isEditing.value = false
}

function cancelEditing(): void {
  editName.value = props.data.name
  isEditing.value = false
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Enter') {
    finishEditing()
  } else if (event.key === 'Escape') {
    cancelEditing()
  }
}

function selectColor(color: string): void {
  emit('changeColor', props.id, color)
  showColorPicker.value = false
}

function handleDelete(): void {
  emit('delete', props.id)
}

function toggleCollapse(): void {
  emit('toggleCollapse', props.id)
}

// Resize handlers
function startResize(event: MouseEvent, handle: 'e' | 'se' | 's'): void {
  event.preventDefault()
  event.stopPropagation()

  isResizing.value = true
  resizeHandle.value = handle
  startSize.value = { width: props.data.width, height: props.data.height }
  startPos.value = { x: event.clientX, y: event.clientY }

  document.addEventListener('mousemove', handleResizeMove)
  document.addEventListener('mouseup', handleResizeEnd)
}

function handleResizeMove(event: MouseEvent): void {
  if (!isResizing.value || !resizeHandle.value) return

  const dx = event.clientX - startPos.value.x
  const dy = event.clientY - startPos.value.y

  let newWidth = startSize.value.width
  let newHeight = startSize.value.height

  if (resizeHandle.value === 'e' || resizeHandle.value === 'se') {
    newWidth = Math.max(CANVAS_LAYOUT.SECTION_MIN_WIDTH, startSize.value.width + dx)
  }

  if (resizeHandle.value === 's' || resizeHandle.value === 'se') {
    newHeight = Math.max(CANVAS_LAYOUT.SECTION_MIN_HEIGHT, startSize.value.height + dy)
  }

  emit('resize', props.id, newWidth, newHeight)
}

function handleResizeEnd(): void {
  isResizing.value = false
  resizeHandle.value = null
  document.removeEventListener('mousemove', handleResizeMove)
  document.removeEventListener('mouseup', handleResizeEnd)
}
</script>

<template>
  <div
    class="section-node relative rounded-xl border-2 transition-shadow"
    :class="[
      selected ? 'shadow-lg' : 'shadow-md',
      props.data.collapsed ? 'overflow-hidden' : ''
    ]"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      borderColor: props.data.color,
      backgroundColor: `${props.data.color}08`,
    }"
  >
    <!-- Header -->
    <div
      class="flex h-12 items-center gap-2 border-b px-3"
      :style="{
        backgroundColor: `${props.data.color}15`,
        borderColor: `${props.data.color}30`
      }"
    >
      <!-- Collapse toggle -->
      <button
        class="flex h-6 w-6 items-center justify-center rounded text-zinc-400 transition-colors hover:bg-white/10 hover:text-zinc-200"
        @click="toggleCollapse"
      >
        <i
          :class="[
            'pi text-xs transition-transform',
            props.data.collapsed ? 'pi-chevron-right' : 'pi-chevron-down'
          ]"
        />
      </button>

      <!-- Color indicator/picker -->
      <div class="relative">
        <button
          class="h-4 w-4 rounded-full border border-white/20 transition-transform hover:scale-110"
          :style="{ backgroundColor: props.data.color }"
          @click="showColorPicker = !showColorPicker"
        />

        <!-- Color picker dropdown -->
        <div
          v-if="showColorPicker"
          class="absolute left-0 top-full z-50 mt-2 grid grid-cols-5 gap-1 rounded-lg border border-zinc-700 bg-zinc-900 p-2 shadow-xl"
        >
          <button
            v-for="color in SECTION_COLORS"
            :key="color.value"
            class="h-6 w-6 rounded-full border-2 transition-transform hover:scale-110"
            :class="props.data.color === color.value ? 'border-white' : 'border-transparent'"
            :style="{ backgroundColor: color.value }"
            :title="color.name"
            @click="selectColor(color.value)"
          />
        </div>
      </div>

      <!-- Section name -->
      <div class="flex-1 min-w-0">
        <input
          v-if="isEditing"
          v-model="editName"
          type="text"
          class="w-full rounded bg-zinc-800 px-2 py-1 text-sm font-semibold text-white outline-none ring-1 ring-white/30 focus:ring-white/50"
          autofocus
          @blur="finishEditing"
          @keydown="handleKeydown"
        />
        <button
          v-else
          class="truncate text-left text-sm font-semibold text-white hover:text-white/80"
          @dblclick="startEditing"
        >
          {{ props.data.name }}
        </button>
      </div>

      <!-- Item count -->
      <span class="rounded-full bg-white/10 px-2 py-0.5 text-xs text-zinc-400">
        {{ props.data.itemCount }}
      </span>

      <!-- Actions -->
      <div class="flex items-center gap-1">
        <button
          class="flex h-6 w-6 items-center justify-center rounded text-zinc-400 transition-colors hover:bg-white/10 hover:text-zinc-200"
          title="Edit name"
          @click="startEditing"
        >
          <i class="pi pi-pencil text-xs" />
        </button>
        <button
          class="flex h-6 w-6 items-center justify-center rounded text-zinc-400 transition-colors hover:bg-red-500/20 hover:text-red-400"
          title="Delete section"
          @click="handleDelete"
        >
          <i class="pi pi-trash text-xs" />
        </button>
      </div>
    </div>

    <!-- Content area (shown when not collapsed) -->
    <div
      v-if="!props.data.collapsed"
      class="section-content"
      :style="{ height: `${height - CANVAS_LAYOUT.SECTION_HEADER_HEIGHT}px` }"
    >
      <!-- Drop zone indicator -->
      <div class="flex h-full items-center justify-center text-zinc-600">
        <span class="text-xs">Drop media here or drag to organize</span>
      </div>
    </div>

    <!-- Resize handles (shown when not collapsed) -->
    <template v-if="!props.data.collapsed">
      <!-- Right edge -->
      <div
        class="absolute right-0 top-12 w-2 cursor-ew-resize transition-colors hover:bg-white/20"
        :style="{ height: `${height - CANVAS_LAYOUT.SECTION_HEADER_HEIGHT - 8}px` }"
        @mousedown="(e) => startResize(e, 'e')"
      />

      <!-- Bottom edge -->
      <div
        class="absolute bottom-0 left-12 h-2 cursor-ns-resize transition-colors hover:bg-white/20"
        :style="{ width: `${width - 24}px` }"
        @mousedown="(e) => startResize(e, 's')"
      />

      <!-- Corner (SE) -->
      <div
        class="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize rounded-br-xl transition-colors hover:bg-white/20"
        @mousedown="(e) => startResize(e, 'se')"
      >
        <svg
          class="absolute bottom-1 right-1 h-2 w-2 text-zinc-500"
          viewBox="0 0 8 8"
          fill="currentColor"
        >
          <path d="M8 8H6V6H8V8ZM8 4H6V2H8V4ZM4 8H2V6H4V8Z" />
        </svg>
      </div>
    </template>
  </div>
</template>

<style scoped>
.section-node {
  pointer-events: auto;
}

.section-content {
  position: relative;
  overflow: hidden;
}
</style>
