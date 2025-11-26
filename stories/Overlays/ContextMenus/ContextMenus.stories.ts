import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Badge from 'primevue/badge'
import ContextMenu from 'primevue/contextmenu'
import { ref } from 'vue'

/**
 * Context Menus
 *
 * Context menu components that appear on right-click or menu button interactions.
 * ComfyUI uses PrimeVue ContextMenu with custom menu item styles.
 *
 * Context Menu Types:
 * - Canvas: Right-click on graph canvas
 * - Node: Right-click on a node
 * - Job: Actions for queue jobs
 * - General: Standard context menus
 *
 * Menu Item Types:
 * - Basic: Label only
 * - With Icon: Icon + label
 * - With Shortcut: Label + keyboard shortcut
 * - With Submenu: Label + chevron
 * - With Badge: Label + badge (new, deprecated)
 * - Divider: Separator line
 *
 * Note: The actual context menus use stores and LiteGraph integration.
 * These stories demonstrate the visual patterns.
 */
const meta = {
  title: 'Overlays/ContextMenus',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Context menu components for right-click interactions. Uses PrimeVue ContextMenu with custom styling.'
      }
    }
  }
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic context menu
 */
export const BasicContextMenu: Story = {
  render: () => ({
    components: { ContextMenu },
    setup() {
      const menu = ref<InstanceType<typeof ContextMenu> | null>(null)
      const items = ref([
        { label: 'Edit', icon: 'pi pi-pencil' },
        { label: 'Duplicate', icon: 'pi pi-copy' },
        { separator: true },
        { label: 'Delete', icon: 'pi pi-trash' }
      ])
      const onRightClick = (event: MouseEvent) => {
        menu.value?.show(event)
      }
      return { menu, items, onRightClick }
    },
    template: `
      <div class="flex flex-col items-center gap-4">
        <div
          class="w-64 h-32 border-2 border-dashed border-neutral-300 rounded-lg flex items-center justify-center cursor-context-menu"
          @contextmenu.prevent="onRightClick"
        >
          <span class="text-sm text-muted-foreground">Right-click here</span>
        </div>
        <ContextMenu ref="menu" :model="items" />
      </div>
    `
  })
}

/**
 * Menu option item styles
 *
 * Visual demonstration of different menu item types.
 */
export const MenuItemStyles: Story = {
  render: () => ({
    components: { Badge },
    setup() {
      const options = [
        {
          type: 'item',
          label: 'Basic Item',
          icon: null,
          shortcut: null,
          badge: null
        },
        {
          type: 'item',
          label: 'With Icon',
          icon: 'pi pi-pencil',
          shortcut: null,
          badge: null
        },
        {
          type: 'item',
          label: 'With Shortcut',
          icon: 'pi pi-copy',
          shortcut: 'Ctrl+C',
          badge: null
        },
        {
          type: 'item',
          label: 'With Submenu',
          icon: 'pi pi-palette',
          shortcut: null,
          badge: null,
          hasSubmenu: true
        },
        {
          type: 'item',
          label: 'New Feature',
          icon: 'pi pi-sparkles',
          shortcut: null,
          badge: 'new'
        },
        {
          type: 'item',
          label: 'Old Feature',
          icon: 'pi pi-history',
          shortcut: null,
          badge: 'deprecated'
        },
        { type: 'divider' },
        {
          type: 'item',
          label: 'Danger Item',
          icon: 'pi pi-trash',
          shortcut: 'Del',
          badge: null,
          danger: true
        }
      ]
      return { options }
    },
    template: `
      <div class="w-64 rounded-lg border border-neutral-200 bg-white shadow-lg py-1">
        <template v-for="(option, index) in options" :key="index">
          <div v-if="option.type === 'divider'" class="my-1 h-px bg-neutral-200" />
          <div
            v-else
            class="group flex cursor-pointer items-center gap-2 rounded mx-1 px-3 py-1.5 text-left text-sm hover:bg-neutral-100"
            :class="{ 'text-red-600 hover:bg-red-50': option.danger }"
          >
            <i v-if="option.icon" :class="option.icon" class="w-4 h-4"></i>
            <span v-else class="w-4"></span>
            <span class="flex-1">{{ option.label }}</span>
            <span
              v-if="option.shortcut"
              class="flex h-3.5 min-w-3.5 items-center justify-center rounded bg-neutral-100 px-1 text-[10px] text-neutral-500"
            >
              {{ option.shortcut }}
            </span>
            <i
              v-if="option.hasSubmenu"
              class="pi pi-chevron-right text-xs opacity-60"
            ></i>
            <Badge
              v-if="option.badge === 'new'"
              value="NEW"
              severity="info"
              class="h-4 text-[9px] uppercase px-1"
            />
            <Badge
              v-if="option.badge === 'deprecated'"
              value="DEPRECATED"
              severity="secondary"
              class="h-4 text-[9px] uppercase px-1"
            />
          </div>
        </template>
      </div>
    `
  })
}

/**
 * Node context menu style
 *
 * Visual mockup of node right-click menu.
 */
export const NodeContextMenu: Story = {
  render: () => ({
    setup() {
      const menuItems = [
        { label: 'Properties', icon: 'pi pi-cog', shortcut: null },
        { label: 'Edit Title', icon: 'pi pi-pencil', shortcut: 'F2' },
        { type: 'divider' },
        { label: 'Bypass', icon: 'pi pi-ban', shortcut: 'Ctrl+B' },
        { label: 'Pin', icon: 'pi pi-thumbtack', shortcut: null },
        { label: 'Collapse', icon: 'pi pi-minus', shortcut: null },
        { type: 'divider' },
        {
          label: 'Colors',
          icon: 'pi pi-palette',
          shortcut: null,
          hasSubmenu: true
        },
        {
          label: 'Shapes',
          icon: 'pi pi-stop',
          shortcut: null,
          hasSubmenu: true
        },
        { type: 'divider' },
        { label: 'Clone', icon: 'pi pi-copy', shortcut: 'Ctrl+Shift+V' },
        { label: 'Copy', icon: 'pi pi-clone', shortcut: 'Ctrl+C' },
        { type: 'divider' },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          shortcut: 'Delete',
          danger: true
        }
      ]
      return { menuItems }
    },
    template: `
      <div class="flex gap-8">
        <!-- Mock node -->
        <div class="bg-neutral-800 rounded-lg w-48 relative">
          <div class="bg-purple-600 text-white px-3 py-1 rounded-t-lg text-sm font-medium">
            KSampler
          </div>
          <div class="p-3 text-neutral-300 text-xs">
            <div class="flex items-center gap-2 mb-1">
              <span class="w-2 h-2 rounded-full bg-purple-500"></span>
              <span>model</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-yellow-500"></span>
              <span>positive</span>
            </div>
          </div>
        </div>

        <!-- Context menu -->
        <div class="min-w-[200px] rounded-lg border border-neutral-200 bg-white shadow-lg py-1">
          <template v-for="(item, index) in menuItems" :key="index">
            <div v-if="item.type === 'divider'" class="my-1 h-px bg-neutral-200" />
            <div
              v-else
              class="flex items-center gap-2 mx-1 px-3 py-1.5 rounded text-sm cursor-pointer hover:bg-neutral-100"
              :class="{ 'text-red-600 hover:bg-red-50': item.danger }"
            >
              <i :class="item.icon" class="w-4 h-4"></i>
              <span class="flex-1">{{ item.label }}</span>
              <span
                v-if="item.shortcut"
                class="text-[10px] text-neutral-500 bg-neutral-100 px-1 rounded"
              >
                {{ item.shortcut }}
              </span>
              <i
                v-if="item.hasSubmenu"
                class="pi pi-chevron-right text-xs opacity-60"
              ></i>
            </div>
          </template>
        </div>
      </div>
    `
  })
}

/**
 * Canvas context menu style
 *
 * Visual mockup of canvas right-click menu (add node).
 */
export const CanvasContextMenu: Story = {
  render: () => ({
    setup() {
      const categories = [
        { label: 'Add Node', icon: 'pi pi-plus', hasSubmenu: true },
        { type: 'divider' },
        { label: 'Paste', icon: 'pi pi-paste', shortcut: 'Ctrl+V' },
        {
          label: 'Paste with Links',
          icon: 'pi pi-share-alt',
          shortcut: 'Ctrl+Shift+V'
        },
        { type: 'divider' },
        { label: 'Clear', icon: 'pi pi-eraser', shortcut: null },
        { label: 'Load Default', icon: 'pi pi-refresh', shortcut: null }
      ]
      return { categories }
    },
    template: `
      <div class="flex gap-8">
        <!-- Mock canvas area -->
        <div class="w-64 h-48 bg-neutral-900 rounded-lg flex items-center justify-center">
          <span class="text-neutral-600 text-sm">Canvas Area</span>
        </div>

        <!-- Context menu -->
        <div class="min-w-[180px] rounded-lg border border-neutral-200 bg-white shadow-lg py-1">
          <template v-for="(item, index) in categories" :key="index">
            <div v-if="item.type === 'divider'" class="my-1 h-px bg-neutral-200" />
            <div
              v-else
              class="flex items-center gap-2 mx-1 px-3 py-1.5 rounded text-sm cursor-pointer hover:bg-neutral-100"
            >
              <i :class="item.icon" class="w-4 h-4"></i>
              <span class="flex-1">{{ item.label }}</span>
              <span
                v-if="item.shortcut"
                class="text-[10px] text-neutral-500 bg-neutral-100 px-1 rounded"
              >
                {{ item.shortcut }}
              </span>
              <i
                v-if="item.hasSubmenu"
                class="pi pi-chevron-right text-xs opacity-60"
              ></i>
            </div>
          </template>
        </div>
      </div>
    `
  })
}

/**
 * Job context menu style
 *
 * Visual mockup of JobContextMenu component.
 */
export const JobContextMenu: Story = {
  render: () => ({
    setup() {
      const entries = [
        { key: 'cancel', label: 'Cancel Job', icon: 'pi pi-times' },
        { type: 'divider' },
        {
          key: 'loadInTab',
          label: 'Load in New Tab',
          icon: 'pi pi-external-link'
        },
        {
          key: 'loadCurrent',
          label: 'Load in Current Tab',
          icon: 'pi pi-file'
        },
        { key: 'copyId', label: 'Copy Job ID', icon: 'pi pi-copy' },
        { type: 'divider' },
        { key: 'delete', label: 'Delete', icon: 'pi pi-trash', danger: true }
      ]
      return { entries }
    },
    template: `
      <div class="flex gap-8">
        <!-- Mock job item -->
        <div class="w-48 p-3 bg-neutral-100 rounded-lg">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
            <span class="text-sm font-medium">Job #abc123</span>
          </div>
          <div class="text-xs text-neutral-500">
            Running • 00:32
          </div>
        </div>

        <!-- Context menu -->
        <div class="min-w-[14rem] rounded-lg border border-neutral-200 bg-white shadow-lg px-2 py-3">
          <template v-for="entry in entries" :key="entry.key || entry.type">
            <div v-if="entry.type === 'divider'" class="px-2 py-1">
              <div class="h-px bg-neutral-200"></div>
            </div>
            <button
              v-else
              class="w-full flex items-center gap-2 bg-transparent p-2 text-xs rounded hover:bg-neutral-100"
              :class="{ 'text-red-600 hover:bg-red-50': entry.danger }"
            >
              <i :class="entry.icon" class="w-4 h-4 shrink-0 text-neutral-500"></i>
              <span>{{ entry.label }}</span>
            </button>
          </template>
        </div>
      </div>
    `
  })
}

/**
 * Submenu expansion
 */
export const SubmenuExpansion: Story = {
  render: () => ({
    setup() {
      const mainMenu = [
        { label: 'Edit', icon: 'pi pi-pencil', shortcut: null },
        { label: 'Colors', icon: 'pi pi-palette', hasSubmenu: true },
        { label: 'Delete', icon: 'pi pi-trash', shortcut: 'Del' }
      ]
      const colorSubmenu = [
        { color: '#ff6b6b', label: 'Red' },
        { color: '#4ecdc4', label: 'Teal' },
        { color: '#45b7d1', label: 'Blue' },
        { color: '#96ceb4', label: 'Green' },
        { color: '#ffeaa7', label: 'Yellow' },
        { color: '#dfe6e9', label: 'Gray' }
      ]
      return { mainMenu, colorSubmenu }
    },
    template: `
      <div class="flex items-start gap-0">
        <!-- Main menu -->
        <div class="min-w-[160px] rounded-lg border border-neutral-200 bg-white shadow-lg py-1">
          <div
            v-for="(item, index) in mainMenu"
            :key="index"
            class="flex items-center gap-2 mx-1 px-3 py-1.5 rounded text-sm cursor-pointer"
            :class="item.hasSubmenu ? 'bg-neutral-100' : 'hover:bg-neutral-100'"
          >
            <i :class="item.icon" class="w-4 h-4"></i>
            <span class="flex-1">{{ item.label }}</span>
            <span
              v-if="item.shortcut"
              class="text-[10px] text-neutral-500 bg-neutral-100 px-1 rounded"
            >
              {{ item.shortcut }}
            </span>
            <i
              v-if="item.hasSubmenu"
              class="pi pi-chevron-right text-xs opacity-60"
            ></i>
          </div>
        </div>

        <!-- Color submenu (expanded) -->
        <div class="min-w-[120px] rounded-lg border border-neutral-200 bg-white shadow-lg py-1 ml-[-1px]">
          <div
            v-for="color in colorSubmenu"
            :key="color.label"
            class="flex items-center gap-2 mx-1 px-3 py-1.5 rounded text-sm cursor-pointer hover:bg-neutral-100"
          >
            <div
              class="w-4 h-4 rounded-full border border-neutral-300"
              :style="{ backgroundColor: color.color }"
            ></div>
            <span>{{ color.label }}</span>
          </div>
        </div>
      </div>
    `
  })
}

/**
 * With disabled items
 */
export const WithDisabledItems: Story = {
  render: () => ({
    setup() {
      const menuItems = [
        {
          label: 'Cut',
          icon: 'pi pi-cut',
          shortcut: 'Ctrl+X',
          disabled: false
        },
        {
          label: 'Copy',
          icon: 'pi pi-copy',
          shortcut: 'Ctrl+C',
          disabled: false
        },
        {
          label: 'Paste',
          icon: 'pi pi-paste',
          shortcut: 'Ctrl+V',
          disabled: true
        },
        { type: 'divider' },
        {
          label: 'Undo',
          icon: 'pi pi-undo',
          shortcut: 'Ctrl+Z',
          disabled: true
        },
        {
          label: 'Redo',
          icon: 'pi pi-refresh',
          shortcut: 'Ctrl+Y',
          disabled: true
        }
      ]
      return { menuItems }
    },
    template: `
      <div class="min-w-[180px] rounded-lg border border-neutral-200 bg-white shadow-lg py-1">
        <template v-for="(item, index) in menuItems" :key="index">
          <div v-if="item.type === 'divider'" class="my-1 h-px bg-neutral-200" />
          <div
            v-else
            class="flex items-center gap-2 mx-1 px-3 py-1.5 rounded text-sm"
            :class="item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-neutral-100'"
          >
            <i :class="item.icon" class="w-4 h-4"></i>
            <span class="flex-1">{{ item.label }}</span>
            <span
              v-if="item.shortcut"
              class="text-[10px] text-neutral-500 bg-neutral-100 px-1 rounded"
            >
              {{ item.shortcut }}
            </span>
          </div>
        </template>
      </div>
    `
  })
}

/**
 * Selection toolbox more options menu
 */
export const SelectionToolboxMenu: Story = {
  render: () => ({
    components: { Badge },
    setup() {
      const options = [
        { label: 'Properties Panel', icon: 'pi pi-cog', badge: null },
        { label: 'Edit Group', icon: 'pi pi-pencil', badge: null },
        { type: 'divider' },
        { label: 'Bypass', icon: 'pi pi-ban', shortcut: 'Ctrl+B', badge: null },
        { label: 'Pin', icon: 'pi pi-thumbtack', badge: null },
        { label: 'Collapse', icon: 'pi pi-minus', badge: null },
        { type: 'divider' },
        {
          label: 'Colors',
          icon: 'pi pi-palette',
          hasSubmenu: true,
          badge: null
        },
        { label: 'Shapes', icon: 'pi pi-stop', hasSubmenu: true, badge: null },
        { type: 'divider' },
        { label: 'Convert to Blueprint', icon: 'pi pi-box', badge: 'new' },
        {
          label: 'Convert to Group Node',
          icon: 'pi pi-objects-column',
          badge: 'deprecated'
        }
      ]
      return { options }
    },
    template: `
      <div class="min-w-[220px] rounded-lg border border-neutral-200 bg-neutral-800 shadow-lg py-1">
        <template v-for="(option, index) in options" :key="index">
          <div v-if="option.type === 'divider'" class="my-1 h-px bg-neutral-700" />
          <div
            v-else
            class="flex items-center gap-2 mx-1 px-3 py-1.5 rounded text-sm cursor-pointer text-neutral-100 hover:bg-neutral-700"
          >
            <i :class="option.icon" class="w-4 h-4 text-neutral-400"></i>
            <span class="flex-1">{{ option.label }}</span>
            <span
              v-if="option.shortcut"
              class="text-[10px] text-neutral-400 bg-neutral-700 px-1 rounded"
            >
              {{ option.shortcut }}
            </span>
            <i
              v-if="option.hasSubmenu"
              class="pi pi-chevron-right text-xs opacity-60"
            ></i>
            <Badge
              v-if="option.badge === 'new'"
              value="NEW"
              severity="info"
              class="h-4 text-[9px] uppercase px-1"
            />
            <Badge
              v-if="option.badge === 'deprecated'"
              value="DEPRECATED"
              severity="secondary"
              class="h-4 text-[9px] uppercase px-1 bg-neutral-600"
            />
          </div>
        </template>
      </div>
    `
  })
}

/**
 * Interactive context menu demo
 */
export const Interactive: Story = {
  render: () => ({
    components: { ContextMenu },
    setup() {
      const menu = ref<InstanceType<typeof ContextMenu> | null>(null)
      const selectedItem = ref<string | null>(null)
      const items = ref([
        {
          label: 'Edit',
          icon: 'pi pi-pencil',
          command: () => {
            selectedItem.value = 'Edit clicked'
          }
        },
        {
          label: 'Duplicate',
          icon: 'pi pi-copy',
          command: () => {
            selectedItem.value = 'Duplicate clicked'
          }
        },
        { separator: true },
        {
          label: 'Export',
          icon: 'pi pi-download',
          items: [
            {
              label: 'As JSON',
              command: () => {
                selectedItem.value = 'Export as JSON'
              }
            },
            {
              label: 'As PNG',
              command: () => {
                selectedItem.value = 'Export as PNG'
              }
            }
          ]
        },
        { separator: true },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: () => {
            selectedItem.value = 'Delete clicked'
          }
        }
      ])
      const onRightClick = (event: MouseEvent) => {
        menu.value?.show(event)
      }
      return { menu, items, selectedItem, onRightClick }
    },
    template: `
      <div class="flex flex-col items-center gap-4">
        <div
          class="w-64 h-32 border-2 border-dashed border-neutral-300 rounded-lg flex items-center justify-center cursor-context-menu"
          @contextmenu.prevent="onRightClick"
        >
          <span class="text-sm text-muted-foreground">Right-click here</span>
        </div>
        <ContextMenu ref="menu" :model="items" />
        <div v-if="selectedItem" class="text-sm p-2 bg-green-100 text-green-800 rounded">
          {{ selectedItem }}
        </div>
      </div>
    `
  })
}

/**
 * ComfyUI-specific context menu use cases
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    setup() {
      const nodeActions = [
        { label: 'Properties', icon: 'pi pi-cog' },
        { label: 'Bypass', icon: 'pi pi-ban', shortcut: 'Ctrl+B' },
        { type: 'divider' },
        { label: 'Copy', icon: 'pi pi-copy', shortcut: 'Ctrl+C' },
        { label: 'Clone', icon: 'pi pi-clone', shortcut: 'Ctrl+Shift+V' },
        { type: 'divider' },
        { label: 'Delete', icon: 'pi pi-trash', danger: true }
      ]

      const queueActions = [
        { label: 'Cancel Job', icon: 'pi pi-times' },
        { label: 'Move to Front', icon: 'pi pi-arrow-up' },
        { type: 'divider' },
        { label: 'Copy Job ID', icon: 'pi pi-copy' },
        { label: 'Load Workflow', icon: 'pi pi-file' },
        { type: 'divider' },
        { label: 'Delete', icon: 'pi pi-trash', danger: true }
      ]

      const modelActions = [
        { label: 'Use in Workflow', icon: 'pi pi-plus' },
        { label: 'Show in Folder', icon: 'pi pi-folder-open' },
        { type: 'divider' },
        { label: 'Copy Path', icon: 'pi pi-copy' },
        { label: 'Rename', icon: 'pi pi-pencil' },
        { type: 'divider' },
        { label: 'Delete', icon: 'pi pi-trash', danger: true }
      ]

      return { nodeActions, queueActions, modelActions }
    },
    template: `
      <div class="grid grid-cols-3 gap-8">
        <div>
          <h4 class="text-sm font-semibold mb-3">Node Actions</h4>
          <div class="min-w-[180px] rounded-lg border border-neutral-200 bg-white shadow-lg py-1">
            <template v-for="(item, index) in nodeActions" :key="index">
              <div v-if="item.type === 'divider'" class="my-1 h-px bg-neutral-200" />
              <div
                v-else
                class="flex items-center gap-2 mx-1 px-3 py-1.5 rounded text-sm cursor-pointer hover:bg-neutral-100"
                :class="{ 'text-red-600 hover:bg-red-50': item.danger }"
              >
                <i :class="item.icon" class="w-4 h-4"></i>
                <span class="flex-1">{{ item.label }}</span>
                <span
                  v-if="item.shortcut"
                  class="text-[10px] text-neutral-500 bg-neutral-100 px-1 rounded"
                >
                  {{ item.shortcut }}
                </span>
              </div>
            </template>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-semibold mb-3">Queue Actions</h4>
          <div class="min-w-[180px] rounded-lg border border-neutral-200 bg-white shadow-lg py-1">
            <template v-for="(item, index) in queueActions" :key="index">
              <div v-if="item.type === 'divider'" class="my-1 h-px bg-neutral-200" />
              <div
                v-else
                class="flex items-center gap-2 mx-1 px-3 py-1.5 rounded text-sm cursor-pointer hover:bg-neutral-100"
                :class="{ 'text-red-600 hover:bg-red-50': item.danger }"
              >
                <i :class="item.icon" class="w-4 h-4"></i>
                <span class="flex-1">{{ item.label }}</span>
              </div>
            </template>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-semibold mb-3">Model Actions</h4>
          <div class="min-w-[180px] rounded-lg border border-neutral-200 bg-white shadow-lg py-1">
            <template v-for="(item, index) in modelActions" :key="index">
              <div v-if="item.type === 'divider'" class="my-1 h-px bg-neutral-200" />
              <div
                v-else
                class="flex items-center gap-2 mx-1 px-3 py-1.5 rounded text-sm cursor-pointer hover:bg-neutral-100"
                :class="{ 'text-red-600 hover:bg-red-50': item.danger }"
              >
                <i :class="item.icon" class="w-4 h-4"></i>
                <span class="flex-1">{{ item.label }}</span>
              </div>
            </template>
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
    setup() {
      const menuItems = [
        { label: 'Properties', icon: 'pi pi-cog' },
        { label: 'Bypass', icon: 'pi pi-ban', shortcut: 'Ctrl+B' },
        { type: 'divider' },
        { label: 'Colors', icon: 'pi pi-palette', hasSubmenu: true },
        { type: 'divider' },
        { label: 'Delete', icon: 'pi pi-trash', danger: true }
      ]
      return { menuItems }
    },
    template: `
      <div class="dark-theme bg-neutral-900 p-8 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-4">Dark Theme Context Menu</h3>
        <div class="min-w-[180px] rounded-lg border border-neutral-700 bg-neutral-800 shadow-lg py-1">
          <template v-for="(item, index) in menuItems" :key="index">
            <div v-if="item.type === 'divider'" class="my-1 h-px bg-neutral-700" />
            <div
              v-else
              class="flex items-center gap-2 mx-1 px-3 py-1.5 rounded text-sm cursor-pointer hover:bg-neutral-700"
              :class="item.danger ? 'text-red-400 hover:bg-red-900/30' : 'text-neutral-100'"
            >
              <i :class="item.icon" class="w-4 h-4 text-neutral-400"></i>
              <span class="flex-1">{{ item.label }}</span>
              <span
                v-if="item.shortcut"
                class="text-[10px] text-neutral-500 bg-neutral-700 px-1 rounded"
              >
                {{ item.shortcut }}
              </span>
              <i
                v-if="item.hasSubmenu"
                class="pi pi-chevron-right text-xs opacity-60"
              ></i>
            </div>
          </template>
        </div>
      </div>
    `
  })
}
