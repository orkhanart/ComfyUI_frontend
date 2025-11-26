import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Button from 'primevue/button'
import ColorPicker from 'primevue/colorpicker'
import SelectButton from 'primevue/selectbutton'

import ColorCustomizationSelector from '@/components/common/ColorCustomizationSelector.vue'

// Mock color options for folder customization
const folderColorOptions = [
  { name: 'default', value: '#6366f1' },
  { name: 'blue', value: '#007bff' },
  { name: 'green', value: '#28a745' },
  { name: 'red', value: '#dc3545' },
  { name: 'pink', value: '#e83e8c' },
  { name: 'yellow', value: '#ffc107' }
]

// Mock icon options
const iconOptions = [
  { name: 'Bookmark', value: 'pi-bookmark' },
  { name: 'Folder', value: 'pi-folder' },
  { name: 'Star', value: 'pi-star' },
  { name: 'Heart', value: 'pi-heart' },
  { name: 'File', value: 'pi-file' },
  { name: 'Inbox', value: 'pi-inbox' },
  { name: 'Box', value: 'pi-box' },
  { name: 'Briefcase', value: 'pi-briefcase' }
]

/**
 * Customization components allow users to personalize UI elements like
 * folder colors, icons, and other visual properties. These components
 * are used in dialogs for customizing bookmarks, folders, and other items.
 *
 * - **ColorCustomizationSelector**: Preset colors with optional custom color picker
 * - **CustomizationDialog**: Dialog for icon and color selection (store-dependent)
 */
const meta = {
  title: 'Utilities/Customization',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Components for customizing visual properties like colors and icons in ComfyUI.'
      }
    }
  }
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * ColorCustomizationSelector provides preset color options with
 * an optional custom color picker for full flexibility.
 */
export const ColorSelectorDefault: Story = {
  render: () => ({
    components: { ColorCustomizationSelector },
    setup() {
      return { colorOptions: folderColorOptions }
    },
    data() {
      return { selectedColor: '#6366f1' }
    },
    template: `
      <div style="padding: 24px; background: var(--p-surface-0); border-radius: 8px; width: 400px;">
        <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Select Color</h4>
        <ColorCustomizationSelector
          v-model="selectedColor"
          :colorOptions="colorOptions"
        />
        <p style="margin: 16px 0 0 0; font-size: 12px; color: var(--p-text-muted-color);">
          Selected: {{ selectedColor }}
        </p>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'ColorCustomizationSelector with preset colors and custom color option.'
      }
    }
  }
}

/**
 * ColorCustomizationSelector without custom color option.
 */
export const ColorSelectorPresetsOnly: Story = {
  render: () => ({
    components: { ColorCustomizationSelector },
    setup() {
      return { colorOptions: folderColorOptions }
    },
    data() {
      return { selectedColor: '#007bff' }
    },
    template: `
      <div style="padding: 24px; background: var(--p-surface-0); border-radius: 8px; width: 400px;">
        <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Preset Colors Only</h4>
        <ColorCustomizationSelector
          v-model="selectedColor"
          :colorOptions="colorOptions"
          :allowCustom="false"
        />
        <p style="margin: 16px 0 0 0; font-size: 12px; color: var(--p-text-muted-color);">
          Selected: {{ selectedColor }}
        </p>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'ColorCustomizationSelector with only preset colors, no custom picker.'
      }
    }
  }
}

/**
 * Icon selection using SelectButton for bookmark/folder customization.
 */
export const IconSelector: Story = {
  render: () => ({
    components: { SelectButton },
    setup() {
      return { iconOptions }
    },
    data() {
      return {
        selectedIcon: { name: 'Bookmark', value: 'pi-bookmark' },
        color: '#6366f1'
      }
    },
    template: `
      <div style="padding: 24px; background: var(--p-surface-0); border-radius: 8px; width: 450px;">
        <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Select Icon</h4>
        <SelectButton
          v-model="selectedIcon"
          :options="iconOptions"
          optionLabel="name"
          dataKey="value"
        >
          <template #option="slotProps">
            <i
              :class="['pi', slotProps.option.value]"
              :style="{ color: color, fontSize: '1.25rem' }"
            />
          </template>
        </SelectButton>
        <p style="margin: 16px 0 0 0; font-size: 12px; color: var(--p-text-muted-color);">
          Selected: {{ selectedIcon?.name }} ({{ selectedIcon?.value }})
        </p>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Icon selector using SelectButton with PrimeIcons for folder/bookmark customization.'
      }
    }
  }
}

/**
 * Complete customization dialog pattern combining icon and color selection.
 */
export const CustomizationDialogPattern: Story = {
  render: () => ({
    components: { SelectButton, ColorCustomizationSelector, Button },
    setup() {
      return { iconOptions, colorOptions: folderColorOptions }
    },
    data() {
      return {
        selectedIcon: { name: 'Bookmark', value: 'pi-bookmark' },
        selectedColor: '#6366f1'
      }
    },
    template: `
      <div style="width: 400px; background: var(--p-surface-0); border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.15);">
        <!-- Header -->
        <div style="padding: 16px 20px; border-bottom: 1px solid var(--p-surface-border);">
          <h3 style="margin: 0; font-size: 16px; font-weight: 600;">Customize Folder</h3>
        </div>

        <!-- Body -->
        <div style="padding: 20px;">
          <!-- Icon Selection -->
          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 500;">Icon</label>
            <SelectButton
              v-model="selectedIcon"
              :options="iconOptions"
              optionLabel="name"
              dataKey="value"
            >
              <template #option="slotProps">
                <i
                  :class="['pi', slotProps.option.value]"
                  :style="{ color: selectedColor, fontSize: '1.25rem' }"
                />
              </template>
            </SelectButton>
          </div>

          <!-- Divider -->
          <hr style="border: none; border-top: 1px solid var(--p-surface-border); margin: 16px 0;" />

          <!-- Color Selection -->
          <div>
            <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 500;">Color</label>
            <ColorCustomizationSelector
              v-model="selectedColor"
              :colorOptions="colorOptions"
            />
          </div>

          <!-- Preview -->
          <div style="margin-top: 20px; padding: 16px; background: var(--p-surface-50); border-radius: 6px; text-align: center;">
            <p style="margin: 0 0 8px 0; font-size: 11px; color: var(--p-text-muted-color);">Preview</p>
            <i
              :class="['pi', selectedIcon?.value]"
              :style="{ color: selectedColor, fontSize: '2rem' }"
            />
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 12px 20px; border-top: 1px solid var(--p-surface-border); display: flex; justify-content: flex-end; gap: 8px;">
          <Button label="Reset" icon="pi pi-refresh" text />
          <Button label="Confirm" icon="pi pi-check" />
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Complete customization dialog pattern with icon selector, color picker, and live preview.'
      }
    }
  }
}

/**
 * Node color customization pattern used for graph nodes.
 */
export const NodeColorCustomization: Story = {
  render: () => ({
    components: { ColorPicker },
    data() {
      return {
        nodeColor: '4a5568',
        nodeBgColor: '1a1a2e'
      }
    },
    template: `
      <div style="padding: 24px; background: var(--p-surface-0); border-radius: 8px; width: 350px;">
        <h4 style="margin: 0 0 20px 0; font-size: 14px; font-weight: 600;">Node Appearance</h4>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <!-- Title Color -->
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <label style="font-size: 13px;">Title Color</label>
            <div style="display: flex; align-items: center; gap: 8px;">
              <ColorPicker v-model="nodeColor" />
              <span style="font-size: 12px; font-family: monospace; color: var(--p-text-muted-color);">#{{ nodeColor }}</span>
            </div>
          </div>

          <!-- Background Color -->
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <label style="font-size: 13px;">Background Color</label>
            <div style="display: flex; align-items: center; gap: 8px;">
              <ColorPicker v-model="nodeBgColor" />
              <span style="font-size: 12px; font-family: monospace; color: var(--p-text-muted-color);">#{{ nodeBgColor }}</span>
            </div>
          </div>
        </div>

        <!-- Preview -->
        <div style="margin-top: 20px;">
          <p style="margin: 0 0 8px 0; font-size: 11px; color: var(--p-text-muted-color);">Preview</p>
          <div
            :style="{
              backgroundColor: '#' + nodeBgColor,
              borderRadius: '8px',
              overflow: 'hidden'
            }"
          >
            <div
              :style="{
                backgroundColor: '#' + nodeColor,
                padding: '8px 12px',
                color: 'white',
                fontSize: '12px',
                fontWeight: '600'
              }"
            >
              KSampler
            </div>
            <div style="padding: 12px; color: #888; font-size: 11px;">
              Node content...
            </div>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Node color customization for graph nodes with title and background colors.'
      }
    }
  }
}

/**
 * Theme color palette customization.
 */
export const ThemeColorPalette: Story = {
  render: () => ({
    setup() {
      const themeColors = [
        {
          name: 'Primary',
          value: '#6366f1',
          usage: 'Main actions, active states'
        },
        { name: 'Secondary', value: '#64748b', usage: 'Secondary actions' },
        {
          name: 'Success',
          value: '#22c55e',
          usage: 'Success states, completion'
        },
        { name: 'Warning', value: '#f59e0b', usage: 'Warnings, caution' },
        {
          name: 'Danger',
          value: '#ef4444',
          usage: 'Errors, destructive actions'
        },
        { name: 'Info', value: '#3b82f6', usage: 'Information, help' }
      ]
      return { themeColors }
    },
    template: `
      <div style="padding: 24px; background: var(--p-surface-0); border-radius: 8px; width: 450px;">
        <h4 style="margin: 0 0 20px 0; font-size: 14px; font-weight: 600;">Theme Colors</h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div
            v-for="color in themeColors"
            :key="color.name"
            style="display: flex; align-items: center; gap: 12px; padding: 8px; background: var(--p-surface-50); border-radius: 6px;"
          >
            <div
              :style="{
                width: '32px',
                height: '32px',
                backgroundColor: color.value,
                borderRadius: '6px',
                flexShrink: 0
              }"
            />
            <div style="flex: 1;">
              <p style="margin: 0; font-size: 13px; font-weight: 500;">{{ color.name }}</p>
              <p style="margin: 2px 0 0 0; font-size: 11px; color: var(--p-text-muted-color);">{{ color.usage }}</p>
            </div>
            <span style="font-size: 11px; font-family: monospace; color: var(--p-text-muted-color);">{{ color.value }}</span>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Theme color palette showing semantic colors used throughout the application.'
      }
    }
  }
}

/**
 * ComfyUI use cases for customization components.
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: { SelectButton, ColorCustomizationSelector, Button },
    setup() {
      return { iconOptions, colorOptions: folderColorOptions }
    },
    data() {
      return {
        bookmarkIcon: { name: 'Star', value: 'pi-star' },
        bookmarkColor: '#ffc107',
        groupColor: '22c55e',
        wireColor: '6366f1'
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px; background: var(--p-surface-100);">
        <!-- Node Bookmark Customization -->
        <div style="width: 380px;">
          <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Bookmark Customization</h4>
          <div style="background: var(--p-surface-0); padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
              <i
                :class="['pi', bookmarkIcon?.value]"
                :style="{ color: bookmarkColor, fontSize: '1.5rem' }"
              />
              <div>
                <p style="margin: 0; font-size: 14px; font-weight: 500;">My Favorites</p>
                <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--p-text-muted-color);">12 nodes</p>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <SelectButton
                v-model="bookmarkIcon"
                :options="iconOptions.slice(0, 4)"
                optionLabel="name"
                dataKey="value"
                size="small"
              >
                <template #option="slotProps">
                  <i :class="['pi', slotProps.option.value]" :style="{ color: bookmarkColor }" />
                </template>
              </SelectButton>
              <ColorCustomizationSelector
                v-model="bookmarkColor"
                :colorOptions="colorOptions"
              />
            </div>
          </div>
        </div>

        <!-- Group Color -->
        <div style="width: 300px;">
          <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Group Color</h4>
          <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div
              :style="{
                backgroundColor: '#' + groupColor + '20',
                border: '2px solid #' + groupColor,
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '12px'
              }"
            >
              <p :style="{ margin: 0, fontSize: '12px', fontWeight: 600, color: '#' + groupColor }">
                Image Processing
              </p>
              <p style="margin: 4px 0 0 0; font-size: 11px; color: var(--p-text-muted-color);">
                Contains 5 nodes
              </p>
            </div>
            <div style="display: flex; gap: 8px;">
              <div
                v-for="color in ['22c55e', '3b82f6', 'f59e0b', 'ef4444', '8b5cf6']"
                :key="color"
                :style="{
                  width: '28px',
                  height: '28px',
                  backgroundColor: '#' + color,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  border: groupColor === color ? '2px solid white' : 'none',
                  boxShadow: groupColor === color ? '0 0 0 2px #' + color : 'none'
                }"
                @click="groupColor = color"
              />
            </div>
          </div>
        </div>

        <!-- Wire Color -->
        <div style="width: 300px;">
          <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Wire Color by Type</h4>
          <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 12px;">MODEL</span>
                <div style="width: 60px; height: 4px; background: #8b5cf6; border-radius: 2px;"></div>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 12px;">CLIP</span>
                <div style="width: 60px; height: 4px; background: #fbbf24; border-radius: 2px;"></div>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 12px;">VAE</span>
                <div style="width: 60px; height: 4px; background: #f472b6; border-radius: 2px;"></div>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 12px;">CONDITIONING</span>
                <div style="width: 60px; height: 4px; background: #fb923c; border-radius: 2px;"></div>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 12px;">LATENT</span>
                <div style="width: 60px; height: 4px; background: #f472b6; border-radius: 2px;"></div>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 12px;">IMAGE</span>
                <div style="width: 60px; height: 4px; background: #6366f1; border-radius: 2px;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Real-world usage in ComfyUI: bookmark customization, group colors, and wire type colors.'
      }
    }
  }
}

/**
 * Dark theme visualization of customization components.
 */
export const DarkTheme: Story = {
  render: () => ({
    components: { ColorCustomizationSelector },
    setup() {
      return { colorOptions: folderColorOptions }
    },
    data() {
      return { selectedColor: '#6366f1' }
    },
    template: `
      <div class="dark" style="padding: 24px; background: #1a1a1a; border-radius: 8px;">
        <div style="display: flex; gap: 24px; flex-wrap: wrap;">
          <!-- Color Selector -->
          <div style="padding: 20px; background: #2a2a2a; border-radius: 8px; width: 350px;">
            <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #e5e5e5;">Color Selection</h4>
            <ColorCustomizationSelector
              v-model="selectedColor"
              :colorOptions="colorOptions"
            />
          </div>

          <!-- Preview -->
          <div style="padding: 20px; background: #2a2a2a; border-radius: 8px; width: 200px;">
            <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #e5e5e5;">Preview</h4>
            <div style="display: flex; align-items: center; gap: 12px;">
              <i
                class="pi pi-bookmark"
                :style="{ color: selectedColor, fontSize: '2rem' }"
              />
              <div>
                <p style="margin: 0; font-size: 13px; color: #e5e5e5;">My Folder</p>
                <p style="margin: 2px 0 0 0; font-size: 11px; color: #888;">{{ selectedColor }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Customization components rendered in dark theme context.'
      }
    }
  }
}
