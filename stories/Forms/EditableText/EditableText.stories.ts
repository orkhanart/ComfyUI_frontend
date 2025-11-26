import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import EditableText from '@/components/common/EditableText.vue'

/**
 * EditableText
 *
 * An inline editable text component that toggles between display and edit modes.
 * Click to edit, Enter to save, Escape to cancel.
 *
 * Props:
 * - `modelValue`: string - the text value
 * - `isEditing`: boolean - whether in edit mode (default: false)
 * - `inputAttrs`: Record<string, any> - additional attributes for the input
 *
 * Events:
 * - `update:modelValue`: emits new value
 * - `edit`: emits when editing is complete with new value
 * - `cancel`: emits when editing is cancelled
 */
const meta: Meta<typeof EditableText> = {
  title: 'Forms/EditableText',
  component: EditableText,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Inline editable text that switches between display and edit mode. Used for renaming workflows, tabs, and other in-place text editing.'
      }
    }
  },
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Current text value'
    },
    isEditing: {
      control: 'boolean',
      description: 'Whether the component is in edit mode'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default state - displays text, click to edit
 */
export const Default: Story = {
  render: (args) => ({
    components: { EditableText },
    setup() {
      const text = ref('My Workflow')
      const isEditing = ref(false)
      const handleEdit = (newValue: string) => {
        text.value = newValue
        isEditing.value = false
      }
      const handleCancel = () => {
        isEditing.value = false
      }
      return { args, text, isEditing, handleEdit, handleCancel }
    },
    template: `
      <div>
        <div
          class="p-2 rounded hover:bg-secondary-background cursor-pointer"
          @click="isEditing = true"
        >
          <EditableText
            v-bind="args"
            :modelValue="text"
            :isEditing="isEditing"
            @edit="handleEdit"
            @cancel="handleCancel"
          />
        </div>
        <p class="mt-4 text-sm text-muted-foreground">
          Value: "{{ text }}" | Editing: {{ isEditing }}
        </p>
        <p class="text-xs text-muted-foreground mt-1">
          Click to edit, Enter to save, Escape to cancel
        </p>
      </div>
    `
  }),
  args: {
    modelValue: 'My Workflow'
  }
}

/**
 * In editing mode
 */
export const EditingMode: Story = {
  render: () => ({
    components: { EditableText },
    setup() {
      const text = ref('Click to start editing')
      const isEditing = ref(true)
      const handleEdit = (newValue: string) => {
        text.value = newValue
        isEditing.value = false
      }
      const handleCancel = () => {
        isEditing.value = false
      }
      return { text, isEditing, handleEdit, handleCancel }
    },
    template: `
      <div>
        <EditableText
          :modelValue="text"
          :isEditing="isEditing"
          @edit="handleEdit"
          @cancel="handleCancel"
        />
        <p class="mt-4 text-xs text-muted-foreground">
          Press Enter to save, Escape to cancel
        </p>
      </div>
    `
  })
}

/**
 * Workflow tab name editing
 */
export const WorkflowTab: Story = {
  render: () => ({
    components: { EditableText },
    setup() {
      const name = ref('Untitled Workflow')
      const isEditing = ref(false)
      const handleEdit = (newValue: string) => {
        name.value = newValue
        isEditing.value = false
      }
      const handleCancel = () => {
        isEditing.value = false
      }
      return { name, isEditing, handleEdit, handleCancel }
    },
    template: `
      <div class="flex items-center gap-2 px-3 py-2 bg-secondary-background rounded-t-lg border-b-2 border-primary-background">
        <i class="icon-[lucide--file] text-sm text-muted-foreground" />
        <div
          class="cursor-pointer"
          @dblclick="isEditing = true"
        >
          <EditableText
            :modelValue="name"
            :isEditing="isEditing"
            @edit="handleEdit"
            @cancel="handleCancel"
          />
        </div>
        <i class="icon-[lucide--x] text-sm text-muted-foreground hover:text-base-foreground cursor-pointer" />
      </div>
      <p class="mt-4 text-xs text-muted-foreground">Double-click to rename</p>
    `
  })
}

/**
 * File name with extension
 */
export const FileName: Story = {
  render: () => ({
    components: { EditableText },
    setup() {
      const name = ref('my-workflow.json')
      const isEditing = ref(false)
      const handleEdit = (newValue: string) => {
        name.value = newValue
        isEditing.value = false
      }
      const handleCancel = () => {
        isEditing.value = false
      }
      return { name, isEditing, handleEdit, handleCancel }
    },
    template: `
      <div class="flex items-center gap-3 p-3 bg-secondary-background rounded-lg">
        <i class="icon-[lucide--file-json] text-lg text-blue-400" />
        <div class="flex-1">
          <div
            class="cursor-pointer"
            @dblclick="isEditing = true"
          >
            <EditableText
              :modelValue="name"
              :isEditing="isEditing"
              @edit="handleEdit"
              @cancel="handleCancel"
            />
          </div>
          <div class="text-xs text-muted-foreground mt-1">
            Last modified: Today, 3:45 PM
          </div>
        </div>
        <i class="icon-[lucide--more-horizontal] text-muted-foreground" />
      </div>
      <p class="mt-3 text-xs text-muted-foreground">
        Note: When editing, only the filename (without extension) is selected
      </p>
    `
  })
}

/**
 * Group/folder name
 */
export const GroupName: Story = {
  render: () => ({
    components: { EditableText },
    setup() {
      const name = ref('My Workflows')
      const isEditing = ref(false)
      const handleEdit = (newValue: string) => {
        name.value = newValue
        isEditing.value = false
      }
      const handleCancel = () => {
        isEditing.value = false
      }
      return { name, isEditing, handleEdit, handleCancel }
    },
    template: `
      <div class="w-64 p-3 bg-secondary-background rounded-lg">
        <div class="flex items-center gap-2">
          <i class="icon-[lucide--folder] text-yellow-400" />
          <div
            class="flex-1 font-medium cursor-pointer"
            @dblclick="isEditing = true"
          >
            <EditableText
              :modelValue="name"
              :isEditing="isEditing"
              @edit="handleEdit"
              @cancel="handleCancel"
            />
          </div>
          <span class="text-xs text-muted-foreground">12 items</span>
        </div>
      </div>
    `
  })
}

/**
 * Node title editing simulation
 */
export const NodeTitle: Story = {
  render: () => ({
    components: { EditableText },
    setup() {
      const title = ref('CLIPTextEncode')
      const isEditing = ref(false)
      const handleEdit = (newValue: string) => {
        title.value = newValue
        isEditing.value = false
      }
      const handleCancel = () => {
        isEditing.value = false
      }
      return { title, isEditing, handleEdit, handleCancel }
    },
    template: `
      <div class="w-64 rounded-lg overflow-hidden border border-border-default">
        <div
          class="bg-blue-600 px-3 py-2 cursor-pointer"
          @dblclick="isEditing = true"
        >
          <EditableText
            class="text-white text-sm font-medium"
            :modelValue="title"
            :isEditing="isEditing"
            @edit="handleEdit"
            @cancel="handleCancel"
          />
        </div>
        <div class="bg-secondary-background p-3">
          <div class="text-xs text-muted-foreground">Node content...</div>
        </div>
      </div>
    `
  })
}

/**
 * List of editable items
 */
export const EditableList: Story = {
  render: () => ({
    components: { EditableText },
    setup() {
      const items = ref([
        { id: 1, name: 'First Item', editing: false },
        { id: 2, name: 'Second Item', editing: false },
        { id: 3, name: 'Third Item', editing: false }
      ])
      const handleEdit = (
        item: { id: number; name: string; editing: boolean },
        newValue: string
      ) => {
        item.name = newValue
        item.editing = false
      }
      const handleCancel = (item: {
        id: number
        name: string
        editing: boolean
      }) => {
        item.editing = false
      }
      return { items, handleEdit, handleCancel }
    },
    template: `
      <div class="w-64 bg-secondary-background rounded-lg overflow-hidden">
        <div
          v-for="item in items"
          :key="item.id"
          class="flex items-center gap-2 p-3 border-b border-border-default last:border-b-0 hover:bg-neutral-700/50"
        >
          <i class="icon-[lucide--grip-vertical] text-muted-foreground" />
          <div
            class="flex-1 cursor-pointer"
            @dblclick="item.editing = true"
          >
            <EditableText
              :modelValue="item.name"
              :isEditing="item.editing"
              @edit="(val) => handleEdit(item, val)"
              @cancel="() => handleCancel(item)"
            />
          </div>
          <i class="icon-[lucide--trash-2] text-sm text-muted-foreground hover:text-red-400 cursor-pointer" />
        </div>
      </div>
    `
  })
}

/**
 * Interactive demonstration
 */
export const Interactive: Story = {
  render: () => ({
    components: { EditableText },
    setup() {
      const text = ref('Double-click me to edit')
      const isEditing = ref(false)
      const history = ref<string[]>([])
      const handleEdit = (newValue: string) => {
        if (newValue !== text.value) {
          history.value.push(`Changed: "${text.value}" → "${newValue}"`)
          text.value = newValue
        }
        isEditing.value = false
      }
      const handleCancel = () => {
        history.value.push('Edit cancelled')
        isEditing.value = false
      }
      return { text, isEditing, history, handleEdit, handleCancel }
    },
    template: `
      <div class="w-80">
        <div
          class="p-4 bg-secondary-background rounded-lg cursor-pointer"
          @dblclick="isEditing = true"
        >
          <EditableText
            class="text-lg"
            :modelValue="text"
            :isEditing="isEditing"
            @edit="handleEdit"
            @cancel="handleCancel"
          />
        </div>
        <div v-if="history.length > 0" class="mt-4 p-3 bg-neutral-800 rounded text-xs text-muted-foreground">
          <div class="font-semibold mb-1">History:</div>
          <div v-for="(entry, i) in history.slice(-5)" :key="i">{{ entry }}</div>
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
    components: { EditableText },
    setup() {
      const items = ref([
        { name: 'workflow-1.json', editing: false },
        { name: 'portrait-generator.json', editing: false },
        { name: 'upscaler-4x.json', editing: false }
      ])
      const handleEdit = (
        item: { name: string; editing: boolean },
        newValue: string
      ) => {
        item.name = newValue
        item.editing = false
      }
      const handleCancel = (item: { name: string; editing: boolean }) => {
        item.editing = false
      }
      return { items, handleEdit, handleCancel }
    },
    template: `
      <div class="dark-theme bg-neutral-900 p-6 rounded-lg">
        <h3 class="text-sm font-semibold text-white mb-4">Dark Theme - File List</h3>
        <div class="space-y-2">
          <div
            v-for="(item, i) in items"
            :key="i"
            class="flex items-center gap-2 p-2 rounded hover:bg-neutral-800"
          >
            <i class="icon-[lucide--file-json] text-blue-400" />
            <div
              class="flex-1 text-sm cursor-pointer"
              @dblclick="item.editing = true"
            >
              <EditableText
                :modelValue="item.name"
                :isEditing="item.editing"
                @edit="(val) => handleEdit(item, val)"
                @cancel="() => handleCancel(item)"
              />
            </div>
          </div>
        </div>
        <p class="mt-4 text-xs text-neutral-500">Double-click to rename</p>
      </div>
    `
  })
}
