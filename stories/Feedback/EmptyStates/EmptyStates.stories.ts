import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import NoResultsPlaceholder from '@/components/common/NoResultsPlaceholder.vue'

/**
 * Empty States
 *
 * Components for displaying empty states, no results, and error states.
 * Used when there's no content to display or when something goes wrong.
 *
 * NoResultsPlaceholder Props:
 * - `icon`: string - PrimeVue icon class (e.g., 'pi pi-search')
 * - `title`: string - main heading text
 * - `message`: string - descriptive message (supports multi-line with \n)
 * - `textClass`: string - optional CSS classes for the message text
 * - `buttonLabel`: string - optional action button label
 * - `class`: string - optional CSS classes for the container
 *
 * Events:
 * - `@action` - emitted when the action button is clicked
 */
const meta: Meta<typeof NoResultsPlaceholder> = {
  title: 'Feedback/Empty States',
  component: NoResultsPlaceholder,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Empty state component for displaying no results, empty lists, and error states. Features an icon, title, message, and optional action button.'
      }
    }
  },
  argTypes: {
    icon: {
      control: 'text',
      description: 'PrimeVue icon class (e.g., pi pi-search, pi pi-folder-open)'
    },
    title: {
      control: 'text',
      description: 'Main heading text'
    },
    message: {
      control: 'text',
      description: 'Descriptive message text (supports multi-line)'
    },
    textClass: {
      control: 'text',
      description: 'CSS classes for message styling'
    },
    buttonLabel: {
      control: 'text',
      description: 'Optional action button label'
    },
    class: {
      control: 'text',
      description: 'Container CSS classes'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default empty state with search icon
 */
export const Default: Story = {
  args: {
    icon: 'pi pi-search',
    title: 'No Results Found',
    message:
      "Try adjusting your search or filters to find what you're looking for."
  }
}

/**
 * Search no results state
 */
export const SearchNoResults: Story = {
  render: () => ({
    components: { NoResultsPlaceholder },
    template: `
      <div class="w-[400px]">
        <NoResultsPlaceholder
          icon="pi pi-search"
          title="No results found"
          message="We couldn't find any items matching your search.
Try different keywords or remove some filters."
        />
      </div>
    `
  })
}

/**
 * Empty folder/list state
 */
export const EmptyFolder: Story = {
  render: () => ({
    components: { NoResultsPlaceholder },
    template: `
      <div class="w-[400px]">
        <NoResultsPlaceholder
          icon="pi pi-folder-open"
          title="This folder is empty"
          message="No workflows have been saved to this location yet."
          buttonLabel="Create Workflow"
          @action="console.log('Create clicked')"
        />
      </div>
    `
  })
}

/**
 * Empty queue state
 */
export const EmptyQueue: Story = {
  render: () => ({
    components: { NoResultsPlaceholder },
    template: `
      <div class="w-[400px]">
        <NoResultsPlaceholder
          icon="pi pi-list"
          title="Queue is empty"
          message="No items are currently queued for processing.
Run a workflow to add items to the queue."
        />
      </div>
    `
  })
}

/**
 * No models found state
 */
export const NoModels: Story = {
  render: () => ({
    components: { NoResultsPlaceholder },
    template: `
      <div class="w-[400px]">
        <NoResultsPlaceholder
          icon="pi pi-box"
          title="No models found"
          message="Install models to use them in your workflows."
          buttonLabel="Browse Models"
          @action="console.log('Browse clicked')"
        />
      </div>
    `
  })
}

/**
 * Error state
 */
export const ErrorState: Story = {
  render: () => ({
    components: { NoResultsPlaceholder },
    template: `
      <div class="w-[400px]">
        <NoResultsPlaceholder
          icon="pi pi-exclamation-circle"
          title="Something went wrong"
          message="An error occurred while loading the content.
Please try again later."
          buttonLabel="Retry"
          @action="console.log('Retry clicked')"
        />
      </div>
    `
  })
}

/**
 * Connection error state
 */
export const ConnectionError: Story = {
  render: () => ({
    components: { NoResultsPlaceholder },
    template: `
      <div class="w-[400px]">
        <NoResultsPlaceholder
          icon="pi pi-wifi"
          title="Connection Lost"
          message="Unable to connect to the server.
Check your network connection and try again."
          buttonLabel="Reconnect"
          @action="console.log('Reconnect clicked')"
        />
      </div>
    `
  })
}

/**
 * No history state
 */
export const NoHistory: Story = {
  render: () => ({
    components: { NoResultsPlaceholder },
    template: `
      <div class="w-[400px]">
        <NoResultsPlaceholder
          icon="pi pi-history"
          title="No history yet"
          message="Your execution history will appear here after you run workflows."
        />
      </div>
    `
  })
}

/**
 * All icon variants
 */
export const IconVariants: Story = {
  render: () => ({
    components: { NoResultsPlaceholder },
    template: `
      <div class="grid grid-cols-2 gap-4">
        <NoResultsPlaceholder
          icon="pi pi-search"
          title="Search"
          message="No search results"
        />
        <NoResultsPlaceholder
          icon="pi pi-folder-open"
          title="Empty Folder"
          message="No files here"
        />
        <NoResultsPlaceholder
          icon="pi pi-inbox"
          title="Inbox"
          message="No messages"
        />
        <NoResultsPlaceholder
          icon="pi pi-image"
          title="Gallery"
          message="No images"
        />
        <NoResultsPlaceholder
          icon="pi pi-file"
          title="Documents"
          message="No documents"
        />
        <NoResultsPlaceholder
          icon="pi pi-exclamation-triangle"
          title="Warning"
          message="Something is wrong"
        />
      </div>
    `
  })
}

/**
 * With action button
 */
export const WithActionButton: Story = {
  render: () => ({
    components: { NoResultsPlaceholder },
    setup() {
      const handleAction = () => {
        alert('Action button clicked!')
      }
      return { handleAction }
    },
    template: `
      <div class="w-[400px]">
        <NoResultsPlaceholder
          icon="pi pi-plus-circle"
          title="Get Started"
          message="You haven't created any workflows yet.
Create your first workflow to get started."
          buttonLabel="Create New Workflow"
          @action="handleAction"
        />
      </div>
    `
  })
}

/**
 * Custom text styling
 */
export const CustomTextStyle: Story = {
  render: () => ({
    components: { NoResultsPlaceholder },
    template: `
      <div class="flex flex-col gap-4">
        <div class="w-[400px]">
          <NoResultsPlaceholder
            icon="pi pi-info-circle"
            title="Default styling"
            message="This is the default message style."
          />
        </div>
        <div class="w-[400px]">
          <NoResultsPlaceholder
            icon="pi pi-info-circle"
            title="Custom max width"
            message="This message has a custom max width class applied for better readability on wider screens."
            textClass="max-w-[300px]"
          />
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
    components: { NoResultsPlaceholder },
    setup() {
      const searchQuery = ref('')
      const items = ref<string[]>([])
      const allItems = [
        'Workflow A',
        'Workflow B',
        'Model C',
        'Image D',
        'Template E'
      ]

      const search = () => {
        if (searchQuery.value.trim()) {
          items.value = allItems.filter((item) =>
            item.toLowerCase().includes(searchQuery.value.toLowerCase())
          )
        } else {
          items.value = []
        }
      }

      const clearSearch = () => {
        searchQuery.value = ''
        items.value = []
      }

      return { searchQuery, items, search, clearSearch }
    },
    template: `
      <div class="w-[400px]">
        <div class="flex gap-2 mb-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search items..."
            class="flex-1 px-3 py-2 border rounded-lg"
            @input="search"
          />
        </div>

        <div v-if="searchQuery && items.length === 0">
          <NoResultsPlaceholder
            icon="pi pi-search"
            title="No results found"
            :message="'No items matching &quot;' + searchQuery + '&quot;'"
            buttonLabel="Clear Search"
            @action="clearSearch"
          />
        </div>

        <div v-else-if="items.length > 0" class="space-y-2">
          <div
            v-for="item in items"
            :key="item"
            class="p-3 bg-secondary-background rounded-lg"
          >
            {{ item }}
          </div>
        </div>

        <div v-else>
          <NoResultsPlaceholder
            icon="pi pi-search"
            title="Start searching"
            message="Enter a search term to find items"
          />
        </div>
      </div>
    `
  })
}

/**
 * ComfyUI-specific empty states
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: { NoResultsPlaceholder },
    template: `
      <div class="grid grid-cols-2 gap-6">
        <!-- Node library empty -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Node Library</h3>
          <NoResultsPlaceholder
            icon="pi pi-th-large"
            title="No nodes found"
            message="No nodes match your search criteria."
          />
        </div>

        <!-- Workflow browser empty -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Workflow Browser</h3>
          <NoResultsPlaceholder
            icon="pi pi-file"
            title="No workflows"
            message="Create or import workflows to see them here."
            buttonLabel="New Workflow"
            @action="console.log('New workflow')"
          />
        </div>

        <!-- Model manager empty -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Model Manager</h3>
          <NoResultsPlaceholder
            icon="pi pi-box"
            title="No models installed"
            message="Download models to use them in your workflows."
            buttonLabel="Browse Models"
            @action="console.log('Browse models')"
          />
        </div>

        <!-- Queue empty -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Queue Panel</h3>
          <NoResultsPlaceholder
            icon="pi pi-list"
            title="Queue is empty"
            message="Run a workflow to add items to the queue."
          />
        </div>

        <!-- Gallery empty -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Output Gallery</h3>
          <NoResultsPlaceholder
            icon="pi pi-images"
            title="No outputs yet"
            message="Generated images will appear here."
          />
        </div>

        <!-- Custom nodes empty -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Custom Nodes</h3>
          <NoResultsPlaceholder
            icon="pi pi-puzzle-piece"
            title="No custom nodes"
            message="Install custom nodes to extend functionality."
            buttonLabel="Install Nodes"
            @action="console.log('Install nodes')"
          />
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
    components: { NoResultsPlaceholder },
    template: `
      <div class="dark-theme bg-neutral-900 p-8 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-6">Dark Theme</h3>
        <div class="grid grid-cols-2 gap-4">
          <NoResultsPlaceholder
            icon="pi pi-search"
            title="No results"
            message="Try a different search term"
          />
          <NoResultsPlaceholder
            icon="pi pi-folder-open"
            title="Empty folder"
            message="No files in this folder"
            buttonLabel="Upload"
            @action="console.log('Upload')"
          />
          <NoResultsPlaceholder
            icon="pi pi-exclamation-circle"
            title="Error occurred"
            message="Please try again later"
            buttonLabel="Retry"
            @action="console.log('Retry')"
          />
          <NoResultsPlaceholder
            icon="pi pi-inbox"
            title="No items"
            message="Start adding items"
          />
        </div>
      </div>
    `
  })
}
