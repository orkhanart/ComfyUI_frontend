import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Tooltip from 'primevue/tooltip'
import { ref } from 'vue'

/**
 * Tooltips
 *
 * Tooltip components provide contextual information on hover or focus.
 * ComfyUI uses both native browser tooltips and custom tooltip components.
 *
 * Tooltip Types:
 * - Basic: Simple text tooltip using PrimeVue directive
 * - Rich: Custom styled tooltip with more content
 * - NodeTooltip: Specialized tooltip for node inputs/outputs/widgets
 *
 * Note: The NodeTooltip component is tightly coupled with LiteGraph canvas
 * and uses global state. These stories demonstrate the visual patterns.
 */
const meta = {
  title: 'Overlays/Tooltips',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tooltip components for displaying contextual information. Uses PrimeVue Tooltip directive and custom components.'
      }
    }
  }
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic tooltip using PrimeVue directive
 */
export const BasicTooltip: Story = {
  render: () => ({
    directives: { tooltip: Tooltip },
    template: `
      <div class="flex gap-8 items-center">
        <button
          v-tooltip.top="'Top tooltip'"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Hover me (Top)
        </button>
        <button
          v-tooltip.bottom="'Bottom tooltip'"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Hover me (Bottom)
        </button>
        <button
          v-tooltip.left="'Left tooltip'"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Hover me (Left)
        </button>
        <button
          v-tooltip.right="'Right tooltip'"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Hover me (Right)
        </button>
      </div>
    `
  })
}

/**
 * Tooltip positions
 */
export const AllPositions: Story = {
  render: () => ({
    directives: { tooltip: Tooltip },
    template: `
      <div class="flex flex-col items-center gap-4 p-8">
        <button
          v-tooltip.top="'This appears above'"
          class="px-4 py-2 bg-neutral-200 rounded hover:bg-neutral-300"
        >
          Top
        </button>
        <div class="flex gap-32">
          <button
            v-tooltip.left="'This appears on the left'"
            class="px-4 py-2 bg-neutral-200 rounded hover:bg-neutral-300"
          >
            Left
          </button>
          <button
            v-tooltip.right="'This appears on the right'"
            class="px-4 py-2 bg-neutral-200 rounded hover:bg-neutral-300"
          >
            Right
          </button>
        </div>
        <button
          v-tooltip.bottom="'This appears below'"
          class="px-4 py-2 bg-neutral-200 rounded hover:bg-neutral-300"
        >
          Bottom
        </button>
      </div>
    `
  })
}

/**
 * Node tooltip style (visual mockup)
 *
 * This demonstrates the visual appearance of NodeTooltip.
 * The actual component requires LiteGraph canvas context.
 */
export const NodeTooltipStyle: Story = {
  render: () => ({
    setup() {
      const showTooltip = ref(true)
      return { showTooltip }
    },
    template: `
      <div class="relative p-16">
        <!-- Mock node input -->
        <div class="flex items-center gap-2 mb-8">
          <div class="w-3 h-3 rounded-full bg-yellow-500 border-2 border-yellow-600"></div>
          <span class="text-sm font-mono">CLIP</span>
        </div>

        <!-- Tooltip (positioned relative to input) -->
        <div
          v-if="showTooltip"
          class="absolute left-8 top-0 pointer-events-none"
          style="
            background: var(--comfy-input-bg, #1a1a2e);
            border-radius: 5px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
            color: var(--input-text, #e0e0e0);
            font-family: sans-serif;
            max-width: 30vw;
            padding: 4px 8px;
            white-space: pre-wrap;
            z-index: 99999;
            transform: translate(5px, calc(-100% - 5px));
          "
        >
          CLIP model used for text encoding. Connect a CLIP Loader output here.
        </div>

        <p class="text-sm text-muted-foreground mt-8">
          ↑ Node tooltip appearance (hover on node input/output slots)
        </p>
      </div>
    `
  })
}

/**
 * Node input tooltips (visual mockup)
 */
export const NodeInputTooltips: Story = {
  render: () => ({
    setup() {
      const inputs = [
        {
          name: 'model',
          type: 'MODEL',
          color: '#9966cc',
          tooltip: 'The diffusion model to use for generation'
        },
        {
          name: 'positive',
          type: 'CONDITIONING',
          color: '#ffaa00',
          tooltip: 'Positive conditioning (what you want in the image)'
        },
        {
          name: 'negative',
          type: 'CONDITIONING',
          color: '#ffaa00',
          tooltip: 'Negative conditioning (what you want to avoid)'
        },
        {
          name: 'latent_image',
          type: 'LATENT',
          color: '#ff66aa',
          tooltip: 'Input latent image to denoise'
        }
      ]
      const hoveredInput = ref<string | null>(null)
      return { inputs, hoveredInput }
    },
    template: `
      <div class="bg-neutral-800 rounded-lg p-4 w-[280px]">
        <div class="bg-neutral-700 text-white px-3 py-1 rounded-t-lg text-sm font-medium">
          KSampler
        </div>
        <div class="flex flex-col gap-2 p-3 relative">
          <div
            v-for="input in inputs"
            :key="input.name"
            class="flex items-center gap-2 cursor-pointer"
            @mouseenter="hoveredInput = input.name"
            @mouseleave="hoveredInput = null"
          >
            <div
              class="w-3 h-3 rounded-full border-2"
              :style="{ backgroundColor: input.color, borderColor: input.color }"
            ></div>
            <span class="text-sm text-neutral-200 font-mono">{{ input.name }}</span>

            <!-- Tooltip -->
            <div
              v-if="hoveredInput === input.name"
              class="absolute left-full ml-2 z-50 pointer-events-none"
              style="
                background: #1a1a2e;
                border-radius: 5px;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
                color: #e0e0e0;
                font-family: sans-serif;
                max-width: 200px;
                padding: 4px 8px;
                white-space: pre-wrap;
                font-size: 12px;
              "
            >
              {{ input.tooltip }}
            </div>
          </div>
        </div>
      </div>
    `
  })
}

/**
 * Widget tooltips (visual mockup)
 */
export const WidgetTooltips: Story = {
  render: () => ({
    setup() {
      const widgets = [
        {
          name: 'seed',
          value: '123456789',
          tooltip: 'Random seed for generation. Same seed = same result'
        },
        {
          name: 'steps',
          value: '20',
          tooltip:
            'Number of denoising steps. More steps = better quality but slower'
        },
        {
          name: 'cfg',
          value: '7.5',
          tooltip:
            'Classifier-free guidance scale. Higher = more prompt adherence'
        },
        {
          name: 'sampler_name',
          value: 'euler',
          tooltip: 'Sampling algorithm to use'
        },
        {
          name: 'denoise',
          value: '1.00',
          tooltip: 'Denoising strength. 1.0 = full denoise, 0.0 = no change'
        }
      ]
      const hoveredWidget = ref<string | null>(null)
      return { widgets, hoveredWidget }
    },
    template: `
      <div class="bg-neutral-800 rounded-lg p-4 w-[280px]">
        <div class="bg-neutral-700 text-white px-3 py-1 rounded-t-lg text-sm font-medium">
          KSampler Widgets
        </div>
        <div class="flex flex-col gap-1 p-2 relative">
          <div
            v-for="widget in widgets"
            :key="widget.name"
            class="flex items-center justify-between px-2 py-1 hover:bg-neutral-700 rounded cursor-pointer relative"
            @mouseenter="hoveredWidget = widget.name"
            @mouseleave="hoveredWidget = null"
          >
            <span class="text-xs text-neutral-400">{{ widget.name }}</span>
            <span class="text-xs text-neutral-200 font-mono">{{ widget.value }}</span>

            <!-- Tooltip -->
            <div
              v-if="hoveredWidget === widget.name"
              class="absolute left-full top-0 ml-2 z-50 pointer-events-none"
              style="
                background: #1a1a2e;
                border-radius: 5px;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
                color: #e0e0e0;
                font-family: sans-serif;
                max-width: 200px;
                padding: 4px 8px;
                white-space: pre-wrap;
                font-size: 11px;
              "
            >
              {{ widget.tooltip }}
            </div>
          </div>
        </div>
      </div>
    `
  })
}

/**
 * Tooltip with icon button
 */
export const IconButtonTooltips: Story = {
  render: () => ({
    directives: { tooltip: Tooltip },
    template: `
      <div class="flex gap-2">
        <button
          v-tooltip.top="'Run workflow'"
          class="p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          <i class="pi pi-play"></i>
        </button>
        <button
          v-tooltip.top="'Pause execution'"
          class="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          <i class="pi pi-pause"></i>
        </button>
        <button
          v-tooltip.top="'Cancel execution'"
          class="p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          <i class="pi pi-stop"></i>
        </button>
        <button
          v-tooltip.top="'Save workflow'"
          class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <i class="pi pi-save"></i>
        </button>
      </div>
    `
  })
}

/**
 * Long text tooltip
 */
export const LongTextTooltip: Story = {
  render: () => ({
    directives: { tooltip: Tooltip },
    template: `
      <div class="flex flex-col gap-8 items-center">
        <button
          v-tooltip.top="'This is a very long tooltip that contains detailed information about the element. It demonstrates how the tooltip handles longer text content and wraps appropriately.'"
          class="px-4 py-2 bg-neutral-700 text-white rounded hover:bg-neutral-600"
        >
          Long tooltip (hover me)
        </button>

        <div
          class="p-4 border rounded-lg max-w-md"
          style="
            background: #1a1a2e;
            border-radius: 5px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
            color: #e0e0e0;
            font-family: sans-serif;
            max-width: 30vw;
            padding: 8px 12px;
            white-space: pre-wrap;
          "
        >
          <p class="text-xs text-neutral-400 mb-2">Node tooltip max-width: 30vw</p>
          This is how long text appears in the NodeTooltip component. The tooltip has a max-width of 30vw and uses white-space: pre-wrap to handle text wrapping gracefully.
        </div>
      </div>
    `
  })
}

/**
 * Tooltip delay settings
 */
export const TooltipDelaySettings: Story = {
  render: () => ({
    directives: { tooltip: Tooltip },
    setup() {
      // Default delay in ComfyUI is configurable via LiteGraph.Node.TooltipDelay setting
      const delays = [
        { label: 'Instant', value: 0 },
        { label: 'Fast (300ms)', value: 300 },
        { label: 'Default (500ms)', value: 500 },
        { label: 'Slow (1000ms)', value: 1000 }
      ]
      return { delays }
    },
    template: `
      <div class="flex flex-col gap-4 items-start">
        <p class="text-sm text-muted-foreground mb-2">
          ComfyUI allows configuring tooltip delay via settings (LiteGraph.Node.TooltipDelay)
        </p>
        <div class="flex gap-4">
          <button
            v-for="delay in delays"
            :key="delay.value"
            v-tooltip="{ value: 'Tooltip appears after ' + (delay.value || 'no') + ' delay', showDelay: delay.value }"
            class="px-4 py-2 bg-neutral-200 rounded hover:bg-neutral-300 text-sm"
          >
            {{ delay.label }}
          </button>
        </div>
      </div>
    `
  })
}

/**
 * ComfyUI-specific tooltip use cases
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    directives: { tooltip: Tooltip },
    template: `
      <div class="flex flex-col gap-8 p-4">
        <div>
          <h4 class="text-sm font-semibold mb-3">Toolbar Actions</h4>
          <div class="flex gap-1 p-2 bg-neutral-100 rounded-lg w-fit">
            <button v-tooltip.bottom="'Queue Prompt (Ctrl+Enter)'" class="p-2 hover:bg-neutral-200 rounded">
              <i class="pi pi-play text-green-600"></i>
            </button>
            <button v-tooltip.bottom="'Clear Queue'" class="p-2 hover:bg-neutral-200 rounded">
              <i class="pi pi-trash text-red-600"></i>
            </button>
            <button v-tooltip.bottom="'Interrupt'" class="p-2 hover:bg-neutral-200 rounded">
              <i class="pi pi-stop text-orange-600"></i>
            </button>
            <div class="w-px bg-neutral-300 mx-1"></div>
            <button v-tooltip.bottom="'Undo (Ctrl+Z)'" class="p-2 hover:bg-neutral-200 rounded">
              <i class="pi pi-undo"></i>
            </button>
            <button v-tooltip.bottom="'Redo (Ctrl+Y)'" class="p-2 hover:bg-neutral-200 rounded">
              <i class="pi pi-refresh"></i>
            </button>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-semibold mb-3">Sidebar Icons</h4>
          <div class="flex flex-col gap-1 p-2 bg-neutral-800 rounded-lg w-fit">
            <button v-tooltip.right="'Node Library'" class="p-2 text-white hover:bg-neutral-700 rounded">
              <i class="pi pi-th-large"></i>
            </button>
            <button v-tooltip.right="'Queue'" class="p-2 text-white hover:bg-neutral-700 rounded">
              <i class="pi pi-list"></i>
            </button>
            <button v-tooltip.right="'Models'" class="p-2 text-white hover:bg-neutral-700 rounded">
              <i class="pi pi-box"></i>
            </button>
            <button v-tooltip.right="'Settings'" class="p-2 text-white hover:bg-neutral-700 rounded">
              <i class="pi pi-cog"></i>
            </button>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-semibold mb-3">Status Indicators</h4>
          <div class="flex gap-4">
            <span
              v-tooltip.top="'GPU: NVIDIA RTX 4090 - 24GB VRAM'"
              class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs cursor-help"
            >
              GPU Ready
            </span>
            <span
              v-tooltip.top="'Memory: 8.2GB / 24GB used'"
              class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs cursor-help"
            >
              34% VRAM
            </span>
            <span
              v-tooltip.top="'3 jobs in queue, 1 running'"
              class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs cursor-help"
            >
              Queue: 3
            </span>
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
    directives: { tooltip: Tooltip },
    template: `
      <div class="dark-theme bg-neutral-900 p-8 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-4">Dark Theme Tooltips</h3>
        <div class="flex gap-4">
          <button
            v-tooltip.top="'Tooltip in dark mode'"
            class="px-4 py-2 bg-neutral-700 text-white rounded hover:bg-neutral-600"
          >
            Hover me
          </button>

          <!-- Custom styled tooltip preview -->
          <div class="relative">
            <button class="px-4 py-2 bg-blue-600 text-white rounded">
              Node tooltip style
            </button>
            <div
              class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none"
              style="
                background: #1a1a2e;
                border-radius: 5px;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
                color: #e0e0e0;
                font-family: sans-serif;
                padding: 4px 8px;
                white-space: nowrap;
                font-size: 12px;
              "
            >
              Custom styled tooltip
            </div>
          </div>
        </div>
      </div>
    `
  })
}
