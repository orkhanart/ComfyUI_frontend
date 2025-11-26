import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import MultiSelect from '@/components/input/MultiSelect.vue'
import type { SelectOption } from '@/components/input/types'

/**
 * MultiSelect
 *
 * A dropdown component for selecting multiple options from a list.
 * Features include search filtering, selection count badge, and clear all functionality.
 *
 * Props:
 * - `label`: string - label shown on the trigger button
 * - `showSearchBox`: boolean - show search input in panel header (default: false)
 * - `showSelectedCount`: boolean - show "X items selected" text (default: false)
 * - `showClearButton`: boolean - show "Clear all" button (default: false)
 * - `searchPlaceholder`: string - placeholder for search input (default: 'Search...')
 * - `listMaxHeight`: string - max height of dropdown panel (default: '28rem')
 * - `popoverMinWidth`: string - min width of popover
 * - `popoverMaxWidth`: string - max width of popover
 *
 * Model:
 * - v-model: SelectOption[] - array of selected options
 * - v-model:searchQuery: string - the current search query
 *
 * Options are passed via :options="[{ name: 'Label', value: 'val' }, ...]"
 */
const meta: Meta<typeof MultiSelect> = {
  title: 'Forms/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Multi-selection dropdown with search, selection count badge, and clear functionality. Used for filtering and selecting multiple items.'
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label shown on the trigger button'
    },
    showSearchBox: {
      control: 'boolean',
      description: 'Show search input in panel header'
    },
    showSelectedCount: {
      control: 'boolean',
      description: 'Show selected count text in panel header'
    },
    showClearButton: {
      control: 'boolean',
      description: 'Show clear all button in panel header'
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder for search input'
    },
    listMaxHeight: {
      control: 'text',
      description: 'Maximum height of the dropdown panel'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Sample options for stories
const categoryOptions: SelectOption[] = [
  { name: 'Checkpoint', value: 'checkpoint' },
  { name: 'LoRA', value: 'lora' },
  { name: 'VAE', value: 'vae' },
  { name: 'Embedding', value: 'embedding' },
  { name: 'Upscaler', value: 'upscaler' },
  { name: 'ControlNet', value: 'controlnet' }
]

const nodeTypeOptions: SelectOption[] = [
  { name: 'Loader', value: 'loader' },
  { name: 'Sampler', value: 'sampler' },
  { name: 'Conditioning', value: 'conditioning' },
  { name: 'Latent', value: 'latent' },
  { name: 'Image', value: 'image' },
  { name: 'Mask', value: 'mask' },
  { name: 'Model', value: 'model' },
  { name: 'VAE', value: 'vae' },
  { name: 'Utility', value: 'utility' }
]

const tagOptions: SelectOption[] = [
  { name: 'SDXL', value: 'sdxl' },
  { name: 'SD 1.5', value: 'sd15' },
  { name: 'SD 2.1', value: 'sd21' },
  { name: 'Flux', value: 'flux' },
  { name: 'Portrait', value: 'portrait' },
  { name: 'Landscape', value: 'landscape' },
  { name: 'Anime', value: 'anime' },
  { name: 'Realistic', value: 'realistic' },
  { name: 'Abstract', value: 'abstract' }
]

/**
 * Default multi-select with label
 */
export const Default: Story = {
  render: (args) => ({
    components: { MultiSelect },
    setup() {
      const selected = ref<SelectOption[]>([])
      return { args, selected, categoryOptions }
    },
    template: `
      <div class="w-64">
        <MultiSelect
          v-bind="args"
          v-model="selected"
          :options="categoryOptions"
        />
        <p class="mt-4 text-sm text-muted-foreground">
          Selected: {{ selected.length }} items
        </p>
      </div>
    `
  }),
  args: {
    label: 'Filter by type'
  }
}

/**
 * With pre-selected values and count badge
 */
export const WithSelection: Story = {
  render: () => ({
    components: { MultiSelect },
    setup() {
      const selected = ref<SelectOption[]>([
        { name: 'Checkpoint', value: 'checkpoint' },
        { name: 'LoRA', value: 'lora' }
      ])
      return { selected, categoryOptions }
    },
    template: `
      <div class="w-64">
        <MultiSelect
          v-model="selected"
          :options="categoryOptions"
          label="Filter by type"
        />
        <p class="mt-4 text-sm text-muted-foreground">
          Selected: {{ selected.map(s => s.name).join(', ') }}
        </p>
      </div>
    `
  })
}

/**
 * With search box for filtering options
 */
export const WithSearch: Story = {
  render: () => ({
    components: { MultiSelect },
    setup() {
      const selected = ref<SelectOption[]>([])
      return { selected, nodeTypeOptions }
    },
    template: `
      <div class="w-64">
        <MultiSelect
          v-model="selected"
          :options="nodeTypeOptions"
          label="Node types"
          showSearchBox
          searchPlaceholder="Search node types..."
        />
        <p class="mt-4 text-sm text-muted-foreground">
          Selected: {{ selected.length }} types
        </p>
      </div>
    `
  })
}

/**
 * With selection count and clear button
 */
export const WithHeaderControls: Story = {
  render: () => ({
    components: { MultiSelect },
    setup() {
      const selected = ref<SelectOption[]>([
        { name: 'SDXL', value: 'sdxl' },
        { name: 'Portrait', value: 'portrait' },
        { name: 'Realistic', value: 'realistic' }
      ])
      return { selected, tagOptions }
    },
    template: `
      <div class="w-64">
        <MultiSelect
          v-model="selected"
          :options="tagOptions"
          label="Tags"
          showSelectedCount
          showClearButton
        />
        <p class="mt-4 text-sm text-muted-foreground">
          Selected: {{ selected.map(s => s.name).join(', ') }}
        </p>
      </div>
    `
  })
}

/**
 * Full featured with all header options
 */
export const FullFeatured: Story = {
  render: () => ({
    components: { MultiSelect },
    setup() {
      const selected = ref<SelectOption[]>([])
      return { selected, tagOptions }
    },
    template: `
      <div class="w-72">
        <MultiSelect
          v-model="selected"
          :options="tagOptions"
          label="Filter tags"
          showSearchBox
          showSelectedCount
          showClearButton
          searchPlaceholder="Search tags..."
        />
        <p class="mt-4 text-sm text-muted-foreground">
          {{ selected.length > 0
            ? 'Selected: ' + selected.map(s => s.name).join(', ')
            : 'No tags selected'
          }}
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
    components: { MultiSelect },
    setup() {
      const selected1 = ref<SelectOption[]>([])
      const selected2 = ref<SelectOption[]>([
        { name: 'Checkpoint', value: 'checkpoint' }
      ])
      return { selected1, selected2, categoryOptions }
    },
    template: `
      <div class="flex flex-col gap-4 w-64">
        <div>
          <div class="text-sm text-muted-foreground mb-2">Enabled</div>
          <MultiSelect
            v-model="selected1"
            :options="categoryOptions"
            label="Filter by type"
          />
        </div>
        <div>
          <div class="text-sm text-muted-foreground mb-2">Disabled</div>
          <MultiSelect
            v-model="selected2"
            :options="categoryOptions"
            label="Filter by type"
            disabled
          />
        </div>
      </div>
    `
  })
}

/**
 * Long list with custom height
 */
export const LongList: Story = {
  render: () => ({
    components: { MultiSelect },
    setup() {
      const selected = ref<SelectOption[]>([])
      const options = Array.from({ length: 25 }, (_, i) => ({
        name: `Option ${i + 1}`,
        value: `opt${i + 1}`
      }))
      return { selected, options }
    },
    template: `
      <div class="w-64">
        <MultiSelect
          v-model="selected"
          :options="options"
          label="Select items"
          showSearchBox
          showSelectedCount
          listMaxHeight="200px"
        />
        <p class="mt-4 text-sm text-muted-foreground">
          Selected: {{ selected.length }} items
        </p>
      </div>
    `
  })
}

/**
 * ComfyUI use cases
 */
export const UseCases: Story = {
  render: () => ({
    components: { MultiSelect },
    setup() {
      const modelTypes = ref<SelectOption[]>([])
      const nodeTags = ref<SelectOption[]>([])
      return { modelTypes, nodeTags, categoryOptions, tagOptions }
    },
    template: `
      <div class="flex flex-col gap-8 w-80">
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Model Browser Filter</h3>
          <div class="p-4 bg-secondary-background rounded-lg">
            <MultiSelect
              v-model="modelTypes"
              :options="categoryOptions"
              label="Model types"
              showSearchBox
              showSelectedCount
              showClearButton
            />
            <div class="mt-3 text-xs text-muted-foreground">
              Filter models by type in the model browser
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Workflow Tag Filter</h3>
          <div class="p-4 bg-secondary-background rounded-lg">
            <MultiSelect
              v-model="nodeTags"
              :options="tagOptions"
              label="Tags"
              showSearchBox
              showClearButton
            />
            <div class="mt-3 text-xs text-muted-foreground">
              Filter workflows by tags
            </div>
          </div>
        </div>
      </div>
    `
  })
}

/**
 * Interactive example
 */
export const Interactive: Story = {
  render: () => ({
    components: { MultiSelect },
    setup() {
      const selected = ref<SelectOption[]>([])
      const searchQuery = ref('')
      return { selected, searchQuery, tagOptions }
    },
    template: `
      <div class="w-80">
        <MultiSelect
          v-model="selected"
          v-model:searchQuery="searchQuery"
          :options="tagOptions"
          label="Select tags"
          showSearchBox
          showSelectedCount
          showClearButton
          searchPlaceholder="Type to filter..."
        />
        <div class="mt-4 p-4 bg-secondary-background rounded-lg">
          <p class="text-sm text-base-foreground mb-2">
            <strong>Selected:</strong> {{ selected.length }} items
          </p>
          <p class="text-sm text-base-foreground mb-2">
            <strong>Search:</strong> "{{ searchQuery }}"
          </p>
          <div v-if="selected.length > 0" class="flex flex-wrap gap-1 mt-2">
            <span
              v-for="item in selected"
              :key="item.value"
              class="px-2 py-0.5 bg-primary-background text-white text-xs rounded"
            >
              {{ item.name }}
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
    components: { MultiSelect },
    setup() {
      const s1 = ref<SelectOption[]>([])
      const s2 = ref<SelectOption[]>([
        { name: 'Checkpoint', value: 'checkpoint' },
        { name: 'LoRA', value: 'lora' }
      ])
      const s3 = ref<SelectOption[]>([])
      return { s1, s2, s3, categoryOptions, tagOptions }
    },
    template: `
      <div class="dark-theme bg-neutral-900 p-8 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-4">Dark Theme</h3>
        <div class="flex flex-col gap-4 w-64">
          <div>
            <div class="text-xs text-neutral-400 mb-2">Empty state</div>
            <MultiSelect
              v-model="s1"
              :options="categoryOptions"
              label="Filter by type"
            />
          </div>
          <div>
            <div class="text-xs text-neutral-400 mb-2">With selections (badge visible)</div>
            <MultiSelect
              v-model="s2"
              :options="categoryOptions"
              label="Filter by type"
            />
          </div>
          <div>
            <div class="text-xs text-neutral-400 mb-2">With search & controls</div>
            <MultiSelect
              v-model="s3"
              :options="tagOptions"
              label="Tags"
              showSearchBox
              showSelectedCount
              showClearButton
            />
          </div>
        </div>
      </div>
    `
  })
}
