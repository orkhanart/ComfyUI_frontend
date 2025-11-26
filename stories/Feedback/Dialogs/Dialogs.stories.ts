import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import Message from 'primevue/message'
import ScrollPanel from 'primevue/scrollpanel'
import { ref } from 'vue'

/**
 * Dialogs
 *
 * Modal dialog components for confirmations, errors, and user interactions.
 * ComfyUI uses PrimeVue Dialog with custom content components.
 *
 * Dialog Types:
 * - Confirmation: Asks user to confirm an action (default, delete, overwrite, dirtyClose)
 * - Error: Displays error information with report functionality
 * - Prompt: Gets user input
 * - Settings: Configuration panels
 *
 * Note: The actual dialog components use Pinia stores for state management.
 * These stories demonstrate the visual appearance and patterns.
 */
const meta = {
  title: 'Feedback/Dialogs',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Modal dialogs for confirmations, errors, and user interactions. Uses PrimeVue Dialog with custom content components.'
      }
    }
  }
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default confirmation dialog
 */
export const ConfirmationDefault: Story = {
  render: () => ({
    components: { Dialog, Button, Message },
    setup() {
      const visible = ref(false)
      return { visible }
    },
    template: `
      <Dialog v-model:visible="visible" header="Confirm Action" :modal="true" :closable="true" :style="{ width: '450px' }">
        <section class="m-2 mt-4 flex flex-col gap-6">
          <span>Are you sure you want to proceed with this action?</span>
          <div class="flex justify-end gap-4">
            <Button label="Cancel" icon="pi pi-undo" severity="secondary" @click="visible = false" />
            <Button label="Confirm" icon="pi pi-check" severity="primary" @click="visible = false" />
          </div>
        </section>
      </Dialog>
      <Button label="Open Dialog" @click="visible = true" />
    `
  })
}

/**
 * Delete confirmation dialog
 */
export const ConfirmationDelete: Story = {
  render: () => ({
    components: { Dialog, Button },
    setup() {
      const visible = ref(false)
      return { visible }
    },
    template: `
      <Dialog v-model:visible="visible" header="Delete Workflow" :modal="true" :closable="true" :style="{ width: '450px' }">
        <section class="m-2 mt-4 flex flex-col gap-6">
          <span>Are you sure you want to delete this workflow? This action cannot be undone.</span>
          <div class="flex justify-end gap-4">
            <Button label="Cancel" icon="pi pi-undo" severity="secondary" @click="visible = false" />
            <Button label="Delete" icon="pi pi-trash" severity="danger" @click="visible = false" />
          </div>
        </section>
      </Dialog>
      <Button label="Open Delete Dialog" severity="danger" @click="visible = true" />
    `
  })
}

/**
 * Overwrite confirmation dialog
 */
export const ConfirmationOverwrite: Story = {
  render: () => ({
    components: { Dialog, Button },
    setup() {
      const visible = ref(false)
      return { visible }
    },
    template: `
      <Dialog v-model:visible="visible" header="Overwrite File" :modal="true" :closable="true" :style="{ width: '450px' }">
        <section class="m-2 mt-4 flex flex-col gap-6">
          <span>A file with this name already exists. Do you want to overwrite it?</span>
          <div class="flex justify-end gap-4">
            <Button label="Cancel" icon="pi pi-undo" severity="secondary" @click="visible = false" />
            <Button label="Overwrite" icon="pi pi-save" severity="warn" @click="visible = false" />
          </div>
        </section>
      </Dialog>
      <Button label="Open Overwrite Dialog" severity="warn" @click="visible = true" />
    `
  })
}

/**
 * Save changes dialog (dirty close)
 */
export const ConfirmationDirtyClose: Story = {
  render: () => ({
    components: { Dialog, Button },
    setup() {
      const visible = ref(false)
      return { visible }
    },
    template: `
      <Dialog v-model:visible="visible" header="Unsaved Changes" :modal="true" :closable="true" :style="{ width: '450px' }">
        <section class="m-2 mt-4 flex flex-col gap-6">
          <span>You have unsaved changes. Do you want to save before closing?</span>
          <div class="flex justify-end gap-4">
            <Button label="Cancel" icon="pi pi-undo" severity="secondary" @click="visible = false" />
            <Button label="No" icon="pi pi-times" severity="secondary" @click="visible = false" />
            <Button label="Save" icon="pi pi-save" @click="visible = false" />
          </div>
        </section>
      </Dialog>
      <Button label="Open Save Dialog" @click="visible = true" />
    `
  })
}

/**
 * Confirmation with item list
 */
export const ConfirmationWithList: Story = {
  render: () => ({
    components: { Dialog, Button },
    setup() {
      const visible = ref(false)
      const items = [
        'workflow_portrait.json',
        'workflow_landscape.json',
        'workflow_test.json'
      ]
      return { visible, items }
    },
    template: `
      <Dialog v-model:visible="visible" header="Delete Multiple Files" :modal="true" :closable="true" :style="{ width: '450px' }">
        <section class="m-2 mt-4 flex flex-col gap-6" style="white-space: pre-wrap;">
          <span>Are you sure you want to delete the following files?</span>
          <ul class="m-0 flex flex-col gap-2 pl-4">
            <li v-for="item in items" :key="item">{{ item }}</li>
          </ul>
          <div class="flex justify-end gap-4">
            <Button label="Cancel" icon="pi pi-undo" severity="secondary" @click="visible = false" />
            <Button label="Delete" icon="pi pi-trash" severity="danger" @click="visible = false" />
          </div>
        </section>
      </Dialog>
      <Button label="Open List Dialog" @click="visible = true" />
    `
  })
}

/**
 * Confirmation with hint message
 */
export const ConfirmationWithHint: Story = {
  render: () => ({
    components: { Dialog, Button, Message },
    setup() {
      const visible = ref(false)
      return { visible }
    },
    template: `
      <Dialog v-model:visible="visible" header="Clear Queue" :modal="true" :closable="true" :style="{ width: '450px' }">
        <section class="m-2 mt-4 flex flex-col gap-6">
          <span>Are you sure you want to clear the execution queue?</span>
          <Message icon="pi pi-info-circle" severity="secondary" size="small" variant="simple">
            Currently running jobs will not be affected.
          </Message>
          <div class="flex justify-end gap-4">
            <Button label="Cancel" icon="pi pi-undo" severity="secondary" @click="visible = false" />
            <Button label="Clear Queue" icon="pi pi-trash" severity="danger" @click="visible = false" />
          </div>
        </section>
      </Dialog>
      <Button label="Open Hint Dialog" @click="visible = true" />
    `
  })
}

/**
 * Confirmation with checkbox
 */
export const ConfirmationWithCheckbox: Story = {
  render: () => ({
    components: { Dialog, Button, Checkbox },
    setup() {
      const visible = ref(false)
      const doNotAskAgain = ref(false)
      return { visible, doNotAskAgain }
    },
    template: `
      <Dialog v-model:visible="visible" header="Overwrite Blueprint" :modal="true" :closable="true" :style="{ width: '450px' }">
        <section class="m-2 mt-4 flex flex-col gap-6">
          <span>This will overwrite the existing blueprint. Are you sure?</span>
          <div class="flex justify-end gap-4">
            <div class="flex justify-start gap-4 flex-1">
              <Checkbox v-model="doNotAskAgain" input-id="doNotAskAgain" binary />
              <label for="doNotAskAgain">Don't ask again</label>
            </div>
            <Button label="Cancel" icon="pi pi-undo" severity="secondary" @click="visible = false" />
            <Button label="Overwrite" icon="pi pi-save" severity="warn" @click="visible = false" />
          </div>
        </section>
      </Dialog>
      <Button label="Open Checkbox Dialog" @click="visible = true" />
    `
  })
}

/**
 * Error dialog
 */
export const ErrorDialog: Story = {
  render: () => ({
    components: { Dialog, Button, Divider, ScrollPanel },
    setup() {
      const visible = ref(false)
      const reportOpen = ref(false)
      const errorReport = `System Information:
- ComfyUI Version: 1.0.0
- Python Version: 3.12.0
- PyTorch Version: 2.6.0+cu124
- OS: Linux 6.6.87

Error Details:
RuntimeError: CUDA out of memory
  at KSampler.sample (nodes.py:1234)
  at main.execute (main.py:567)

Traceback:
File "nodes.py", line 1234, in sample
  samples = common_ksampler(model, seed, steps, cfg...)
File "samplers.py", line 456, in common_ksampler
  samples = sampler.sample(noise, latent_image...)
RuntimeError: CUDA out of memory. Tried to allocate 2.00 GiB`
      return { visible, reportOpen, errorReport }
    },
    template: `
      <Dialog v-model:visible="visible" header="Error Report" :modal="true" :closable="true" :style="{ width: '600px' }">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col items-center pb-4">
            <i class="pi pi-exclamation-circle" style="font-size: 3rem; margin-bottom: 1rem; color: var(--p-red-500)" />
            <h3 class="m-0">KSampler</h3>
            <p class="text-center text-muted-foreground">CUDA out of memory. Tried to allocate 2.00 GiB</p>
          </div>

          <div class="flex justify-center gap-2">
            <Button v-show="!reportOpen" text label="Show Report" @click="reportOpen = true" />
            <Button v-show="!reportOpen" text label="Help Fix This" />
          </div>

          <template v-if="reportOpen">
            <Divider />
            <ScrollPanel class="h-[200px] w-full">
              <pre class="break-words whitespace-pre-wrap text-xs">{{ errorReport }}</pre>
            </ScrollPanel>
            <Divider />
          </template>

          <div class="flex justify-end gap-4">
            <Button label="Find Issue" icon="pi pi-github" severity="secondary" />
            <Button v-if="reportOpen" label="Copy to Clipboard" icon="pi pi-copy" />
          </div>
        </div>
      </Dialog>
      <Button label="Open Error Dialog" severity="danger" @click="visible = true" />
    `
  })
}

/**
 * Missing nodes dialog
 */
export const MissingNodesDialog: Story = {
  render: () => ({
    components: { Dialog, Button },
    setup() {
      const visible = ref(false)
      const missingNodes = [
        { name: 'ControlNetApply', package: 'comfyui-controlnet' },
        { name: 'IPAdapterApply', package: 'comfyui-ipadapter' },
        { name: 'FaceDetailer', package: 'comfyui-impact-pack' }
      ]
      return { visible, missingNodes }
    },
    template: `
      <Dialog v-model:visible="visible" header="Missing Nodes" :modal="true" :closable="true" :style="{ width: '500px' }">
        <div class="flex flex-col gap-4 p-2">
          <p class="m-0">The following custom nodes are required but not installed:</p>
          <div class="flex flex-col gap-2">
            <div
              v-for="node in missingNodes"
              :key="node.name"
              class="flex items-center justify-between p-3 bg-secondary-background rounded-lg"
            >
              <div>
                <div class="font-medium">{{ node.name }}</div>
                <div class="text-xs text-muted-foreground">{{ node.package }}</div>
              </div>
              <Button label="Install" size="small" severity="secondary" />
            </div>
          </div>
          <div class="flex justify-end gap-4 mt-2">
            <Button label="Skip" severity="secondary" @click="visible = false" />
            <Button label="Install All" icon="pi pi-download" @click="visible = false" />
          </div>
        </div>
      </Dialog>
      <Button label="Open Missing Nodes Dialog" @click="visible = true" />
    `
  })
}

/**
 * Settings dialog layout
 */
export const SettingsDialog: Story = {
  render: () => ({
    components: { Dialog, Button },
    setup() {
      const visible = ref(false)
      const activeTab = ref('general')
      const tabs = [
        { id: 'general', label: 'General', icon: 'pi pi-cog' },
        { id: 'keybindings', label: 'Keybindings', icon: 'pi pi-key' },
        { id: 'about', label: 'About', icon: 'pi pi-info-circle' }
      ]
      return { visible, activeTab, tabs }
    },
    template: `
      <Dialog v-model:visible="visible" header="Settings" :modal="true" :closable="true" :style="{ width: '800px', height: '600px' }">
        <div class="flex h-full">
          <!-- Sidebar -->
          <div class="w-48 border-r border-neutral-200 p-2">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors"
              :class="activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-neutral-100'"
            >
              <i :class="tab.icon"></i>
              <span>{{ tab.label }}</span>
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 p-6">
            <div v-if="activeTab === 'general'">
              <h3 class="text-lg font-semibold mb-4">General Settings</h3>
              <p class="text-muted-foreground">Configure general application settings here.</p>
            </div>
            <div v-else-if="activeTab === 'keybindings'">
              <h3 class="text-lg font-semibold mb-4">Keyboard Shortcuts</h3>
              <p class="text-muted-foreground">Customize keyboard shortcuts.</p>
            </div>
            <div v-else-if="activeTab === 'about'">
              <h3 class="text-lg font-semibold mb-4">About ComfyUI</h3>
              <p class="text-muted-foreground">Version and license information.</p>
            </div>
          </div>
        </div>
      </Dialog>
      <Button label="Open Settings" icon="pi pi-cog" @click="visible = true" />
    `
  })
}

/**
 * All dialog types overview
 */
export const AllDialogTypes: Story = {
  render: () => ({
    components: { Dialog, Button, Message },
    setup() {
      const dialogs = ref({
        confirm: false,
        delete: false,
        error: false,
        info: false
      })
      return { dialogs }
    },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex gap-4">
          <Button label="Confirmation" @click="dialogs.confirm = true" />
          <Button label="Delete" severity="danger" @click="dialogs.delete = true" />
          <Button label="Error" severity="warn" @click="dialogs.error = true" />
          <Button label="Info" severity="info" @click="dialogs.info = true" />
        </div>

        <!-- Confirmation -->
        <Dialog v-model:visible="dialogs.confirm" header="Confirm" :modal="true" :style="{ width: '400px' }">
          <p>Are you sure you want to proceed?</p>
          <div class="flex justify-end gap-2 mt-4">
            <Button label="Cancel" severity="secondary" @click="dialogs.confirm = false" />
            <Button label="Confirm" @click="dialogs.confirm = false" />
          </div>
        </Dialog>

        <!-- Delete -->
        <Dialog v-model:visible="dialogs.delete" header="Delete Item" :modal="true" :style="{ width: '400px' }">
          <p>This action cannot be undone. Are you sure?</p>
          <div class="flex justify-end gap-2 mt-4">
            <Button label="Cancel" severity="secondary" @click="dialogs.delete = false" />
            <Button label="Delete" severity="danger" @click="dialogs.delete = false" />
          </div>
        </Dialog>

        <!-- Error -->
        <Dialog v-model:visible="dialogs.error" header="Error" :modal="true" :style="{ width: '400px' }">
          <div class="flex items-start gap-3">
            <i class="pi pi-exclamation-triangle text-orange-500 text-2xl"></i>
            <div>
              <p class="font-medium">An error occurred</p>
              <p class="text-sm text-muted-foreground">Please try again later.</p>
            </div>
          </div>
          <div class="flex justify-end gap-2 mt-4">
            <Button label="Close" @click="dialogs.error = false" />
          </div>
        </Dialog>

        <!-- Info -->
        <Dialog v-model:visible="dialogs.info" header="Information" :modal="true" :style="{ width: '400px' }">
          <div class="flex items-start gap-3">
            <i class="pi pi-info-circle text-blue-500 text-2xl"></i>
            <div>
              <p>Your workflow has been saved successfully.</p>
            </div>
          </div>
          <div class="flex justify-end gap-2 mt-4">
            <Button label="OK" @click="dialogs.info = false" />
          </div>
        </Dialog>
      </div>
    `
  })
}

/**
 * ComfyUI-specific dialog use cases
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: { Dialog, Button, Message },
    setup() {
      const visible = ref<string | null>(null)
      return { visible }
    },
    template: `
      <div class="flex flex-col gap-8 w-[600px]">
        <div class="flex flex-wrap gap-4">
          <Button label="Clear Queue" @click="visible = 'queue'" />
          <Button label="Reset Workflow" severity="warn" @click="visible = 'reset'" />
          <Button label="Missing Models" severity="danger" @click="visible = 'models'" />
          <Button label="API Key" @click="visible = 'api'" />
        </div>

        <!-- Clear Queue -->
        <Dialog v-model:visible="visible" :visible="visible === 'queue'" header="Clear Queue" :modal="true" :style="{ width: '400px' }" @hide="visible = null">
          <p>Clear all pending items from the queue?</p>
          <Message severity="info" size="small">Running items will complete normally.</Message>
          <div class="flex justify-end gap-2 mt-4">
            <Button label="Cancel" severity="secondary" @click="visible = null" />
            <Button label="Clear" severity="danger" @click="visible = null" />
          </div>
        </Dialog>

        <!-- Reset Workflow -->
        <Dialog v-model:visible="visible" :visible="visible === 'reset'" header="Reset Workflow" :modal="true" :style="{ width: '400px' }" @hide="visible = null">
          <p>This will reset the workflow to its default state. All unsaved changes will be lost.</p>
          <div class="flex justify-end gap-2 mt-4">
            <Button label="Cancel" severity="secondary" @click="visible = null" />
            <Button label="Reset" severity="warn" @click="visible = null" />
          </div>
        </Dialog>

        <!-- Missing Models -->
        <Dialog v-model:visible="visible" :visible="visible === 'models'" header="Missing Models" :modal="true" :style="{ width: '450px' }" @hide="visible = null">
          <p class="mb-4">The following models are required but not found:</p>
          <div class="flex flex-col gap-2 mb-4">
            <div class="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div class="font-medium text-red-800">sd_xl_base_1.0.safetensors</div>
              <div class="text-xs text-red-600">checkpoints/</div>
            </div>
            <div class="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div class="font-medium text-red-800">sdxl_vae.safetensors</div>
              <div class="text-xs text-red-600">vae/</div>
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <Button label="Continue Anyway" severity="secondary" @click="visible = null" />
            <Button label="Download Models" @click="visible = null" />
          </div>
        </Dialog>

        <!-- API Key -->
        <Dialog v-model:visible="visible" :visible="visible === 'api'" header="API Key Required" :modal="true" :style="{ width: '400px' }" @hide="visible = null">
          <p class="mb-4">Enter your API key to use cloud features:</p>
          <input type="password" placeholder="sk-..." class="w-full px-3 py-2 border rounded-lg mb-4" />
          <div class="flex justify-end gap-2">
            <Button label="Cancel" severity="secondary" @click="visible = null" />
            <Button label="Save" @click="visible = null" />
          </div>
        </Dialog>
      </div>
    `
  })
}

/**
 * Dark theme preview
 */
export const DarkTheme: Story = {
  render: () => ({
    components: { Dialog, Button, Message },
    setup() {
      const visible = ref(false)
      return { visible }
    },
    template: `
      <div class="dark-theme bg-neutral-900 p-8 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-4">Dark Theme</h3>
        <Button label="Open Dialog" @click="visible = true" />
        <Dialog v-model:visible="visible" header="Dark Theme Dialog" :modal="true" :style="{ width: '400px' }">
          <p>This is how dialogs look in dark theme.</p>
          <Message severity="info" size="small">Information message in dark mode.</Message>
          <div class="flex justify-end gap-2 mt-4">
            <Button label="Cancel" severity="secondary" @click="visible = false" />
            <Button label="Confirm" @click="visible = false" />
          </div>
        </Dialog>
      </div>
    `
  })
}
