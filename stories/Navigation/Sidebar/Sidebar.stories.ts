import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

/**
 * Sidebar
 *
 * The sidebar navigation system provides access to main application features
 * through icon-based navigation. It consists of SideToolbar (container) and
 * SidebarIcon (individual buttons).
 *
 * Components:
 * - SideToolbar: Main container with top/bottom sections
 * - SidebarIcon: Individual navigation button with icon, label, badge support
 *
 * SidebarIcon Props:
 * - `icon`: string | Component - icon class or Vue component
 * - `selected`: boolean - active state
 * - `tooltip`: string - hover tooltip text
 * - `tooltipSuffix`: string - keyboard shortcut suffix
 * - `iconBadge`: string | function - badge content
 * - `label`: string - text label below icon
 * - `isSmall`: boolean - compact mode
 *
 * Features:
 * - Two layout styles: connected and floating
 * - Two sizes: default and small
 * - Badge indicators for notifications
 * - Selected state indication
 * - Keyboard shortcut hints in tooltips
 *
 * Note: SideToolbar has store dependencies (workspaceStore, settingStore).
 * These stories demonstrate the visual patterns using mocked components.
 */
const meta: Meta = {
  title: 'Navigation/Sidebar',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Sidebar navigation with icon buttons for accessing main app features. Supports connected/floating styles, badges, selected states, and keyboard shortcut tooltips.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Mock sidebar icon component for stories
const MockSidebarIcon = {
  props: {
    icon: { type: String, default: '' },
    selected: { type: Boolean, default: false },
    label: { type: String, default: '' },
    badge: { type: String, default: '' },
    isSmall: { type: Boolean, default: false }
  },
  emits: ['click'],
  template: `
    <button
      class="sidebar-icon flex flex-col items-center justify-center cursor-pointer transition-colors"
      :class="{
        'sidebar-icon-selected': selected,
        'sidebar-icon-small': isSmall,
        'w-12 h-14': !isSmall,
        'w-12 h-12': isSmall
      }"
      @click="$emit('click', $event)"
    >
      <div class="relative">
        <i :class="[icon, 'text-base']" />
        <span
          v-if="badge"
          class="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center"
        >
          {{ badge }}
        </span>
      </div>
      <span v-if="label && !isSmall" class="text-[10px] mt-1 text-center leading-none">
        {{ label }}
      </span>
    </button>
  `
}

// Sidebar styling
const sidebarStyles = `
  .sidebar-container {
    background-color: var(--comfy-menu-bg, #1a1a1a);
    border: 1px solid var(--interface-stroke, #333);
  }
  .sidebar-icon {
    color: var(--text-secondary, #888);
  }
  .sidebar-icon:hover {
    background-color: var(--interface-panel-hover-surface, rgba(255,255,255,0.1));
    color: var(--content-hover-fg, #fff);
  }
  .sidebar-icon-selected {
    background-color: var(--interface-panel-selected-surface, rgba(255,255,255,0.15));
    color: var(--content-hover-fg, #fff);
    border-left: 4px solid var(--p-button-text-primary-color, #3b82f6);
  }
  .floating-sidebar {
    border-radius: 8px;
    padding: 4px;
  }
  .connected-sidebar {
    border-radius: 0;
    border-left: none;
    border-top: none;
    border-bottom: none;
  }
`

/**
 * Default sidebar with common navigation items
 */
export const Default: Story = {
  render: () => ({
    components: { MockSidebarIcon },
    setup() {
      const selectedTab = ref('nodes')
      return { selectedTab }
    },
    template: `
      <style>${sidebarStyles}</style>
      <div class="sidebar-container floating-sidebar flex flex-col">
        <MockSidebarIcon
          icon="pi pi-box"
          label="Nodes"
          :selected="selectedTab === 'nodes'"
          @click="selectedTab = 'nodes'"
        />
        <MockSidebarIcon
          icon="pi pi-database"
          label="Models"
          :selected="selectedTab === 'models'"
          @click="selectedTab = 'models'"
        />
        <MockSidebarIcon
          icon="pi pi-folder"
          label="Files"
          :selected="selectedTab === 'files'"
          @click="selectedTab = 'files'"
        />
        <MockSidebarIcon
          icon="pi pi-images"
          label="Gallery"
          :selected="selectedTab === 'gallery'"
          @click="selectedTab = 'gallery'"
        />
      </div>
    `
  })
}

/**
 * Sidebar with badge indicators
 */
export const WithBadges: Story = {
  render: () => ({
    components: { MockSidebarIcon },
    setup() {
      const selectedTab = ref('queue')
      return { selectedTab }
    },
    template: `
      <style>${sidebarStyles}</style>
      <div class="sidebar-container floating-sidebar flex flex-col">
        <MockSidebarIcon
          icon="pi pi-box"
          label="Nodes"
          :selected="selectedTab === 'nodes'"
          @click="selectedTab = 'nodes'"
        />
        <MockSidebarIcon
          icon="pi pi-list"
          label="Queue"
          badge="3"
          :selected="selectedTab === 'queue'"
          @click="selectedTab = 'queue'"
        />
        <MockSidebarIcon
          icon="pi pi-bell"
          label="Alerts"
          badge="!"
          :selected="selectedTab === 'alerts'"
          @click="selectedTab = 'alerts'"
        />
      </div>
      <p class="mt-4 text-sm text-muted-foreground">
        Badges show pending items or notifications
      </p>
    `
  })
}

/**
 * Small sidebar variant
 */
export const SmallSize: Story = {
  render: () => ({
    components: { MockSidebarIcon },
    setup() {
      const selectedTab = ref('nodes')
      return { selectedTab }
    },
    template: `
      <style>${sidebarStyles}</style>
      <div class="flex gap-8 items-start">
        <div>
          <div class="text-xs text-muted-foreground mb-2">Default size</div>
          <div class="sidebar-container floating-sidebar flex flex-col">
            <MockSidebarIcon
              icon="pi pi-box"
              label="Nodes"
              :selected="selectedTab === 'nodes'"
              @click="selectedTab = 'nodes'"
            />
            <MockSidebarIcon
              icon="pi pi-database"
              label="Models"
              :selected="selectedTab === 'models'"
              @click="selectedTab = 'models'"
            />
            <MockSidebarIcon
              icon="pi pi-folder"
              label="Files"
              :selected="selectedTab === 'files'"
              @click="selectedTab = 'files'"
            />
          </div>
        </div>
        <div>
          <div class="text-xs text-muted-foreground mb-2">Small size</div>
          <div class="sidebar-container floating-sidebar flex flex-col">
            <MockSidebarIcon
              icon="pi pi-box"
              is-small
              :selected="selectedTab === 'nodes'"
              @click="selectedTab = 'nodes'"
            />
            <MockSidebarIcon
              icon="pi pi-database"
              is-small
              :selected="selectedTab === 'models'"
              @click="selectedTab = 'models'"
            />
            <MockSidebarIcon
              icon="pi pi-folder"
              is-small
              :selected="selectedTab === 'files'"
              @click="selectedTab = 'files'"
            />
          </div>
        </div>
      </div>
    `
  })
}

/**
 * Connected sidebar style (attached to edge)
 */
export const ConnectedStyle: Story = {
  render: () => ({
    components: { MockSidebarIcon },
    setup() {
      const selectedTab = ref('nodes')
      return { selectedTab }
    },
    template: `
      <style>${sidebarStyles}</style>
      <div class="flex gap-8 items-start">
        <div>
          <div class="text-xs text-muted-foreground mb-2">Floating</div>
          <div class="sidebar-container floating-sidebar flex flex-col">
            <MockSidebarIcon
              icon="pi pi-box"
              label="Nodes"
              :selected="selectedTab === 'nodes'"
              @click="selectedTab = 'nodes'"
            />
            <MockSidebarIcon
              icon="pi pi-database"
              label="Models"
            />
            <MockSidebarIcon
              icon="pi pi-folder"
              label="Files"
            />
          </div>
        </div>
        <div>
          <div class="text-xs text-muted-foreground mb-2">Connected</div>
          <div class="sidebar-container connected-sidebar flex flex-col">
            <MockSidebarIcon
              icon="pi pi-box"
              label="Nodes"
              :selected="selectedTab === 'nodes'"
              @click="selectedTab = 'nodes'"
            />
            <MockSidebarIcon
              icon="pi pi-database"
              label="Models"
            />
            <MockSidebarIcon
              icon="pi pi-folder"
              label="Files"
            />
          </div>
        </div>
      </div>
      <p class="mt-4 text-sm text-muted-foreground">
        Connected style attaches directly to window edge
      </p>
    `
  })
}

/**
 * Full sidebar layout with top and bottom sections
 */
export const FullLayout: Story = {
  render: () => ({
    components: { MockSidebarIcon },
    setup() {
      const selectedTab = ref('nodes')
      return { selectedTab }
    },
    template: `
      <style>${sidebarStyles}</style>
      <div class="sidebar-container floating-sidebar flex flex-col h-[400px]">
        <!-- Top section -->
        <div class="flex flex-col">
          <MockSidebarIcon
            icon="pi pi-bars"
            label="Menu"
          />
          <MockSidebarIcon
            icon="pi pi-box"
            label="Nodes"
            :selected="selectedTab === 'nodes'"
            @click="selectedTab = 'nodes'"
          />
          <MockSidebarIcon
            icon="pi pi-database"
            label="Models"
            :selected="selectedTab === 'models'"
            @click="selectedTab = 'models'"
          />
          <MockSidebarIcon
            icon="pi pi-folder"
            label="Files"
            :selected="selectedTab === 'files'"
            @click="selectedTab = 'files'"
          />
          <MockSidebarIcon
            icon="pi pi-images"
            label="Gallery"
            :selected="selectedTab === 'gallery'"
            @click="selectedTab = 'gallery'"
          />
          <MockSidebarIcon
            icon="pi pi-th-large"
            label="Templates"
          />
        </div>

        <!-- Spacer -->
        <div class="flex-1" />

        <!-- Bottom section -->
        <div class="flex flex-col border-t border-[var(--interface-stroke,#333)]">
          <MockSidebarIcon
            icon="pi pi-question-circle"
            label="Help"
          />
          <MockSidebarIcon
            icon="pi pi-terminal"
            label="Logs"
          />
          <MockSidebarIcon
            icon="pi pi-keyboard"
            label="Keys"
          />
          <MockSidebarIcon
            icon="pi pi-cog"
            label="Settings"
          />
        </div>
      </div>
    `
  })
}

/**
 * Interactive sidebar with state management
 */
export const Interactive: Story = {
  render: () => ({
    components: { MockSidebarIcon },
    setup() {
      const selectedTab = ref('nodes')
      const tabs = [
        { id: 'nodes', icon: 'pi pi-box', label: 'Nodes' },
        { id: 'models', icon: 'pi pi-database', label: 'Models' },
        { id: 'files', icon: 'pi pi-folder', label: 'Files' },
        { id: 'gallery', icon: 'pi pi-images', label: 'Gallery' }
      ]
      const clickHistory = ref<string[]>([])

      const handleClick = (tabId: string) => {
        selectedTab.value = tabId
        clickHistory.value.push(tabId)
        if (clickHistory.value.length > 5) {
          clickHistory.value.shift()
        }
      }

      return { selectedTab, tabs, clickHistory, handleClick }
    },
    template: `
      <style>${sidebarStyles}</style>
      <div class="flex gap-8 items-start">
        <div class="sidebar-container floating-sidebar flex flex-col">
          <MockSidebarIcon
            v-for="tab in tabs"
            :key="tab.id"
            :icon="tab.icon"
            :label="tab.label"
            :selected="selectedTab === tab.id"
            @click="handleClick(tab.id)"
          />
        </div>

        <div class="p-4 bg-secondary-background rounded-lg min-w-[200px]">
          <p class="text-sm text-base-foreground mb-2">
            <strong>Selected:</strong> {{ selectedTab }}
          </p>
          <p class="text-sm text-base-foreground mb-2">
            <strong>History:</strong>
          </p>
          <p class="text-xs text-muted-foreground">
            {{ clickHistory.length > 0 ? clickHistory.join(' → ') : 'None' }}
          </p>
        </div>
      </div>
    `
  })
}

/**
 * ComfyUI sidebar use cases
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: { MockSidebarIcon },
    setup() {
      const nodeLibTab = ref('nodes')
      return { nodeLibTab }
    },
    template: `
      <style>${sidebarStyles}</style>
      <div class="flex flex-col gap-8 w-full max-w-2xl">
        <!-- Main navigation -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Main Navigation</h3>
          <div class="flex gap-4 items-start">
            <div class="sidebar-container floating-sidebar flex flex-col">
              <MockSidebarIcon icon="pi pi-bars" label="Menu" />
              <MockSidebarIcon icon="pi pi-box" label="Nodes" :selected="nodeLibTab === 'nodes'" />
              <MockSidebarIcon icon="pi pi-database" label="Models" />
              <MockSidebarIcon icon="pi pi-folder" label="Files" />
              <MockSidebarIcon icon="pi pi-images" label="Gallery" />
            </div>
            <div class="p-4 bg-secondary-background rounded-lg flex-1">
              <p class="text-sm text-muted-foreground">
                Main sidebar provides access to Node Library, Model Browser, File Manager, and Asset Gallery
              </p>
            </div>
          </div>
        </div>

        <!-- Queue with badge -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Queue Notifications</h3>
          <div class="flex gap-4 items-start">
            <div class="sidebar-container floating-sidebar flex flex-col">
              <MockSidebarIcon icon="pi pi-box" label="Nodes" />
              <MockSidebarIcon icon="pi pi-list" label="Queue" badge="5" :selected="true" />
            </div>
            <div class="p-4 bg-secondary-background rounded-lg flex-1">
              <p class="text-sm text-muted-foreground">
                Badge shows number of items in queue. Selected state indicates the panel is open.
              </p>
            </div>
          </div>
        </div>

        <!-- Bottom utilities -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Utility Buttons</h3>
          <div class="flex gap-4 items-start">
            <div class="sidebar-container floating-sidebar flex flex-col">
              <MockSidebarIcon icon="pi pi-question-circle" label="Help" />
              <MockSidebarIcon icon="pi pi-terminal" label="Logs" />
              <MockSidebarIcon icon="pi pi-keyboard" label="Keys" />
              <MockSidebarIcon icon="pi pi-cog" label="Settings" />
            </div>
            <div class="p-4 bg-secondary-background rounded-lg flex-1">
              <p class="text-sm text-muted-foreground">
                Bottom section contains Help Center, Console Logs, Keyboard Shortcuts, and Settings
              </p>
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
    components: { MockSidebarIcon },
    setup() {
      const selectedTab = ref('nodes')
      return { selectedTab }
    },
    template: `
      <style>${sidebarStyles}</style>
      <div class="dark-theme bg-neutral-900 p-8 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-6">Dark Theme</h3>
        <div class="flex gap-8">
          <div>
            <div class="text-xs text-neutral-400 mb-2">Floating</div>
            <div class="sidebar-container floating-sidebar flex flex-col">
              <MockSidebarIcon
                icon="pi pi-box"
                label="Nodes"
                :selected="selectedTab === 'nodes'"
                @click="selectedTab = 'nodes'"
              />
              <MockSidebarIcon
                icon="pi pi-database"
                label="Models"
                :selected="selectedTab === 'models'"
                @click="selectedTab = 'models'"
              />
              <MockSidebarIcon
                icon="pi pi-folder"
                label="Files"
              />
              <MockSidebarIcon
                icon="pi pi-list"
                label="Queue"
                badge="3"
              />
            </div>
          </div>

          <div>
            <div class="text-xs text-neutral-400 mb-2">Small size</div>
            <div class="sidebar-container floating-sidebar flex flex-col">
              <MockSidebarIcon
                icon="pi pi-box"
                is-small
                :selected="selectedTab === 'nodes'"
              />
              <MockSidebarIcon
                icon="pi pi-database"
                is-small
                :selected="selectedTab === 'models'"
              />
              <MockSidebarIcon
                icon="pi pi-folder"
                is-small
              />
              <MockSidebarIcon
                icon="pi pi-list"
                is-small
                badge="3"
              />
            </div>
          </div>
        </div>
      </div>
    `
  })
}
