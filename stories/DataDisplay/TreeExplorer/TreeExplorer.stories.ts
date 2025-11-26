import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Tree from 'primevue/tree'
import { ref } from 'vue'

/**
 * TreeExplorer is a hierarchical tree component built on PrimeVue's Tree component.
 * It provides file/folder navigation with context menus, drag-and-drop, and inline editing.
 *
 * ## Features
 * - Expandable/collapsible folders with dynamic icons
 * - Selection support (single select mode)
 * - Context menu with rename, delete, and add folder actions
 * - Drag and drop for reordering nodes
 * - Inline editing for node labels
 * - Badge support showing child count
 *
 * ## Components
 * - **TreeExplorer**: Main wrapper component
 * - **TreeExplorerTreeNode**: Individual node renderer with actions
 *
 * ## Usage
 * TreeExplorer is used in:
 * - Workflow browser sidebar
 * - Model/asset file browsers
 * - Custom node library navigation
 *
 * Note: Full TreeExplorer requires store dependencies. This story demonstrates
 * the underlying PrimeVue Tree patterns used.
 */
const meta: Meta = {
  title: 'Data Display/TreeExplorer',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Hierarchical tree component for file/folder navigation with context menus, drag-and-drop, and inline editing.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Mock tree data representing ComfyUI workflow structure
const mockTreeData = [
  {
    key: 'workflows',
    label: 'Workflows',
    icon: 'pi pi-folder',
    children: [
      {
        key: 'default',
        label: 'Default',
        icon: 'pi pi-folder',
        children: [
          { key: 'basic-txt2img', label: 'Basic txt2img', icon: 'pi pi-file' },
          { key: 'basic-img2img', label: 'Basic img2img', icon: 'pi pi-file' },
          {
            key: 'controlnet-canny',
            label: 'ControlNet Canny',
            icon: 'pi pi-file'
          }
        ]
      },
      {
        key: 'custom',
        label: 'Custom',
        icon: 'pi pi-folder',
        children: [
          {
            key: 'my-workflow-1',
            label: 'My Portrait Workflow',
            icon: 'pi pi-file'
          },
          {
            key: 'my-workflow-2',
            label: 'Landscape Generator',
            icon: 'pi pi-file'
          }
        ]
      }
    ]
  },
  {
    key: 'models',
    label: 'Models',
    icon: 'pi pi-folder',
    children: [
      {
        key: 'checkpoints',
        label: 'Checkpoints',
        icon: 'pi pi-folder',
        children: [
          { key: 'sd15', label: 'SD 1.5', icon: 'pi pi-box' },
          { key: 'sdxl', label: 'SDXL', icon: 'pi pi-box' },
          { key: 'flux', label: 'Flux', icon: 'pi pi-box' }
        ]
      },
      {
        key: 'loras',
        label: 'LoRAs',
        icon: 'pi pi-folder',
        children: [
          { key: 'lora-1', label: 'Detail Enhancer', icon: 'pi pi-file' },
          { key: 'lora-2', label: 'Style Transfer', icon: 'pi pi-file' }
        ]
      }
    ]
  }
]

/**
 * Basic tree structure using PrimeVue Tree (foundation of TreeExplorer)
 */
export const Default: Story = {
  render: () => ({
    components: { Tree },
    setup() {
      const expandedKeys = ref<Record<string, boolean>>({
        workflows: true,
        default: true
      })
      const selectedKey = ref<Record<string, boolean>>({})
      return { mockTreeData, expandedKeys, selectedKey }
    },
    template: `
      <div style="width: 300px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
        <Tree
          v-model:expanded-keys="expandedKeys"
          v-model:selection-keys="selectedKey"
          :value="mockTreeData"
          selection-mode="single"
          class="w-full"
        />
      </div>
    `
  })
}

/**
 * Tree with all nodes expanded
 */
export const ExpandedTree: Story = {
  render: () => ({
    components: { Tree },
    setup() {
      const expandedKeys = ref<Record<string, boolean>>({
        workflows: true,
        default: true,
        custom: true,
        models: true,
        checkpoints: true,
        loras: true
      })
      const selectedKey = ref<Record<string, boolean>>({})
      return { mockTreeData, expandedKeys, selectedKey }
    },
    template: `
      <div style="width: 300px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
        <Tree
          v-model:expanded-keys="expandedKeys"
          v-model:selection-keys="selectedKey"
          :value="mockTreeData"
          selection-mode="single"
          class="w-full"
        />
      </div>
    `
  })
}

/**
 * Tree with a pre-selected node
 */
export const WithSelection: Story = {
  render: () => ({
    components: { Tree },
    setup() {
      const expandedKeys = ref<Record<string, boolean>>({
        workflows: true,
        default: true
      })
      const selectedKey = ref<Record<string, boolean>>({
        'basic-txt2img': true
      })
      return { mockTreeData, expandedKeys, selectedKey }
    },
    template: `
      <div style="width: 300px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
        <Tree
          v-model:expanded-keys="expandedKeys"
          v-model:selection-keys="selectedKey"
          :value="mockTreeData"
          selection-mode="single"
          class="w-full"
        />
        <div style="padding: 12px; border-top: 1px solid #e5e5e5; font-size: 12px; color: #666;">
          Selected: {{ Object.keys(selectedKey).filter(k => selectedKey[k])[0] || 'None' }}
        </div>
      </div>
    `
  })
}

/**
 * Tree node structure explanation
 */
export const NodeStructure: Story = {
  render: () => ({
    template: `
      <div style="max-width: 600px; font-family: system-ui;">
        <h3 style="margin-bottom: 16px; font-weight: 600; color: #1a1a1a;">TreeExplorerNode Interface</h3>

        <pre style="background: #f5f5f5; padding: 16px; border-radius: 8px; font-size: 13px; overflow-x: auto;">
interface TreeExplorerNode {
  key: string           // Unique identifier
  label: string         // Display text
  leaf?: boolean        // Is it a leaf node (file)?
  icon?: string         // PrimeIcons class
  children?: TreeExplorerNode[]

  // Optional callbacks
  handleClick?: (e: MouseEvent) => void
  handleRename?: (newName: string) => Promise&lt;void&gt;
  handleDelete?: () => Promise&lt;void&gt;
  handleDrop?: (data: DragData) => Promise&lt;void&gt;

  // Display options
  getIcon?: () => string
  getBadgeText?: () => string
  contextMenuItems?: MenuItem[]

  // Drag & drop
  draggable?: boolean
  droppable?: boolean
}</pre>

        <h3 style="margin: 24px 0 16px; font-weight: 600; color: #1a1a1a;">Features</h3>

        <ul style="color: #4a4a4a; padding-left: 20px; line-height: 1.8;">
          <li><strong>Dynamic Icons:</strong> Folder icons change based on expanded state</li>
          <li><strong>Badge Count:</strong> Shows total leaf nodes in each folder</li>
          <li><strong>Context Menu:</strong> Right-click for rename, delete, add folder</li>
          <li><strong>Inline Editing:</strong> Double-click label to rename</li>
          <li><strong>Drag & Drop:</strong> Reorder nodes within the tree</li>
          <li><strong>Custom Actions:</strong> Slot for additional action buttons</li>
        </ul>
      </div>
    `
  })
}

/**
 * Usage in ComfyUI contexts
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: { Tree },
    setup() {
      const workflowExpanded = ref<Record<string, boolean>>({
        workflows: true,
        default: true
      })
      const modelExpanded = ref<Record<string, boolean>>({
        models: true,
        checkpoints: true
      })
      return { mockTreeData, workflowExpanded, modelExpanded }
    },
    template: `
      <div style="display: flex; gap: 24px;">
        <div>
          <h4 style="margin-bottom: 12px; font-weight: 600; color: #1a1a1a;">Workflow Browser</h4>
          <div style="width: 250px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
            <Tree
              v-model:expanded-keys="workflowExpanded"
              :value="[mockTreeData[0]]"
              selection-mode="single"
              class="w-full"
            />
          </div>
        </div>

        <div>
          <h4 style="margin-bottom: 12px; font-weight: 600; color: #1a1a1a;">Model Browser</h4>
          <div style="width: 250px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
            <Tree
              v-model:expanded-keys="modelExpanded"
              :value="[mockTreeData[1]]"
              selection-mode="single"
              class="w-full"
            />
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
    components: { Tree },
    setup() {
      const expandedKeys = ref<Record<string, boolean>>({
        workflows: true,
        default: true,
        custom: true
      })
      return { mockTreeData, expandedKeys }
    },
    template: `
      <div class="dark-theme" style="background: #0a0a0a; padding: 24px; border-radius: 8px;">
        <div style="width: 300px; border: 1px solid #333; border-radius: 8px; overflow: hidden;">
          <Tree
            v-model:expanded-keys="expandedKeys"
            :value="mockTreeData"
            selection-mode="single"
            class="w-full"
          />
        </div>
      </div>
    `
  })
}
