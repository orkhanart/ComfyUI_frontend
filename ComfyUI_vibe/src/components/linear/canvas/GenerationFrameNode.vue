<script setup lang="ts">
import { computed, ref } from 'vue'
import type { GenerationFrameData } from '@/types/linearCanvas'

interface Props {
  id: string
  data: GenerationFrameData
  selected?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  rerun: [id: string]
  download: [id: string]
  delete: [id: string]
  ungroup: [id: string]
  extractImage: [generationId: string, imageIndex: number, imageUrl: string]
  reorderImages: [generationId: string, fromIndex: number, toIndex: number]
  addImage: [generationId: string, imageUrl: string]
  preview: [imageUrl: string]
}>()

// Internal drag state for reordering
const dragFromIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)
const isDragOver = ref(false)

function formatTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date)
}

const statusColor = computed(() => {
  switch (props.data.status) {
    case 'generating':
      return 'bg-blue-500/20'
    case 'queued':
      return 'bg-amber-500/20'
    case 'completed':
      return 'bg-emerald-500/10'
  }
})

const borderColor = computed(() => {
  switch (props.data.status) {
    case 'generating':
      return 'border-blue-500/30'
    case 'queued':
      return 'border-amber-500/30'
    case 'completed':
      return 'border-emerald-500/20'
  }
})

const statusDotColor = computed(() => {
  switch (props.data.status) {
    case 'generating':
      return 'bg-blue-400'
    case 'queued':
      return 'bg-amber-400'
    case 'completed':
      return 'bg-emerald-400'
  }
})

// Label blob background color (object recognition style)
const labelBgColor = computed(() => {
  switch (props.data.status) {
    case 'generating':
      return 'bg-blue-500/90'
    case 'queued':
      return 'bg-amber-500/90'
    case 'completed':
      return 'bg-emerald-500/90'
  }
})

const statusText = computed(() => {
  switch (props.data.status) {
    case 'generating':
      return 'Generating'
    case 'queued':
      return 'Queued'
    case 'completed':
      return 'Completed'
  }
})

// Calculate grid based on image count
const imageSize = 140
const gap = 12
const padding = 16

const frameWidth = computed(() => {
  const count = props.data.images.length || props.data.batchSize
  const cols = count <= 2 ? count : 2
  return cols * imageSize + (cols - 1) * gap + padding * 2
})

const frameHeight = computed(() => {
  const count = props.data.images.length || props.data.batchSize
  const rows = Math.ceil(count / 2)
  return rows * imageSize + (rows - 1) * gap + padding * 2 + 32 // 32 for label
})

const truncatedPrompt = computed(() => {
  const maxLength = 40
  if (props.data.prompt.length <= maxLength) return props.data.prompt
  return props.data.prompt.slice(0, maxLength) + '...'
})

// Drag handling for extracting images or reordering
function handleDragStart(event: DragEvent, imageUrl: string, index: number): void {
  event.stopPropagation()
  dragFromIndex.value = index

  if (!event.dataTransfer) return
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('application/json', JSON.stringify({
    type: 'extract-image',
    generationId: props.id,
    imageIndex: index,
    imageUrl,
  }))
}

function handleDragOver(event: DragEvent, index: number): void {
  event.preventDefault()
  event.stopPropagation()
  if (dragFromIndex.value !== null && dragFromIndex.value !== index) {
    dragOverIndex.value = index
  }
}

function handleDragLeave(): void {
  dragOverIndex.value = null
}

function handleDrop(event: DragEvent, toIndex: number): void {
  event.preventDefault()
  event.stopPropagation()

  if (dragFromIndex.value !== null && dragFromIndex.value !== toIndex) {
    emit('reorderImages', props.id, dragFromIndex.value, toIndex)
  }

  dragFromIndex.value = null
  dragOverIndex.value = null
}

function handleDragEnd(): void {
  dragFromIndex.value = null
  dragOverIndex.value = null
}

function handleImageClick(event: MouseEvent, imageUrl: string, index: number): void {
  if (event.detail === 2) {
    emit('extractImage', props.id, index, imageUrl)
  }
}

// Section drop zone handlers (for adding images back to section)
function handleSectionDragOver(event: DragEvent): void {
  event.preventDefault()
  event.stopPropagation()

  if (!event.dataTransfer) return

  // Check if it's an image being dragged from outside this section
  const data = event.dataTransfer.types.includes('application/json')
  if (data) {
    isDragOver.value = true
    event.dataTransfer.dropEffect = 'move'
  }
}

function handleSectionDragLeave(event: DragEvent): void {
  // Only set to false if leaving the section entirely
  const relatedTarget = event.relatedTarget as HTMLElement | null
  if (!relatedTarget || !event.currentTarget || !(event.currentTarget as HTMLElement).contains(relatedTarget)) {
    isDragOver.value = false
  }
}

function handleSectionDrop(event: DragEvent): void {
  event.preventDefault()
  event.stopPropagation()
  isDragOver.value = false

  if (!event.dataTransfer) return

  try {
    const jsonData = event.dataTransfer.getData('application/json')
    if (!jsonData) return

    const data = JSON.parse(jsonData) as { type: string; generationId: string; imageUrl: string }

    // Only accept if it's from a different section or a standalone image
    if (data.type === 'extract-image' && data.generationId !== props.id) {
      emit('addImage', props.id, data.imageUrl)
    } else if (data.type === 'standalone-image') {
      emit('addImage', props.id, data.imageUrl)
    }
  } catch {
    // Invalid JSON, ignore
  }
}
</script>

<template>
  <div
    :class="[
      'generation-section group relative transition-all',
      selected && 'ring-2 ring-blue-500/50',
    ]"
    :style="{
      width: `${frameWidth}px`,
    }"
  >
    <!-- Section Header (full width bar with border) -->
    <div
      :class="[
        'section-header flex items-center justify-between rounded-t border-2 border-b-0 px-2.5 py-1',
        labelBgColor,
        borderColor,
      ]"
    >
      <!-- Left: Status + Prompt -->
      <div class="flex min-w-0 flex-1 items-center gap-1.5">
        <span
          :class="[
            'h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white',
            data.status === 'generating' && 'animate-pulse',
          ]"
        />
        <span class="flex-shrink-0 text-[10px] font-semibold uppercase tracking-wide text-white">
          {{ statusText }}
        </span>
        <span class="flex-shrink-0 text-white/30">·</span>
        <span class="min-w-0 truncate text-[10px] text-white/70">
          {{ truncatedPrompt }}
        </span>
      </div>

      <!-- Right: Time + Actions -->
      <div class="flex flex-shrink-0 items-center gap-1.5 pl-2">
        <span class="text-[9px] text-white/50">{{ formatTime(data.createdAt) }}</span>
        <div class="flex items-center">
          <button
            v-tooltip.top="'Rerun'"
            class="flex h-5 w-5 items-center justify-center rounded text-white/70 transition-colors hover:bg-white/20 hover:text-white"
            @click.stop="emit('rerun', id)"
          >
            <i class="pi pi-refresh text-[9px]" />
          </button>
          <button
            v-if="data.images.length > 0"
            v-tooltip.top="'Download all'"
            class="flex h-5 w-5 items-center justify-center rounded text-white/70 transition-colors hover:bg-white/20 hover:text-white"
            @click.stop="emit('download', id)"
          >
            <i class="pi pi-download text-[9px]" />
          </button>
          <button
            v-tooltip.top="'Delete'"
            class="flex h-5 w-5 items-center justify-center rounded text-white/70 transition-colors hover:bg-white/20 hover:text-red-300"
            @click.stop="emit('delete', id)"
          >
            <i class="pi pi-trash text-[9px]" />
          </button>
        </div>
      </div>
    </div>

    <!-- Section Body (with border, drop zone) -->
    <div
      :class="[
        'section-body relative rounded-b border-2 border-t-0 border-dashed transition-colors',
        statusColor,
        borderColor,
        isDragOver && 'border-blue-400 bg-blue-500/20',
      ]"
      :style="{
        minHeight: `${frameHeight}px`,
        padding: `${padding}px`,
      }"
      @dragover="handleSectionDragOver"
      @dragleave="handleSectionDragLeave"
      @drop="handleSectionDrop"
    >
      <!-- Images as individual items within the section -->
      <div class="flex flex-wrap gap-3">
        <!-- Completed: show images -->
        <template v-if="data.images.length > 0">
          <div
            v-for="(img, idx) in data.images"
            :key="idx"
            :class="[
              'nodrag group/img relative overflow-hidden rounded bg-zinc-800 shadow-md transition-all',
              'cursor-grab active:cursor-grabbing',
              dragFromIndex === idx && 'opacity-50 scale-95',
              dragOverIndex === idx && 'ring-2 ring-blue-500',
            ]"
            :style="{ width: `${imageSize}px`, height: `${imageSize}px` }"
            draggable="true"
            @dragstart="handleDragStart($event, img, idx)"
            @dragover="handleDragOver($event, idx)"
            @dragleave="handleDragLeave"
            @drop="handleDrop($event, idx)"
            @dragend="handleDragEnd"
            @click="handleImageClick($event, img, idx)"
          >
            <img
              :src="img"
              alt="Generated image"
              class="pointer-events-none h-full w-full object-cover"
            />
            <!-- Hover overlay -->
            <div class="absolute inset-0 flex items-center justify-center gap-1 bg-black/50 opacity-0 transition-opacity group-hover/img:opacity-100">
              <button
                v-tooltip.top="'Preview'"
                class="flex h-6 w-6 items-center justify-center rounded bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                @click.stop="emit('preview', img)"
              >
                <i class="pi pi-expand text-[10px]" />
              </button>
              <button
                v-tooltip.top="'Download'"
                class="flex h-6 w-6 items-center justify-center rounded bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                @click.stop="emit('download', id)"
              >
                <i class="pi pi-download text-[10px]" />
              </button>
              <button
                v-tooltip.top="'Extract'"
                class="flex h-6 w-6 items-center justify-center rounded bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                @click.stop="emit('extractImage', id, idx, img)"
              >
                <i class="pi pi-external-link text-[10px]" />
              </button>
            </div>
          </div>
        </template>

        <!-- Generating: show placeholders with spinner -->
        <template v-else-if="data.status === 'generating'">
          <div
            v-for="i in data.batchSize"
            :key="i"
            class="flex items-center justify-center rounded bg-zinc-800/50"
            :style="{ width: `${imageSize}px`, height: `${imageSize}px` }"
          >
            <div class="flex flex-col items-center">
              <i class="pi pi-spin pi-spinner text-xl text-blue-400" />
              <span class="mt-1.5 text-xs text-zinc-500">{{ data.progress ?? 0 }}%</span>
            </div>
          </div>
        </template>

        <!-- Queued: show placeholders with clock -->
        <template v-else-if="data.status === 'queued'">
          <div
            v-for="i in data.batchSize"
            :key="i"
            class="flex items-center justify-center rounded bg-zinc-800/50"
            :style="{ width: `${imageSize}px`, height: `${imageSize}px` }"
          >
            <i class="pi pi-clock text-xl text-zinc-600" />
          </div>
        </template>
      </div>

      <!-- Progress bar for generating (at bottom of section body) -->
      <div v-if="data.status === 'generating'" class="absolute bottom-2 left-4 right-4">
        <div class="h-1 overflow-hidden rounded-full bg-zinc-800">
          <div
            class="h-full rounded-full bg-blue-500 transition-all duration-300"
            :style="{ width: `${data.progress ?? 0}%` }"
          />
        </div>
      </div>

      <!-- Drop zone overlay -->
      <div
        v-if="isDragOver"
        class="pointer-events-none absolute inset-0 flex items-center justify-center rounded-b bg-blue-500/10"
      >
        <div class="flex items-center gap-2 rounded-lg bg-blue-500/90 px-3 py-1.5 text-white shadow-lg">
          <i class="pi pi-plus text-xs" />
          <span class="text-xs font-medium">Drop to add</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.generation-section {
  background: transparent;
}

.section-header {
  border-style: solid;
}

.section-body {
  background: transparent;
}
</style>
