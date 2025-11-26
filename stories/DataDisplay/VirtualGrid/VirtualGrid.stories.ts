import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'

import VirtualGrid from '@/components/common/VirtualGrid.vue'

/**
 * VirtualGrid is a high-performance virtualized grid component for displaying large datasets.
 * It only renders items currently visible in the viewport plus a configurable buffer,
 * making it efficient for galleries with hundreds or thousands of items.
 *
 * ## Features
 * - Virtualized rendering - only visible items are in the DOM
 * - Automatic column calculation based on container width
 * - Configurable buffer rows for smoother scrolling
 * - Emits `approach-end` event for infinite scroll / pagination
 * - Auto-detects item dimensions from first rendered item
 *
 * ## Usage
 * Used for:
 * - Workflow galleries
 * - Model/checkpoint browsers
 * - Output image galleries
 * - Template libraries
 */
const meta: Meta = {
  title: 'Data Display/VirtualGrid',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'High-performance virtualized grid for displaying large datasets with efficient DOM usage.'
      }
    }
  },
  argTypes: {
    bufferRows: {
      control: { type: 'number', min: 0, max: 5 },
      description: 'Number of extra rows to render above/below viewport'
    },
    scrollThrottle: {
      control: { type: 'number', min: 0, max: 200 },
      description: 'Throttle scroll events (ms)'
    },
    defaultItemHeight: {
      control: { type: 'number', min: 50, max: 500 },
      description: 'Initial item height before measurement'
    },
    defaultItemWidth: {
      control: { type: 'number', min: 50, max: 500 },
      description: 'Initial item width before measurement'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Generate mock items
const generateItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    key: `item-${i}`,
    id: i + 1,
    title: `Item ${i + 1}`,
    color: `hsl(${(i * 37) % 360}, 70%, 60%)`
  }))

// Placeholder image
const placeholderImage =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect fill="%234a5568" width="200" height="200"/%3E%3Ctext fill="%23a0aec0" font-family="system-ui" font-size="16" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EImage%3C/text%3E%3C/svg%3E'

/**
 * Default grid with 100 items
 */
export const Default: Story = {
  render: () => ({
    components: { VirtualGrid },
    setup() {
      const items = generateItems(100)
      const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '16px',
        padding: '16px'
      }
      return { items, gridStyle }
    },
    template: `
      <div style="width: 600px; height: 400px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
        <VirtualGrid
          :items="items"
          :grid-style="gridStyle"
          :buffer-rows="2"
          :default-item-height="180"
          :default-item-width="150"
        >
          <template #item="{ item }">
            <div style="background: white; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
              <div :style="{ background: item.color, height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }">
                {{ item.id }}
              </div>
              <div style="padding: 8px; text-align: center; font-size: 12px;">
                {{ item.title }}
              </div>
            </div>
          </template>
        </VirtualGrid>
      </div>
    `
  })
}

/**
 * Large dataset with 1000 items demonstrating virtualization performance
 */
export const LargeDataset: Story = {
  render: () => ({
    components: { VirtualGrid },
    setup() {
      const items = generateItems(1000)
      const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '12px',
        padding: '12px'
      }
      const renderedCount = ref(0)

      return { items, gridStyle, renderedCount }
    },
    template: `
      <div>
        <div style="margin-bottom: 12px; padding: 12px; background: #f5f5f5; border-radius: 8px; font-size: 14px;">
          <strong>Total Items:</strong> {{ items.length }} |
          <strong>Note:</strong> Only visible items are rendered in the DOM
        </div>
        <div style="width: 700px; height: 500px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
          <VirtualGrid
            :items="items"
            :grid-style="gridStyle"
            :buffer-rows="2"
            :default-item-height="140"
            :default-item-width="120"
          >
            <template #item="{ item }">
              <div style="background: white; border: 1px solid #e5e5e5; border-radius: 6px; overflow: hidden;">
                <div :style="{ background: item.color, height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }">
                  #{{ item.id }}
                </div>
                <div style="padding: 6px; text-align: center; font-size: 11px; color: #666;">
                  {{ item.title }}
                </div>
              </div>
            </template>
          </VirtualGrid>
        </div>
      </div>
    `
  })
}

/**
 * Image gallery style with card thumbnails
 */
export const ImageGallery: Story = {
  render: () => ({
    components: { VirtualGrid },
    setup() {
      const items = Array.from({ length: 200 }, (_, i) => ({
        key: `img-${i}`,
        id: i + 1,
        title: `Workflow ${i + 1}`
      }))
      const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '16px',
        padding: '16px'
      }
      return { items, gridStyle, placeholderImage }
    },
    template: `
      <div style="width: 700px; height: 450px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; background: #fafafa;">
        <VirtualGrid
          :items="items"
          :grid-style="gridStyle"
          :buffer-rows="2"
          :default-item-height="200"
          :default-item-width="160"
        >
          <template #item="{ item }">
            <div style="background: white; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; cursor: pointer; transition: box-shadow 0.2s;">
              <img :src="placeholderImage" :alt="item.title" style="width: 100%; height: 120px; object-fit: cover; display: block;" />
              <div style="padding: 10px;">
                <div style="font-size: 13px; font-weight: 500; color: #1a1a1a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  {{ item.title }}
                </div>
                <div style="font-size: 11px; color: #888; margin-top: 4px;">
                  Generated output
                </div>
              </div>
            </div>
          </template>
        </VirtualGrid>
      </div>
    `
  })
}

/**
 * Grid with approach-end event for infinite scroll
 */
export const InfiniteScroll: Story = {
  render: () => ({
    components: { VirtualGrid },
    setup() {
      const itemCount = ref(50)
      const items = computed(() => generateItems(itemCount.value))
      const isLoading = ref(false)
      const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '12px',
        padding: '12px'
      }

      const loadMore = () => {
        if (isLoading.value) return
        isLoading.value = true
        // Simulate API delay
        setTimeout(() => {
          itemCount.value += 25
          isLoading.value = false
        }, 500)
      }

      return { items, gridStyle, loadMore, isLoading, itemCount }
    },
    template: `
      <div>
        <div style="margin-bottom: 12px; padding: 12px; background: #f5f5f5; border-radius: 8px; font-size: 14px;">
          <strong>Items loaded:</strong> {{ itemCount }} |
          <span v-if="isLoading" style="color: #3b82f6;">Loading more...</span>
          <span v-else style="color: #666;">Scroll to bottom to load more</span>
        </div>
        <div style="width: 600px; height: 400px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
          <VirtualGrid
            :items="items"
            :grid-style="gridStyle"
            :buffer-rows="1"
            :default-item-height="160"
            :default-item-width="140"
            @approach-end="loadMore"
          >
            <template #item="{ item }">
              <div style="background: white; border: 1px solid #e5e5e5; border-radius: 6px; overflow: hidden;">
                <div :style="{ background: item.color, height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }">
                  {{ item.id }}
                </div>
                <div style="padding: 8px; text-align: center; font-size: 12px;">
                  {{ item.title }}
                </div>
              </div>
            </template>
          </VirtualGrid>
        </div>
      </div>
    `
  })
}

/**
 * Different column configurations
 */
export const ColumnVariants: Story = {
  render: () => ({
    components: { VirtualGrid },
    setup() {
      const items = generateItems(60)
      const smallGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
        gap: '8px',
        padding: '8px'
      }
      const largeGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
        padding: '16px'
      }
      return { items, smallGridStyle, largeGridStyle }
    },
    template: `
      <div style="display: flex; gap: 24px;">
        <div>
          <h4 style="margin-bottom: 12px; font-weight: 600; color: #1a1a1a;">Small Items (80px min)</h4>
          <div style="width: 350px; height: 300px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
            <VirtualGrid
              :items="items"
              :grid-style="smallGridStyle"
              :buffer-rows="2"
              :default-item-height="80"
              :default-item-width="80"
            >
              <template #item="{ item }">
                <div :style="{ background: item.color, height: '60px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '12px' }">
                  {{ item.id }}
                </div>
              </template>
            </VirtualGrid>
          </div>
        </div>

        <div>
          <h4 style="margin-bottom: 12px; font-weight: 600; color: #1a1a1a;">Large Items (200px min)</h4>
          <div style="width: 450px; height: 300px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
            <VirtualGrid
              :items="items"
              :grid-style="largeGridStyle"
              :buffer-rows="2"
              :default-item-height="180"
              :default-item-width="200"
            >
              <template #item="{ item }">
                <div style="background: white; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
                  <div :style="{ background: item.color, height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '18px' }">
                    {{ item.id }}
                  </div>
                  <div style="padding: 12px; text-align: center;">
                    {{ item.title }}
                  </div>
                </div>
              </template>
            </VirtualGrid>
          </div>
        </div>
      </div>
    `
  })
}

/**
 * ComfyUI workflow gallery use case
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: { VirtualGrid },
    setup() {
      const workflows = Array.from({ length: 150 }, (_, i) => ({
        key: `wf-${i}`,
        id: i + 1,
        name: [
          'SDXL Portrait',
          'ControlNet Canny',
          'Inpainting Workflow',
          'Upscale 4x',
          'LoRA Merge',
          'Img2Img Basic'
        ][i % 6],
        runs: Math.floor(Math.random() * 100) + 1
      }))
      const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '16px',
        padding: '16px'
      }
      return { workflows, gridStyle, placeholderImage }
    },
    template: `
      <div>
        <h3 style="margin-bottom: 16px; font-weight: 600; color: #1a1a1a;">Workflow Gallery</h3>
        <div style="width: 800px; height: 500px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; background: #fafafa;">
          <VirtualGrid
            :items="workflows"
            :grid-style="gridStyle"
            :buffer-rows="2"
            :default-item-height="220"
            :default-item-width="180"
          >
            <template #item="{ item }">
              <div style="background: white; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; cursor: pointer;">
                <div style="position: relative;">
                  <img :src="placeholderImage" :alt="item.name" style="width: 100%; height: 130px; object-fit: cover; display: block;" />
                  <span style="position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px;">
                    {{ item.runs }} runs
                  </span>
                </div>
                <div style="padding: 12px;">
                  <div style="font-size: 13px; font-weight: 500; color: #1a1a1a;">
                    {{ item.name }}
                  </div>
                  <div style="font-size: 11px; color: #888; margin-top: 4px;">
                    Workflow #{{ item.id }}
                  </div>
                </div>
              </div>
            </template>
          </VirtualGrid>
        </div>
      </div>
    `
  })
}

/**
 * Dark theme preview
 */
export const DarkTheme: Story = {
  render: () => ({
    components: { VirtualGrid },
    setup() {
      const items = generateItems(80)
      const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '16px',
        padding: '16px'
      }
      return { items, gridStyle }
    },
    template: `
      <div class="dark-theme" style="background: #0a0a0a; padding: 24px; border-radius: 8px;">
        <div style="width: 600px; height: 400px; border: 1px solid #333; border-radius: 8px; overflow: hidden;">
          <VirtualGrid
            :items="items"
            :grid-style="gridStyle"
            :buffer-rows="2"
            :default-item-height="180"
            :default-item-width="150"
          >
            <template #item="{ item }">
              <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; overflow: hidden;">
                <div :style="{ background: item.color, height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }">
                  {{ item.id }}
                </div>
                <div style="padding: 8px; text-align: center; font-size: 12px; color: #ccc;">
                  {{ item.title }}
                </div>
              </div>
            </template>
          </VirtualGrid>
        </div>
      </div>
    `
  })
}
