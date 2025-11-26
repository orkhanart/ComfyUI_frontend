import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import InputKnob from '@/components/common/InputKnob.vue'

/**
 * InputKnob
 *
 * A rotary knob control combined with a number input for precise value adjustment.
 * Provides an intuitive circular dial interface for continuous values.
 *
 * Props:
 * - `modelValue`: number - the current value (required)
 * - `min`: number - minimum allowed value
 * - `max`: number - maximum allowed value
 * - `step`: number - increment step size
 * - `resolution`: number - decimal places to display
 * - `inputClass`: string - custom class for the number input
 * - `knobClass`: string - custom class for the knob
 *
 * Model:
 * - v-model: number - synced value
 */
const meta: Meta<typeof InputKnob> = {
  title: 'Forms/InputKnob',
  component: InputKnob,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Rotary knob with number input for analog-style value control. Ideal for parameters like denoise strength, blend factors, and other normalized values.'
      }
    }
  },
  argTypes: {
    modelValue: {
      control: 'number',
      description: 'Current value'
    },
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
    resolution: {
      control: 'number',
      description: 'Decimal places to display'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default knob with 0-100 range
 */
export const Default: Story = {
  render: (args) => ({
    components: { InputKnob },
    setup() {
      const value = ref(50)
      return { args, value }
    },
    template: `
      <div>
        <InputKnob v-bind="args" v-model="value" />
        <p class="mt-4 text-sm text-muted-foreground text-center">Value: {{ value }}</p>
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
 * Denoise strength control (0-1 range)
 */
export const DenoiseStrength: Story = {
  render: () => ({
    components: { InputKnob },
    setup() {
      const value = ref(0.75)
      return { value }
    },
    template: `
      <div class="text-center">
        <label class="block text-sm text-muted-foreground mb-3">Denoise Strength</label>
        <InputKnob v-model="value" :min="0" :max="1" :step="0.01" />
        <p class="mt-2 text-xs text-muted-foreground">
          0 = no change, 1 = full regeneration
        </p>
      </div>
    `
  })
}

/**
 * Blend factor control
 */
export const BlendFactor: Story = {
  render: () => ({
    components: { InputKnob },
    setup() {
      const value = ref(0.5)
      return { value }
    },
    template: `
      <div class="text-center">
        <label class="block text-sm text-muted-foreground mb-3">Blend Factor</label>
        <InputKnob v-model="value" :min="0" :max="1" :step="0.05" :resolution="2" />
        <p class="mt-2 text-xs text-muted-foreground">
          Controls blending between two inputs
        </p>
      </div>
    `
  })
}

/**
 * Different step sizes
 */
export const StepVariants: Story = {
  render: () => ({
    components: { InputKnob },
    setup() {
      const v1 = ref(50)
      const v2 = ref(0.5)
      const v3 = ref(0.75)
      return { v1, v2, v3 }
    },
    template: `
      <div class="flex gap-8">
        <div class="text-center">
          <div class="text-xs text-muted-foreground mb-2">Step: 1</div>
          <InputKnob v-model="v1" :min="0" :max="100" :step="1" />
          <div class="text-xs text-muted-foreground mt-1">{{ v1 }}</div>
        </div>
        <div class="text-center">
          <div class="text-xs text-muted-foreground mb-2">Step: 0.1</div>
          <InputKnob v-model="v2" :min="0" :max="1" :step="0.1" :resolution="1" />
          <div class="text-xs text-muted-foreground mt-1">{{ v2.toFixed(1) }}</div>
        </div>
        <div class="text-center">
          <div class="text-xs text-muted-foreground mb-2">Step: 0.01</div>
          <InputKnob v-model="v3" :min="0" :max="1" :step="0.01" :resolution="2" />
          <div class="text-xs text-muted-foreground mt-1">{{ v3.toFixed(2) }}</div>
        </div>
      </div>
    `
  })
}

/**
 * Different ranges
 */
export const RangeVariants: Story = {
  render: () => ({
    components: { InputKnob },
    setup() {
      const v1 = ref(0.5)
      const v2 = ref(50)
      const v3 = ref(180)
      return { v1, v2, v3 }
    },
    template: `
      <div class="flex gap-8">
        <div class="text-center">
          <div class="text-xs text-muted-foreground mb-2">0 - 1</div>
          <InputKnob v-model="v1" :min="0" :max="1" :step="0.01" />
          <div class="text-xs text-muted-foreground mt-1">{{ v1.toFixed(2) }}</div>
        </div>
        <div class="text-center">
          <div class="text-xs text-muted-foreground mb-2">0 - 100</div>
          <InputKnob v-model="v2" :min="0" :max="100" :step="1" />
          <div class="text-xs text-muted-foreground mt-1">{{ v2 }}%</div>
        </div>
        <div class="text-center">
          <div class="text-xs text-muted-foreground mb-2">0 - 360</div>
          <InputKnob v-model="v3" :min="0" :max="360" :step="1" />
          <div class="text-xs text-muted-foreground mt-1">{{ v3 }}°</div>
        </div>
      </div>
    `
  })
}

/**
 * Node widget simulation
 */
export const NodeWidget: Story = {
  render: () => ({
    components: { InputKnob },
    setup() {
      const denoise = ref(0.75)
      const strength = ref(0.5)
      return { denoise, strength }
    },
    template: `
      <div class="w-80 p-4 bg-secondary-background rounded-lg border border-border-default">
        <div class="text-sm font-semibold text-base-foreground mb-4">ControlNet Settings</div>

        <div class="flex justify-around">
          <div class="text-center">
            <div class="text-xs text-muted-foreground mb-2">denoise</div>
            <InputKnob v-model="denoise" :min="0" :max="1" :step="0.01" />
          </div>
          <div class="text-center">
            <div class="text-xs text-muted-foreground mb-2">strength</div>
            <InputKnob v-model="strength" :min="0" :max="1" :step="0.01" />
          </div>
        </div>
      </div>
    `
  })
}

/**
 * Multiple knobs in a panel
 */
export const ControlPanel: Story = {
  render: () => ({
    components: { InputKnob },
    setup() {
      const brightness = ref(0.5)
      const contrast = ref(0.5)
      const saturation = ref(0.5)
      const hue = ref(0)
      return { brightness, contrast, saturation, hue }
    },
    template: `
      <div class="p-6 bg-secondary-background rounded-lg">
        <h3 class="text-sm font-semibold text-base-foreground mb-4 text-center">
          Color Adjustments
        </h3>
        <div class="grid grid-cols-2 gap-6">
          <div class="text-center">
            <div class="text-xs text-muted-foreground mb-2">Brightness</div>
            <InputKnob v-model="brightness" :min="0" :max="1" :step="0.01" />
          </div>
          <div class="text-center">
            <div class="text-xs text-muted-foreground mb-2">Contrast</div>
            <InputKnob v-model="contrast" :min="0" :max="1" :step="0.01" />
          </div>
          <div class="text-center">
            <div class="text-xs text-muted-foreground mb-2">Saturation</div>
            <InputKnob v-model="saturation" :min="0" :max="1" :step="0.01" />
          </div>
          <div class="text-center">
            <div class="text-xs text-muted-foreground mb-2">Hue Shift</div>
            <InputKnob v-model="hue" :min="-180" :max="180" :step="1" />
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
    components: { InputKnob },
    setup() {
      const value = ref(0.5)
      return { value }
    },
    template: `
      <div class="text-center">
        <InputKnob v-model="value" :min="0" :max="1" :step="0.01" />
        <div class="mt-4 p-4 bg-secondary-background rounded-lg w-48">
          <div class="text-sm text-muted-foreground mb-2">Opacity: {{ (value * 100).toFixed(0) }}%</div>
          <div
            class="h-12 rounded bg-primary-background transition-opacity"
            :style="{ opacity: value }"
          ></div>
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
    components: { InputKnob },
    setup() {
      const v1 = ref(0.75)
      const v2 = ref(0.5)
      const v3 = ref(0.25)
      return { v1, v2, v3 }
    },
    template: `
      <div class="dark-theme bg-neutral-900 p-6 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-4 text-center">Dark Theme</h3>
        <div class="flex gap-6 justify-center">
          <div class="text-center">
            <div class="text-xs text-neutral-400 mb-2">High</div>
            <InputKnob v-model="v1" :min="0" :max="1" :step="0.01" />
          </div>
          <div class="text-center">
            <div class="text-xs text-neutral-400 mb-2">Medium</div>
            <InputKnob v-model="v2" :min="0" :max="1" :step="0.01" />
          </div>
          <div class="text-center">
            <div class="text-xs text-neutral-400 mb-2">Low</div>
            <InputKnob v-model="v3" :min="0" :max="1" :step="0.01" />
          </div>
        </div>
      </div>
    `
  })
}
