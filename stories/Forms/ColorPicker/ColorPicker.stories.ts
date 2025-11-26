import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import FormColorPicker from '@/components/common/FormColorPicker.vue'

/**
 * FormColorPicker
 *
 * A color picker component with a color swatch and hex input field.
 * Allows both visual color selection and direct hex value entry.
 *
 * Props:
 * - `modelValue`: string - hex color value (without #)
 * - `defaultValue`: string - default color value
 * - `label`: string - placeholder text for the input
 *
 * Model:
 * - v-model: string - hex color value (6 characters, no #)
 */
const meta: Meta<typeof FormColorPicker> = {
  title: 'Forms/ColorPicker',
  component: FormColorPicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Color picker with swatch and hex input. Used for customizing node colors, backgrounds, and other visual elements in ComfyUI.'
      }
    }
  },
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'Default color value (hex)'
    },
    label: {
      control: 'text',
      description: 'Placeholder text for input'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default color picker with a preset color
 */
export const Default: Story = {
  render: (args) => ({
    components: { FormColorPicker },
    setup() {
      const color = ref('4ecdc4')
      return { args, color }
    },
    template: `
      <div>
        <FormColorPicker v-bind="args" v-model:modelValue="color" />
        <p class="mt-4 text-sm text-muted-foreground">
          Selected: #{{ color }}
        </p>
        <div
          class="mt-2 w-24 h-8 rounded border border-border-default"
          :style="{ backgroundColor: '#' + color }"
        ></div>
      </div>
    `
  }),
  args: {
    label: 'Color'
  }
}

/**
 * Node color customization
 */
export const NodeColor: Story = {
  render: () => ({
    components: { FormColorPicker },
    setup() {
      const color = ref('ff6b6b')
      return { color }
    },
    template: `
      <div class="w-64">
        <label class="block text-sm text-muted-foreground mb-2">Node Title Color</label>
        <FormColorPicker v-model:modelValue="color" label="Hex color" />
        <div class="mt-4 p-3 rounded-lg border border-border-default bg-secondary-background">
          <div
            class="h-6 rounded-t flex items-center px-2 text-white text-xs font-medium"
            :style="{ backgroundColor: '#' + color }"
          >
            CLIPTextEncode
          </div>
          <div class="h-16 rounded-b bg-neutral-800"></div>
        </div>
      </div>
    `
  })
}

/**
 * Preset color options
 */
export const PresetColors: Story = {
  render: () => ({
    components: { FormColorPicker },
    setup() {
      const color = ref('4ecdc4')
      const presets = [
        { name: 'Red', hex: 'ff6b6b' },
        { name: 'Orange', hex: 'ffa94d' },
        { name: 'Yellow', hex: 'ffd43b' },
        { name: 'Green', hex: '69db7c' },
        { name: 'Teal', hex: '4ecdc4' },
        { name: 'Blue', hex: '74c0fc' },
        { name: 'Purple', hex: 'b197fc' },
        { name: 'Pink', hex: 'f783ac' }
      ]
      return { color, presets }
    },
    template: `
      <div class="w-72">
        <label class="block text-sm text-muted-foreground mb-2">Choose Color</label>
        <FormColorPicker v-model:modelValue="color" label="Hex color" />

        <div class="mt-4">
          <div class="text-xs text-muted-foreground mb-2">Presets:</div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="preset in presets"
              :key="preset.hex"
              class="w-8 h-8 rounded border-2 transition-all"
              :class="color === preset.hex ? 'border-white scale-110' : 'border-transparent'"
              :style="{ backgroundColor: '#' + preset.hex }"
              :title="preset.name"
              @click="color = preset.hex"
            ></button>
          </div>
        </div>
      </div>
    `
  })
}

/**
 * Background color selection
 */
export const BackgroundColor: Story = {
  render: () => ({
    components: { FormColorPicker },
    setup() {
      const bgColor = ref('1a1a2e')
      return { bgColor }
    },
    template: `
      <div class="w-72">
        <label class="block text-sm text-muted-foreground mb-2">Canvas Background</label>
        <FormColorPicker v-model:modelValue="bgColor" label="Background color" />
        <div
          class="mt-4 h-32 rounded-lg border border-border-default flex items-center justify-center"
          :style="{ backgroundColor: '#' + bgColor }"
        >
          <span class="text-xs text-white/50">Canvas preview</span>
        </div>
      </div>
    `
  })
}

/**
 * Multiple color pickers in form
 */
export const ColorScheme: Story = {
  render: () => ({
    components: { FormColorPicker },
    setup() {
      const primary = ref('4ecdc4')
      const secondary = ref('ff6b6b')
      const accent = ref('ffd43b')
      return { primary, secondary, accent }
    },
    template: `
      <div class="w-80 p-4 bg-secondary-background rounded-lg">
        <h3 class="text-sm font-semibold text-base-foreground mb-4">Color Scheme</h3>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Primary</span>
            <FormColorPicker v-model:modelValue="primary" label="Primary" />
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Secondary</span>
            <FormColorPicker v-model:modelValue="secondary" label="Secondary" />
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Accent</span>
            <FormColorPicker v-model:modelValue="accent" label="Accent" />
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-border-default">
          <div class="text-xs text-muted-foreground mb-2">Preview:</div>
          <div class="flex gap-2">
            <div class="flex-1 h-8 rounded" :style="{ backgroundColor: '#' + primary }"></div>
            <div class="flex-1 h-8 rounded" :style="{ backgroundColor: '#' + secondary }"></div>
            <div class="flex-1 h-8 rounded" :style="{ backgroundColor: '#' + accent }"></div>
          </div>
        </div>
      </div>
    `
  })
}

/**
 * Wire/link color customization
 */
export const WireColors: Story = {
  render: () => ({
    components: { FormColorPicker },
    setup() {
      const imageWire = ref('ff6b6b')
      const latentWire = ref('b197fc')
      const conditioningWire = ref('ffa94d')
      const modelWire = ref('4ecdc4')
      return { imageWire, latentWire, conditioningWire, modelWire }
    },
    template: `
      <div class="w-80 p-4 bg-secondary-background rounded-lg">
        <h3 class="text-sm font-semibold text-base-foreground mb-4">Wire Colors by Type</h3>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: '#' + imageWire }"></div>
              <span class="text-sm text-muted-foreground">IMAGE</span>
            </div>
            <FormColorPicker v-model:modelValue="imageWire" />
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: '#' + latentWire }"></div>
              <span class="text-sm text-muted-foreground">LATENT</span>
            </div>
            <FormColorPicker v-model:modelValue="latentWire" />
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: '#' + conditioningWire }"></div>
              <span class="text-sm text-muted-foreground">CONDITIONING</span>
            </div>
            <FormColorPicker v-model:modelValue="conditioningWire" />
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: '#' + modelWire }"></div>
              <span class="text-sm text-muted-foreground">MODEL</span>
            </div>
            <FormColorPicker v-model:modelValue="modelWire" />
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
    components: { FormColorPicker },
    setup() {
      const c1 = ref('4ecdc4')
      const c2 = ref('ff6b6b')
      const c3 = ref('ffd43b')
      return { c1, c2, c3 }
    },
    template: `
      <div class="dark-theme bg-neutral-900 p-6 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-4">Dark Theme</h3>
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-4">
            <span class="text-xs text-neutral-400 w-16">Teal</span>
            <FormColorPicker v-model:modelValue="c1" />
          </div>
          <div class="flex items-center gap-4">
            <span class="text-xs text-neutral-400 w-16">Red</span>
            <FormColorPicker v-model:modelValue="c2" />
          </div>
          <div class="flex items-center gap-4">
            <span class="text-xs text-neutral-400 w-16">Yellow</span>
            <FormColorPicker v-model:modelValue="c3" />
          </div>
        </div>
      </div>
    `
  })
}
