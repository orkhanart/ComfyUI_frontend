<script setup lang="ts">
import { ref, computed } from 'vue'
import WorkflowBrowser, { type WorkflowSource, type WorkflowItem } from './workflows/WorkflowBrowser.vue'
import WorkflowForm, { type WorkflowTemplate, type ExposedInput } from './workflows/WorkflowForm.vue'

// Source tabs
type SourceTab = { id: WorkflowSource; label: string; icon: string }

const sourceTabs: SourceTab[] = [
  { id: 'templates', label: 'Templates', icon: 'pi-box' },
  { id: 'my-workflows', label: 'My Workflows', icon: 'pi-folder' },
  { id: 'shared', label: 'Shared', icon: 'pi-users' },
  { id: 'libraries', label: 'Libraries', icon: 'pi-database' },
]

const activeSource = ref<WorkflowSource>('templates')
const currentFolderId = ref<string | null>(null)
const loadedWorkflow = ref<WorkflowTemplate | null>(null)

// Mock data for different sources
const templateWorkflows: WorkflowItem[] = [
  {
    id: 'sdxl-simple',
    name: 'SDXL Text to Image',
    description: 'Generate high-quality images from text prompts using SDXL',
    thumbnail: '/assets/card_images/workflow_01.webp',
    author: 'ComfyUI',
    version: '1.0',
    category: 'Image Generation',
    downloads: 15420,
    tags: ['SDXL', 'Text2Image', 'Popular'],
  },
  {
    id: 'flux-schnell',
    name: 'Flux Schnell',
    description: 'Fast image generation with Flux model',
    thumbnail: '/assets/card_images/workflow_02.webp',
    author: 'ComfyUI',
    version: '1.0',
    category: 'Image Generation',
    downloads: 21000,
    tags: ['Flux', 'Fast', 'Popular'],
  },
  {
    id: 'upscale',
    name: '4x Upscaler',
    description: 'Upscale images to 4x resolution with AI enhancement',
    thumbnail: '/assets/card_images/workflow_03.webp',
    author: 'Community',
    version: '1.0',
    category: 'Enhancement',
    downloads: 12300,
    tags: ['Upscale', 'Enhancement'],
  },
  {
    id: 'controlnet-pose',
    name: 'ControlNet Pose',
    description: 'Generate images with pose control using OpenPose',
    thumbnail: '/assets/card_images/workflow_01.webp',
    author: 'Community',
    version: '1.0',
    category: 'ControlNet',
    downloads: 9870,
    tags: ['ControlNet', 'Pose', 'OpenPose'],
  },
]

const myWorkflows: WorkflowItem[] = [
  {
    id: 'folder-portraits',
    name: 'Portraits',
    description: '',
    thumbnail: '',
    author: 'Me',
    version: '1.0',
    category: '',
    tags: [],
    isFolder: true,
    parentId: null,
  },
  {
    id: 'folder-landscapes',
    name: 'Landscapes',
    description: '',
    thumbnail: '',
    author: 'Me',
    version: '1.0',
    category: '',
    tags: [],
    isFolder: true,
    parentId: null,
  },
  {
    id: 'my-custom-sdxl',
    name: 'My Custom SDXL',
    description: 'Customized SDXL workflow with LoRA',
    thumbnail: '/assets/card_images/workflow_02.webp',
    author: 'Me',
    version: '1.2',
    category: 'Image Generation',
    tags: ['Custom', 'LoRA'],
    updatedAt: new Date(Date.now() - 86400000),
    parentId: null,
  },
  {
    id: 'portrait-style-1',
    name: 'Portrait Style v1',
    description: 'Professional portrait generation',
    thumbnail: '/assets/card_images/workflow_03.webp',
    author: 'Me',
    version: '1.0',
    category: 'Portraits',
    tags: ['Portrait'],
    updatedAt: new Date(Date.now() - 172800000),
    parentId: 'folder-portraits',
  },
]

const sharedWorkflows: WorkflowItem[] = [
  {
    id: 'shared-anime',
    name: 'Anime Character Gen',
    description: 'High quality anime character generation',
    thumbnail: '/assets/card_images/workflow_01.webp',
    author: 'Alex',
    version: '2.1',
    category: 'Anime',
    tags: ['Anime', 'Character'],
    sharedBy: 'Alex',
    updatedAt: new Date(Date.now() - 3600000),
  },
  {
    id: 'shared-product',
    name: 'Product Photography',
    description: 'Studio-quality product shots',
    thumbnail: '/assets/card_images/workflow_04.webp',
    author: 'Studio Team',
    version: '1.0',
    category: 'Commercial',
    tags: ['Product', 'Commercial'],
    sharedBy: 'Maria',
    updatedAt: new Date(Date.now() - 7200000),
  },
]

const libraryWorkflows: WorkflowItem[] = [
  {
    id: 'lib-civitai-1',
    name: 'Realistic Vision v5',
    description: 'Photorealistic image generation',
    thumbnail: '/assets/card_images/workflow_02.webp',
    author: 'CivitAI',
    version: '5.0',
    category: 'Realistic',
    downloads: 45000,
    tags: ['Realistic', 'Photorealistic'],
  },
  {
    id: 'lib-openart-1',
    name: 'DreamShaper XL',
    description: 'Versatile artistic generation',
    thumbnail: '/assets/card_images/workflow_03.webp',
    author: 'OpenArt',
    version: '2.0',
    category: 'Artistic',
    downloads: 32000,
    tags: ['Artistic', 'Creative'],
  },
]

// Workflow templates with exposed inputs (for the form)
const workflowTemplates: Record<string, WorkflowTemplate> = {
  'sdxl-simple': {
    id: 'sdxl-simple',
    name: 'SDXL Text to Image',
    description: 'Generate high-quality images from text prompts using SDXL',
    thumbnail: '/assets/card_images/workflow_01.webp',
    author: 'ComfyUI',
    version: '1.0',
    category: 'Image Generation',
    exposedInputs: [
      { id: 'prompt', nodeId: '3', inputName: 'text', type: 'textarea', label: 'Prompt', placeholder: 'Describe your image...', required: true, group: 'Main' },
      { id: 'negative', nodeId: '4', inputName: 'text', type: 'textarea', label: 'Negative Prompt', placeholder: 'What to avoid...', group: 'Main' },
      { id: 'aspect', nodeId: '5', inputName: 'ratio', type: 'select', label: 'Aspect Ratio', options: [
        { value: '1:1', label: '1:1 Square' },
        { value: '16:9', label: '16:9 Landscape' },
        { value: '9:16', label: '9:16 Portrait' },
      ], default: '1:1', group: 'Settings' },
      { id: 'seed', nodeId: '7', inputName: 'seed', type: 'seed', label: 'Seed', default: -1, group: 'Settings' },
    ],
  },
  'flux-schnell': {
    id: 'flux-schnell',
    name: 'Flux Schnell',
    description: 'Fast image generation with Flux model',
    thumbnail: '/assets/card_images/workflow_02.webp',
    author: 'ComfyUI',
    version: '1.0',
    category: 'Image Generation',
    exposedInputs: [
      { id: 'prompt', nodeId: '3', inputName: 'text', type: 'textarea', label: 'Prompt', placeholder: 'Describe your image...', required: true, group: 'Main' },
      { id: 'seed', nodeId: '7', inputName: 'seed', type: 'seed', label: 'Seed', default: -1, group: 'Settings' },
    ],
  },
}

// Get workflows for current source
const currentWorkflows = computed(() => {
  switch (activeSource.value) {
    case 'templates':
      return templateWorkflows
    case 'my-workflows':
      return myWorkflows
    case 'shared':
      return sharedWorkflows
    case 'libraries':
      return libraryWorkflows
    default:
      return []
  }
})

function handleSelectWorkflow(item: WorkflowItem): void {
  // Load workflow template (in real app, fetch from server)
  const template = workflowTemplates[item.id]
  if (template) {
    loadedWorkflow.value = template
  } else {
    // Create a basic template for workflows without defined inputs
    loadedWorkflow.value = {
      ...item,
      exposedInputs: [
        { id: 'prompt', nodeId: '1', inputName: 'text', type: 'textarea', label: 'Prompt', placeholder: 'Enter prompt...', required: true, group: 'Input' },
      ],
    }
  }
}

function handleNavigateFolder(folderId: string | null): void {
  currentFolderId.value = folderId
}

function handleImport(): void {
  console.log('Import workflow')
}

function handleCreateFolder(): void {
  console.log('Create folder')
}

function handleRunWorkflow(values: Record<string, unknown>, images: Record<string, string>): void {
  console.log('Run workflow:', loadedWorkflow.value?.id, values, images)
}
</script>

<template>
  <div class="flex h-full w-96 flex-col border-r border-zinc-800 bg-zinc-950">
    <!-- Header with Title -->
    <div class="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
      <span class="text-sm font-medium text-zinc-200">Run Workflow</span>
    </div>

    <!-- Content -->
    <template v-if="!loadedWorkflow">
      <!-- Source Tabs -->
      <div class="flex border-b border-zinc-800">
        <button
          v-for="tab in sourceTabs"
          :key="tab.id"
          v-tooltip.bottom="tab.label"
          :class="[
            'flex flex-1 items-center justify-center gap-1.5 py-2 text-[10px] font-medium transition-colors',
            activeSource === tab.id
              ? 'border-b-2 border-zinc-400 text-zinc-200'
              : 'text-zinc-500 hover:text-zinc-300'
          ]"
          @click="activeSource = tab.id; currentFolderId = null"
        >
          <i :class="['pi', tab.icon, 'text-xs']" />
          <span class="hidden sm:inline">{{ tab.label }}</span>
        </button>
      </div>

      <!-- Browser -->
      <WorkflowBrowser
        :workflows="currentWorkflows"
        :source="activeSource"
        :current-folder-id="currentFolderId"
        class="flex-1"
        @select="handleSelectWorkflow"
        @import="handleImport"
        @navigate-folder="handleNavigateFolder"
        @create-folder="handleCreateFolder"
      />
    </template>

    <!-- Workflow Form -->
    <WorkflowForm
      v-else
      :workflow="loadedWorkflow"
      class="flex-1"
      @back="loadedWorkflow = null"
      @run="handleRunWorkflow"
    />
  </div>
</template>
