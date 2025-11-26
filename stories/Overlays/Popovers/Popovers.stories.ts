import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import Popover from 'primevue/popover'
import { ref } from 'vue'

/**
 * Popovers
 *
 * Popover components display floating content triggered by user interaction.
 * ComfyUI uses PrimeVue Popover with custom styling and content.
 *
 * Popover Types:
 * - Basic: Simple content popover
 * - Menu: List of actions
 * - Details: Detailed information panel
 * - User: User profile/account actions
 * - Workflow: Workflow preview on tab hover
 *
 * Note: Some popover components are tightly coupled with stores.
 * These stories demonstrate the visual patterns and behaviors.
 */
const meta = {
  title: 'Overlays/Popovers',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Popover components for displaying floating content. Uses PrimeVue Popover with custom styling.'
      }
    }
  }
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic popover
 */
export const BasicPopover: Story = {
  render: () => ({
    components: { Button, Popover },
    setup() {
      const popover = ref<InstanceType<typeof Popover> | null>(null)
      const toggle = (event: Event) => popover.value?.toggle(event)
      return { popover, toggle }
    },
    template: `
      <Button label="Toggle Popover" @click="toggle" />
      <Popover ref="popover">
        <div class="p-4">
          <h4 class="m-0 mb-2 font-semibold">Popover Title</h4>
          <p class="m-0 text-sm text-muted-foreground">This is a basic popover with some content.</p>
        </div>
      </Popover>
    `
  })
}

/**
 * Menu popover style
 */
export const MenuPopover: Story = {
  render: () => ({
    components: { Button, Popover },
    setup() {
      const popover = ref<InstanceType<typeof Popover> | null>(null)
      const toggle = (event: Event) => popover.value?.toggle(event)
      const menuItems = [
        { label: 'Edit', icon: 'pi pi-pencil' },
        { label: 'Duplicate', icon: 'pi pi-copy' },
        { label: 'Delete', icon: 'pi pi-trash', danger: true }
      ]
      return { popover, toggle, menuItems }
    },
    template: `
      <Button icon="pi pi-ellipsis-v" @click="toggle" text />
      <Popover ref="popover">
        <div class="min-w-[160px]">
          <button
            v-for="item in menuItems"
            :key="item.label"
            class="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-100 rounded transition-colors"
            :class="{ 'text-red-600 hover:bg-red-50': item.danger }"
          >
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </button>
        </div>
      </Popover>
    `
  })
}

/**
 * Job details popover style
 *
 * Visual mockup of JobDetailsPopover component.
 */
export const JobDetailsPopover: Story = {
  render: () => ({
    components: { Button, Popover },
    setup() {
      const popover = ref<InstanceType<typeof Popover> | null>(null)
      const toggle = (event: Event) => popover.value?.toggle(event)
      const jobDetails = {
        workflow: 'portrait_generation.json',
        jobId: 'abc123def456',
        queuedAt: '14:32:15',
        queuePosition: '2 jobs ahead',
        timeElapsed: '00:45',
        estimatedStart: '~30 seconds'
      }
      return { popover, toggle, jobDetails }
    },
    template: `
      <Button label="Show Job Details" @click="toggle" />
      <Popover ref="popover" :pt="{ content: { class: 'p-0' } }">
        <div class="w-[300px] min-w-[260px] rounded-lg border border-neutral-200 bg-white shadow-md">
          <div class="flex items-center border-b border-neutral-200 p-4">
            <span class="text-sm font-normal text-neutral-900">Job Details</span>
          </div>
          <div class="flex flex-col gap-6 px-4 pt-4 pb-4">
            <div class="grid grid-cols-2 items-center gap-x-2 gap-y-2">
              <div class="flex items-center text-xs text-neutral-900">Workflow</div>
              <div class="flex items-center text-xs text-neutral-600 truncate">{{ jobDetails.workflow }}</div>

              <div class="flex items-center text-xs text-neutral-900">Job ID</div>
              <div class="flex items-center text-xs text-neutral-600">
                <span class="truncate">{{ jobDetails.jobId }}</span>
                <button class="ml-2 p-1 hover:bg-neutral-100 rounded">
                  <i class="pi pi-copy text-xs"></i>
                </button>
              </div>
            </div>

            <div class="grid grid-cols-2 items-center gap-x-2 gap-y-2">
              <div class="flex items-center text-xs text-neutral-900">Queued At</div>
              <div class="flex items-center text-xs text-neutral-600">{{ jobDetails.queuedAt }}</div>

              <div class="flex items-center text-xs text-neutral-900">Queue Position</div>
              <div class="flex items-center text-xs text-neutral-600">{{ jobDetails.queuePosition }}</div>

              <div class="flex items-center text-xs text-neutral-900">Time Elapsed</div>
              <div class="flex items-center text-xs text-neutral-600">{{ jobDetails.timeElapsed }}</div>

              <div class="flex items-center text-xs text-neutral-900">Estimated Start</div>
              <div class="flex items-center text-xs text-neutral-600">{{ jobDetails.estimatedStart }}</div>
            </div>
          </div>
        </div>
      </Popover>
    `
  })
}

/**
 * Job details with error state
 */
export const JobDetailsErrorPopover: Story = {
  render: () => ({
    components: { Button, Popover },
    setup() {
      const popover = ref<InstanceType<typeof Popover> | null>(null)
      const toggle = (event: Event) => popover.value?.toggle(event)
      return { popover, toggle }
    },
    template: `
      <Button label="Show Failed Job" severity="danger" @click="toggle" />
      <Popover ref="popover" :pt="{ content: { class: 'p-0' } }">
        <div class="w-[300px] min-w-[260px] rounded-lg border border-neutral-200 bg-white shadow-md">
          <div class="flex items-center border-b border-neutral-200 p-4">
            <span class="text-sm font-normal text-neutral-900">Job Details</span>
          </div>
          <div class="flex flex-col gap-4 px-4 pt-4 pb-4">
            <div class="grid grid-cols-2 items-center gap-x-2 gap-y-2">
              <div class="flex items-center text-xs text-neutral-900">Workflow</div>
              <div class="flex items-center text-xs text-neutral-600">workflow.json</div>

              <div class="flex items-center text-xs text-neutral-900">Job ID</div>
              <div class="flex items-center text-xs text-neutral-600">xyz789</div>

              <div class="flex items-center text-xs text-neutral-900">Queued At</div>
              <div class="flex items-center text-xs text-neutral-600">14:30:00</div>

              <div class="flex items-center text-xs text-neutral-900">Failed After</div>
              <div class="flex items-center text-xs text-neutral-600">00:12</div>
            </div>

            <div class="grid grid-cols-2 gap-x-2">
              <div class="flex items-center text-xs text-neutral-900">Error Message</div>
              <div class="flex items-center justify-end gap-2">
                <button class="text-xs text-neutral-600 hover:text-neutral-900 flex items-center gap-1">
                  Copy <i class="pi pi-copy text-xs"></i>
                </button>
                <button class="text-xs text-neutral-600 hover:text-neutral-900 flex items-center gap-1">
                  Report <i class="pi pi-exclamation-circle text-xs"></i>
                </button>
              </div>
            </div>
            <div class="rounded bg-neutral-100 px-4 py-2 text-xs text-neutral-600">
              RuntimeError: CUDA out of memory. Tried to allocate 2.00 GiB
            </div>
          </div>
        </div>
      </Popover>
    `
  })
}

/**
 * User profile popover style
 *
 * Visual mockup of CurrentUserPopover component.
 */
export const UserPopover: Story = {
  render: () => ({
    components: { Button, Popover, Divider },
    setup() {
      const popover = ref<InstanceType<typeof Popover> | null>(null)
      const toggle = (event: Event) => popover.value?.toggle(event)
      return { popover, toggle }
    },
    template: `
      <button @click="toggle" class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-semibold">
        JD
      </button>
      <Popover ref="popover" :pt="{ content: { class: 'p-0' } }">
        <div class="w-72 bg-white rounded-lg shadow-lg">
          <!-- User Info Section -->
          <div class="p-4">
            <div class="flex flex-col items-center">
              <div class="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-semibold mb-3">
                JD
              </div>
              <h3 class="m-0 mb-1 text-lg font-semibold">John Doe</h3>
              <p class="m-0 text-sm text-neutral-500">john@example.com</p>
            </div>
          </div>

          <!-- Credits Section -->
          <div class="px-4 pb-4 flex items-center justify-between">
            <div class="flex flex-col gap-1">
              <span class="text-2xl font-bold">$12.50</span>
              <button class="text-xs text-blue-600 hover:underline text-left">Partner Nodes Credits</button>
            </div>
            <Button label="Top Up" severity="secondary" size="small" />
          </div>

          <Divider class="my-2" />

          <!-- Actions -->
          <div class="px-2 pb-2">
            <button class="w-full flex items-center gap-3 px-3 py-2 hover:bg-neutral-100 rounded-lg text-left">
              <i class="pi pi-cog"></i>
              <span>User Settings</span>
            </button>
            <button class="w-full flex items-center gap-3 px-3 py-2 hover:bg-neutral-100 rounded-lg text-left">
              <i class="pi pi-receipt"></i>
              <span>Plan & Credits</span>
            </button>
          </div>

          <Divider class="my-2" />

          <div class="px-2 pb-3">
            <button class="w-full flex items-center gap-3 px-3 py-2 hover:bg-neutral-100 rounded-lg text-left text-neutral-600">
              <i class="pi pi-sign-out"></i>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </Popover>
    `
  })
}

/**
 * Workflow preview popover style
 *
 * Visual mockup of WorkflowTabPopover component.
 */
export const WorkflowPreviewPopover: Story = {
  render: () => ({
    setup() {
      const showPopover = ref(true)
      return { showPopover }
    },
    template: `
      <div class="relative">
        <!-- Mock workflow tab -->
        <div class="flex items-center gap-2 px-4 py-2 bg-neutral-200 rounded-t-lg cursor-pointer hover:bg-neutral-300">
          <span class="text-sm">portrait_workflow.json</span>
          <button class="p-0.5 hover:bg-neutral-400 rounded">
            <i class="pi pi-times text-xs"></i>
          </button>
        </div>

        <!-- Popover preview -->
        <div
          v-if="showPopover"
          class="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50"
        >
          <div class="bg-neutral-800 rounded-xl overflow-hidden shadow-lg" style="width: 250px;">
            <div class="p-2">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='234' height='200' viewBox='0 0 234 200'%3E%3Crect fill='%232a2a3e' width='234' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-size='14'%3EWorkflow Preview%3C/text%3E%3C/svg%3E"
                class="block h-[200px] rounded-lg object-cover w-full"
                alt="Workflow preview"
              />
            </div>
            <div class="pt-1 pb-2 px-3">
              <span class="block text-sm font-medium text-white truncate">portrait_workflow.json</span>
            </div>
          </div>
        </div>

        <p class="text-sm text-muted-foreground mt-64">
          ↑ Workflow preview popover (shown on tab hover)
        </p>
      </div>
    `
  })
}

/**
 * Submenu popover style
 *
 * Visual mockup of SubmenuPopover for node customization.
 */
export const SubmenuPopover: Story = {
  render: () => ({
    components: { Button, Popover },
    setup() {
      const popover = ref<InstanceType<typeof Popover> | null>(null)
      const toggle = (event: Event) => popover.value?.toggle(event)
      const colors = [
        '#ff6b6b',
        '#4ecdc4',
        '#45b7d1',
        '#96ceb4',
        '#ffeaa7',
        '#dfe6e9',
        '#fd79a8',
        '#a29bfe'
      ]
      return { popover, toggle, colors }
    },
    template: `
      <Button label="Change Color" @click="toggle" />
      <Popover ref="popover" :pt="{ content: { class: 'p-0' } }">
        <div class="flex flex-col gap-1 p-2 bg-neutral-800 rounded-lg">
          <div class="grid grid-cols-4 gap-1">
            <button
              v-for="color in colors"
              :key="color"
              class="w-7 h-7 rounded-full hover:scale-110 transition-transform border border-neutral-600"
              :style="{ backgroundColor: color }"
            ></button>
          </div>
        </div>
      </Popover>
    `
  })
}

/**
 * Shape selection submenu
 */
export const ShapeSubmenu: Story = {
  render: () => ({
    components: { Button, Popover },
    setup() {
      const popover = ref<InstanceType<typeof Popover> | null>(null)
      const toggle = (event: Event) => popover.value?.toggle(event)
      const shapes = [
        { label: 'Default', selected: true },
        { label: 'Box', selected: false },
        { label: 'Round', selected: false },
        { label: 'Card', selected: false }
      ]
      return { popover, toggle, shapes }
    },
    template: `
      <Button label="Change Shape" @click="toggle" />
      <Popover ref="popover" :pt="{ content: { class: 'p-0' } }">
        <div class="flex flex-col p-2 min-w-40 bg-neutral-800 rounded-lg">
          <button
            v-for="shape in shapes"
            :key="shape.label"
            class="flex items-center gap-2 px-3 py-1.5 text-sm text-white hover:bg-neutral-700 rounded"
          >
            <i v-if="shape.selected" class="pi pi-check text-sm"></i>
            <div v-else class="w-4"></div>
            <span>{{ shape.label }}</span>
          </button>
        </div>
      </Popover>
    `
  })
}

/**
 * Context menu style popover
 */
export const ContextMenuPopover: Story = {
  render: () => ({
    components: { Button, Popover },
    setup() {
      const popover = ref<InstanceType<typeof Popover> | null>(null)
      const toggle = (event: Event) => popover.value?.toggle(event)
      const entries = [
        { key: 'cancel', label: 'Cancel Job', icon: 'pi pi-times' },
        { key: 'divider1', kind: 'divider' },
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
        { key: 'divider2', kind: 'divider' },
        { key: 'delete', label: 'Delete', icon: 'pi pi-trash' }
      ]
      return { popover, toggle, entries }
    },
    template: `
      <Button icon="pi pi-ellipsis-h" @click="toggle" />
      <Popover ref="popover" :pt="{ content: { class: 'p-0' } }">
        <div class="flex min-w-[14rem] flex-col items-stretch rounded-lg border border-neutral-200 bg-white px-2 py-3">
          <template v-for="entry in entries" :key="entry.key">
            <div v-if="entry.kind === 'divider'" class="px-2 py-1">
              <div class="h-px bg-neutral-200"></div>
            </div>
            <button
              v-else
              class="w-full flex items-center gap-2 bg-transparent p-2 text-xs text-neutral-900 hover:bg-neutral-100 rounded"
            >
              <i :class="entry.icon" class="text-neutral-500"></i>
              <span>{{ entry.label }}</span>
            </button>
          </template>
        </div>
      </Popover>
    `
  })
}

/**
 * Rich content popover
 */
export const RichContentPopover: Story = {
  render: () => ({
    components: { Button, Popover },
    setup() {
      const popover = ref<InstanceType<typeof Popover> | null>(null)
      const toggle = (event: Event) => popover.value?.toggle(event)
      return { popover, toggle }
    },
    template: `
      <Button label="Node Info" @click="toggle" />
      <Popover ref="popover">
        <div class="w-80 p-4">
          <div class="flex items-start gap-3 mb-4">
            <div class="w-10 h-10 rounded bg-purple-100 flex items-center justify-center">
              <i class="pi pi-box text-purple-600"></i>
            </div>
            <div>
              <h4 class="m-0 font-semibold">KSampler</h4>
              <p class="m-0 text-xs text-muted-foreground">sampling/advanced</p>
            </div>
          </div>

          <p class="text-sm text-muted-foreground mb-4">
            Sample from a diffusion model using various sampling algorithms and schedulers.
          </p>

          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">Sampling</span>
            <span class="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Core</span>
          </div>

          <div class="border-t pt-3">
            <h5 class="text-xs font-semibold text-muted-foreground mb-2">Inputs</h5>
            <div class="text-xs space-y-1">
              <div><span class="text-purple-600">MODEL</span> - model</div>
              <div><span class="text-yellow-600">CONDITIONING</span> - positive</div>
              <div><span class="text-yellow-600">CONDITIONING</span> - negative</div>
              <div><span class="text-pink-600">LATENT</span> - latent_image</div>
            </div>
          </div>
        </div>
      </Popover>
    `
  })
}

/**
 * All popover variants overview
 */
export const AllVariants: Story = {
  render: () => ({
    components: { Button, Popover },
    setup() {
      const popovers = ref<Record<string, InstanceType<typeof Popover> | null>>(
        {}
      )
      const toggle = (key: string, event: Event) =>
        popovers.value[key]?.toggle(event)
      return { popovers, toggle }
    },
    template: `
      <div class="flex flex-wrap gap-4">
        <div>
          <Button label="Basic" @click="toggle('basic', $event)" />
          <Popover :ref="el => popovers.basic = el">
            <div class="p-4 w-48">Basic popover content</div>
          </Popover>
        </div>

        <div>
          <Button label="Menu" icon="pi pi-ellipsis-v" @click="toggle('menu', $event)" />
          <Popover :ref="el => popovers.menu = el">
            <div class="w-40">
              <button class="w-full px-3 py-2 text-sm text-left hover:bg-neutral-100">Edit</button>
              <button class="w-full px-3 py-2 text-sm text-left hover:bg-neutral-100">Delete</button>
            </div>
          </Popover>
        </div>

        <div>
          <Button label="Form" @click="toggle('form', $event)" />
          <Popover :ref="el => popovers.form = el">
            <div class="p-4 w-64">
              <label class="block text-sm font-medium mb-2">Name</label>
              <input type="text" class="w-full px-3 py-2 border rounded-lg mb-3" placeholder="Enter name" />
              <Button label="Save" size="small" class="w-full" />
            </div>
          </Popover>
        </div>

        <div>
          <Button label="Confirmation" @click="toggle('confirm', $event)" severity="warn" />
          <Popover :ref="el => popovers.confirm = el">
            <div class="p-4 w-64">
              <p class="m-0 mb-4 text-sm">Are you sure you want to delete this item?</p>
              <div class="flex justify-end gap-2">
                <Button label="Cancel" size="small" severity="secondary" />
                <Button label="Delete" size="small" severity="danger" />
              </div>
            </div>
          </Popover>
        </div>
      </div>
    `
  })
}

/**
 * ComfyUI-specific popover use cases
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: { Button, Popover },
    setup() {
      const popovers = ref<Record<string, InstanceType<typeof Popover> | null>>(
        {}
      )
      const toggle = (key: string, event: Event) =>
        popovers.value[key]?.toggle(event)
      return { popovers, toggle }
    },
    template: `
      <div class="flex flex-col gap-8 p-4 w-[600px]">
        <div>
          <h4 class="text-sm font-semibold mb-3">Queue Job Actions</h4>
          <div class="flex gap-2">
            <Button icon="pi pi-info-circle" text @click="toggle('jobInfo', $event)" />
            <Popover :ref="el => popovers.jobInfo = el" :pt="{ content: { class: 'p-0' } }">
              <div class="w-64 p-4 bg-white rounded-lg">
                <h5 class="m-0 mb-2 font-semibold">Job #abc123</h5>
                <div class="text-xs space-y-1 text-muted-foreground">
                  <div>Status: Running</div>
                  <div>Progress: 45%</div>
                  <div>Time: 00:32</div>
                </div>
              </div>
            </Popover>

            <Button icon="pi pi-ellipsis-h" text @click="toggle('jobMenu', $event)" />
            <Popover :ref="el => popovers.jobMenu = el" :pt="{ content: { class: 'p-0' } }">
              <div class="w-40 py-1 bg-white rounded-lg">
                <button class="w-full px-3 py-2 text-xs text-left hover:bg-neutral-100">Cancel Job</button>
                <button class="w-full px-3 py-2 text-xs text-left hover:bg-neutral-100">Copy ID</button>
                <div class="h-px bg-neutral-200 my-1"></div>
                <button class="w-full px-3 py-2 text-xs text-left hover:bg-neutral-100 text-red-600">Delete</button>
              </div>
            </Popover>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-semibold mb-3">Node Customization</h4>
          <div class="flex gap-2">
            <Button label="Color" icon="pi pi-palette" size="small" @click="toggle('nodeColor', $event)" />
            <Popover :ref="el => popovers.nodeColor = el" :pt="{ content: { class: 'p-0' } }">
              <div class="p-2 bg-neutral-800 rounded-lg">
                <div class="grid grid-cols-4 gap-1">
                  <button v-for="c in ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#fd79a8', '#a29bfe']" :key="c" class="w-6 h-6 rounded-full border border-neutral-600" :style="{ backgroundColor: c }"></button>
                </div>
              </div>
            </Popover>

            <Button label="Shape" icon="pi pi-stop" size="small" @click="toggle('nodeShape', $event)" />
            <Popover :ref="el => popovers.nodeShape = el" :pt="{ content: { class: 'p-0' } }">
              <div class="py-1 bg-neutral-800 rounded-lg min-w-32">
                <button v-for="shape in ['Default', 'Box', 'Round', 'Card']" :key="shape" class="w-full px-3 py-1.5 text-xs text-left text-white hover:bg-neutral-700">{{ shape }}</button>
              </div>
            </Popover>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-semibold mb-3">Model Info</h4>
          <Button label="sd_xl_base_1.0" icon="pi pi-box" @click="toggle('modelInfo', $event)" />
          <Popover :ref="el => popovers.modelInfo = el">
            <div class="w-72 p-4">
              <h5 class="m-0 mb-2 font-semibold">SDXL Base 1.0</h5>
              <div class="text-xs space-y-2 text-muted-foreground">
                <div class="flex justify-between">
                  <span>Type:</span>
                  <span class="text-neutral-900">Checkpoint</span>
                </div>
                <div class="flex justify-between">
                  <span>Size:</span>
                  <span class="text-neutral-900">6.94 GB</span>
                </div>
                <div class="flex justify-between">
                  <span>Hash:</span>
                  <span class="text-neutral-900 font-mono text-[10px]">31e35c8...f2d</span>
                </div>
              </div>
              <div class="mt-3 pt-3 border-t">
                <Button label="Open in Model Browser" size="small" text class="w-full justify-start p-0" />
              </div>
            </div>
          </Popover>
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
    components: { Button, Popover },
    setup() {
      const popover = ref<InstanceType<typeof Popover> | null>(null)
      const toggle = (event: Event) => popover.value?.toggle(event)
      return { popover, toggle }
    },
    template: `
      <div class="dark-theme bg-neutral-900 p-8 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-4">Dark Theme Popover</h3>
        <Button label="Show Popover" @click="toggle" />
        <Popover ref="popover">
          <div class="p-4 w-64">
            <h4 class="m-0 mb-2 font-semibold">Dark Theme Content</h4>
            <p class="m-0 text-sm text-muted-foreground">This popover adapts to the dark theme.</p>
            <div class="mt-4 flex gap-2">
              <Button label="Action" size="small" />
              <Button label="Cancel" size="small" severity="secondary" />
            </div>
          </div>
        </Popover>
      </div>
    `
  })
}
