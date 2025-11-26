import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Breadcrumb from 'primevue/breadcrumb'
import Tag from 'primevue/tag'
import { ref } from 'vue'

/**
 * Breadcrumb
 *
 * Breadcrumb navigation for hierarchical navigation paths, particularly used
 * in ComfyUI for navigating between subgraph levels. The implementation uses
 * PrimeVue's Breadcrumb component with custom styling.
 *
 * ComfyUI Components:
 * - SubgraphBreadcrumb: Container component with overflow handling
 * - SubgraphBreadcrumbItem: Individual breadcrumb items with menu support
 *
 * Features:
 * - Hierarchical navigation display
 * - Overflow handling for long paths
 * - Interactive items with context menus
 * - Rename functionality via double-click
 * - Blueprint indicator tags
 * - Missing nodes warning indicator
 *
 * Note: The actual SubgraphBreadcrumb components have heavy store dependencies
 * (workflowStore, canvasStore, navigationStore). These stories demonstrate
 * the visual patterns using PrimeVue Breadcrumb directly.
 */
const meta: Meta = {
  title: 'Navigation/Breadcrumb',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Breadcrumb navigation for hierarchical paths. Used in ComfyUI for navigating subgraph levels with support for overflow handling, context menus, and rename functionality.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Mock breadcrumb item styling to match ComfyUI design
const breadcrumbStyles = `
  .comfy-breadcrumb :deep(.p-breadcrumb) {
    background-color: transparent;
    border: none;
    padding: 0;
  }
  .comfy-breadcrumb :deep(.p-breadcrumb-item) {
    display: flex;
    align-items: center;
    min-width: 28px;
    height: 48px;
    background-color: var(--comfy-menu-bg, #1a1a1a);
    border: 1px solid var(--interface-stroke, #333);
    overflow: hidden;
  }
  .comfy-breadcrumb :deep(.p-breadcrumb-item:first-child) {
    border-radius: 8px 0 0 8px;
  }
  .comfy-breadcrumb :deep(.p-breadcrumb-item:last-child) {
    border-radius: 0 8px 8px 0;
  }
  .comfy-breadcrumb :deep(.p-breadcrumb-item-link) {
    padding: 0 16px;
    color: var(--text-primary, #fff);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .comfy-breadcrumb :deep(.p-breadcrumb-item-link:hover) {
    background-color: rgba(255,255,255,0.1);
  }
  .comfy-breadcrumb :deep(.p-breadcrumb-separator) {
    display: flex;
    align-items: center;
    height: 48px;
    padding: 0 4px;
    background-color: var(--comfy-menu-bg, #1a1a1a);
    border: 1px solid var(--interface-stroke, #333);
    border-left: none;
    border-right: none;
    color: var(--text-secondary, #888);
  }
`

/**
 * Default breadcrumb showing a simple path
 */
export const Default: Story = {
  render: () => ({
    components: { Breadcrumb },
    setup() {
      const items = [
        { label: 'My Workflow', icon: 'pi pi-home' },
        { label: 'Main Group' },
        { label: 'Inner Group' }
      ]
      return { items }
    },
    template: `
      <style>${breadcrumbStyles}</style>
      <div class="comfy-breadcrumb">
        <Breadcrumb :model="items">
          <template #separator>
            <span style="transform: scale(1.5)"> / </span>
          </template>
        </Breadcrumb>
      </div>
    `
  })
}

/**
 * Single item breadcrumb (root level)
 */
export const RootLevel: Story = {
  render: () => ({
    components: { Breadcrumb },
    setup() {
      const items = [{ label: 'Untitled Workflow', icon: 'pi pi-home' }]
      return { items }
    },
    template: `
      <style>${breadcrumbStyles}</style>
      <div class="comfy-breadcrumb">
        <Breadcrumb :model="items">
          <template #separator>
            <span style="transform: scale(1.5)"> / </span>
          </template>
        </Breadcrumb>
        <p class="mt-4 text-sm text-muted-foreground">
          Root level - only workflow name shown
        </p>
      </div>
    `
  })
}

/**
 * Deep nesting with many levels
 */
export const DeepNesting: Story = {
  render: () => ({
    components: { Breadcrumb },
    setup() {
      const items = [
        { label: 'Main Workflow', icon: 'pi pi-home' },
        { label: 'Processing Pipeline' },
        { label: 'Image Enhancement' },
        { label: 'Detail Upscale' },
        { label: 'Final Output' }
      ]
      return { items }
    },
    template: `
      <style>${breadcrumbStyles}</style>
      <div class="comfy-breadcrumb">
        <Breadcrumb :model="items">
          <template #separator>
            <span style="transform: scale(1.5)"> / </span>
          </template>
        </Breadcrumb>
        <p class="mt-4 text-sm text-muted-foreground">
          Deep nested path through subgraphs
        </p>
      </div>
    `
  })
}

/**
 * Breadcrumb with Blueprint tag indicator
 */
export const WithBlueprintTag: Story = {
  render: () => ({
    components: { Breadcrumb, Tag },
    setup() {
      const items = [
        {
          label: 'Image Generator Blueprint',
          icon: 'pi pi-home',
          isBlueprint: true
        },
        { label: 'VAE Decode' }
      ]
      return { items }
    },
    template: `
      <style>${breadcrumbStyles}</style>
      <div class="comfy-breadcrumb">
        <Breadcrumb :model="items">
          <template #item="{ item }">
            <a class="p-breadcrumb-item-link flex items-center gap-2 px-4 cursor-pointer">
              <i v-if="item.icon" :class="item.icon" />
              <span>{{ item.label }}</span>
              <Tag v-if="item.isBlueprint" value="Blueprint" severity="primary" />
              <i v-if="items.indexOf(item) === items.length - 1" class="pi pi-angle-down text-xs" />
            </a>
          </template>
          <template #separator>
            <span style="transform: scale(1.5)"> / </span>
          </template>
        </Breadcrumb>
        <p class="mt-4 text-sm text-muted-foreground">
          Blueprint workflows show a tag indicator
        </p>
      </div>
    `
  })
}

/**
 * Breadcrumb with warning indicator for missing nodes
 */
export const WithWarningIndicator: Story = {
  render: () => ({
    components: { Breadcrumb },
    setup() {
      const items = [
        { label: 'Broken Workflow', icon: 'pi pi-home', hasMissingNodes: true },
        { label: 'Processing' }
      ]
      return { items }
    },
    template: `
      <style>${breadcrumbStyles}</style>
      <div class="comfy-breadcrumb">
        <Breadcrumb :model="items">
          <template #item="{ item }">
            <a class="p-breadcrumb-item-link flex items-center gap-2 px-4 cursor-pointer">
              <i v-if="item.hasMissingNodes" class="pi pi-exclamation-triangle text-yellow-500" />
              <i v-else-if="item.icon" :class="item.icon" />
              <span>{{ item.label }}</span>
            </a>
          </template>
          <template #separator>
            <span style="transform: scale(1.5)"> / </span>
          </template>
        </Breadcrumb>
        <p class="mt-4 text-sm text-muted-foreground">
          Warning icon shown when workflow has missing nodes
        </p>
      </div>
    `
  })
}

/**
 * Interactive breadcrumb with click handling
 */
export const Interactive: Story = {
  render: () => ({
    components: { Breadcrumb },
    setup() {
      const items = ref([
        { label: 'My Workflow', icon: 'pi pi-home' },
        { label: 'Processing' },
        { label: 'Enhancement' },
        { label: 'Output' }
      ])
      const currentLevel = ref(3)
      const lastClicked = ref('')

      const handleClick = (item: { label: string }, index: number) => {
        currentLevel.value = index
        lastClicked.value = item.label
      }

      return { items, currentLevel, lastClicked, handleClick }
    },
    template: `
      <style>${breadcrumbStyles}</style>
      <div class="comfy-breadcrumb">
        <Breadcrumb :model="items">
          <template #item="{ item, index }">
            <a
              class="p-breadcrumb-item-link flex items-center gap-2 px-4 cursor-pointer"
              :class="{ 'font-bold': index === currentLevel }"
              @click="handleClick(item, index)"
            >
              <i v-if="item.icon" :class="item.icon" />
              <span>{{ item.label }}</span>
              <i v-if="index === items.length - 1" class="pi pi-angle-down text-xs" />
            </a>
          </template>
          <template #separator>
            <span style="transform: scale(1.5)"> / </span>
          </template>
        </Breadcrumb>

        <div class="mt-4 p-4 bg-secondary-background rounded-lg">
          <p class="text-sm text-base-foreground mb-2">
            <strong>Current level:</strong> {{ currentLevel }}
          </p>
          <p class="text-sm text-base-foreground">
            <strong>Last clicked:</strong> {{ lastClicked || 'None' }}
          </p>
          <p class="text-xs text-muted-foreground mt-2">
            Click any breadcrumb item to navigate
          </p>
        </div>
      </div>
    `
  })
}

/**
 * ComfyUI use cases showing real-world scenarios
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: { Breadcrumb, Tag },
    template: `
      <style>${breadcrumbStyles}</style>
      <div class="flex flex-col gap-8 w-full max-w-2xl">
        <!-- Simple workflow -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Simple Workflow</h3>
          <div class="comfy-breadcrumb">
            <Breadcrumb :model="[{ label: 'txt2img_workflow.json', icon: 'pi pi-home' }]">
              <template #separator>
                <span style="transform: scale(1.5)"> / </span>
              </template>
            </Breadcrumb>
          </div>
        </div>

        <!-- Workflow with subgraph -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Navigating Subgraphs</h3>
          <div class="comfy-breadcrumb">
            <Breadcrumb :model="[
              { label: 'portrait_pipeline.json', icon: 'pi pi-home' },
              { label: 'Face Enhancement' },
              { label: 'Eye Detail' }
            ]">
              <template #separator>
                <span style="transform: scale(1.5)"> / </span>
              </template>
            </Breadcrumb>
          </div>
          <p class="mt-2 text-xs text-muted-foreground">
            Each level represents a subgraph you can navigate back to
          </p>
        </div>

        <!-- Blueprint workflow -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Blueprint Workflow</h3>
          <div class="comfy-breadcrumb">
            <Breadcrumb :model="[
              { label: 'Upscale Blueprint', icon: 'pi pi-home', isBlueprint: true }
            ]">
              <template #item="{ item }">
                <a class="p-breadcrumb-item-link flex items-center gap-2 px-4 cursor-pointer">
                  <i v-if="item.icon" :class="item.icon" />
                  <span>{{ item.label }}</span>
                  <Tag v-if="item.isBlueprint" value="Blueprint" severity="primary" class="ml-2" />
                </a>
              </template>
              <template #separator>
                <span style="transform: scale(1.5)"> / </span>
              </template>
            </Breadcrumb>
          </div>
          <p class="mt-2 text-xs text-muted-foreground">
            Blueprint workflows are reusable subgraph templates
          </p>
        </div>

        <!-- Workflow with issues -->
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Workflow with Missing Nodes</h3>
          <div class="comfy-breadcrumb">
            <Breadcrumb :model="[
              { label: 'old_workflow.json', icon: 'pi pi-exclamation-triangle' }
            ]">
              <template #item="{ item }">
                <a class="p-breadcrumb-item-link flex items-center gap-2 px-4 cursor-pointer">
                  <i :class="[item.icon, 'text-yellow-500']" />
                  <span>{{ item.label }}</span>
                </a>
              </template>
              <template #separator>
                <span style="transform: scale(1.5)"> / </span>
              </template>
            </Breadcrumb>
          </div>
          <p class="mt-2 text-xs text-muted-foreground">
            Warning indicator when custom nodes are missing
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
    components: { Breadcrumb, Tag },
    template: `
      <style>${breadcrumbStyles}</style>
      <div class="dark-theme bg-neutral-900 p-8 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-6">Dark Theme</h3>
        <div class="flex flex-col gap-6">
          <div>
            <div class="text-xs text-neutral-400 mb-2">Simple path</div>
            <div class="comfy-breadcrumb">
              <Breadcrumb :model="[
                { label: 'Workflow', icon: 'pi pi-home' },
                { label: 'Subgraph' }
              ]">
                <template #separator>
                  <span style="transform: scale(1.5)"> / </span>
                </template>
              </Breadcrumb>
            </div>
          </div>

          <div>
            <div class="text-xs text-neutral-400 mb-2">Deep path</div>
            <div class="comfy-breadcrumb">
              <Breadcrumb :model="[
                { label: 'Main', icon: 'pi pi-home' },
                { label: 'Processing' },
                { label: 'Enhancement' },
                { label: 'Output' }
              ]">
                <template #separator>
                  <span style="transform: scale(1.5)"> / </span>
                </template>
              </Breadcrumb>
            </div>
          </div>

          <div>
            <div class="text-xs text-neutral-400 mb-2">With blueprint tag</div>
            <div class="comfy-breadcrumb">
              <Breadcrumb :model="[
                { label: 'Blueprint', icon: 'pi pi-home', isBlueprint: true }
              ]">
                <template #item="{ item }">
                  <a class="p-breadcrumb-item-link flex items-center gap-2 px-4 cursor-pointer">
                    <i v-if="item.icon" :class="item.icon" />
                    <span>{{ item.label }}</span>
                    <Tag v-if="item.isBlueprint" value="Blueprint" severity="primary" class="ml-2" />
                  </a>
                </template>
                <template #separator>
                  <span style="transform: scale(1.5)"> / </span>
                </template>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
    `
  })
}
