<script setup lang="ts">
import { ref, computed, onMounted, markRaw } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

import GenerationFrameNode from './GenerationFrameNode.vue'
import AssetNode from './AssetNode.vue'
import SectionNode from './SectionNode.vue'
import CanvasToolbar from './CanvasToolbar.vue'
import {
  calculateGridPosition,
  calculatePositionInSection,
  createSection,
  CANVAS_LAYOUT,
  SECTION_COLORS,
} from '@/types/linearCanvas'
import type { GenerationItem, AssetNodeData, CanvasSection, SectionHeaderData } from '@/types/linearCanvas'
import type { Node } from '@vue-flow/core'

interface Props {
  generations: GenerationItem[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  rerun: [id: string]
  download: [id: string]
  delete: [id: string]
  reorderImages: [generationId: string, fromIndex: number, toIndex: number]
  addImageToGeneration: [generationId: string, imageUrl: string]
  preview: [imageUrl: string]
}>()

// Custom node types
const nodeTypes = {
  generationFrame: markRaw(GenerationFrameNode),
  asset: markRaw(AssetNode),
  section: markRaw(SectionNode),
}

// VueFlow hooks
const { fitView, zoomIn, zoomOut, onNodeClick, onPaneClick, screenToFlowCoordinate } = useVueFlow()

// Selected node tracking
const selectedNodeId = ref<string | null>(null)

// Standalone asset nodes (extracted from frames)
const assetNodes = ref<Node<AssetNodeData>[]>([])

// Track which images have been extracted (generationId:index)
const extractedImages = ref<Set<string>>(new Set())

// User-defined sections for grouping media
const sections = ref<CanvasSection[]>([
  createSection('Favorites', { x: 50, y: 50 }, 0),
  createSection('Work in Progress', { x: 50, y: 500 }, 4),
])

// Section assignment map (generationId -> sectionId)
const generationSections = ref<Map<string, string>>(new Map())

// Section nodes
const sectionNodes = computed<Node<SectionHeaderData>[]>(() => {
  return sections.value.map((section) => {
    const itemCount = props.generations.filter(g =>
      generationSections.value.get(g.id) === section.id
    ).length

    return {
      id: section.id,
      type: 'section',
      position: section.position,
      data: {
        id: section.id,
        name: section.name,
        color: section.color,
        width: section.width,
        height: section.height,
        itemCount,
        collapsed: section.collapsed,
      },
      draggable: true,
      selectable: true,
      zIndex: -1, // Render behind other nodes
    }
  })
})

// Convert generations to VueFlow nodes (filter out extracted images)
const frameNodes = computed<Node[]>(() => {
  // Group generations by section
  const sectionItems: Map<string, GenerationItem[]> = new Map()
  const unsectionedItems: GenerationItem[] = []

  props.generations.forEach((gen) => {
    const sectionId = generationSections.value.get(gen.id)
    if (sectionId) {
      const items = sectionItems.get(sectionId) ?? []
      items.push(gen)
      sectionItems.set(sectionId, items)
    } else {
      unsectionedItems.push(gen)
    }
  })

  const nodes: Node[] = []

  // Add nodes for items in sections
  sections.value.forEach((section) => {
    if (section.collapsed) return // Don't show items in collapsed sections

    const items = sectionItems.get(section.id) ?? []
    items.forEach((gen, index) => {
      const remainingImages = gen.images.filter((_, imgIdx) =>
        !extractedImages.value.has(`${gen.id}:${imgIdx}`)
      )

      const relativePos = calculatePositionInSection(index, section.width)

      nodes.push({
        id: gen.id,
        type: 'generationFrame',
        position: {
          x: section.position.x + relativePos.x,
          y: section.position.y + relativePos.y,
        },
        data: {
          ...gen,
          images: remainingImages,
          batchSize: remainingImages.length || gen.batchSize,
          sectionId: section.id,
        },
        draggable: true,
        selectable: true,
        parentId: section.id,
      })
    })
  })

  // Add unsectioned items in a grid
  unsectionedItems.forEach((gen, index) => {
    const remainingImages = gen.images.filter((_, imgIdx) =>
      !extractedImages.value.has(`${gen.id}:${imgIdx}`)
    )

    // Position after sections
    const lastSection = sections.value[sections.value.length - 1]
    const startY = lastSection
      ? lastSection.position.y + lastSection.height + CANVAS_LAYOUT.SECTION_GAP
      : CANVAS_LAYOUT.START_Y

    const pos = calculateGridPosition(index)

    nodes.push({
      id: gen.id,
      type: 'generationFrame',
      position: { x: pos.x, y: startY + pos.y - CANVAS_LAYOUT.START_Y },
      data: {
        ...gen,
        images: remainingImages,
        batchSize: remainingImages.length || gen.batchSize,
      },
      draggable: true,
      selectable: true,
    })
  })

  return nodes.filter(node => node.data.images.length > 0 || node.data.status !== 'completed')
})

// Combined nodes (sections + frames + assets)
const nodes = computed(() => [...sectionNodes.value, ...frameNodes.value, ...assetNodes.value])

// Section management functions
function addSection(): void {
  const lastSection = sections.value[sections.value.length - 1]
  const newY = lastSection
    ? lastSection.position.y + lastSection.height + CANVAS_LAYOUT.SECTION_GAP
    : CANVAS_LAYOUT.START_Y

  sections.value.push(createSection(`Section ${sections.value.length + 1}`, { x: 50, y: newY }, sections.value.length))
}

function handleSectionRename(id: string, name: string): void {
  const section = sections.value.find(s => s.id === id)
  if (section) {
    section.name = name
  }
}

function handleSectionResize(id: string, width: number, height: number): void {
  const section = sections.value.find(s => s.id === id)
  if (section) {
    section.width = width
    section.height = height
  }
}

function handleSectionDelete(id: string): void {
  // Remove section assignment from all items in this section
  generationSections.value.forEach((sectionId, genId) => {
    if (sectionId === id) {
      generationSections.value.delete(genId)
    }
  })

  // Remove the section
  const index = sections.value.findIndex(s => s.id === id)
  if (index !== -1) {
    sections.value.splice(index, 1)
  }
}

function handleSectionColorChange(id: string, color: string): void {
  const section = sections.value.find(s => s.id === id)
  if (section) {
    section.color = color
  }
}

function handleSectionToggleCollapse(id: string): void {
  const section = sections.value.find(s => s.id === id)
  if (section) {
    section.collapsed = !section.collapsed
  }
}

// Assign a generation to a section
function assignToSection(generationId: string, sectionId: string | null): void {
  if (sectionId) {
    generationSections.value.set(generationId, sectionId)
  } else {
    generationSections.value.delete(generationId)
  }
}

// No edges for now (MVP)
const edges = ref([])

// Node selection handling
onNodeClick(({ node }) => {
  selectedNodeId.value = node.id
})

onPaneClick(() => {
  selectedNodeId.value = null
})

// Fit view on mount
onMounted(() => {
  setTimeout(() => {
    fitView({ padding: 0.2, maxZoom: 1 })
  }, 100)
})

// Zoom level display
const zoomLevel = ref(80)

function handleZoomIn(): void {
  zoomIn()
  zoomLevel.value = Math.min(200, zoomLevel.value + 10)
}

function handleZoomOut(): void {
  zoomOut()
  zoomLevel.value = Math.max(20, zoomLevel.value - 10)
}

function handleFitView(): void {
  fitView({ padding: 0.2, maxZoom: 1 })
  zoomLevel.value = 80
}

// Event handlers from nodes
function handleRerun(id: string): void {
  emit('rerun', id)
}

function handleDownload(id: string): void {
  emit('download', id)
}

function handleDelete(id: string): void {
  // Check if it's an asset node
  const assetIndex = assetNodes.value.findIndex(n => n.id === id)
  if (assetIndex !== -1) {
    assetNodes.value.splice(assetIndex, 1)
    return
  }
  emit('delete', id)
}

// Helper to find a generation's position
function getFramePosition(generationId: string): { x: number; y: number } {
  const gen = props.generations.find(g => g.id === generationId)
  if (!gen) return { x: 0, y: 0 }

  const sectionId = generationSections.value.get(generationId)

  if (sectionId) {
    const section = sections.value.find(s => s.id === sectionId)
    if (section) {
      const sectionGens = props.generations.filter(g =>
        generationSections.value.get(g.id) === sectionId
      )
      const indexInSection = sectionGens.findIndex(g => g.id === generationId)
      const relativePos = calculatePositionInSection(indexInSection, section.width)
      return {
        x: section.position.x + relativePos.x,
        y: section.position.y + relativePos.y,
      }
    }
  }

  // Unsectioned items
  const unsectionedGens = props.generations.filter(g =>
    !generationSections.value.has(g.id)
  )
  const index = unsectionedGens.findIndex(g => g.id === generationId)

  const lastSection = sections.value[sections.value.length - 1]
  const startY = lastSection
    ? lastSection.position.y + lastSection.height + CANVAS_LAYOUT.SECTION_GAP
    : CANVAS_LAYOUT.START_Y

  const pos = calculateGridPosition(index)
  return { x: pos.x, y: startY + pos.y - CANVAS_LAYOUT.START_Y }
}

// Ungroup handler - extract all images from a frame
function handleUngroup(generationId: string): void {
  const gen = props.generations.find(g => g.id === generationId)
  if (!gen || gen.images.length === 0) return

  // Find the frame position using grouped layout
  const framePos = getFramePosition(generationId)

  // Create asset nodes for each image
  gen.images.forEach((imageUrl, index) => {
    const key = `${generationId}:${index}`
    if (extractedImages.value.has(key)) return

    extractedImages.value.add(key)

    const assetId = `asset-${generationId}-${index}-${Date.now()}`
    const col = index % 2
    const row = Math.floor(index / 2)

    assetNodes.value.push({
      id: assetId,
      type: 'asset',
      position: {
        x: framePos.x + CANVAS_LAYOUT.FRAME_WIDTH + CANVAS_LAYOUT.GAP + col * 180,
        y: framePos.y + row * 200,
      },
      data: {
        id: assetId,
        imageUrl,
        sourceGenerationId: generationId,
        sourceIndex: index,
        prompt: gen.prompt,
        seed: gen.parameters.seed,
        width: gen.parameters.width,
        height: gen.parameters.height,
        createdAt: gen.createdAt,
      },
      draggable: true,
      selectable: true,
    })
  })
}

// Extract single image handler
function handleExtractImage(generationId: string, imageIndex: number, imageUrl: string): void {
  const key = `${generationId}:${imageIndex}`
  if (extractedImages.value.has(key)) return

  const gen = props.generations.find(g => g.id === generationId)
  if (!gen) return

  extractedImages.value.add(key)

  // Find position near the frame using grouped layout
  const framePos = getFramePosition(generationId)

  const assetId = `asset-${generationId}-${imageIndex}-${Date.now()}`

  assetNodes.value.push({
    id: assetId,
    type: 'asset',
    position: {
      x: framePos.x + CANVAS_LAYOUT.FRAME_WIDTH + CANVAS_LAYOUT.GAP,
      y: framePos.y + imageIndex * 180,
    },
    data: {
      id: assetId,
      imageUrl,
      sourceGenerationId: generationId,
      sourceIndex: imageIndex,
      prompt: gen.prompt,
      seed: gen.parameters.seed,
      width: gen.parameters.width,
      height: gen.parameters.height,
      createdAt: gen.createdAt,
    },
    draggable: true,
    selectable: true,
  })
}

// Handle drop on canvas (for dragged images)
function handleCanvasDrop(event: DragEvent): void {
  event.preventDefault()
  if (!event.dataTransfer) return

  try {
    const data = JSON.parse(event.dataTransfer.getData('application/json'))
    if (data.type === 'extract-image') {
      // Convert screen coordinates to flow coordinates
      const position = screenToFlowCoordinate({
        x: event.clientX,
        y: event.clientY,
      })

      const key = `${data.generationId}:${data.imageIndex}`
      if (extractedImages.value.has(key)) return

      const gen = props.generations.find(g => g.id === data.generationId)
      if (!gen) return

      extractedImages.value.add(key)

      const assetId = `asset-${data.generationId}-${data.imageIndex}-${Date.now()}`

      assetNodes.value.push({
        id: assetId,
        type: 'asset',
        position,
        data: {
          id: assetId,
          imageUrl: data.imageUrl,
          sourceGenerationId: data.generationId,
          sourceIndex: data.imageIndex,
          prompt: gen.prompt,
          seed: gen.parameters.seed,
          width: gen.parameters.width,
          height: gen.parameters.height,
          createdAt: gen.createdAt,
        },
        draggable: true,
        selectable: true,
      })
    }
  } catch {
    // Invalid JSON, ignore
  }
}

function handleCanvasDragOver(event: DragEvent): void {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

// Asset node handlers
function handleAssetDownload(id: string): void {
  const asset = assetNodes.value.find(n => n.id === id)
  if (!asset) return

  const link = document.createElement('a')
  link.href = asset.data.imageUrl
  link.download = `asset-${id}.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Reorder images within a generation
function handleReorderImages(generationId: string, fromIndex: number, toIndex: number): void {
  emit('reorderImages', generationId, fromIndex, toIndex)
}

// Preview image handler
function handlePreview(imageUrl: string): void {
  emit('preview', imageUrl)
}

// Add image to a section (from canvas drop or from another section)
function handleAddImageToSection(targetGenerationId: string, imageUrl: string): void {
  // Find the source of the image
  // Check if it's from an asset node
  const assetNode = assetNodes.value.find(n => n.data.imageUrl === imageUrl)
  if (assetNode) {
    // Remove the asset node
    const index = assetNodes.value.findIndex(n => n.id === assetNode.id)
    if (index !== -1) {
      assetNodes.value.splice(index, 1)
    }

    // If it was extracted from this generation, restore it
    if (assetNode.data.sourceGenerationId) {
      const key = `${assetNode.data.sourceGenerationId}:${assetNode.data.sourceIndex}`
      extractedImages.value.delete(key)
    }
    return
  }

  // Check if it came from another generation (cross-section move)
  // For now, we'll emit an event to handle this at the parent level
  emit('addImageToGeneration', targetGenerationId, imageUrl)
}
</script>

<template>
  <div
    class="relative h-full w-full bg-zinc-950"
    @drop="handleCanvasDrop"
    @dragover="handleCanvasDragOver"
  >
    <!-- VueFlow Canvas -->
    <VueFlow
      v-model:nodes="nodes"
      v-model:edges="edges"
      :node-types="nodeTypes"
      :default-viewport="{ x: 0, y: 0, zoom: 0.8 }"
      :min-zoom="0.2"
      :max-zoom="2"
      :snap-to-grid="true"
      :snap-grid="[20, 20]"
      class="linear-canvas"
      @node-click="({ node }) => selectedNodeId = node.id"
    >
      <Background pattern-color="#27272a" :gap="20" :size="1" />

      <!-- Generation Frame Node -->
      <template #node-generationFrame="nodeProps">
        <GenerationFrameNode
          :id="nodeProps.id"
          :data="nodeProps.data"
          :selected="selectedNodeId === nodeProps.id"
          @rerun="handleRerun"
          @download="handleDownload"
          @delete="handleDelete"
          @ungroup="handleUngroup"
          @extract-image="handleExtractImage"
          @reorder-images="handleReorderImages"
          @add-image="handleAddImageToSection"
          @preview="handlePreview"
        />
      </template>

      <!-- Asset Node (extracted images) -->
      <template #node-asset="nodeProps">
        <AssetNode
          :id="nodeProps.id"
          :data="nodeProps.data"
          :selected="selectedNodeId === nodeProps.id"
          @download="handleAssetDownload"
          @delete="handleDelete"
          @preview="handlePreview"
        />
      </template>

      <!-- Section Node -->
      <template #node-section="nodeProps">
        <SectionNode
          :id="nodeProps.id"
          :data="nodeProps.data"
          :selected="selectedNodeId === nodeProps.id"
          @rename="handleSectionRename"
          @resize="handleSectionResize"
          @delete="handleSectionDelete"
          @change-color="handleSectionColorChange"
          @toggle-collapse="handleSectionToggleCollapse"
        />
      </template>
    </VueFlow>

    <!-- Bottom Toolbar -->
    <CanvasToolbar />

    <!-- Add Section Button -->
    <div class="absolute left-4 top-4 z-10">
      <button
        class="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/90 px-3 py-2 text-sm text-zinc-300 backdrop-blur transition-colors hover:bg-zinc-700 hover:text-white"
        @click="addSection"
      >
        <i class="pi pi-plus text-xs" />
        Add Section
      </button>
    </div>

    <!-- Zoom Controls -->
    <div class="absolute bottom-4 right-4 z-10 flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900/90 p-1 backdrop-blur">
      <button
        v-tooltip.top="'Zoom out'"
        class="flex h-7 w-7 items-center justify-center rounded text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
        @click="handleZoomOut"
      >
        <i class="pi pi-minus text-xs" />
      </button>
      <span class="w-12 text-center text-[11px] text-zinc-500">{{ zoomLevel }}%</span>
      <button
        v-tooltip.top="'Zoom in'"
        class="flex h-7 w-7 items-center justify-center rounded text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
        @click="handleZoomIn"
      >
        <i class="pi pi-plus text-xs" />
      </button>
      <div class="mx-1 h-4 w-px bg-zinc-700" />
      <button
        v-tooltip.top="'Fit to view'"
        class="flex h-7 w-7 items-center justify-center rounded text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
        @click="handleFitView"
      >
        <i class="pi pi-expand text-xs" />
      </button>
    </div>

    <!-- Empty state -->
    <div
      v-if="generations.length === 0"
      class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-zinc-500"
    >
      <i class="pi pi-th-large mb-2 text-4xl opacity-50" />
      <span class="text-sm">No generations yet</span>
      <p class="mt-1 text-xs text-zinc-600">
        Start generating to see your creations here
      </p>
    </div>
  </div>
</template>

<style>
.linear-canvas {
  width: 100%;
  height: 100%;
  background-color: #09090b;
}

/* Override default node styles - Generation Frame */
.linear-canvas .vue-flow__node-generationFrame {
  background: transparent;
  border: none;
  padding: 0;
  box-shadow: none;
}

.linear-canvas .vue-flow__node-generationFrame.selected {
  box-shadow: none;
}

/* Override default node styles - Asset Node */
.linear-canvas .vue-flow__node-asset {
  background: transparent;
  border: none;
  padding: 0;
  box-shadow: none;
}

.linear-canvas .vue-flow__node-asset.selected {
  box-shadow: none;
}

/* Override default node styles - Section Node */
.linear-canvas .vue-flow__node-section {
  background: transparent;
  border: none;
  padding: 0;
  box-shadow: none;
}

.linear-canvas .vue-flow__node-section.selected {
  box-shadow: none;
}

/* Hide default handles */
.linear-canvas .vue-flow__handle {
  opacity: 0 !important;
  pointer-events: none;
}
</style>
