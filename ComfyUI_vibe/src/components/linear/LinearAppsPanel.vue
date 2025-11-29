<script setup lang="ts">
import { ref, computed } from 'vue'
import AppCard, { type AppItem } from './apps/AppCard.vue'
import AppForm, { type AppConfig } from './apps/AppForm.vue'

const searchQuery = ref('')
const viewMode = ref<'grid' | 'list'>('grid')
const selectedApp = ref<AppConfig | null>(null)

// App configurations with their specific inputs
const appConfigs: Record<string, AppConfig> = {
  'gen-video': {
    id: 'gen-video',
    name: 'Generate Video',
    icon: 'pi-video',
    description: 'Generate videos from text prompts using AI models.',
    inputs: [
      { id: 'prompt', type: 'textarea', label: 'Prompt', placeholder: 'Describe your video...', required: true },
      { id: 'negative', type: 'textarea', label: 'Negative Prompt', placeholder: 'What to avoid...' },
      { id: 'duration', type: 'select', label: 'Duration', options: [
        { value: '2', label: '2 seconds' },
        { value: '4', label: '4 seconds' },
        { value: '6', label: '6 seconds' },
      ], default: '4' },
      { id: 'aspect', type: 'select', label: 'Aspect Ratio', options: [
        { value: '16:9', label: '16:9 Landscape' },
        { value: '9:16', label: '9:16 Portrait' },
        { value: '1:1', label: '1:1 Square' },
      ], default: '16:9' },
      { id: 'seed', type: 'seed', label: 'Seed', default: -1 },
    ],
  },
  'gen-image': {
    id: 'gen-image',
    name: 'Generate Image',
    icon: 'pi-image',
    description: 'Generate images from text prompts using SDXL, Flux, and more.',
    inputs: [
      { id: 'prompt', type: 'textarea', label: 'Prompt', placeholder: 'Describe your image...', required: true },
      { id: 'negative', type: 'textarea', label: 'Negative Prompt', placeholder: 'What to avoid...' },
      { id: 'aspect', type: 'select', label: 'Aspect Ratio', options: [
        { value: '1:1', label: '1:1 Square' },
        { value: '16:9', label: '16:9 Landscape' },
        { value: '9:16', label: '9:16 Portrait' },
        { value: '4:3', label: '4:3 Photo' },
      ], default: '1:1' },
      { id: 'quality', type: 'select', label: 'Quality', options: [
        { value: 'draft', label: 'Draft' },
        { value: 'normal', label: 'Normal' },
        { value: 'high', label: 'High' },
      ], default: 'normal' },
      { id: 'seed', type: 'seed', label: 'Seed', default: -1 },
    ],
  },
  'inpaint': {
    id: 'inpaint',
    name: 'Inpaint',
    icon: 'pi-pencil',
    description: 'Edit specific parts of an image using a mask.',
    inputs: [
      { id: 'image', type: 'image', label: 'Input Image', required: true },
      { id: 'prompt', type: 'textarea', label: 'Prompt', placeholder: 'Describe what to paint...', required: true },
      { id: 'strength', type: 'slider', label: 'Strength', min: 0, max: 1, step: 0.05, default: 0.8 },
      { id: 'seed', type: 'seed', label: 'Seed', default: -1 },
    ],
  },
  'upscale': {
    id: 'upscale',
    name: 'Upscale',
    icon: 'pi-expand',
    description: 'Upscale images to higher resolution with AI enhancement.',
    inputs: [
      { id: 'image', type: 'image', label: 'Input Image', required: true },
      { id: 'scale', type: 'select', label: 'Scale Factor', options: [
        { value: '2', label: '2x' },
        { value: '4', label: '4x' },
      ], default: '2' },
      { id: 'denoise', type: 'slider', label: 'Denoise', min: 0, max: 1, step: 0.05, default: 0.3 },
    ],
  },
  'remove-bg': {
    id: 'remove-bg',
    name: 'Remove Background',
    icon: 'pi-eraser',
    description: 'Remove background from images automatically.',
    inputs: [
      { id: 'image', type: 'image', label: 'Input Image', required: true },
      { id: 'refine', type: 'toggle', label: 'Refine Edges', default: true },
    ],
  },
  'face-swap': {
    id: 'face-swap',
    name: 'Face Swap',
    icon: 'pi-user',
    description: 'Swap faces between two images.',
    inputs: [
      { id: 'source', type: 'image', label: 'Source Face', required: true },
      { id: 'target', type: 'image', label: 'Target Image', required: true },
      { id: 'blend', type: 'slider', label: 'Blend Strength', min: 0, max: 1, step: 0.05, default: 0.8 },
    ],
  },
  'style-transfer': {
    id: 'style-transfer',
    name: 'Style Transfer',
    icon: 'pi-palette',
    description: 'Apply artistic styles to your images.',
    inputs: [
      { id: 'image', type: 'image', label: 'Input Image', required: true },
      { id: 'style', type: 'select', label: 'Style', options: [
        { value: 'anime', label: 'Anime' },
        { value: 'oil', label: 'Oil Painting' },
        { value: 'watercolor', label: 'Watercolor' },
        { value: 'sketch', label: 'Sketch' },
        { value: 'cartoon', label: 'Cartoon' },
      ], default: 'anime' },
      { id: 'strength', type: 'slider', label: 'Style Strength', min: 0, max: 1, step: 0.05, default: 0.7 },
    ],
  },
  'animate': {
    id: 'animate',
    name: 'Animate',
    icon: 'pi-play',
    description: 'Animate a still image into a video.',
    inputs: [
      { id: 'image', type: 'image', label: 'Input Image', required: true },
      { id: 'motion', type: 'select', label: 'Motion Type', options: [
        { value: 'zoom', label: 'Zoom In' },
        { value: 'pan', label: 'Pan' },
        { value: 'rotate', label: 'Rotate' },
        { value: 'auto', label: 'Auto Detect' },
      ], default: 'auto' },
      { id: 'duration', type: 'select', label: 'Duration', options: [
        { value: '2', label: '2 seconds' },
        { value: '4', label: '4 seconds' },
      ], default: '2' },
      { id: 'seed', type: 'seed', label: 'Seed', default: -1 },
    ],
  },
}

// All Apps list
const allApps: AppItem[] = [
  { id: 'gen-video', name: 'Generate Video', icon: 'pi-video' },
  { id: 'upscale-video', name: 'Upscale Video', icon: 'pi-expand' },
  { id: 'animate', name: 'Animate', icon: 'pi-play' },
  { id: 'interpolate', name: 'Interpolate', icon: 'pi-sort-alt' },
  { id: 'gen-image', name: 'Generate Image', icon: 'pi-image' },
  { id: 'inpaint', name: 'Inpaint', icon: 'pi-pencil' },
  { id: 'upscale', name: 'Upscale', icon: 'pi-expand' },
  { id: 'remove-bg', name: 'Remove BG', icon: 'pi-eraser' },
  { id: 'face-swap', name: 'Face Swap', icon: 'pi-user' },
  { id: 'style-transfer', name: 'Style Transfer', icon: 'pi-palette' },
  { id: 'outpaint', name: 'Outpaint', icon: 'pi-arrows-alt' },
  { id: 'colorize', name: 'Colorize', icon: 'pi-sun' },
  { id: 'prompt-builder', name: 'Prompt Builder', icon: 'pi-pencil' },
  { id: 'batch-process', name: 'Batch Process', icon: 'pi-list' },
  { id: 'compare', name: 'Compare', icon: 'pi-arrows-h' },
  { id: 'metadata', name: 'Metadata', icon: 'pi-info-circle' },
  { id: 'gallery', name: 'Gallery', icon: 'pi-images' },
  { id: 'history', name: 'History', icon: 'pi-history' },
]

const filteredApps = computed(() => {
  if (!searchQuery.value) return allApps
  const q = searchQuery.value.toLowerCase()
  return allApps.filter(app => app.name.toLowerCase().includes(q))
})

function handleSelectApp(app: AppItem): void {
  const config = appConfigs[app.id]
  if (config) {
    selectedApp.value = config
  } else {
    // Fallback for apps without config
    selectedApp.value = {
      id: app.id,
      name: app.name,
      icon: app.icon,
      description: 'Configure and run this app.',
      inputs: [
        { id: 'prompt', type: 'textarea', label: 'Input', placeholder: 'Enter input...', required: true },
      ],
    }
  }
}

function handleBack(): void {
  selectedApp.value = null
}

function handleRun(values: Record<string, unknown>, images: Record<string, string>): void {
  console.log('Running app:', selectedApp.value?.id, values, images)
}
</script>

<template>
  <div class="flex h-full w-96 flex-col border-r border-zinc-800 bg-zinc-950">
    <!-- App Form View -->
    <AppForm
      v-if="selectedApp"
      :app="selectedApp"
      @back="handleBack"
      @run="handleRun"
    />

    <!-- App List View -->
    <template v-else>
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
        <span class="text-sm font-medium text-zinc-200">Apps</span>
      </div>

      <!-- Search + Actions -->
      <div class="flex items-center gap-2 border-b border-zinc-800 p-3">
        <div class="flex h-8 flex-1 items-center gap-2 rounded-lg bg-zinc-800 px-3">
          <i class="pi pi-search text-xs text-zinc-500" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search apps..."
            class="flex-1 bg-transparent text-xs text-zinc-200 outline-none placeholder:text-zinc-500"
          />
          <button
            v-if="searchQuery"
            class="text-zinc-500 hover:text-zinc-300"
            @click="searchQuery = ''"
          >
            <i class="pi pi-times text-[10px]" />
          </button>
        </div>

        <!-- View Toggle -->
        <div class="flex rounded bg-zinc-800">
          <button
            v-tooltip.bottom="'Grid'"
            :class="[
              'flex h-8 w-8 items-center justify-center rounded-l transition-colors',
              viewMode === 'grid' ? 'bg-zinc-700 text-zinc-200' : 'text-zinc-500 hover:text-zinc-300'
            ]"
            @click="viewMode = 'grid'"
          >
            <i class="pi pi-th-large text-xs" />
          </button>
          <button
            v-tooltip.bottom="'List'"
            :class="[
              'flex h-8 w-8 items-center justify-center rounded-r transition-colors',
              viewMode === 'list' ? 'bg-zinc-700 text-zinc-200' : 'text-zinc-500 hover:text-zinc-300'
            ]"
            @click="viewMode = 'list'"
          >
            <i class="pi pi-list text-xs" />
          </button>
        </div>

        <!-- Filter -->
        <button
          v-tooltip.bottom="'Filter'"
          class="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <i class="pi pi-filter text-xs" />
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-3">
        <div :class="viewMode === 'grid' ? 'grid grid-cols-2 gap-1' : 'flex flex-col gap-1'">
          <AppCard
            v-for="app in filteredApps"
            :key="app.id"
            :app="app"
            @select="handleSelectApp"
          />
        </div>
        <div v-if="filteredApps.length === 0" class="flex flex-col items-center py-8 text-zinc-500">
          <i class="pi pi-search mb-2 text-2xl" />
          <span class="text-xs">No apps found</span>
        </div>
      </div>
    </template>
  </div>
</template>
