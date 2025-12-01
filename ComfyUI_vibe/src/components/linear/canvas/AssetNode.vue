<script setup lang="ts">
import { computed } from 'vue'
import type { AssetNodeData } from '@/types/linearCanvas'

interface Props {
  id: string
  data: AssetNodeData
  selected?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  download: [id: string]
  delete: [id: string]
  preview: [imageUrl: string]
}>()

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

const sizeLabel = computed(() => `${props.data.width}x${props.data.height}`)

// Drag handling for moving asset to sections
function handleDragStart(event: DragEvent): void {
  if (!event.dataTransfer) return
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('application/json', JSON.stringify({
    type: 'standalone-image',
    assetId: props.id,
    imageUrl: props.data.imageUrl,
    sourceGenerationId: props.data.sourceGenerationId,
    sourceIndex: props.data.sourceIndex,
  }))
}
</script>

<template>
  <div
    :class="[
      'asset-node group w-[160px] cursor-grab rounded border bg-zinc-900/95 shadow-lg transition-all active:cursor-grabbing',
      selected ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-zinc-700 hover:border-zinc-600',
    ]"
    draggable="true"
    @dragstart="handleDragStart"
  >
    <!-- Image -->
    <div class="relative aspect-square overflow-hidden rounded-t bg-zinc-800">
      <img
        :src="data.imageUrl"
        alt="Asset"
        class="pointer-events-none h-full w-full object-cover"
      />

      <!-- Hover overlay with actions -->
      <div class="absolute inset-0 flex items-center justify-center gap-1 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          v-tooltip.top="'Preview'"
          class="flex h-6 w-6 items-center justify-center rounded bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
          @click.stop="emit('preview', data.imageUrl)"
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
          v-tooltip.top="'Delete'"
          class="flex h-6 w-6 items-center justify-center rounded bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-red-500/50"
          @click.stop="emit('delete', id)"
        >
          <i class="pi pi-trash text-[10px]" />
        </button>
      </div>
    </div>

    <!-- Footer info -->
    <div class="px-2 py-1.5">
      <div class="flex items-center justify-between text-[10px] text-zinc-500">
        <span>{{ sizeLabel }}</span>
        <span>{{ formatTime(data.createdAt) }}</span>
      </div>
      <p v-if="data.seed" class="mt-0.5 truncate text-[10px] text-zinc-600">
        Seed: {{ data.seed }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.asset-node {
  background: transparent;
}
</style>
