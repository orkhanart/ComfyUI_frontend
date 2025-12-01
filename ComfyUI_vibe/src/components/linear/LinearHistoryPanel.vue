<script setup lang="ts">
import { ref } from 'vue'
import LinearCanvasView from './canvas/LinearCanvasView.vue'

type ViewMode = 'list' | 'canvas'
const viewMode = ref<ViewMode>('list')

interface GenerationItem {
  id: string
  prompt: string
  workflow: string
  mode: string
  status: 'completed' | 'generating' | 'queued'
  progress?: number
  createdAt: Date
  images: string[]
  batchSize: number
  parameters: {
    steps: number
    cfg: number
    width: number
    height: number
    seed: number
    sampler?: string
    model?: string
  }
}

// Mock generation data with batch images
const generations = ref<GenerationItem[]>([
  {
    id: 'gen-1',
    prompt: 'A serene mountain landscape at sunset with golden light',
    workflow: 'Text to Image',
    mode: 'Creative',
    status: 'generating',
    progress: 65,
    createdAt: new Date(),
    images: [],
    batchSize: 4,
    parameters: {
      steps: 30,
      cfg: 7.5,
      width: 1024,
      height: 1024,
      seed: 42891723,
      sampler: 'DPM++ 2M',
      model: 'SDXL 1.0',
    },
  },
  {
    id: 'gen-2',
    prompt: 'Futuristic cyberpunk city street at night with neon lights and flying cars',
    workflow: 'Text to Image',
    mode: 'Precise',
    status: 'completed',
    createdAt: new Date(Date.now() - 300000),
    images: [
      '/assets/card_images/workflow_01.webp',
      '/assets/card_images/workflow_02.webp',
      '/assets/card_images/workflow_03.webp',
      '/assets/card_images/workflow_04.webp',
    ],
    batchSize: 4,
    parameters: {
      steps: 25,
      cfg: 8,
      width: 1024,
      height: 768,
      seed: 18273645,
      sampler: 'Euler a',
      model: 'SDXL 1.0',
    },
  },
  {
    id: 'gen-3',
    prompt: 'Portrait of a woman in Renaissance painting style, dramatic lighting',
    workflow: 'Image to Image',
    mode: 'Iterate',
    status: 'completed',
    createdAt: new Date(Date.now() - 600000),
    images: [
      '/assets/card_images/workflow_02.webp',
      '/assets/card_images/workflow_01.webp',
    ],
    batchSize: 2,
    parameters: {
      steps: 40,
      cfg: 6.5,
      width: 768,
      height: 1024,
      seed: 98712345,
      sampler: 'DPM++ SDE',
      model: 'SDXL 1.0',
    },
  },
  {
    id: 'gen-4',
    prompt: 'Abstract art with vibrant colors and flowing shapes',
    workflow: 'Text to Image',
    mode: 'Creative',
    status: 'queued',
    createdAt: new Date(Date.now() - 60000),
    images: [],
    batchSize: 4,
    parameters: {
      steps: 20,
      cfg: 9,
      width: 1024,
      height: 1024,
      seed: -1,
      sampler: 'DPM++ 2M',
      model: 'SDXL 1.0',
    },
  },
])

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

function getStatusColor(status: GenerationItem['status']): string {
  switch (status) {
    case 'generating':
      return 'bg-blue-500'
    case 'queued':
      return 'bg-amber-500'
    case 'completed':
      return 'bg-emerald-500'
  }
}

function getStatusText(status: GenerationItem['status']): string {
  switch (status) {
    case 'generating':
      return 'Generating'
    case 'queued':
      return 'Queued'
    case 'completed':
      return 'Completed'
  }
}

function handleDelete(id: string): void {
  generations.value = generations.value.filter(g => g.id !== id)
}

function handleDownload(gen: GenerationItem, imageIndex?: number): void {
  if (gen.images.length === 0) return

  if (imageIndex !== undefined) {
    const link = document.createElement('a')
    link.href = gen.images[imageIndex]!
    link.download = `generation-${gen.id}-${imageIndex + 1}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } else {
    // Download all
    gen.images.forEach((img, idx) => {
      const link = document.createElement('a')
      link.href = img
      link.download = `generation-${gen.id}-${idx + 1}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  }
}

function handleRerun(gen: GenerationItem): void {
  console.log('Rerun:', gen)
}

function getGridCols(count: number): string {
  if (count === 1) return 'grid-cols-2'
  if (count === 2) return 'grid-cols-4'
  return 'grid-cols-4 sm:grid-cols-8'
}
</script>

<template>
  <main class="flex h-full flex-1 flex-col bg-zinc-950">
    <!-- Header with Tabs -->
    <div class="flex items-center justify-between border-b border-zinc-800 px-4">
      <div class="flex items-center gap-1">
        <!-- Timeline View Tab -->
        <button
          :class="[
            'relative flex items-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors',
            viewMode === 'list' ? 'text-zinc-200' : 'text-zinc-500 hover:text-zinc-300'
          ]"
          @click="viewMode = 'list'"
        >
          <i class="pi pi-list text-xs" />
          Timeline View
          <span class="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-500">
            {{ generations.length }}
          </span>
          <span
            v-if="viewMode === 'list'"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
          />
        </button>
        <!-- Canvas View Tab -->
        <button
          :class="[
            'relative flex items-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors',
            viewMode === 'canvas' ? 'text-zinc-200' : 'text-zinc-500 hover:text-zinc-300'
          ]"
          @click="viewMode = 'canvas'"
        >
          <i class="pi pi-th-large text-xs" />
          Canvas View
          <span
            v-if="viewMode === 'canvas'"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
          />
        </button>
      </div>
      <div class="flex items-center gap-2">
        <button
          v-tooltip.bottom="'Clear all'"
          class="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
        >
          <i class="pi pi-trash text-xs" />
        </button>
      </div>
    </div>

    <!-- Canvas View -->
    <LinearCanvasView
      v-if="viewMode === 'canvas'"
      :generations="generations"
      @rerun="(id: string) => { const gen = generations.find(g => g.id === id); if (gen) handleRerun(gen); }"
      @download="(id) => { const gen = generations.find(g => g.id === id); if (gen) handleDownload(gen); }"
      @delete="handleDelete"
    />

    <!-- Generations List -->
    <div v-else class="flex-1 overflow-y-auto p-3">
      <div class="flex flex-col gap-3">
        <div
          v-for="gen in generations"
          :key="gen.id"
          class="group rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 transition-colors hover:border-zinc-700"
        >
          <!-- Top Row: Status, Time, Batch Info, Actions -->
          <div class="mb-2 flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <span
                :class="[
                  'h-1.5 w-1.5 rounded-full',
                  getStatusColor(gen.status),
                  gen.status === 'generating' && 'animate-pulse'
                ]"
              />
              <span class="text-[11px] font-medium text-zinc-400">{{ getStatusText(gen.status) }}</span>
              <span class="text-zinc-700">•</span>
              <span class="text-[11px] text-zinc-500">{{ formatTime(gen.createdAt) }}</span>
              <span class="text-zinc-700">•</span>
              <span class="text-[10px] text-zinc-500">{{ gen.batchSize }} img</span>
            </div>
            <div class="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                v-tooltip.top="'Rerun'"
                class="flex h-5 w-5 items-center justify-center rounded text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
                @click="handleRerun(gen)"
              >
                <i class="pi pi-refresh text-[9px]" />
              </button>
              <button
                v-if="gen.images.length > 0"
                v-tooltip.top="'Download'"
                class="flex h-5 w-5 items-center justify-center rounded text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
                @click="handleDownload(gen)"
              >
                <i class="pi pi-download text-[9px]" />
              </button>
              <button
                v-tooltip.top="'Delete'"
                class="flex h-5 w-5 items-center justify-center rounded text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-red-400"
                @click="handleDelete(gen.id)"
              >
                <i class="pi pi-trash text-[9px]" />
              </button>
            </div>
          </div>

          <!-- Images Grid -->
          <div
            v-if="gen.images.length > 0"
            :class="['mb-2 grid gap-1.5', getGridCols(gen.images.length)]"
          >
            <div
              v-for="(img, idx) in gen.images"
              :key="idx"
              class="group/img relative aspect-square overflow-hidden rounded bg-zinc-800"
            >
              <img
                :src="img"
                alt="Generated image"
                class="h-full w-full object-cover transition-transform group-hover/img:scale-105"
              />
              <!-- Image hover overlay -->
              <div class="absolute inset-0 flex items-center justify-center gap-1 bg-black/50 opacity-0 transition-opacity group-hover/img:opacity-100">
                <button
                  v-tooltip.top="'Download'"
                  class="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                  @click.stop="handleDownload(gen, idx)"
                >
                  <i class="pi pi-download text-[10px]" />
                </button>
                <button
                  v-tooltip.top="'Expand'"
                  class="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                >
                  <i class="pi pi-expand text-[10px]" />
                </button>
              </div>
            </div>
          </div>

          <!-- Generating placeholder -->
          <div
            v-else-if="gen.status === 'generating'"
            :class="['mb-2 grid gap-1.5', getGridCols(gen.batchSize)]"
          >
            <div
              v-for="i in gen.batchSize"
              :key="i"
              class="flex aspect-square items-center justify-center overflow-hidden rounded bg-zinc-800"
            >
              <div class="flex flex-col items-center">
                <i class="pi pi-spin pi-spinner text-base text-blue-400" />
                <span class="mt-1 text-[10px] text-zinc-500">{{ gen.progress }}%</span>
              </div>
            </div>
          </div>

          <!-- Queued placeholder -->
          <div
            v-else-if="gen.status === 'queued'"
            :class="['mb-2 grid gap-1.5', getGridCols(gen.batchSize)]"
          >
            <div
              v-for="i in gen.batchSize"
              :key="i"
              class="flex aspect-square items-center justify-center overflow-hidden rounded bg-zinc-800"
            >
              <i class="pi pi-clock text-base text-zinc-600" />
            </div>
          </div>

          <!-- Progress Bar (for generating) -->
          <div v-if="gen.status === 'generating'" class="mb-2">
            <div class="h-1 overflow-hidden rounded-full bg-zinc-800">
              <div
                class="h-full rounded-full bg-blue-600 transition-all duration-300"
                :style="{ width: `${gen.progress}%` }"
              />
            </div>
          </div>

          <!-- Prompt -->
          <p class="mb-2 line-clamp-2 text-xs leading-relaxed text-zinc-300">
            {{ gen.prompt }}
          </p>

          <!-- Parameter Badges -->
          <div class="flex flex-wrap gap-1">
            <span class="inline-flex items-center rounded bg-zinc-800 px-1.5 py-0.5 text-[10px]">
              <span class="text-zinc-500">Workflow</span>
              <span class="ml-1 text-zinc-300">{{ gen.workflow }}</span>
            </span>
            <span class="inline-flex items-center rounded bg-zinc-800 px-1.5 py-0.5 text-[10px]">
              <span class="text-zinc-500">Mode</span>
              <span class="ml-1 text-zinc-300">{{ gen.mode }}</span>
            </span>
            <span class="inline-flex items-center rounded bg-zinc-800 px-1.5 py-0.5 text-[10px]">
              <span class="text-zinc-500">Steps</span>
              <span class="ml-1 text-zinc-300">{{ gen.parameters.steps }}</span>
            </span>
            <span class="inline-flex items-center rounded bg-zinc-800 px-1.5 py-0.5 text-[10px]">
              <span class="text-zinc-500">CFG</span>
              <span class="ml-1 text-zinc-300">{{ gen.parameters.cfg }}</span>
            </span>
            <span class="inline-flex items-center rounded bg-zinc-800 px-1.5 py-0.5 text-[10px]">
              <span class="text-zinc-500">Size</span>
              <span class="ml-1 text-zinc-300">{{ gen.parameters.width }}×{{ gen.parameters.height }}</span>
            </span>
            <span class="inline-flex items-center rounded bg-zinc-800 px-1.5 py-0.5 text-[10px]">
              <span class="text-zinc-500">Seed</span>
              <span class="ml-1 font-mono text-zinc-300">{{ gen.parameters.seed === -1 ? 'Random' : gen.parameters.seed }}</span>
            </span>
            <span v-if="gen.parameters.sampler" class="inline-flex items-center rounded bg-zinc-800 px-1.5 py-0.5 text-[10px]">
              <span class="text-zinc-500">Sampler</span>
              <span class="ml-1 text-zinc-300">{{ gen.parameters.sampler }}</span>
            </span>
            <span v-if="gen.parameters.model" class="inline-flex items-center rounded bg-zinc-800 px-1.5 py-0.5 text-[10px]">
              <span class="text-zinc-500">Model</span>
              <span class="ml-1 text-zinc-300">{{ gen.parameters.model }}</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="generations.length === 0"
        class="flex flex-1 flex-col items-center justify-center py-12 text-zinc-500"
      >
        <i class="pi pi-images mb-2 text-3xl" />
        <span class="text-sm">No generations yet</span>
        <p class="mt-1 text-center text-xs text-zinc-600">
          Start a chat to generate images
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
div::-webkit-scrollbar {
  width: 6px;
}

div::-webkit-scrollbar-track {
  background: transparent;
}

div::-webkit-scrollbar-thumb {
  background: #3f3f46;
  border-radius: 3px;
}
</style>
