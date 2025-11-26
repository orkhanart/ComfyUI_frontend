import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import SingleSelect from '@/components/input/SingleSelect.vue'

/**
 * SingleSelect
 *
 * A dropdown component for selecting a single option from a list.
 * Built on PrimeVue Select with custom styling and accessibility.
 *
 * Props:
 * - `label`: string - placeholder/label shown when no selection
 * - `options`: SelectOption[] - array of { name: string, value: string }
 * - `listMaxHeight`: string - max height of dropdown panel (default: '28rem')
 * - `popoverMinWidth`: string - min width of popover
 * - `popoverMaxWidth`: string - max width of popover
 *
 * Model:
 * - v-model: string | null - the selected value
 *
 * Slots:
 * - `icon`: optional icon to display before the selected value
 */
const meta: Meta<typeof SingleSelect> = {
  title: 'Forms/SingleSelect',
  component: SingleSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Single selection dropdown with search icon support, keyboard navigation, and custom styling. Used for choosing one option from a list.'
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Placeholder text when no selection is made'
    },
    listMaxHeight: {
      control: 'text',
      description: 'Maximum height of the dropdown panel'
    },
    popoverMinWidth: {
      control: 'text',
      description: 'Minimum width of the popover'
    },
    popoverMaxWidth: {
      control: 'text',
      description: 'Maximum width of the popover'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Sample options for stories
const sampleOptions = [
  { name: 'Option 1', value: 'opt1' },
  { name: 'Option 2', value: 'opt2' },
  { name: 'Option 3', value: 'opt3' },
  { name: 'Option 4', value: 'opt4' },
  { name: 'Option 5', value: 'opt5' }
]

const samplerOptions = [
  { name: 'Euler', value: 'euler' },
  { name: 'Euler Ancestral', value: 'euler_ancestral' },
  { name: 'DPM++ 2M', value: 'dpmpp_2m' },
  { name: 'DPM++ 2M Karras', value: 'dpmpp_2m_karras' },
  { name: 'DPM++ SDE', value: 'dpmpp_sde' },
  { name: 'DPM++ SDE Karras', value: 'dpmpp_sde_karras' },
  { name: 'DDIM', value: 'ddim' },
  { name: 'UniPC', value: 'unipc' }
]

const schedulerOptions = [
  { name: 'Normal', value: 'normal' },
  { name: 'Karras', value: 'karras' },
  { name: 'Exponential', value: 'exponential' },
  { name: 'Simple', value: 'simple' }
]

/**
 * Default single select with label
 */
export const Default: Story = {
  render: (args) => ({
    components: { SingleSelect },
    setup() {
      const selected = ref<string | null>(null)
      const options = sampleOptions
      return { args, selected, options }
    },
    template: `
      <div class="w-64">
        <SingleSelect
          v-bind="args"
          v-model="selected"
          :options="options"
        />
        <p class="mt-4 text-sm text-muted-foreground">
          Selected: {{ selected ?? 'None' }}
        </p>
      </div>
    `
  }),
  args: {
    label: 'Select an option'
  }
}

/**
 * With pre-selected value
 */
export const WithSelection: Story = {
  render: () => ({
    components: { SingleSelect },
    setup() {
      const selected = ref<string | null>('opt2')
      const options = sampleOptions
      return { selected, options }
    },
    template: `
      <div class="w-64">
        <SingleSelect
          v-model="selected"
          :options="options"
          label="Select an option"
        />
        <p class="mt-4 text-sm text-muted-foreground">
          Selected: {{ selected }}
        </p>
      </div>
    `
  })
}

/**
 * With icon slot - displays an icon before the selected value
 */
export const WithIcon: Story = {
  render: () => ({
    components: { SingleSelect },
    setup() {
      const selected = ref<string | null>('euler')
      const options = samplerOptions
      return { selected, options }
    },
    template: `
      <div class="w-64">
        <SingleSelect
          v-model="selected"
          :options="options"
          label="Sampler"
        >
          <template #icon>
            <i class="icon-[lucide--shuffle] text-muted-foreground" />
          </template>
        </SingleSelect>
        <p class="mt-4 text-sm text-muted-foreground">
          Sampler: {{ selected }}
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
    components: { SingleSelect },
    setup() {
      const selected = ref<string | null>('opt1')
      const options = sampleOptions
      return { selected, options }
    },
    template: `
      <div class="flex flex-col gap-4 w-64">
        <div>
          <div class="text-sm text-muted-foreground mb-2">Enabled</div>
          <SingleSelect
            v-model="selected"
            :options="options"
            label="Select option"
          />
        </div>
        <div>
          <div class="text-sm text-muted-foreground mb-2">Disabled</div>
          <SingleSelect
            v-model="selected"
            :options="options"
            label="Select option"
            disabled
          />
        </div>
      </div>
    `
  })
}

/**
 * Long list with scrollable dropdown
 */
export const LongList: Story = {
  render: () => ({
    components: { SingleSelect },
    setup() {
      const selected = ref<string | null>(null)
      const options = Array.from({ length: 20 }, (_, i) => ({
        name: `Option ${i + 1}`,
        value: `opt${i + 1}`
      }))
      return { selected, options }
    },
    template: `
      <div class="w-64">
        <SingleSelect
          v-model="selected"
          :options="options"
          label="Select from many options"
          listMaxHeight="200px"
        />
        <p class="mt-4 text-sm text-muted-foreground">
          Selected: {{ selected ?? 'None' }}
        </p>
      </div>
    `
  })
}

/**
 * Custom popover width
 */
export const CustomWidth: Story = {
  render: () => ({
    components: { SingleSelect },
    setup() {
      const selected = ref<string | null>('euler_ancestral')
      const options = samplerOptions
      return { selected, options }
    },
    template: `
      <div class="w-48">
        <SingleSelect
          v-model="selected"
          :options="options"
          label="Sampler"
          popoverMinWidth="300px"
        />
        <p class="mt-4 text-xs text-muted-foreground">
          Trigger is 192px wide, popover is min 300px
        </p>
      </div>
    `
  })
}

/**
 * ComfyUI use cases - sampler and scheduler selection
 */
export const UseCases: Story = {
  render: () => ({
    components: { SingleSelect },
    setup() {
      const sampler = ref<string | null>('euler_ancestral')
      const scheduler = ref<string | null>('karras')
      return { sampler, scheduler, samplerOptions, schedulerOptions }
    },
    template: `
      <div class="flex flex-col gap-8 w-80">
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Sampler Selection</h3>
          <div class="p-4 bg-secondary-background rounded-lg">
            <SingleSelect
              v-model="sampler"
              :options="samplerOptions"
              label="Sampler"
            >
              <template #icon>
                <i class="icon-[lucide--shuffle] text-muted-foreground" />
              </template>
            </SingleSelect>
            <div class="mt-3 text-xs text-muted-foreground">
              Used in KSampler node for diffusion sampling method
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Scheduler Selection</h3>
          <div class="p-4 bg-secondary-background rounded-lg">
            <SingleSelect
              v-model="scheduler"
              :options="schedulerOptions"
              label="Scheduler"
            >
              <template #icon>
                <i class="icon-[lucide--calendar] text-muted-foreground" />
              </template>
            </SingleSelect>
            <div class="mt-3 text-xs text-muted-foreground">
              Used in KSampler node for noise scheduling
            </div>
          </div>
        </div>
      </div>
    `
  })
}

/**
 * Interactive example with change handler
 */
export const Interactive: Story = {
  render: () => ({
    components: { SingleSelect },
    setup() {
      const selected = ref<string | null>(null)
      const changeLog = ref<string[]>([])
      const options = sampleOptions

      const handleChange = () => {
        changeLog.value.push(
          `Selected: ${selected.value} at ${new Date().toLocaleTimeString()}`
        )
        if (changeLog.value.length > 5) {
          changeLog.value.shift()
        }
      }

      return { selected, options, changeLog, handleChange }
    },
    template: `
      <div class="w-80">
        <SingleSelect
          v-model="selected"
          :options="options"
          label="Choose an option"
          @update:modelValue="handleChange"
        />
        <div class="mt-4 p-4 bg-secondary-background rounded-lg">
          <p class="text-sm text-base-foreground mb-2">
            <strong>Current:</strong> {{ selected ?? 'None' }}
          </p>
          <div v-if="changeLog.length > 0" class="text-xs text-muted-foreground">
            <p class="font-semibold mb-1">Change log:</p>
            <p v-for="(log, i) in changeLog" :key="i">{{ log }}</p>
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
    components: { SingleSelect },
    setup() {
      const s1 = ref<string | null>(null)
      const s2 = ref<string | null>('euler')
      const s3 = ref<string | null>('karras')
      return { s1, s2, s3, sampleOptions, samplerOptions, schedulerOptions }
    },
    template: `
      <div class="dark-theme bg-neutral-900 p-8 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-4">Dark Theme</h3>
        <div class="flex flex-col gap-4 w-64">
          <div>
            <div class="text-xs text-neutral-400 mb-2">Empty state</div>
            <SingleSelect
              v-model="s1"
              :options="sampleOptions"
              label="Select option"
            />
          </div>
          <div>
            <div class="text-xs text-neutral-400 mb-2">With selection</div>
            <SingleSelect
              v-model="s2"
              :options="samplerOptions"
              label="Sampler"
            >
              <template #icon>
                <i class="icon-[lucide--shuffle] text-muted-foreground" />
              </template>
            </SingleSelect>
          </div>
          <div>
            <div class="text-xs text-neutral-400 mb-2">Another example</div>
            <SingleSelect
              v-model="s3"
              :options="schedulerOptions"
              label="Scheduler"
            />
          </div>
        </div>
      </div>
    `
  })
}
