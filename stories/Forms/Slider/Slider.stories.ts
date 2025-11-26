import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import Slider from '@/components/ui/slider/Slider.vue'

/**
 * Slider
 *
 * A custom slider component built with Reka UI primitives.
 * Features a minimal track, range indicator, and draggable thumb.
 *
 * Props (from SliderRootProps):
 * - `modelValue`: number[] - array of values (supports multiple thumbs)
 * - `min`: number - minimum value (default: 0)
 * - `max`: number - maximum value (default: 100)
 * - `step`: number - step increment (default: 1)
 * - `orientation`: 'horizontal' | 'vertical' - slider direction
 * - `disabled`: boolean - disable interaction
 * - `class`: string - additional CSS classes
 *
 * Model:
 * - v-model: number[] - array of current values
 */
const meta: Meta<typeof Slider> = {
  title: 'Forms/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Minimal slider component with smooth interaction. Based on Reka UI with custom ComfyUI styling. Supports single and multiple thumb configurations.'
      }
    }
  },
  argTypes: {
    min: {
      control: 'number',
      description: 'Minimum value'
    },
    max: {
      control: 'number',
      description: 'Maximum value'
    },
    step: {
      control: 'number',
      description: 'Step increment'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the slider'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default horizontal slider
 */
export const Default: Story = {
  render: (args) => ({
    components: { Slider },
    setup() {
      const value = ref([50])
      return { args, value }
    },
    template: `
      <div class="w-64">
        <Slider v-bind="args" v-model="value" />
        <p class="mt-4 text-sm text-muted-foreground text-center">
          Value: {{ value[0] }}
        </p>
      </div>
    `
  }),
  args: {
    min: 0,
    max: 100,
    step: 1
  }
}

/**
 * With custom range
 */
export const CustomRange: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref([7.5])
      return { value }
    },
    template: `
      <div class="w-64">
        <label class="block text-sm text-muted-foreground mb-3">CFG Scale (1-20)</label>
        <Slider v-model="value" :min="1" :max="20" :step="0.5" />
        <p class="mt-2 text-sm text-base-foreground text-center font-medium">
          {{ value[0] }}
        </p>
      </div>
    `
  })
}

/**
 * Fine control (0-1 range)
 */
export const FineControl: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref([0.75])
      return { value }
    },
    template: `
      <div class="w-64">
        <label class="block text-sm text-muted-foreground mb-3">Denoise Strength</label>
        <Slider v-model="value" :min="0" :max="1" :step="0.01" />
        <p class="mt-2 text-sm text-base-foreground text-center font-medium">
          {{ value[0].toFixed(2) }}
        </p>
      </div>
    `
  })
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const enabled = ref([50])
      const disabled = ref([75])
      return { enabled, disabled }
    },
    template: `
      <div class="w-64 space-y-6">
        <div>
          <div class="text-sm text-muted-foreground mb-2">Enabled</div>
          <Slider v-model="enabled" :min="0" :max="100" />
        </div>
        <div>
          <div class="text-sm text-muted-foreground mb-2">Disabled</div>
          <Slider v-model="disabled" :min="0" :max="100" disabled />
        </div>
      </div>
    `
  })
}

/**
 * Vertical orientation
 */
export const Vertical: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref([50])
      return { value }
    },
    template: `
      <div class="flex items-end gap-8">
        <div class="text-center">
          <Slider
            v-model="value"
            :min="0"
            :max="100"
            orientation="vertical"
            class="h-48"
          />
          <p class="mt-4 text-sm text-muted-foreground">{{ value[0] }}</p>
        </div>
      </div>
    `
  })
}

/**
 * Range slider (two thumbs)
 */
export const RangeSlider: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref([25, 75])
      return { value }
    },
    template: `
      <div class="w-64">
        <label class="block text-sm text-muted-foreground mb-3">Select Range</label>
        <Slider v-model="value" :min="0" :max="100" />
        <div class="mt-3 flex justify-between text-sm text-muted-foreground">
          <span>Min: {{ value[0] }}</span>
          <span>Max: {{ value[1] }}</span>
        </div>
      </div>
    `
  })
}

/**
 * Different step sizes
 */
export const StepVariants: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const v1 = ref([50])
      const v5 = ref([50])
      const v10 = ref([50])
      return { v1, v5, v10 }
    },
    template: `
      <div class="w-64 space-y-6">
        <div>
          <div class="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step: 1</span>
            <span>{{ v1[0] }}</span>
          </div>
          <Slider v-model="v1" :min="0" :max="100" :step="1" />
        </div>
        <div>
          <div class="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step: 5</span>
            <span>{{ v5[0] }}</span>
          </div>
          <Slider v-model="v5" :min="0" :max="100" :step="5" />
        </div>
        <div>
          <div class="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step: 10</span>
            <span>{{ v10[0] }}</span>
          </div>
          <Slider v-model="v10" :min="0" :max="100" :step="10" />
        </div>
      </div>
    `
  })
}

/**
 * With labels and ticks
 */
export const WithLabels: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref([50])
      return { value }
    },
    template: `
      <div class="w-72">
        <div class="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </div>
        <Slider v-model="value" :min="0" :max="100" />
        <div class="flex justify-between text-xs text-muted-foreground mt-1">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
    `
  })
}

/**
 * Node widget style
 */
export const NodeWidget: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const cfg = ref([7.5])
      const steps = ref([20])
      const denoise = ref([1.0])
      return { cfg, steps, denoise }
    },
    template: `
      <div class="w-72 p-4 bg-secondary-background rounded-lg border border-border-default">
        <div class="text-sm font-semibold text-base-foreground mb-4">KSampler</div>

        <div class="space-y-4">
          <div>
            <div class="flex justify-between text-xs text-muted-foreground mb-1">
              <span>cfg</span>
              <span>{{ cfg[0] }}</span>
            </div>
            <Slider v-model="cfg" :min="1" :max="20" :step="0.5" />
          </div>

          <div>
            <div class="flex justify-between text-xs text-muted-foreground mb-1">
              <span>steps</span>
              <span>{{ steps[0] }}</span>
            </div>
            <Slider v-model="steps" :min="1" :max="100" :step="1" />
          </div>

          <div>
            <div class="flex justify-between text-xs text-muted-foreground mb-1">
              <span>denoise</span>
              <span>{{ denoise[0].toFixed(2) }}</span>
            </div>
            <Slider v-model="denoise" :min="0" :max="1" :step="0.01" />
          </div>
        </div>
      </div>
    `
  })
}

/**
 * Interactive with visual feedback
 */
export const Interactive: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref([50])
      return { value }
    },
    template: `
      <div class="w-80">
        <Slider v-model="value" :min="0" :max="100" />
        <div class="mt-6 p-4 bg-secondary-background rounded-lg">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-muted-foreground">Opacity</span>
            <span class="text-sm font-medium text-base-foreground">{{ value[0] }}%</span>
          </div>
          <div
            class="h-16 rounded bg-primary-background transition-opacity"
            :style="{ opacity: value[0] / 100 }"
          ></div>
        </div>
      </div>
    `
  })
}

/**
 * Multiple vertical sliders (mixer style)
 */
export const MixerStyle: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const channels = ref([
        { name: 'R', value: [128], color: '#ff6b6b' },
        { name: 'G', value: [200], color: '#69db7c' },
        { name: 'B', value: [180], color: '#74c0fc' },
        { name: 'A', value: [255], color: '#868e96' }
      ])
      return { channels }
    },
    template: `
      <div class="p-4 bg-secondary-background rounded-lg">
        <div class="text-sm font-semibold text-base-foreground mb-4 text-center">
          Color Channels
        </div>
        <div class="flex gap-6 justify-center">
          <div
            v-for="channel in channels"
            :key="channel.name"
            class="text-center"
          >
            <Slider
              v-model="channel.value"
              :min="0"
              :max="255"
              orientation="vertical"
              class="h-32"
            />
            <div class="mt-2 text-xs font-medium" :style="{ color: channel.color }">
              {{ channel.name }}
            </div>
            <div class="text-xs text-muted-foreground">
              {{ channel.value[0] }}
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
    components: { Slider },
    setup() {
      const v1 = ref([50])
      const v2 = ref([25, 75])
      const v3 = ref([100])
      return { v1, v2, v3 }
    },
    template: `
      <div class="dark-theme bg-neutral-900 p-6 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-4">Dark Theme</h3>
        <div class="w-64 space-y-6">
          <div>
            <div class="text-xs text-neutral-400 mb-2">Single value: {{ v1[0] }}</div>
            <Slider v-model="v1" :min="0" :max="100" />
          </div>
          <div>
            <div class="text-xs text-neutral-400 mb-2">Range: {{ v2[0] }} - {{ v2[1] }}</div>
            <Slider v-model="v2" :min="0" :max="100" />
          </div>
          <div>
            <div class="text-xs text-neutral-400 mb-2">Disabled: {{ v3[0] }}</div>
            <Slider v-model="v3" :min="0" :max="100" disabled />
          </div>
        </div>
      </div>
    `
  })
}
