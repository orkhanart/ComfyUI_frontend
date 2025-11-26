import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'

/**
 * Toast Notifications
 *
 * Toast messages for user feedback and notifications.
 * ComfyUI uses PrimeVue Toast with a custom store (toastStore) for centralized management.
 *
 * Toast Severities:
 * - `success`: Positive feedback (green)
 * - `info`: Informational messages (blue)
 * - `warn`: Warning messages (yellow/orange)
 * - `error`: Error messages (red)
 *
 * Note: The actual GlobalToast component uses Pinia store for state management.
 * These stories demonstrate the visual appearance and usage patterns.
 */
const meta = {
  title: 'Feedback/Toast',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toast notifications for user feedback. Uses PrimeVue Toast with custom positioning and theming for ComfyUI.'
      }
    }
  }
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default success toast
 */
export const Default: Story = {
  render: () => ({
    components: { Toast, Button },
    setup() {
      const toast = useToast()
      const showToast = () => {
        toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Your action was completed successfully.',
          life: 5000
        })
      }
      return { showToast }
    },
    template: `
      <div>
        <Toast />
        <Button label="Show Toast" @click="showToast" />
      </div>
    `
  })
}

/**
 * All severity variants
 */
export const AllSeverities: Story = {
  render: () => ({
    components: { Toast, Button },
    setup() {
      const toast = useToast()

      const showSuccess = () => {
        toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Operation completed successfully.',
          life: 5000
        })
      }

      const showInfo = () => {
        toast.add({
          severity: 'info',
          summary: 'Information',
          detail: 'Here is some useful information.',
          life: 5000
        })
      }

      const showWarn = () => {
        toast.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Please review before proceeding.',
          life: 5000
        })
      }

      const showError = () => {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred. Please try again.',
          life: 5000
        })
      }

      return { showSuccess, showInfo, showWarn, showError }
    },
    template: `
      <div>
        <Toast />
        <div class="flex gap-4">
          <Button label="Success" severity="success" @click="showSuccess" />
          <Button label="Info" severity="info" @click="showInfo" />
          <Button label="Warning" severity="warn" @click="showWarn" />
          <Button label="Error" severity="danger" @click="showError" />
        </div>
      </div>
    `
  })
}

/**
 * Sticky toast (no auto-dismiss)
 */
export const StickyToast: Story = {
  render: () => ({
    components: { Toast, Button },
    setup() {
      const toast = useToast()
      const showSticky = () => {
        toast.add({
          severity: 'info',
          summary: 'Sticky Message',
          detail: 'This toast will not auto-dismiss. Click the X to close it.',
          closable: true
        })
      }
      return { showSticky }
    },
    template: `
      <div>
        <Toast />
        <Button label="Show Sticky Toast" @click="showSticky" />
      </div>
    `
  })
}

/**
 * Multiple toasts stacked
 */
export const MultipleToasts: Story = {
  render: () => ({
    components: { Toast, Button },
    setup() {
      const toast = useToast()
      const counter = ref(0)

      const showMultiple = () => {
        const severities = ['success', 'info', 'warn', 'error'] as const
        severities.forEach((severity, index) => {
          setTimeout(() => {
            counter.value++
            toast.add({
              severity,
              summary: `Message ${counter.value}`,
              detail: `This is ${severity} message #${counter.value}`,
              life: 5000
            })
          }, index * 200)
        })
      }

      return { showMultiple }
    },
    template: `
      <div>
        <Toast />
        <Button label="Show Multiple Toasts" @click="showMultiple" />
      </div>
    `
  })
}

/**
 * Custom duration
 */
export const CustomDuration: Story = {
  render: () => ({
    components: { Toast, Button },
    setup() {
      const toast = useToast()

      const showShort = () => {
        toast.add({
          severity: 'info',
          summary: 'Quick Message',
          detail: 'This disappears in 2 seconds.',
          life: 2000
        })
      }

      const showLong = () => {
        toast.add({
          severity: 'info',
          summary: 'Long Message',
          detail: 'This stays for 10 seconds.',
          life: 10000
        })
      }

      return { showShort, showLong }
    },
    template: `
      <div>
        <Toast />
        <div class="flex gap-4">
          <Button label="Short (2s)" severity="secondary" @click="showShort" />
          <Button label="Long (10s)" severity="secondary" @click="showLong" />
        </div>
      </div>
    `
  })
}

/**
 * Toast with detailed content
 */
export const DetailedContent: Story = {
  render: () => ({
    components: { Toast, Button },
    setup() {
      const toast = useToast()

      const showDetailed = () => {
        toast.add({
          severity: 'success',
          summary: 'Workflow Completed',
          detail:
            'Generated 4 images in 12.5 seconds\nTotal VRAM used: 8.2 GB\nOutput saved to: outputs/ComfyUI_00001.png',
          life: 8000
        })
      }

      return { showDetailed }
    },
    template: `
      <div>
        <Toast />
        <Button label="Show Detailed Toast" @click="showDetailed" />
      </div>
    `
  })
}

/**
 * ComfyUI-specific toast messages
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: { Toast, Button },
    setup() {
      const toast = useToast()

      const showWorkflowSaved = () => {
        toast.add({
          severity: 'success',
          summary: 'Workflow Saved',
          detail: 'my_workflow.json saved successfully.',
          life: 3000
        })
      }

      const showQueueAdded = () => {
        toast.add({
          severity: 'info',
          summary: 'Added to Queue',
          detail: 'Workflow added to queue position #3',
          life: 3000
        })
      }

      const showModelLoaded = () => {
        toast.add({
          severity: 'success',
          summary: 'Model Loaded',
          detail: 'sd_xl_base_1.0.safetensors loaded in 2.3s',
          life: 4000
        })
      }

      const showCUDAError = () => {
        toast.add({
          severity: 'error',
          summary: 'CUDA Error',
          detail: 'Out of memory. Try reducing image resolution or batch size.',
          life: 8000
        })
      }

      const showMissingNode = () => {
        toast.add({
          severity: 'warn',
          summary: 'Missing Node',
          detail:
            'ControlNetApply node is not installed. Some features may not work.',
          life: 6000
        })
      }

      const showCopied = () => {
        toast.add({
          severity: 'success',
          summary: 'Copied',
          detail: 'Image copied to clipboard',
          life: 2000
        })
      }

      const showExportComplete = () => {
        toast.add({
          severity: 'success',
          summary: 'Export Complete',
          detail: 'Workflow exported as workflow_export.json',
          life: 3000
        })
      }

      const showConnectionLost = () => {
        toast.add({
          severity: 'error',
          summary: 'Connection Lost',
          detail: 'Lost connection to server. Reconnecting...',
          closable: true
        })
      }

      return {
        showWorkflowSaved,
        showQueueAdded,
        showModelLoaded,
        showCUDAError,
        showMissingNode,
        showCopied,
        showExportComplete,
        showConnectionLost
      }
    },
    template: `
      <div class="flex flex-col gap-8">
        <Toast />

        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Success Messages</h3>
          <div class="flex flex-wrap gap-2">
            <Button label="Workflow Saved" size="small" severity="success" @click="showWorkflowSaved" />
            <Button label="Model Loaded" size="small" severity="success" @click="showModelLoaded" />
            <Button label="Copied" size="small" severity="success" @click="showCopied" />
            <Button label="Export Complete" size="small" severity="success" @click="showExportComplete" />
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Info Messages</h3>
          <div class="flex flex-wrap gap-2">
            <Button label="Queue Added" size="small" severity="info" @click="showQueueAdded" />
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Warning Messages</h3>
          <div class="flex flex-wrap gap-2">
            <Button label="Missing Node" size="small" severity="warn" @click="showMissingNode" />
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Error Messages</h3>
          <div class="flex flex-wrap gap-2">
            <Button label="CUDA Error" size="small" severity="danger" @click="showCUDAError" />
            <Button label="Connection Lost" size="small" severity="danger" @click="showConnectionLost" />
          </div>
        </div>
      </div>
    `
  })
}

/**
 * Toast positions (visual demo)
 */
export const ToastPositions: Story = {
  render: () => ({
    template: `
      <div class="w-[600px] h-[400px] bg-secondary-background rounded-lg relative overflow-hidden">
        <!-- Position indicators -->
        <div class="absolute top-4 left-4 text-xs text-muted-foreground">top-left</div>
        <div class="absolute top-4 right-4 text-xs text-muted-foreground">top-right</div>
        <div class="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">top-center</div>
        <div class="absolute bottom-4 left-4 text-xs text-muted-foreground">bottom-left</div>
        <div class="absolute bottom-4 right-4 text-xs text-muted-foreground">bottom-right</div>
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">bottom-center</div>

        <!-- Mock toast at top-right (ComfyUI default) -->
        <div class="absolute top-8 right-8 w-72">
          <div class="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg">
            <div class="flex items-start gap-3">
              <i class="pi pi-check-circle text-green-500 text-xl"></i>
              <div>
                <div class="font-semibold text-green-800">Success</div>
                <div class="text-sm text-green-700">ComfyUI uses top-right position</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  })
}

/**
 * Interactive toast playground
 */
export const Interactive: Story = {
  render: () => ({
    components: { Toast, Button },
    setup() {
      const toast = useToast()
      const severity = ref<'success' | 'info' | 'warn' | 'error'>('success')
      const summary = ref('Custom Toast')
      const detail = ref('This is a custom toast message.')
      const life = ref(5000)
      const sticky = ref(false)

      const showCustom = () => {
        toast.add({
          severity: severity.value,
          summary: summary.value,
          detail: detail.value,
          life: sticky.value ? undefined : life.value,
          closable: true
        })
      }

      const clearAll = () => {
        toast.removeAllGroups()
      }

      return { severity, summary, detail, life, sticky, showCustom, clearAll }
    },
    template: `
      <div class="w-[400px]">
        <Toast />

        <div class="flex flex-col gap-4 p-4 bg-secondary-background rounded-lg">
          <div>
            <label class="text-sm text-muted-foreground block mb-1">Severity</label>
            <select v-model="severity" class="w-full px-3 py-2 border rounded-lg">
              <option value="success">Success</option>
              <option value="info">Info</option>
              <option value="warn">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>

          <div>
            <label class="text-sm text-muted-foreground block mb-1">Summary</label>
            <input v-model="summary" type="text" class="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div>
            <label class="text-sm text-muted-foreground block mb-1">Detail</label>
            <textarea v-model="detail" rows="2" class="w-full px-3 py-2 border rounded-lg"></textarea>
          </div>

          <div>
            <label class="text-sm text-muted-foreground block mb-1">Duration (ms)</label>
            <input v-model.number="life" type="number" step="1000" :disabled="sticky" class="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div class="flex items-center gap-2">
            <input v-model="sticky" type="checkbox" id="sticky" />
            <label for="sticky" class="text-sm">Sticky (no auto-dismiss)</label>
          </div>

          <div class="flex gap-2">
            <Button label="Show Toast" @click="showCustom" class="flex-1" />
            <Button label="Clear All" severity="secondary" @click="clearAll" />
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
    components: { Toast, Button },
    setup() {
      const toast = useToast()

      const showAll = () => {
        const messages = [
          {
            severity: 'success',
            summary: 'Success',
            detail: 'Dark theme success message'
          },
          {
            severity: 'info',
            summary: 'Info',
            detail: 'Dark theme info message'
          },
          {
            severity: 'warn',
            summary: 'Warning',
            detail: 'Dark theme warning message'
          },
          {
            severity: 'error',
            summary: 'Error',
            detail: 'Dark theme error message'
          }
        ] as const

        messages.forEach((msg, i) => {
          setTimeout(() => {
            toast.add({ ...msg, life: 8000 })
          }, i * 300)
        })
      }

      return { showAll }
    },
    template: `
      <div class="dark-theme bg-neutral-900 p-8 rounded-lg">
        <Toast />
        <h3 class="text-sm font-semibold text-white mb-4">Dark Theme</h3>
        <Button label="Show All Toast Types" @click="showAll" />
        <p class="text-xs text-neutral-400 mt-4">
          Click the button to see all toast severities in dark mode.
        </p>
      </div>
    `
  })
}

/**
 * Static toast examples (visual reference)
 */
export const StaticExamples: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4 w-[350px]">
        <!-- Success -->
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <i class="pi pi-check-circle text-green-500 text-xl mt-0.5"></i>
            <div class="flex-1">
              <div class="font-semibold text-green-800">Success</div>
              <div class="text-sm text-green-700">Workflow saved successfully.</div>
            </div>
            <button class="text-green-500 hover:text-green-700">
              <i class="pi pi-times"></i>
            </button>
          </div>
        </div>

        <!-- Info -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <i class="pi pi-info-circle text-blue-500 text-xl mt-0.5"></i>
            <div class="flex-1">
              <div class="font-semibold text-blue-800">Information</div>
              <div class="text-sm text-blue-700">Added to queue position #3</div>
            </div>
            <button class="text-blue-500 hover:text-blue-700">
              <i class="pi pi-times"></i>
            </button>
          </div>
        </div>

        <!-- Warning -->
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <i class="pi pi-exclamation-triangle text-yellow-600 text-xl mt-0.5"></i>
            <div class="flex-1">
              <div class="font-semibold text-yellow-800">Warning</div>
              <div class="text-sm text-yellow-700">Missing custom node detected.</div>
            </div>
            <button class="text-yellow-600 hover:text-yellow-800">
              <i class="pi pi-times"></i>
            </button>
          </div>
        </div>

        <!-- Error -->
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <i class="pi pi-times-circle text-red-500 text-xl mt-0.5"></i>
            <div class="flex-1">
              <div class="font-semibold text-red-800">Error</div>
              <div class="text-sm text-red-700">CUDA out of memory error.</div>
            </div>
            <button class="text-red-500 hover:text-red-700">
              <i class="pi pi-times"></i>
            </button>
          </div>
        </div>
      </div>
    `
  })
}
