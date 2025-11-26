import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import FormItem from '@/components/common/FormItem.vue'
import type { FormItem as FormItemType } from '@/platform/settings/types'

/**
 * FormItem
 *
 * A generalized form item component that renders different input types
 * based on the item configuration. Used for building dynamic forms
 * like settings panels.
 *
 * Props:
 * - `item`: FormItemType - configuration object with name, type, tooltip, etc.
 * - `id`: string - unique identifier for the form item
 * - `labelClass`: string | Record<string, boolean> - custom label classes
 *
 * Supported Types:
 * - `boolean`: Toggle switch
 * - `number`: Number input
 * - `slider`: Slider with number input
 * - `knob`: Knob dial with number input
 * - `combo`: Select dropdown
 * - `radio`: Radio button group
 * - `text`: Text input (default)
 * - `image`: Image upload
 * - `color`: Color picker
 * - `url`: URL input
 *
 * Slots:
 * - `name-prefix`: Content before the label
 * - `name-suffix`: Content after the label
 */
const meta: Meta<typeof FormItem> = {
  title: 'Forms/Form Components',
  component: FormItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Dynamic form item component that renders different input types based on configuration. Core building block for settings and configuration forms.'
      }
    }
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the form item'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Boolean toggle switch input
 */
export const Boolean: Story = {
  render: () => ({
    components: { FormItem },
    setup() {
      const value = ref(true)
      const item: FormItemType = {
        name: 'Enable Feature',
        type: 'boolean',
        tooltip: 'Toggle this feature on or off'
      }
      return { value, item }
    },
    template: `
      <div class="w-80 p-4 bg-secondary-background rounded-lg">
        <div class="w-full">
          <FormItem v-model:formValue="value" :item="item" id="enable-feature" />
        </div>
        <p class="mt-4 text-sm text-muted-foreground">Value: {{ value }}</p>
      </div>
    `
  })
}

/**
 * Number input field
 */
export const Number: Story = {
  render: () => ({
    components: { FormItem },
    setup() {
      const value = ref(512)
      const item: FormItemType = {
        name: 'Image Width',
        type: 'number',
        tooltip: 'Width of the generated image in pixels',
        attrs: { min: 64, max: 2048, step: 64 }
      }
      return { value, item }
    },
    template: `
      <div class="w-80 p-4 bg-secondary-background rounded-lg">
        <div class="w-full">
          <FormItem v-model:formValue="value" :item="item" id="image-width" />
        </div>
        <p class="mt-4 text-sm text-muted-foreground">Value: {{ value }}</p>
      </div>
    `
  })
}

/**
 * Slider with number input
 */
export const Slider: Story = {
  render: () => ({
    components: { FormItem },
    setup() {
      const value = ref(7.5)
      const item: FormItemType = {
        name: 'CFG Scale',
        type: 'slider',
        tooltip: 'Classifier-free guidance scale',
        attrs: { min: 1, max: 20, step: 0.5 }
      }
      return { value, item }
    },
    template: `
      <div class="w-96 p-4 bg-secondary-background rounded-lg">
        <div class="w-full">
          <FormItem v-model:formValue="value" :item="item" id="cfg-scale" />
        </div>
        <p class="mt-4 text-sm text-muted-foreground">Value: {{ value }}</p>
      </div>
    `
  })
}

/**
 * Knob dial with number input
 */
export const Knob: Story = {
  render: () => ({
    components: { FormItem },
    setup() {
      const value = ref(0.75)
      const item: FormItemType = {
        name: 'Denoise Strength',
        type: 'knob',
        tooltip: 'How much noise to add during denoising',
        attrs: { min: 0, max: 1, step: 0.01 }
      }
      return { value, item }
    },
    template: `
      <div class="w-96 p-4 bg-secondary-background rounded-lg">
        <div class="w-full">
          <FormItem v-model:formValue="value" :item="item" id="denoise" />
        </div>
        <p class="mt-4 text-sm text-muted-foreground">Value: {{ value }}</p>
      </div>
    `
  })
}

/**
 * Select dropdown (combo)
 */
export const Combo: Story = {
  render: () => ({
    components: { FormItem },
    setup() {
      const value = ref('euler')
      const item: FormItemType = {
        name: 'Sampler',
        type: 'combo',
        tooltip: 'Sampling method for diffusion',
        options: ['euler', 'euler_ancestral', 'dpmpp_2m', 'ddim', 'unipc']
      }
      return { value, item }
    },
    template: `
      <div class="w-80 p-4 bg-secondary-background rounded-lg">
        <div class="w-full">
          <FormItem v-model:formValue="value" :item="item" id="sampler" />
        </div>
        <p class="mt-4 text-sm text-muted-foreground">Value: {{ value }}</p>
      </div>
    `
  })
}

/**
 * Radio button group
 */
export const Radio: Story = {
  render: () => ({
    components: { FormItem },
    setup() {
      const value = ref('normal')
      const item: FormItemType = {
        name: 'Quality',
        type: 'radio',
        tooltip: 'Output quality preset',
        options: [
          { text: 'Draft', value: 'draft' },
          { text: 'Normal', value: 'normal' },
          { text: 'High', value: 'high' }
        ]
      }
      return { value, item }
    },
    template: `
      <div class="w-96 p-4 bg-secondary-background rounded-lg">
        <div class="w-full">
          <FormItem v-model:formValue="value" :item="item" id="quality" />
        </div>
        <p class="mt-4 text-sm text-muted-foreground">Value: {{ value }}</p>
      </div>
    `
  })
}

/**
 * Text input field
 */
export const Text: Story = {
  render: () => ({
    components: { FormItem },
    setup() {
      const value = ref('my-workflow')
      const item: FormItemType = {
        name: 'Workflow Name',
        type: 'text',
        tooltip: 'Name for this workflow'
      }
      return { value, item }
    },
    template: `
      <div class="w-80 p-4 bg-secondary-background rounded-lg">
        <div class="w-full">
          <FormItem v-model:formValue="value" :item="item" id="workflow-name" />
        </div>
        <p class="mt-4 text-sm text-muted-foreground">Value: "{{ value }}"</p>
      </div>
    `
  })
}

/**
 * Color picker with text input
 */
export const Color: Story = {
  render: () => ({
    components: { FormItem },
    setup() {
      const value = ref('ff6b6b')
      const item: FormItemType = {
        name: 'Node Color',
        type: 'color',
        tooltip: 'Custom color for this node'
      }
      return { value, item }
    },
    template: `
      <div class="w-80 p-4 bg-secondary-background rounded-lg">
        <div class="w-full">
          <FormItem v-model:formValue="value" :item="item" id="node-color" />
        </div>
        <p class="mt-4 text-sm text-muted-foreground">Value: #{{ value }}</p>
      </div>
    `
  })
}

/**
 * All form types overview
 */
export const AllTypes: Story = {
  render: () => ({
    components: { FormItem },
    setup() {
      const boolValue = ref(true)
      const numberValue = ref(512)
      const sliderValue = ref(7.5)
      const knobValue = ref(0.75)
      const comboValue = ref('euler')
      const radioValue = ref('normal')
      const textValue = ref('my-workflow')
      const colorValue = ref('4ecdc4')

      const boolItem: FormItemType = { name: 'Enable', type: 'boolean' }
      const numberItem: FormItemType = {
        name: 'Steps',
        type: 'number',
        attrs: { min: 1, max: 100 }
      }
      const sliderItem: FormItemType = {
        name: 'CFG',
        type: 'slider',
        attrs: { min: 1, max: 20, step: 0.5 }
      }
      const knobItem: FormItemType = {
        name: 'Denoise',
        type: 'knob',
        attrs: { min: 0, max: 1, step: 0.01 }
      }
      const comboItem: FormItemType = {
        name: 'Sampler',
        type: 'combo',
        options: ['euler', 'ddim', 'unipc']
      }
      const radioItem: FormItemType = {
        name: 'Quality',
        type: 'radio',
        options: ['Draft', 'Normal', 'High']
      }
      const textItem: FormItemType = { name: 'Name', type: 'text' }
      const colorItem: FormItemType = { name: 'Color', type: 'color' }

      return {
        boolValue,
        numberValue,
        sliderValue,
        knobValue,
        comboValue,
        radioValue,
        textValue,
        colorValue,
        boolItem,
        numberItem,
        sliderItem,
        knobItem,
        comboItem,
        radioItem,
        textItem,
        colorItem
      }
    },
    template: `
      <div class="w-[500px] p-6 bg-secondary-background rounded-lg">
        <h3 class="text-base font-semibold text-base-foreground mb-4">Form Item Types</h3>
        <div class="space-y-4">
          <div class="w-full"><FormItem v-model:formValue="boolValue" :item="boolItem" id="bool" /></div>
          <div class="w-full"><FormItem v-model:formValue="numberValue" :item="numberItem" id="number" /></div>
          <div class="w-full"><FormItem v-model:formValue="sliderValue" :item="sliderItem" id="slider" /></div>
          <div class="w-full"><FormItem v-model:formValue="knobValue" :item="knobItem" id="knob" /></div>
          <div class="w-full"><FormItem v-model:formValue="comboValue" :item="comboItem" id="combo" /></div>
          <div class="w-full"><FormItem v-model:formValue="radioValue" :item="radioItem" id="radio" /></div>
          <div class="w-full"><FormItem v-model:formValue="textValue" :item="textItem" id="text" /></div>
          <div class="w-full"><FormItem v-model:formValue="colorValue" :item="colorItem" id="color" /></div>
        </div>
      </div>
    `
  })
}

/**
 * With tooltip information
 */
export const WithTooltip: Story = {
  render: () => ({
    components: { FormItem },
    setup() {
      const value = ref(20)
      const item: FormItemType = {
        name: 'Sampling Steps',
        type: 'number',
        tooltip:
          'Higher values produce better quality but take longer to generate. Recommended range: 15-30.',
        attrs: { min: 1, max: 100 }
      }
      return { value, item }
    },
    template: `
      <div class="w-80 p-4 bg-secondary-background rounded-lg">
        <div class="w-full">
          <FormItem v-model:formValue="value" :item="item" id="steps-tooltip" />
        </div>
        <p class="mt-4 text-xs text-muted-foreground">
          Hover over the info icon to see the tooltip
        </p>
      </div>
    `
  })
}

/**
 * Settings panel simulation
 */
export const SettingsPanel: Story = {
  render: () => ({
    components: { FormItem },
    setup() {
      const autoSave = ref(true)
      const saveInterval = ref(5)
      const theme = ref('dark')
      const language = ref('en')

      const items: FormItemType[] = [
        {
          name: 'Auto-save workflows',
          type: 'boolean',
          tooltip: 'Automatically save your work'
        },
        {
          name: 'Save interval (min)',
          type: 'number',
          attrs: { min: 1, max: 60 }
        },
        { name: 'Theme', type: 'combo', options: ['light', 'dark', 'system'] },
        { name: 'Language', type: 'radio', options: ['en', 'zh', 'ja', 'ko'] }
      ]

      return { autoSave, saveInterval, theme, language, items }
    },
    template: `
      <div class="w-96 bg-base-background rounded-lg overflow-hidden">
        <div class="px-4 py-3 border-b border-border-default">
          <h3 class="text-sm font-semibold text-base-foreground">Settings</h3>
        </div>
        <div class="p-4 space-y-4">
          <div class="w-full"><FormItem v-model:formValue="autoSave" :item="items[0]" id="auto-save" /></div>
          <div class="w-full"><FormItem v-model:formValue="saveInterval" :item="items[1]" id="save-interval" /></div>
          <div class="w-full"><FormItem v-model:formValue="theme" :item="items[2]" id="theme" /></div>
          <div class="w-full"><FormItem v-model:formValue="language" :item="items[3]" id="language" /></div>
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
    components: { FormItem },
    setup() {
      const boolValue = ref(true)
      const sliderValue = ref(7.5)
      const comboValue = ref('euler')

      const boolItem: FormItemType = { name: 'Enable Feature', type: 'boolean' }
      const sliderItem: FormItemType = {
        name: 'CFG Scale',
        type: 'slider',
        attrs: { min: 1, max: 20, step: 0.5 }
      }
      const comboItem: FormItemType = {
        name: 'Sampler',
        type: 'combo',
        options: ['euler', 'ddim', 'unipc']
      }

      return {
        boolValue,
        sliderValue,
        comboValue,
        boolItem,
        sliderItem,
        comboItem
      }
    },
    template: `
      <div class="dark-theme bg-neutral-900 p-6 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-4">Dark Theme</h3>
        <div class="w-80 space-y-4">
          <div class="w-full"><FormItem v-model:formValue="boolValue" :item="boolItem" id="dark-bool" /></div>
          <div class="w-full"><FormItem v-model:formValue="sliderValue" :item="sliderItem" id="dark-slider" /></div>
          <div class="w-full"><FormItem v-model:formValue="comboValue" :item="comboItem" id="dark-combo" /></div>
        </div>
      </div>
    `
  })
}
