import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Button from 'primevue/button'
import { ref } from 'vue'

/**
 * Topbar
 *
 * The top navigation bar contains workflow tabs and quick actions.
 * It's the primary navigation element for switching between open workflows.
 *
 * Components:
 * - WorkflowTabs: Container for workflow tab buttons with scroll support
 * - WorkflowTab: Individual workflow tab with close button and status indicator
 *
 * Features:
 * - Horizontal scrolling when tabs overflow
 * - Active tab indication with bottom border
 * - Unsaved/modified status indicator (dot)
 * - Close button on hover
 * - Context menu (right-click) for tab actions
 * - Middle-click to close
 * - Drag and drop reordering
 * - New workflow button
 *
 * Note: WorkflowTabs has store dependencies (workflowStore, workflowService).
 * These stories demonstrate the visual patterns using mocked components.
 */
const meta: Meta = {
  title: 'Navigation/Topbar',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Top navigation bar with workflow tabs. Supports scrolling, close buttons, unsaved indicators, context menus, and drag-drop reordering.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Mock workflow tab component
const MockWorkflowTab = {
  props: {
    name: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    isModified: { type: Boolean, default: false }
  },
  emits: ['click', 'close'],
  template: `
    <button
      class="workflow-tab group flex gap-2 px-3 py-2 min-w-[90px] max-w-[200px] border-r border-[var(--border-color,#333)] transition-all"
      :class="{
        'workflow-tab-active border-b-2 border-b-[var(--p-button-text-primary-color,#3b82f6)]': isActive,
        'opacity-75': !isActive
      }"
      @click="$emit('click')"
    >
      <span class="workflow-label truncate text-sm">{{ name }}</span>
      <div class="relative flex items-center">
        <span
          v-if="isModified && !isActive"
          class="absolute w-4 text-center text-2xl font-bold leading-none"
        >•</span>
        <button
          class="close-button w-4 h-4 rounded flex items-center justify-center hover:bg-white/10"
          :class="{ 'invisible group-hover:visible': true }"
          @click.stop="$emit('close')"
        >
          <i class="pi pi-times text-xs" />
        </button>
      </div>
    </button>
  `
}

// Topbar styling
const topbarStyles = `
  .topbar-container {
    background-color: var(--comfy-menu-bg, #1a1a1a);
    border-bottom: 1px solid var(--interface-stroke, #333);
  }
  .workflow-tab {
    background-color: transparent;
    color: var(--text-primary, #fff);
  }
  .workflow-tab:hover {
    background-color: rgba(255,255,255,0.05);
  }
  .workflow-tab-active {
    opacity: 1;
  }
  .overflow-arrow {
    padding: 0 8px;
    color: var(--text-secondary, #888);
  }
  .overflow-arrow:hover:not(:disabled) {
    color: var(--text-primary, #fff);
  }
  .overflow-arrow:disabled {
    opacity: 0.25;
  }
  .new-workflow-btn {
    color: var(--text-secondary, #888);
  }
  .new-workflow-btn:hover {
    color: var(--text-primary, #fff);
    background-color: rgba(255,255,255,0.1);
  }
`

/**
 * Default topbar with workflow tabs
 */
export const Default: Story = {
  render: () => ({
    components: { MockWorkflowTab, Button },
    setup() {
      const workflows = ref([
        { id: '1', name: 'txt2img_workflow.json', isModified: false },
        { id: '2', name: 'portrait_pipeline.json', isModified: true },
        { id: '3', name: 'upscale_2x.json', isModified: false }
      ])
      const activeWorkflow = ref('1')

      const selectWorkflow = (id: string) => {
        activeWorkflow.value = id
      }

      const closeWorkflow = (id: string) => {
        workflows.value = workflows.value.filter((w) => w.id !== id)
        if (activeWorkflow.value === id && workflows.value.length > 0) {
          activeWorkflow.value = workflows.value[0].id
        }
      }

      return { workflows, activeWorkflow, selectWorkflow, closeWorkflow }
    },
    template: `
      <style>${topbarStyles}</style>
      <div class="topbar-container flex items-center h-12">
        <div class="flex items-center h-full overflow-hidden">
          <MockWorkflowTab
            v-for="workflow in workflows"
            :key="workflow.id"
            :name="workflow.name"
            :is-active="workflow.id === activeWorkflow"
            :is-modified="workflow.isModified"
            @click="selectWorkflow(workflow.id)"
            @close="closeWorkflow(workflow.id)"
          />
        </div>
        <button class="new-workflow-btn h-full px-3">
          <i class="pi pi-plus" />
        </button>
      </div>
    `
  })
}

/**
 * Single workflow tab
 */
export const SingleTab: Story = {
  render: () => ({
    components: { MockWorkflowTab },
    template: `
      <style>${topbarStyles}</style>
      <div class="topbar-container flex items-center h-12">
        <div class="flex items-center h-full">
          <MockWorkflowTab
            name="my_workflow.json"
            :is-active="true"
          />
        </div>
        <button class="new-workflow-btn h-full px-3">
          <i class="pi pi-plus" />
        </button>
      </div>
    `
  })
}

/**
 * Tabs with unsaved indicators
 */
export const UnsavedIndicators: Story = {
  render: () => ({
    components: { MockWorkflowTab },
    setup() {
      const workflows = [
        { id: '1', name: 'saved_workflow.json', isModified: false },
        { id: '2', name: 'editing_workflow.json', isModified: true },
        { id: '3', name: 'another_unsaved.json', isModified: true }
      ]
      const activeWorkflow = ref('1')

      return { workflows, activeWorkflow }
    },
    template: `
      <style>${topbarStyles}</style>
      <div class="topbar-container flex items-center h-12">
        <div class="flex items-center h-full">
          <MockWorkflowTab
            v-for="workflow in workflows"
            :key="workflow.id"
            :name="workflow.name"
            :is-active="workflow.id === activeWorkflow"
            :is-modified="workflow.isModified"
            @click="activeWorkflow = workflow.id"
          />
        </div>
        <button class="new-workflow-btn h-full px-3">
          <i class="pi pi-plus" />
        </button>
      </div>
      <div class="p-4 bg-secondary-background">
        <p class="text-sm text-muted-foreground">
          Unsaved workflows show a dot (•) indicator. Active tab shows bottom border.
        </p>
      </div>
    `
  })
}

/**
 * Many tabs with overflow behavior
 */
export const ManyTabs: Story = {
  render: () => ({
    components: { MockWorkflowTab },
    setup() {
      const workflows = [
        { id: '1', name: 'workflow_01.json' },
        { id: '2', name: 'workflow_02.json' },
        { id: '3', name: 'workflow_03.json' },
        { id: '4', name: 'workflow_04.json' },
        { id: '5', name: 'workflow_05.json' },
        { id: '6', name: 'workflow_06.json' },
        { id: '7', name: 'workflow_07.json' },
        { id: '8', name: 'workflow_08.json' }
      ]
      const activeWorkflow = ref('1')

      return { workflows, activeWorkflow }
    },
    template: `
      <style>${topbarStyles}</style>
      <div class="topbar-container flex items-center h-12">
        <button class="overflow-arrow h-full" disabled>
          <i class="pi pi-chevron-left" />
        </button>
        <div class="flex items-center h-full overflow-hidden flex-1">
          <MockWorkflowTab
            v-for="workflow in workflows"
            :key="workflow.id"
            :name="workflow.name"
            :is-active="workflow.id === activeWorkflow"
            @click="activeWorkflow = workflow.id"
          />
        </div>
        <button class="overflow-arrow h-full">
          <i class="pi pi-chevron-right" />
        </button>
        <button class="overflow-arrow h-full" title="All workflows">
          <i class="pi pi-angle-down" />
        </button>
        <button class="new-workflow-btn h-full px-3">
          <i class="pi pi-plus" />
        </button>
      </div>
      <div class="p-4 bg-secondary-background">
        <p class="text-sm text-muted-foreground">
          When tabs overflow, arrow buttons appear for scrolling. Dropdown shows all open workflows.
        </p>
      </div>
    `
  })
}

/**
 * Tab with long filename
 */
export const LongFilenames: Story = {
  render: () => ({
    components: { MockWorkflowTab },
    setup() {
      const workflows = [
        { id: '1', name: 'very_long_workflow_name_that_should_truncate.json' },
        { id: '2', name: 'another_extremely_long_filename_example.json' },
        { id: '3', name: 'short.json' }
      ]
      const activeWorkflow = ref('1')

      return { workflows, activeWorkflow }
    },
    template: `
      <style>${topbarStyles}</style>
      <div class="topbar-container flex items-center h-12">
        <div class="flex items-center h-full overflow-hidden">
          <MockWorkflowTab
            v-for="workflow in workflows"
            :key="workflow.id"
            :name="workflow.name"
            :is-active="workflow.id === activeWorkflow"
            @click="activeWorkflow = workflow.id"
          />
        </div>
        <button class="new-workflow-btn h-full px-3">
          <i class="pi pi-plus" />
        </button>
      </div>
      <div class="p-4 bg-secondary-background">
        <p class="text-sm text-muted-foreground">
          Long filenames are truncated with ellipsis. Full name shown in tooltip on hover.
        </p>
      </div>
    `
  })
}

/**
 * Interactive topbar with full functionality
 */
export const Interactive: Story = {
  render: () => ({
    components: { MockWorkflowTab },
    setup() {
      const workflows = ref([
        { id: '1', name: 'workflow_1.json', isModified: false },
        { id: '2', name: 'workflow_2.json', isModified: true },
        { id: '3', name: 'workflow_3.json', isModified: false }
      ])
      const activeWorkflow = ref('1')
      let nextId = 4

      const selectWorkflow = (id: string) => {
        activeWorkflow.value = id
      }

      const closeWorkflow = (id: string) => {
        workflows.value = workflows.value.filter((w) => w.id !== id)
        if (activeWorkflow.value === id && workflows.value.length > 0) {
          activeWorkflow.value = workflows.value[0].id
        }
      }

      const addWorkflow = () => {
        const newWorkflow = {
          id: String(nextId++),
          name: `new_workflow_${nextId - 1}.json`,
          isModified: true
        }
        workflows.value.push(newWorkflow)
        activeWorkflow.value = newWorkflow.id
      }

      return {
        workflows,
        activeWorkflow,
        selectWorkflow,
        closeWorkflow,
        addWorkflow
      }
    },
    template: `
      <style>${topbarStyles}</style>
      <div class="topbar-container flex items-center h-12">
        <div class="flex items-center h-full overflow-hidden flex-1">
          <MockWorkflowTab
            v-for="workflow in workflows"
            :key="workflow.id"
            :name="workflow.name"
            :is-active="workflow.id === activeWorkflow"
            :is-modified="workflow.isModified"
            @click="selectWorkflow(workflow.id)"
            @close="closeWorkflow(workflow.id)"
          />
        </div>
        <button class="new-workflow-btn h-full px-3" @click="addWorkflow">
          <i class="pi pi-plus" />
        </button>
      </div>

      <div class="p-4 bg-secondary-background">
        <div class="space-y-2">
          <p class="text-sm text-base-foreground">
            <strong>Active workflow:</strong> {{ workflows.find(w => w.id === activeWorkflow)?.name || 'None' }}
          </p>
          <p class="text-sm text-base-foreground">
            <strong>Open workflows:</strong> {{ workflows.length }}
          </p>
          <p class="text-xs text-muted-foreground mt-2">
            Click tabs to switch, hover and click X to close, click + to add new workflow
          </p>
        </div>
      </div>
    `
  })
}

/**
 * ComfyUI topbar use cases
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: { MockWorkflowTab },
    template: `
      <style>${topbarStyles}</style>
      <div class="flex flex-col gap-8 p-8">
        <!-- Normal workflow editing -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Normal Editing Session</h3>
          <div class="topbar-container flex items-center h-12">
            <div class="flex items-center h-full">
              <MockWorkflowTab name="portrait.json" :is-active="true" />
              <MockWorkflowTab name="landscape.json" />
              <MockWorkflowTab name="upscale.json" :is-modified="true" />
            </div>
            <button class="new-workflow-btn h-full px-3">
              <i class="pi pi-plus" />
            </button>
          </div>
          <p class="mt-2 text-xs text-muted-foreground">
            Typical editing session with multiple workflows open
          </p>
        </div>

        <!-- New unsaved workflow -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">New Unsaved Workflow</h3>
          <div class="topbar-container flex items-center h-12">
            <div class="flex items-center h-full">
              <MockWorkflowTab name="Unsaved Workflow" :is-active="true" :is-modified="true" />
            </div>
            <button class="new-workflow-btn h-full px-3">
              <i class="pi pi-plus" />
            </button>
          </div>
          <p class="mt-2 text-xs text-muted-foreground">
            Newly created workflow that hasn't been saved yet
          </p>
        </div>

        <!-- Multiple unsaved workflows -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Batch Editing</h3>
          <div class="topbar-container flex items-center h-12">
            <div class="flex items-center h-full">
              <MockWorkflowTab name="batch_01.json" :is-modified="true" />
              <MockWorkflowTab name="batch_02.json" :is-active="true" :is-modified="true" />
              <MockWorkflowTab name="batch_03.json" :is-modified="true" />
              <MockWorkflowTab name="batch_04.json" :is-modified="true" />
            </div>
            <button class="new-workflow-btn h-full px-3">
              <i class="pi pi-plus" />
            </button>
          </div>
          <p class="mt-2 text-xs text-muted-foreground">
            Multiple workflows being edited simultaneously
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
    components: { MockWorkflowTab },
    setup() {
      const activeWorkflow = ref('1')
      return { activeWorkflow }
    },
    template: `
      <style>${topbarStyles}</style>
      <div class="dark-theme bg-neutral-900 p-8 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-6">Dark Theme</h3>

        <div class="topbar-container flex items-center h-12 rounded-lg overflow-hidden">
          <div class="flex items-center h-full">
            <MockWorkflowTab
              name="workflow_1.json"
              :is-active="activeWorkflow === '1'"
              @click="activeWorkflow = '1'"
            />
            <MockWorkflowTab
              name="workflow_2.json"
              :is-active="activeWorkflow === '2'"
              :is-modified="true"
              @click="activeWorkflow = '2'"
            />
            <MockWorkflowTab
              name="workflow_3.json"
              :is-active="activeWorkflow === '3'"
              @click="activeWorkflow = '3'"
            />
          </div>
          <button class="new-workflow-btn h-full px-3">
            <i class="pi pi-plus" />
          </button>
        </div>

        <div class="mt-4 text-xs text-neutral-400">
          Workflow tabs with dark theme styling
        </div>
      </div>
    `
  })
}
