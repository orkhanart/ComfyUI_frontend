import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import InputSlider from '@/components/common/InputSlider.vue'

/**
 * InputSlider
 *
 * A combined slider and number input component for precise numeric value control.
 * The slider provides quick adjustment while the input field allows exact values.
 *
 * Props:
 * - `modelValue`: number - the current value (required)
 * - `min`: number - minimum allowed value
 * - `max`: number - maximum allowed value
 * - `step`: number - increment step size
 * - `inputClass`: string - custom class for the number input
 * - `sliderClass`: string - custom class for the slider
 *
 * Model:
 * - v-model: number - synced value
 */
const meta: Meta<typeof InputSlider> = {
  title: 'Forms/InputSlider',
  component: InputSlider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Combined slider and number input for numeric values. Provides both quick visual adjustment and precise numeric entry. Commonly used for CFG scale, denoise strength, and other continuous parameters.'
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
    inputClass: {
      control: 'text',
      description: 'Custom class for number input'
    },
    sliderClass: {
      control: 'text',
      description: 'Custom class for slider'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default input slider with standard range
 */
export const Default: Story = {
  render: (args) => ({
    components: { InputSlider },
    setup() {
      const value = ref(50)
      return { args, value }
    },
    template: `
      <div class="w-64">
        <InputSlider v-bind="args" v-model="value" />
        <p class="mt-4 text-sm text-muted-foreground">Value: {{ value }}</p>
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
 * CFG Scale - common use in diffusion models
 */
export const CFGScale: Story = {
  render: () => ({
    components: { InputSlider },
    setup() {
      const value = ref(7.5)
      return { value }
    },
    template: `
      <div class="w-72">
        <label class="block text-sm text-muted-foreground mb-2">CFG Scale</label>
        <InputSlider v-model="value" :min="1" :max="20" :step="0.5" />
        <p class="mt-2 text-xs text-muted-foreground">
          Controls how closely the output follows the prompt. Higher = more strict.
        </p>
      </div>
    `
  })
}

/**
 * Denoise Strength - for img2img operations
 */
export const DenoiseStrength: Story = {
  render: () => ({
    components: { InputSlider },
    setup() {
      const value = ref(0.75)
      return { value }
    },
    template: `
      <div class="w-72">
        <label class="block text-sm text-muted-foreground mb-2">Denoise Strength</label>
        <InputSlider v-model="value" :min="0" :max="1" :step="0.01" />
        <p class="mt-2 text-xs text-muted-foreground">
          How much noise to add. 1.0 = full regeneration, 0.0 = no change.
        </p>
      </div>
    `
  })
}

/**
 * Integer steps
 */
export const Steps: Story = {
  render: () => ({
    components: { InputSlider },
    setup() {
      const value = ref(20)
      return { value }
    },
    template: `
      <div class="w-72">
        <label class="block text-sm text-muted-foreground mb-2">Sampling Steps</label>
        <InputSlider v-model="value" :min="1" :max="100" :step="1" />
        <p class="mt-2 text-xs text-muted-foreground">
          Number of denoising steps. More steps = higher quality but slower.
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
    components: { InputSlider },
    setup() {
      const v1 = ref(50)
      const v2 = ref(5.0)
      const v3 = ref(0.5)
      return { v1, v2, v3 }
    },
    template: `
      <div class="flex flex-col gap-6 w-72">
        <div>
          <div class="text-sm text-muted-foreground mb-2">Step: 1 (integers)</div>
          <InputSlider v-model="v1" :min="0" :max="100" :step="1" />
          <div class="text-xs text-muted-foreground mt-1">Value: {{ v1 }}</div>
        </div>
        <div>
          <div class="text-sm text-muted-foreground mb-2">Step: 0.5 (half steps)</div>
          <InputSlider v-model="v2" :min="0" :max="10" :step="0.5" />
          <div class="text-xs text-muted-foreground mt-1">Value: {{ v2 }}</div>
        </div>
        <div>
          <div class="text-sm text-muted-foreground mb-2">Step: 0.01 (fine control)</div>
          <InputSlider v-model="v3" :min="0" :max="1" :step="0.01" />
          <div class="text-xs text-muted-foreground mt-1">Value: {{ v3 }}</div>
        </div>
      </div>
    `
  })
}

/**
 * Range variations
 */
export const RangeVariants: Story = {
  render: () => ({
    components: { InputSlider },
    setup() {
      const v1 = ref(50)
      const v2 = ref(500)
      const v3 = ref(-50)
      return { v1, v2, v3 }
    },
    template: `
      <div class="flex flex-col gap-6 w-72">
        <div>
          <div class="text-sm text-muted-foreground mb-2">0 - 100</div>
          <InputSlider v-model="v1" :min="0" :max="100" :step="1" />
          <div class="text-xs text-muted-foreground mt-1">Value: {{ v1 }}</div>
        </div>
        <div>
          <div class="text-sm text-muted-foreground mb-2">0 - 1000 (wide range)</div>
          <InputSlider v-model="v2" :min="0" :max="1000" :step="10" />
          <div class="text-xs text-muted-foreground mt-1">Value: {{ v2 }}</div>
        </div>
        <div>
          <div class="text-sm text-muted-foreground mb-2">-100 to 100 (negative)</div>
          <InputSlider v-model="v3" :min="-100" :max="100" :step="1" />
          <div class="text-xs text-muted-foreground mt-1">Value: {{ v3 }}</div>
        </div>
      </div>
    `
  })
}

/**
 * ComfyUI node widget simulation
 */
export const NodeWidget: Story = {
  render: () => ({
    components: { InputSlider },
    setup() {
      const cfg = ref(7.5)
      const steps = ref(20)
      const denoise = ref(1.0)
      return { cfg, steps, denoise }
    },
    template: `
      <div class="w-80 p-4 bg-secondary-background rounded-lg border border-border-default">
        <div class="text-sm font-semibold text-base-foreground mb-4">KSampler Parameters</div>

        <div class="space-y-4">
          <div class="flex items-center justify-between gap-4">
            <span class="text-sm text-muted-foreground w-20">cfg</span>
            <InputSlider class="flex-1" v-model="cfg" :min="1" :max="20" :step="0.5" />
          </div>

          <div class="flex items-center justify-between gap-4">
            <span class="text-sm text-muted-foreground w-20">steps</span>
            <InputSlider class="flex-1" v-model="steps" :min="1" :max="100" :step="1" />
          </div>

          <div class="flex items-center justify-between gap-4">
            <span class="text-sm text-muted-foreground w-20">denoise</span>
            <InputSlider class="flex-1" v-model="denoise" :min="0" :max="1" :step="0.01" />
          </div>
        </div>
      </div>
    `
  })
}

/**
 * Interactive with value display
 */
export const Interactive: Story = {
  render: () => ({
    components: { InputSlider },
    setup() {
      const value = ref(50)
      return { value }
    },
    template: `
      <div class="w-80">
        <InputSlider v-model="value" :min="0" :max="100" :step="1" />
        <div class="mt-4 p-4 bg-secondary-background rounded-lg">
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Current value:</span>
            <span class="text-lg font-semibold text-base-foreground">{{ value }}</span>
          </div>
          <div class="mt-2 h-2 bg-neutral-700 rounded-full overflow-hidden">
            <div
              class="h-full bg-primary-background transition-all"
              :style="{ width: value + '%' }"
            ></div>
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
    components: { InputSlider },
    setup() {
      const v1 = ref(7.5)
      const v2 = ref(20)
      const v3 = ref(0.75)
      return { v1, v2, v3 }
    },
    template: `
      <div class="dark-theme bg-neutral-900 p-6 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-4">Dark Theme</h3>
        <div class="flex flex-col gap-4 w-64">
          <div>
            <div class="text-xs text-neutral-400 mb-2">CFG Scale</div>
            <InputSlider v-model="v1" :min="1" :max="20" :step="0.5" />
          </div>
          <div>
            <div class="text-xs text-neutral-400 mb-2">Steps</div>
            <InputSlider v-model="v2" :min="1" :max="100" :step="1" />
          </div>
          <div>
            <div class="text-xs text-neutral-400 mb-2">Denoise</div>
            <InputSlider v-model="v3" :min="0" :max="1" :step="0.01" />
          </div>
        </div>
      </div>
    `
  })
}
