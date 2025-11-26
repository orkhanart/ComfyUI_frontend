import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import SearchBox from '@/components/input/SearchBox.vue'

/**
 * SearchBox
 *
 * A search input component with a search icon, debounced input handling,
 * and support for different sizes and border variants.
 *
 * Props:
 * - `autofocus`: boolean - automatically focus on mount (default: false)
 * - `placeholder`: string - placeholder text (default: 'Search...')
 * - `showBorder`: boolean - show border outline (default: false)
 * - `size`: 'md' | 'lg' - input size (default: 'md')
 *
 * Model:
 * - v-model: string - the search query (debounced by 300ms)
 */
const meta: Meta<typeof SearchBox> = {
  title: 'Forms/SearchBox',
  component: SearchBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Search input with icon, debounced value updates, and multiple size/border variants. Commonly used in filtering, search panels, and node library.'
      }
    }
  },
  argTypes: {
    autofocus: {
      control: 'boolean',
      description: 'Automatically focus the input on mount'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when empty'
    },
    showBorder: {
      control: 'boolean',
      description: 'Show border outline around the search box'
    },
    size: {
      control: 'select',
      options: ['md', 'lg'],
      description: 'Search box size'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default search box with medium size
 */
export const Default: Story = {
  render: (args) => ({
    components: { SearchBox },
    setup() {
      const searchQuery = ref('')
      return { args, searchQuery }
    },
    template: `
      <div class="w-80">
        <SearchBox v-bind="args" v-model="searchQuery" />
        <p class="mt-4 text-sm text-muted-foreground">
          Value: "{{ searchQuery }}"
        </p>
      </div>
    `
  }),
  args: {
    placeholder: 'Search...',
    showBorder: false,
    size: 'md',
    autofocus: false
  }
}

/**
 * All size variants comparison
 */
export const AllSizes: Story = {
  render: () => ({
    components: { SearchBox },
    setup() {
      const queryMd = ref('')
      const queryLg = ref('')
      return { queryMd, queryLg }
    },
    template: `
      <div class="flex flex-col gap-6 w-80">
        <div>
          <div class="text-sm text-muted-foreground mb-2">md (32px height)</div>
          <SearchBox v-model="queryMd" size="md" placeholder="Medium size..." />
        </div>
        <div>
          <div class="text-sm text-muted-foreground mb-2">lg (40px height)</div>
          <SearchBox v-model="queryLg" size="lg" placeholder="Large size..." />
        </div>
      </div>
    `
  })
}

/**
 * Border variant adds visible border outline
 */
export const WithBorder: Story = {
  render: () => ({
    components: { SearchBox },
    setup() {
      const queryNoBorder = ref('')
      const queryWithBorder = ref('')
      return { queryNoBorder, queryWithBorder }
    },
    template: `
      <div class="flex flex-col gap-6 w-80">
        <div>
          <div class="text-sm text-muted-foreground mb-2">Without border</div>
          <SearchBox v-model="queryNoBorder" :showBorder="false" placeholder="No border..." />
        </div>
        <div>
          <div class="text-sm text-muted-foreground mb-2">With border</div>
          <SearchBox v-model="queryWithBorder" showBorder placeholder="With border..." />
        </div>
      </div>
    `
  })
}

/**
 * Custom placeholder text examples
 */
export const CustomPlaceholders: Story = {
  render: () => ({
    components: { SearchBox },
    setup() {
      const q1 = ref('')
      const q2 = ref('')
      const q3 = ref('')
      return { q1, q2, q3 }
    },
    template: `
      <div class="flex flex-col gap-4 w-80">
        <SearchBox v-model="q1" placeholder="Search nodes..." />
        <SearchBox v-model="q2" placeholder="Filter workflows..." />
        <SearchBox v-model="q3" placeholder="Find models..." />
      </div>
    `
  })
}

/**
 * Autofocus variant - input is focused on mount
 */
export const Autofocus: Story = {
  render: () => ({
    components: { SearchBox },
    setup() {
      const query = ref('')
      return { query }
    },
    template: `
      <div class="w-80">
        <SearchBox v-model="query" autofocus placeholder="I'm focused on load..." />
        <p class="mt-2 text-xs text-muted-foreground">
          This search box automatically receives focus when mounted
        </p>
      </div>
    `
  })
}

/**
 * Interactive example showing debounced value updates
 */
export const Interactive: Story = {
  render: () => ({
    components: { SearchBox },
    setup() {
      const searchQuery = ref('')
      const searchCount = ref(0)
      return { searchQuery, searchCount }
    },
    template: `
      <div class="w-80">
        <SearchBox v-model="searchQuery" placeholder="Type to search..." showBorder size="lg" />
        <div class="mt-4 p-4 bg-secondary-background rounded-lg">
          <p class="text-sm text-base-foreground mb-2">
            <strong>Current value:</strong> "{{ searchQuery }}"
          </p>
          <p class="text-xs text-muted-foreground">
            Value updates are debounced by 300ms for performance.
            Type quickly and notice the delay before the value updates.
          </p>
        </div>
      </div>
    `
  })
}

/**
 * Common use cases in ComfyUI
 */
export const UseCases: Story = {
  render: () => ({
    components: { SearchBox },
    setup() {
      const nodeSearch = ref('')
      const workflowFilter = ref('')
      const modelSearch = ref('')
      return { nodeSearch, workflowFilter, modelSearch }
    },
    template: `
      <div class="flex flex-col gap-8 w-96">
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Node Library Search</h3>
          <div class="p-4 bg-secondary-background rounded-lg">
            <SearchBox v-model="nodeSearch" placeholder="Search nodes..." size="lg" showBorder />
            <div class="mt-3 text-xs text-muted-foreground">
              Used in the sidebar node library for finding nodes
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Workflow Filter</h3>
          <div class="p-4 bg-secondary-background rounded-lg">
            <SearchBox v-model="workflowFilter" placeholder="Filter workflows..." size="md" />
            <div class="mt-3 text-xs text-muted-foreground">
              Filter workflows in the workflow browser
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Model Search</h3>
          <div class="p-4 bg-secondary-background rounded-lg">
            <SearchBox v-model="modelSearch" placeholder="Find checkpoints, LoRAs..." size="md" showBorder />
            <div class="mt-3 text-xs text-muted-foreground">
              Search models in model manager
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
    components: { SearchBox },
    setup() {
      const q1 = ref('')
      const q2 = ref('')
      const q3 = ref('')
      const q4 = ref('')
      return { q1, q2, q3, q4 }
    },
    template: `
      <div class="dark-theme bg-neutral-900 p-8 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-4">Dark Theme</h3>
        <div class="flex flex-col gap-4 w-80">
          <div>
            <div class="text-xs text-neutral-400 mb-2">Medium size</div>
            <SearchBox v-model="q1" size="md" placeholder="Search..." />
          </div>
          <div>
            <div class="text-xs text-neutral-400 mb-2">Large size</div>
            <SearchBox v-model="q2" size="lg" placeholder="Search..." />
          </div>
          <div>
            <div class="text-xs text-neutral-400 mb-2">With border</div>
            <SearchBox v-model="q3" showBorder placeholder="Search..." />
          </div>
          <div>
            <div class="text-xs text-neutral-400 mb-2">Large with border</div>
            <SearchBox v-model="q4" size="lg" showBorder placeholder="Search..." />
          </div>
        </div>
      </div>
    `
  })
}
