import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import DotSpinner from '@/components/common/DotSpinner.vue'

/**
 * Loading Components
 *
 * Loading indicators and spinners for async operations.
 * The DotSpinner is ComfyUI's custom animated loading indicator.
 *
 * DotSpinner Props:
 * - `size`: number - spinner size in pixels (default: 24)
 * - `duration`: string - animation duration (default: '2s')
 */
const meta: Meta<typeof DotSpinner> = {
  title: 'Feedback/Loading',
  component: DotSpinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Loading indicators for async operations. DotSpinner is a custom animated spinner with 8 pulsing dots arranged in a circle.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'number', min: 12, max: 96, step: 4 },
      description: 'Spinner size in pixels'
    },
    duration: {
      control: 'text',
      description: 'Animation duration (CSS time value)'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default spinner with standard size
 */
export const Default: Story = {
  args: {
    size: 24,
    duration: '2s'
  }
}

/**
 * All size variants
 */
export const AllSizes: Story = {
  render: () => ({
    components: { DotSpinner },
    template: `
      <div class="flex items-end gap-8">
        <div class="flex flex-col items-center gap-2">
          <DotSpinner :size="16" />
          <span class="text-xs text-muted-foreground">16px</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <DotSpinner :size="24" />
          <span class="text-xs text-muted-foreground">24px</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <DotSpinner :size="32" />
          <span class="text-xs text-muted-foreground">32px</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <DotSpinner :size="48" />
          <span class="text-xs text-muted-foreground">48px</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <DotSpinner :size="64" />
          <span class="text-xs text-muted-foreground">64px</span>
        </div>
      </div>
    `
  })
}

/**
 * Animation speed variants
 */
export const AnimationSpeeds: Story = {
  render: () => ({
    components: { DotSpinner },
    template: `
      <div class="flex items-center gap-12">
        <div class="flex flex-col items-center gap-2">
          <DotSpinner :size="32" duration="1s" />
          <span class="text-xs text-muted-foreground">Fast (1s)</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <DotSpinner :size="32" duration="2s" />
          <span class="text-xs text-muted-foreground">Normal (2s)</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <DotSpinner :size="32" duration="3s" />
          <span class="text-xs text-muted-foreground">Slow (3s)</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <DotSpinner :size="32" duration="4s" />
          <span class="text-xs text-muted-foreground">Very Slow (4s)</span>
        </div>
      </div>
    `
  })
}

/**
 * Spinner with loading text
 */
export const WithText: Story = {
  render: () => ({
    components: { DotSpinner },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-3">
          <DotSpinner :size="20" />
          <span class="text-sm text-base-foreground">Loading...</span>
        </div>
        <div class="flex items-center gap-3">
          <DotSpinner :size="20" />
          <span class="text-sm text-base-foreground">Processing workflow...</span>
        </div>
        <div class="flex items-center gap-3">
          <DotSpinner :size="20" />
          <span class="text-sm text-base-foreground">Generating images...</span>
        </div>
      </div>
    `
  })
}

/**
 * Centered loading state (fullscreen-like)
 */
export const CenteredLoading: Story = {
  render: () => ({
    components: { DotSpinner },
    template: `
      <div class="w-96 h-64 bg-secondary-background rounded-lg flex flex-col items-center justify-center gap-4">
        <DotSpinner :size="48" />
        <span class="text-sm text-muted-foreground">Loading content...</span>
      </div>
    `
  })
}

/**
 * Loading overlay pattern
 */
export const LoadingOverlay: Story = {
  render: () => ({
    components: { DotSpinner },
    template: `
      <div class="relative w-96 h-64">
        <!-- Background content -->
        <div class="w-full h-full bg-secondary-background rounded-lg p-4">
          <div class="h-4 w-3/4 bg-neutral-300 rounded mb-3"></div>
          <div class="h-4 w-1/2 bg-neutral-300 rounded mb-3"></div>
          <div class="h-4 w-2/3 bg-neutral-300 rounded mb-3"></div>
          <div class="h-20 w-full bg-neutral-300 rounded"></div>
        </div>
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/50 rounded-lg flex flex-col items-center justify-center gap-3">
          <DotSpinner :size="40" />
          <span class="text-sm text-white">Processing...</span>
        </div>
      </div>
    `
  })
}

/**
 * Button loading state
 */
export const ButtonLoading: Story = {
  render: () => ({
    components: { DotSpinner },
    template: `
      <div class="flex gap-4">
        <button class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg" disabled>
          <DotSpinner :size="16" />
          <span>Loading...</span>
        </button>
        <button class="inline-flex items-center gap-2 px-4 py-2 bg-neutral-600 text-white rounded-lg" disabled>
          <DotSpinner :size="16" />
          <span>Processing</span>
        </button>
        <button class="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg" disabled>
          <DotSpinner :size="16" />
          <span>Saving</span>
        </button>
      </div>
    `
  })
}

/**
 * Card loading state
 */
export const CardLoading: Story = {
  render: () => ({
    components: { DotSpinner },
    template: `
      <div class="grid grid-cols-3 gap-4">
        <!-- Loading card -->
        <div class="w-48 h-64 bg-secondary-background rounded-lg flex flex-col items-center justify-center gap-3 border border-neutral-200">
          <DotSpinner :size="32" />
          <span class="text-xs text-muted-foreground">Loading...</span>
        </div>
        <!-- Loaded card -->
        <div class="w-48 h-64 bg-secondary-background rounded-lg overflow-hidden border border-neutral-200">
          <div class="w-full h-40 bg-gradient-to-br from-blue-400 to-purple-500"></div>
          <div class="p-3">
            <div class="text-sm font-medium">Workflow Name</div>
            <div class="text-xs text-muted-foreground">Generated Image</div>
          </div>
        </div>
        <!-- Loading card -->
        <div class="w-48 h-64 bg-secondary-background rounded-lg flex flex-col items-center justify-center gap-3 border border-neutral-200">
          <DotSpinner :size="32" />
          <span class="text-xs text-muted-foreground">Loading...</span>
        </div>
      </div>
    `
  })
}

/**
 * Interactive loading toggle
 */
export const Interactive: Story = {
  render: () => ({
    components: { DotSpinner },
    setup() {
      const isLoading = ref(true)
      const toggleLoading = () => {
        isLoading.value = !isLoading.value
      }
      return { isLoading, toggleLoading }
    },
    template: `
      <div class="flex flex-col items-center gap-6">
        <div class="w-64 h-32 bg-secondary-background rounded-lg flex items-center justify-center">
          <template v-if="isLoading">
            <div class="flex flex-col items-center gap-2">
              <DotSpinner :size="32" />
              <span class="text-sm text-muted-foreground">Loading content...</span>
            </div>
          </template>
          <template v-else>
            <div class="text-sm text-base-foreground">Content loaded!</div>
          </template>
        </div>
        <button
          @click="toggleLoading"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {{ isLoading ? 'Show Content' : 'Show Loading' }}
        </button>
      </div>
    `
  })
}

/**
 * ComfyUI-specific loading use cases
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: { DotSpinner },
    template: `
      <div class="flex flex-col gap-8 w-[500px]">
        <!-- Queue processing -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Queue Processing</h3>
          <div class="p-4 bg-secondary-background rounded-lg">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <DotSpinner :size="20" />
                <span class="text-sm">Processing queue item 3/10...</span>
              </div>
              <span class="text-xs text-muted-foreground">30%</span>
            </div>
            <div class="mt-3 h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div class="h-full w-[30%] bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <!-- Model loading -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Model Loading</h3>
          <div class="p-4 bg-secondary-background rounded-lg">
            <div class="flex items-center gap-3">
              <DotSpinner :size="24" />
              <div>
                <div class="text-sm font-medium">Loading checkpoint...</div>
                <div class="text-xs text-muted-foreground">sd_xl_base_1.0.safetensors</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Node execution -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Node Execution</h3>
          <div class="p-4 bg-secondary-background rounded-lg border-l-4 border-blue-500">
            <div class="flex items-center gap-3">
              <DotSpinner :size="20" />
              <div>
                <div class="text-sm font-medium">KSampler</div>
                <div class="text-xs text-muted-foreground">Step 15/20</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Workflow import -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Workflow Import</h3>
          <div class="p-4 bg-secondary-background rounded-lg">
            <div class="flex flex-col items-center gap-3">
              <DotSpinner :size="32" />
              <span class="text-sm">Importing workflow...</span>
              <span class="text-xs text-muted-foreground">Validating nodes and connections</span>
            </div>
          </div>
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
    components: { DotSpinner },
    template: `
      <div class="dark-theme bg-neutral-900 p-8 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-6">Dark Theme</h3>
        <div class="flex flex-col gap-6">
          <div class="flex items-end gap-8">
            <div class="flex flex-col items-center gap-2">
              <DotSpinner :size="24" />
              <span class="text-xs text-neutral-400">24px</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <DotSpinner :size="32" />
              <span class="text-xs text-neutral-400">32px</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <DotSpinner :size="48" />
              <span class="text-xs text-neutral-400">48px</span>
            </div>
          </div>

          <div class="p-4 bg-neutral-800 rounded-lg flex items-center gap-3">
            <DotSpinner :size="20" />
            <span class="text-sm text-white">Processing workflow...</span>
          </div>

          <div class="w-full h-32 bg-neutral-800 rounded-lg flex flex-col items-center justify-center gap-3">
            <DotSpinner :size="36" />
            <span class="text-sm text-neutral-300">Loading models...</span>
          </div>
        </div>
      </div>
    `
  })
}
