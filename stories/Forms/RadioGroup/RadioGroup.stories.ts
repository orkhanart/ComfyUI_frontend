import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import FormRadioGroup from '@/components/common/FormRadioGroup.vue'

/**
 * FormRadioGroup
 *
 * A horizontal radio button group for mutually exclusive options.
 * Supports both simple string options and complex option objects.
 *
 * Props:
 * - `modelValue`: any - currently selected value
 * - `options`: (string | SettingOption)[] - array of options
 * - `optionLabel`: string - key for option label (default: 'text')
 * - `optionValue`: string - key for option value (default: 'value')
 * - `id`: string - unique identifier for the group
 *
 * Model:
 * - v-model: any - selected option value
 */
const meta: Meta<typeof FormRadioGroup> = {
  title: 'Forms/RadioGroup',
  component: FormRadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Horizontal radio button group for selecting a single option from a set. Used for quality presets, output formats, and other exclusive choices.'
      }
    }
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the radio group'
    },
    optionLabel: {
      control: 'text',
      description: 'Key for option label'
    },
    optionValue: {
      control: 'text',
      description: 'Key for option value'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default with simple string options
 */
export const Default: Story = {
  render: (args) => ({
    components: { FormRadioGroup },
    setup() {
      const selected = ref('normal')
      const options = ['draft', 'normal', 'high']
      return { args, selected, options }
    },
    template: `
      <div>
        <FormRadioGroup v-bind="args" v-model="selected" :options="options" />
        <p class="mt-4 text-sm text-muted-foreground">Selected: {{ selected }}</p>
      </div>
    `
  }),
  args: {
    id: 'quality-default'
  }
}

/**
 * With object options (text/value pairs)
 */
export const ObjectOptions: Story = {
  render: () => ({
    components: { FormRadioGroup },
    setup() {
      const selected = ref('webp')
      const options = [
        { text: 'PNG', value: 'png' },
        { text: 'JPEG', value: 'jpeg' },
        { text: 'WebP', value: 'webp' }
      ]
      return { selected, options }
    },
    template: `
      <div>
        <div class="text-sm text-muted-foreground mb-2">Output Format</div>
        <FormRadioGroup v-model="selected" :options="options" id="format" />
        <p class="mt-4 text-sm text-muted-foreground">Selected: {{ selected }}</p>
      </div>
    `
  })
}

/**
 * Quality presets
 */
export const QualityPresets: Story = {
  render: () => ({
    components: { FormRadioGroup },
    setup() {
      const selected = ref('normal')
      const options = [
        { text: 'Draft', value: 'draft' },
        { text: 'Normal', value: 'normal' },
        { text: 'High', value: 'high' },
        { text: 'Ultra', value: 'ultra' }
      ]
      return { selected, options }
    },
    template: `
      <div class="w-96">
        <div class="text-sm text-muted-foreground mb-2">Quality Preset</div>
        <FormRadioGroup v-model="selected" :options="options" id="quality" />
        <div class="mt-4 p-3 bg-secondary-background rounded text-xs text-muted-foreground">
          <template v-if="selected === 'draft'">
            Fast preview, ~10 steps, low resolution
          </template>
          <template v-else-if="selected === 'normal'">
            Balanced quality and speed, ~20 steps
          </template>
          <template v-else-if="selected === 'high'">
            High quality output, ~30 steps
          </template>
          <template v-else>
            Maximum quality, ~50+ steps, slowest
          </template>
        </div>
      </div>
    `
  })
}

/**
 * Sampler type selection
 */
export const SamplerType: Story = {
  render: () => ({
    components: { FormRadioGroup },
    setup() {
      const selected = ref('deterministic')
      const options = [
        { text: 'Deterministic', value: 'deterministic' },
        { text: 'Stochastic', value: 'stochastic' }
      ]
      return { selected, options }
    },
    template: `
      <div>
        <div class="text-sm text-muted-foreground mb-2">Sampler Type</div>
        <FormRadioGroup v-model="selected" :options="options" id="sampler-type" />
        <p class="mt-3 text-xs text-muted-foreground">
          {{ selected === 'deterministic'
            ? 'Same seed always produces same output'
            : 'Adds randomness at each step for variation'
          }}
        </p>
      </div>
    `
  })
}

/**
 * Theme selection
 */
export const ThemeSelection: Story = {
  render: () => ({
    components: { FormRadioGroup },
    setup() {
      const selected = ref('dark')
      const options = [
        { text: 'Light', value: 'light' },
        { text: 'Dark', value: 'dark' },
        { text: 'System', value: 'system' }
      ]
      return { selected, options }
    },
    template: `
      <div class="w-64">
        <div class="text-sm text-muted-foreground mb-2">Theme</div>
        <FormRadioGroup v-model="selected" :options="options" id="theme" />
        <div class="mt-4 flex gap-2">
          <div
            v-for="theme in ['light', 'dark', 'system']"
            :key="theme"
            class="flex-1 h-8 rounded border-2 transition-all flex items-center justify-center text-xs"
            :class="[
              selected === theme ? 'border-primary-background' : 'border-transparent',
              theme === 'light' ? 'bg-white text-black' :
              theme === 'dark' ? 'bg-neutral-900 text-white' :
              'bg-linear-to-r from-white to-neutral-900'
            ]"
          >
            <span v-if="theme !== 'system'">Aa</span>
          </div>
        </div>
      </div>
    `
  })
}

/**
 * Size options
 */
export const SizeOptions: Story = {
  render: () => ({
    components: { FormRadioGroup },
    setup() {
      const selected = ref('512')
      const options = ['256', '512', '768', '1024']
      return { selected, options }
    },
    template: `
      <div>
        <div class="text-sm text-muted-foreground mb-2">Base Resolution</div>
        <FormRadioGroup v-model="selected" :options="options" id="resolution" />
        <p class="mt-3 text-xs text-muted-foreground">
          Output size: {{ selected }}×{{ selected }} pixels
        </p>
      </div>
    `
  })
}

/**
 * In a form context
 */
export const InFormContext: Story = {
  render: () => ({
    components: { FormRadioGroup },
    setup() {
      const quality = ref('normal')
      const format = ref('png')
      const upscale = ref('2x')
      return { quality, format, upscale }
    },
    template: `
      <div class="w-96 p-4 bg-secondary-background rounded-lg space-y-4">
        <h3 class="text-sm font-semibold text-base-foreground">Export Settings</h3>

        <div>
          <div class="text-xs text-muted-foreground mb-1">Quality</div>
          <FormRadioGroup
            v-model="quality"
            :options="['draft', 'normal', 'high']"
            id="form-quality"
          />
        </div>

        <div>
          <div class="text-xs text-muted-foreground mb-1">Format</div>
          <FormRadioGroup
            v-model="format"
            :options="[{ text: 'PNG', value: 'png' }, { text: 'JPEG', value: 'jpeg' }, { text: 'WebP', value: 'webp' }]"
            id="form-format"
          />
        </div>

        <div>
          <div class="text-xs text-muted-foreground mb-1">Upscale</div>
          <FormRadioGroup
            v-model="upscale"
            :options="['1x', '2x', '4x']"
            id="form-upscale"
          />
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
    components: { FormRadioGroup },
    setup() {
      const selected = ref('medium')
      const options = [
        { text: 'Small', value: 'small' },
        { text: 'Medium', value: 'medium' },
        { text: 'Large', value: 'large' }
      ]
      const sizes = { small: 48, medium: 80, large: 128 }
      return { selected, options, sizes }
    },
    template: `
      <div class="text-center">
        <FormRadioGroup v-model="selected" :options="options" id="size-demo" />
        <div class="mt-6 flex justify-center">
          <div
            class="bg-primary-background rounded transition-all duration-300"
            :style="{
              width: sizes[selected] + 'px',
              height: sizes[selected] + 'px'
            }"
          ></div>
        </div>
        <p class="mt-2 text-xs text-muted-foreground">
          {{ sizes[selected] }}×{{ sizes[selected] }} px
        </p>
      </div>
    `
  })
}

/**
 * Dark theme preview
 */
export const DarkTheme: Story = {
  render: () => ({
    components: { FormRadioGroup },
    setup() {
      const v1 = ref('normal')
      const v2 = ref('png')
      return { v1, v2 }
    },
    template: `
      <div class="dark-theme bg-neutral-900 p-6 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-4">Dark Theme</h3>
        <div class="space-y-4">
          <div>
            <div class="text-xs text-neutral-400 mb-2">Quality</div>
            <FormRadioGroup
              v-model="v1"
              :options="['draft', 'normal', 'high']"
              id="dark-quality"
            />
          </div>
          <div>
            <div class="text-xs text-neutral-400 mb-2">Format</div>
            <FormRadioGroup
              v-model="v2"
              :options="[{ text: 'PNG', value: 'png' }, { text: 'JPEG', value: 'jpeg' }, { text: 'WebP', value: 'webp' }]"
              id="dark-format"
            />
          </div>
        </div>
      </div>
    `
  })
}
