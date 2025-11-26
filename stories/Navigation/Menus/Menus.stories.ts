import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

/**
 * Menus
 *
 * Context menus and dropdown menus used throughout ComfyUI for
 * providing contextual actions on right-click or button click.
 *
 * Components:
 * - MenuOptionItem: Individual menu item with icon, label, shortcut, badge
 * - GraphCanvasMenu: Context menu for canvas right-click
 * - JobContextMenu: Context menu for queue items
 *
 * Menu Item Features:
 * - Icons for visual identification
 * - Keyboard shortcut hints
 * - Submenu indicator
 * - Badge for new/deprecated items
 * - Divider support
 * - Hover state
 *
 * Note: Context menus use PrimeVue's Menu and ContextMenu components
 * with custom styling. These stories demonstrate the visual patterns.
 */
const meta: Meta = {
  title: 'Navigation/Menus',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Context menus and dropdown menus for contextual actions. Supports icons, keyboard shortcuts, badges, submenus, and dividers.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Mock menu item component matching ComfyUI's MenuOptionItem
const MockMenuItem = {
  props: {
    icon: { type: String, default: '' },
    label: { type: String, required: true },
    shortcut: { type: String, default: '' },
    hasSubmenu: { type: Boolean, default: false },
    badge: { type: String, default: '' },
    disabled: { type: Boolean, default: false }
  },
  emits: ['click'],
  template: `
    <div
      role="button"
      class="menu-item group flex cursor-pointer items-center gap-2 rounded px-3 py-1.5 text-left text-sm"
      :class="{
        'text-text-primary hover:bg-interface-menu-component-surface-hovered': !disabled,
        'text-text-disabled cursor-not-allowed': disabled
      }"
      @click="!disabled && $emit('click')"
    >
      <i v-if="icon" :class="[icon, 'h-4 w-4']" />
      <span class="flex-1">{{ label }}</span>
      <span
        v-if="shortcut"
        class="flex h-3.5 min-w-3.5 items-center justify-center rounded bg-interface-menu-keybind-surface-default px-1 py-0 text-[10px]"
      >
        {{ shortcut }}
      </span>
      <i v-if="hasSubmenu" class="pi pi-angle-right opacity-60 text-xs" />
      <span
        v-if="badge === 'new'"
        class="h-4 px-1 text-[9px] uppercase rounded-full bg-blue-500 text-white flex items-center"
      >
        New
      </span>
      <span
        v-if="badge === 'deprecated'"
        class="h-4 px-1 text-[9px] uppercase rounded-full bg-neutral-600 text-white flex items-center"
      >
        Deprecated
      </span>
    </div>
  `
}

// Menu divider component
const MockMenuDivider = {
  template: `<div class="my-1 h-px bg-border-default" />`
}

// Menu container styling
const menuStyles = `
  .menu-container {
    background-color: var(--comfy-menu-bg, #1a1a1a);
    border: 1px solid var(--interface-stroke, #333);
    border-radius: 8px;
    padding: 4px;
    min-width: 200px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
  .menu-item {
    color: var(--text-primary, #fff);
  }
  .menu-item:hover:not(.text-text-disabled) {
    background-color: var(--interface-menu-component-surface-hovered, rgba(255,255,255,0.1));
  }
`

/**
 * Default context menu with common actions
 */
export const Default: Story = {
  render: () => ({
    components: { MockMenuItem, MockMenuDivider },
    template: `
      <style>${menuStyles}</style>
      <div class="menu-container">
        <MockMenuItem icon="pi pi-copy" label="Copy" shortcut="Ctrl+C" />
        <MockMenuItem icon="pi pi-paste" label="Paste" shortcut="Ctrl+V" />
        <MockMenuItem icon="pi pi-clone" label="Duplicate" shortcut="Ctrl+D" />
        <MockMenuDivider />
        <MockMenuItem icon="pi pi-trash" label="Delete" shortcut="Del" />
      </div>
    `
  })
}

/**
 * Menu with icons
 */
export const WithIcons: Story = {
  render: () => ({
    components: { MockMenuItem, MockMenuDivider },
    template: `
      <style>${menuStyles}</style>
      <div class="menu-container">
        <MockMenuItem icon="pi pi-file" label="New File" />
        <MockMenuItem icon="pi pi-folder-open" label="Open" />
        <MockMenuItem icon="pi pi-save" label="Save" />
        <MockMenuItem icon="pi pi-download" label="Export" />
        <MockMenuDivider />
        <MockMenuItem icon="pi pi-cog" label="Settings" />
      </div>
    `
  })
}

/**
 * Menu with keyboard shortcuts
 */
export const WithShortcuts: Story = {
  render: () => ({
    components: { MockMenuItem, MockMenuDivider },
    template: `
      <style>${menuStyles}</style>
      <div class="menu-container">
        <MockMenuItem icon="pi pi-undo" label="Undo" shortcut="Ctrl+Z" />
        <MockMenuItem icon="pi pi-refresh" label="Redo" shortcut="Ctrl+Y" />
        <MockMenuDivider />
        <MockMenuItem icon="pi pi-copy" label="Copy" shortcut="Ctrl+C" />
        <MockMenuItem icon="pi pi-clipboard" label="Paste" shortcut="Ctrl+V" />
        <MockMenuItem icon="pi pi-times" label="Cut" shortcut="Ctrl+X" />
        <MockMenuDivider />
        <MockMenuItem icon="pi pi-check-circle" label="Select All" shortcut="Ctrl+A" />
      </div>
      <p class="mt-4 text-sm text-muted-foreground">
        Keyboard shortcuts displayed on the right side
      </p>
    `
  })
}

/**
 * Menu with submenu indicators
 */
export const WithSubmenus: Story = {
  render: () => ({
    components: { MockMenuItem, MockMenuDivider },
    template: `
      <style>${menuStyles}</style>
      <div class="menu-container">
        <MockMenuItem icon="pi pi-file" label="New" :has-submenu="true" />
        <MockMenuItem icon="pi pi-folder-open" label="Recent Files" :has-submenu="true" />
        <MockMenuDivider />
        <MockMenuItem icon="pi pi-share-alt" label="Export As" :has-submenu="true" />
        <MockMenuItem icon="pi pi-cog" label="Preferences" :has-submenu="true" />
      </div>
      <p class="mt-4 text-sm text-muted-foreground">
        Chevron icon indicates submenu available on hover
      </p>
    `
  })
}

/**
 * Menu with badges for new/deprecated items
 */
export const WithBadges: Story = {
  render: () => ({
    components: { MockMenuItem, MockMenuDivider },
    template: `
      <style>${menuStyles}</style>
      <div class="menu-container">
        <MockMenuItem icon="pi pi-sparkles" label="AI Assist" badge="new" />
        <MockMenuItem icon="pi pi-bolt" label="Quick Actions" badge="new" />
        <MockMenuDivider />
        <MockMenuItem icon="pi pi-box" label="Node Manager" />
        <MockMenuItem icon="pi pi-database" label="Model Manager" />
        <MockMenuDivider />
        <MockMenuItem icon="pi pi-code" label="Legacy Mode" badge="deprecated" />
      </div>
    `
  })
}

/**
 * Menu with disabled items
 */
export const WithDisabledItems: Story = {
  render: () => ({
    components: { MockMenuItem, MockMenuDivider },
    template: `
      <style>${menuStyles}</style>
      <div class="menu-container">
        <MockMenuItem icon="pi pi-copy" label="Copy" shortcut="Ctrl+C" />
        <MockMenuItem icon="pi pi-paste" label="Paste" shortcut="Ctrl+V" :disabled="true" />
        <MockMenuDivider />
        <MockMenuItem icon="pi pi-undo" label="Undo" shortcut="Ctrl+Z" :disabled="true" />
        <MockMenuItem icon="pi pi-refresh" label="Redo" shortcut="Ctrl+Y" :disabled="true" />
        <MockMenuDivider />
        <MockMenuItem icon="pi pi-trash" label="Delete" shortcut="Del" />
      </div>
      <p class="mt-4 text-sm text-muted-foreground">
        Disabled items shown with reduced opacity
      </p>
    `
  })
}

/**
 * Interactive menu with click handling
 */
export const Interactive: Story = {
  render: () => ({
    components: { MockMenuItem, MockMenuDivider },
    setup() {
      const lastAction = ref('')
      const handleAction = (action: string) => {
        lastAction.value = action
      }
      return { lastAction, handleAction }
    },
    template: `
      <style>${menuStyles}</style>
      <div class="flex gap-8 items-start">
        <div class="menu-container">
          <MockMenuItem icon="pi pi-copy" label="Copy" @click="handleAction('Copy')" />
          <MockMenuItem icon="pi pi-paste" label="Paste" @click="handleAction('Paste')" />
          <MockMenuItem icon="pi pi-clone" label="Duplicate" @click="handleAction('Duplicate')" />
          <MockMenuDivider />
          <MockMenuItem icon="pi pi-trash" label="Delete" @click="handleAction('Delete')" />
        </div>

        <div class="p-4 bg-secondary-background rounded-lg min-w-[200px]">
          <p class="text-sm text-base-foreground">
            <strong>Last action:</strong> {{ lastAction || 'None' }}
          </p>
          <p class="text-xs text-muted-foreground mt-2">
            Click menu items to see the action
          </p>
        </div>
      </div>
    `
  })
}

/**
 * ComfyUI context menu use cases
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: { MockMenuItem, MockMenuDivider },
    template: `
      <style>${menuStyles}</style>
      <div class="flex flex-col gap-8 w-full max-w-2xl">
        <!-- Node context menu -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Node Context Menu</h3>
          <div class="menu-container w-fit">
            <MockMenuItem icon="pi pi-copy" label="Copy" shortcut="Ctrl+C" />
            <MockMenuItem icon="pi pi-clone" label="Duplicate" shortcut="Ctrl+D" />
            <MockMenuDivider />
            <MockMenuItem icon="pi pi-palette" label="Colors" :has-submenu="true" />
            <MockMenuItem icon="pi pi-lock" label="Pin Node" />
            <MockMenuItem icon="pi pi-eye-slash" label="Bypass" shortcut="Ctrl+B" />
            <MockMenuDivider />
            <MockMenuItem icon="pi pi-trash" label="Delete" shortcut="Del" />
          </div>
          <p class="mt-2 text-xs text-muted-foreground">
            Right-click on a node to see this menu
          </p>
        </div>

        <!-- Canvas context menu -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Canvas Context Menu</h3>
          <div class="menu-container w-fit">
            <MockMenuItem icon="pi pi-search" label="Search Nodes" shortcut="Space" />
            <MockMenuItem icon="pi pi-paste" label="Paste" shortcut="Ctrl+V" />
            <MockMenuDivider />
            <MockMenuItem icon="pi pi-box" label="Add Group" />
            <MockMenuItem icon="pi pi-comment" label="Add Note" />
            <MockMenuDivider />
            <MockMenuItem icon="pi pi-arrows-alt" label="Fit View" shortcut="H" />
            <MockMenuItem icon="pi pi-expand" label="Reset Zoom" shortcut="1" />
          </div>
          <p class="mt-2 text-xs text-muted-foreground">
            Right-click on empty canvas area
          </p>
        </div>

        <!-- Workflow tab menu -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Workflow Tab Menu</h3>
          <div class="menu-container w-fit">
            <MockMenuItem icon="pi pi-clone" label="Duplicate Tab" />
            <MockMenuDivider />
            <MockMenuItem icon="pi pi-times" label="Close Tab" />
            <MockMenuItem label="Close Tabs to Left" />
            <MockMenuItem label="Close Tabs to Right" />
            <MockMenuItem label="Close Other Tabs" />
            <MockMenuDivider />
            <MockMenuItem icon="pi pi-bookmark" label="Add to Bookmarks" />
          </div>
          <p class="mt-2 text-xs text-muted-foreground">
            Right-click on workflow tab
          </p>
        </div>

        <!-- Queue item menu -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Queue Item Menu</h3>
          <div class="menu-container w-fit">
            <MockMenuItem icon="pi pi-eye" label="View Details" />
            <MockMenuItem icon="pi pi-download" label="Load Workflow" />
            <MockMenuDivider />
            <MockMenuItem icon="pi pi-arrow-up" label="Move to Top" />
            <MockMenuItem icon="pi pi-arrow-down" label="Move to Bottom" />
            <MockMenuDivider />
            <MockMenuItem icon="pi pi-times-circle" label="Cancel" />
            <MockMenuItem icon="pi pi-trash" label="Delete" />
          </div>
          <p class="mt-2 text-xs text-muted-foreground">
            Right-click on queue item
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
    components: { MockMenuItem, MockMenuDivider },
    template: `
      <style>${menuStyles}</style>
      <div class="dark-theme bg-neutral-900 p-8 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-6">Dark Theme</h3>
        <div class="flex gap-8">
          <div>
            <div class="text-xs text-neutral-400 mb-2">Basic menu</div>
            <div class="menu-container">
              <MockMenuItem icon="pi pi-copy" label="Copy" shortcut="Ctrl+C" />
              <MockMenuItem icon="pi pi-paste" label="Paste" shortcut="Ctrl+V" />
              <MockMenuDivider />
              <MockMenuItem icon="pi pi-trash" label="Delete" />
            </div>
          </div>

          <div>
            <div class="text-xs text-neutral-400 mb-2">With badges</div>
            <div class="menu-container">
              <MockMenuItem icon="pi pi-sparkles" label="AI Assist" badge="new" />
              <MockMenuItem icon="pi pi-box" label="Node Manager" />
              <MockMenuDivider />
              <MockMenuItem icon="pi pi-cog" label="Settings" :has-submenu="true" />
            </div>
          </div>
        </div>
      </div>
    `
  })
}
