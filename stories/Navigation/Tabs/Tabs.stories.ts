import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import Tab from '@/components/tab/Tab.vue'
import TabList from '@/components/tab/TabList.vue'

/**
 * Tabs
 *
 * A composable tab navigation system using TabList and Tab components.
 * TabList provides the container with value management via provide/inject,
 * while Tab components handle individual tab buttons.
 *
 * TabList Props:
 * - v-model: string - the currently selected tab value
 *
 * Tab Props:
 * - `value`: string - unique identifier for this tab
 * - `panelId`: string - optional aria-controls reference for accessibility
 *
 * Features:
 * - Fully accessible with proper ARIA roles
 * - Automatic active state management via provide/inject
 * - Semantic styling with design system tokens
 * - Keyboard navigation support
 */
const meta: Meta<typeof TabList> = {
  title: 'Navigation/Tabs',
  component: TabList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tab navigation system with TabList container and Tab items. Uses provide/inject for state management and follows accessibility best practices.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default tabs with three options
 */
export const Default: Story = {
  render: () => ({
    components: { TabList, Tab },
    setup() {
      const activeTab = ref('tab1')
      return { activeTab }
    },
    template: `
      <div class="w-96">
        <TabList v-model="activeTab">
          <Tab value="tab1">General</Tab>
          <Tab value="tab2">Advanced</Tab>
          <Tab value="tab3">Settings</Tab>
        </TabList>
        <div class="mt-4 p-4 bg-secondary-background rounded-lg">
          <p class="text-sm text-muted-foreground">Active tab: {{ activeTab }}</p>
        </div>
      </div>
    `
  })
}

/**
 * Two tab configuration
 */
export const TwoTabs: Story = {
  render: () => ({
    components: { TabList, Tab },
    setup() {
      const activeTab = ref('nodes')
      return { activeTab }
    },
    template: `
      <div class="w-64">
        <TabList v-model="activeTab">
          <Tab value="nodes">Nodes</Tab>
          <Tab value="models">Models</Tab>
        </TabList>
      </div>
    `
  })
}

/**
 * Multiple tabs showing scrollable behavior
 */
export const ManyTabs: Story = {
  render: () => ({
    components: { TabList, Tab },
    setup() {
      const activeTab = ref('home')
      return { activeTab }
    },
    template: `
      <div class="w-full max-w-xl">
        <TabList v-model="activeTab">
          <Tab value="home">Home</Tab>
          <Tab value="workflows">Workflows</Tab>
          <Tab value="templates">Templates</Tab>
          <Tab value="models">Models</Tab>
          <Tab value="extensions">Extensions</Tab>
          <Tab value="settings">Settings</Tab>
        </TabList>
        <div class="mt-4 p-4 bg-secondary-background rounded-lg">
          <p class="text-sm text-muted-foreground">Selected: {{ activeTab }}</p>
        </div>
      </div>
    `
  })
}

/**
 * Tabs with icons using Lucide icon classes
 */
export const WithIcons: Story = {
  render: () => ({
    components: { TabList, Tab },
    setup() {
      const activeTab = ref('nodes')
      return { activeTab }
    },
    template: `
      <div class="w-96">
        <TabList v-model="activeTab">
          <Tab value="nodes">
            <i class="pi pi-box mr-2" />
            Nodes
          </Tab>
          <Tab value="workflows">
            <i class="pi pi-sitemap mr-2" />
            Workflows
          </Tab>
          <Tab value="settings">
            <i class="pi pi-cog mr-2" />
            Settings
          </Tab>
        </TabList>
      </div>
    `
  })
}

/**
 * Tabs with panel content example
 */
export const WithPanels: Story = {
  render: () => ({
    components: { TabList, Tab },
    setup() {
      const activeTab = ref('overview')
      return { activeTab }
    },
    template: `
      <div class="w-full max-w-md">
        <TabList v-model="activeTab">
          <Tab value="overview" panel-id="panel-overview">Overview</Tab>
          <Tab value="details" panel-id="panel-details">Details</Tab>
          <Tab value="history" panel-id="panel-history">History</Tab>
        </TabList>

        <div class="mt-4 border border-border-color rounded-lg overflow-hidden">
          <div
            v-if="activeTab === 'overview'"
            id="panel-overview"
            role="tabpanel"
            class="p-4"
          >
            <h3 class="font-semibold text-base-foreground mb-2">Overview</h3>
            <p class="text-sm text-muted-foreground">
              This is the overview panel content. It shows general information about the selected item.
            </p>
          </div>
          <div
            v-if="activeTab === 'details'"
            id="panel-details"
            role="tabpanel"
            class="p-4"
          >
            <h3 class="font-semibold text-base-foreground mb-2">Details</h3>
            <p class="text-sm text-muted-foreground">
              Detailed information including specifications, parameters, and configuration options.
            </p>
          </div>
          <div
            v-if="activeTab === 'history'"
            id="panel-history"
            role="tabpanel"
            class="p-4"
          >
            <h3 class="font-semibold text-base-foreground mb-2">History</h3>
            <p class="text-sm text-muted-foreground">
              Revision history and changelog for this item.
            </p>
          </div>
        </div>
      </div>
    `
  })
}

/**
 * ComfyUI use cases showing common tab configurations
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: { TabList, Tab },
    setup() {
      const sidebarTab = ref('nodes')
      const settingsTab = ref('general')
      const bottomPanelTab = ref('logs')
      return { sidebarTab, settingsTab, bottomPanelTab }
    },
    template: `
      <div class="flex flex-col gap-8 w-full max-w-lg">
        <!-- Sidebar tabs -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Sidebar Navigation</h3>
          <div class="p-4 bg-secondary-background rounded-lg">
            <TabList v-model="sidebarTab">
              <Tab value="nodes">
                <i class="pi pi-box mr-2" />
                Nodes
              </Tab>
              <Tab value="models">
                <i class="pi pi-database mr-2" />
                Models
              </Tab>
              <Tab value="workflows">
                <i class="pi pi-folder mr-2" />
                Workflows
              </Tab>
            </TabList>
            <div class="mt-3 text-xs text-muted-foreground">
              Used in sidebar for switching between node library, model browser, and workflows
            </div>
          </div>
        </div>

        <!-- Settings tabs -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Settings Dialog</h3>
          <div class="p-4 bg-secondary-background rounded-lg">
            <TabList v-model="settingsTab">
              <Tab value="general">General</Tab>
              <Tab value="appearance">Appearance</Tab>
              <Tab value="keybindings">Keybindings</Tab>
              <Tab value="extensions">Extensions</Tab>
            </TabList>
            <div class="mt-3 text-xs text-muted-foreground">
              Settings dialog section navigation
            </div>
          </div>
        </div>

        <!-- Bottom panel tabs -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Bottom Panel</h3>
          <div class="p-4 bg-secondary-background rounded-lg">
            <TabList v-model="bottomPanelTab">
              <Tab value="logs">Logs</Tab>
              <Tab value="queue">Queue</Tab>
              <Tab value="shortcuts">Shortcuts</Tab>
            </TabList>
            <div class="mt-3 text-xs text-muted-foreground">
              Bottom panel for logs, execution queue, and keyboard shortcuts
            </div>
          </div>
        </div>
      </div>
    `
  })
}

/**
 * Interactive example with event handling
 */
export const Interactive: Story = {
  render: () => ({
    components: { TabList, Tab },
    setup() {
      const activeTab = ref('first')
      const clickCount = ref(0)
      const history = ref<string[]>([])

      const tabs = ['first', 'second', 'third', 'fourth']

      return { activeTab, clickCount, history, tabs }
    },
    template: `
      <div class="w-full max-w-md">
        <TabList v-model="activeTab" @update:model-value="history.push($event)">
          <Tab v-for="tab in tabs" :key="tab" :value="tab">
            {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
          </Tab>
        </TabList>

        <div class="mt-4 p-4 bg-secondary-background rounded-lg space-y-2">
          <p class="text-sm text-base-foreground">
            <strong>Current tab:</strong> {{ activeTab }}
          </p>
          <p class="text-sm text-base-foreground">
            <strong>Navigation history:</strong>
            <span class="text-muted-foreground">
              {{ history.length > 0 ? history.join(' → ') : 'None' }}
            </span>
          </p>
          <p class="text-xs text-muted-foreground mt-2">
            Click different tabs to see the navigation history
          </p>
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
    components: { TabList, Tab },
    setup() {
      const tab1 = ref('general')
      const tab2 = ref('nodes')
      return { tab1, tab2 }
    },
    template: `
      <div class="dark-theme bg-neutral-900 p-8 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-6">Dark Theme</h3>
        <div class="flex flex-col gap-6">
          <div>
            <div class="text-xs text-neutral-400 mb-2">Simple tabs</div>
            <TabList v-model="tab1">
              <Tab value="general">General</Tab>
              <Tab value="advanced">Advanced</Tab>
              <Tab value="settings">Settings</Tab>
            </TabList>
          </div>
          <div>
            <div class="text-xs text-neutral-400 mb-2">With icons</div>
            <TabList v-model="tab2">
              <Tab value="nodes">
                <i class="pi pi-box mr-2" />
                Nodes
              </Tab>
              <Tab value="models">
                <i class="pi pi-database mr-2" />
                Models
              </Tab>
              <Tab value="workflows">
                <i class="pi pi-folder mr-2" />
                Workflows
              </Tab>
            </TabList>
          </div>
        </div>
      </div>
    `
  })
}
