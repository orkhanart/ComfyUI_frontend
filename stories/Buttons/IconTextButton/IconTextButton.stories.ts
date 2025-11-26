import type { Meta, StoryObj } from '@storybook/vue3-vite'

import IconTextButton from '@/components/button/IconTextButton.vue'

/**
 * IconTextButton
 *
 * A button component that combines an icon with text. The icon can be
 * positioned on either the left or right side of the label.
 *
 * Props:
 * - `label`: string - The button text (required)
 * - `iconPosition`: 'left' | 'right' (default: 'left')
 * - `size`: 'fit-content' | 'sm' | 'md' (default: 'md')
 * - `type`: 'primary' | 'secondary' | 'transparent' | 'accent' (default: 'primary')
 * - `border`: boolean - adds visible border (default: false)
 * - `disabled`: boolean (default: false)
 *
 * Slots:
 * - `icon`: The icon element to display
 */
const meta: Meta<typeof IconTextButton> = {
  title: 'Buttons/IconTextButton',
  component: IconTextButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Buttons combining icon and text for enhanced visual communication. Icon can be placed on left or right.'
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Button text label'
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Icon placement relative to text'
    },
    size: {
      control: 'select',
      options: ['fit-content', 'sm', 'md'],
      description: 'Button size'
    },
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'transparent', 'accent'],
      description: 'Button visual style'
    },
    border: {
      control: 'boolean',
      description: 'Show border outline'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interactions'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default icon+text button with icon on left
 */
export const Default: Story = {
  render: (args) => ({
    components: { IconTextButton },
    setup() {
      return { args }
    },
    template: `
      <IconTextButton v-bind="args">
        <template #icon>
          <i class="icon-[lucide--download] text-sm" />
        </template>
      </IconTextButton>
    `
  }),
  args: {
    label: 'Download',
    iconPosition: 'left',
    size: 'md',
    type: 'primary',
    border: false,
    disabled: false
  }
}

/**
 * Icon position variants
 */
export const IconPosition: Story = {
  render: () => ({
    components: { IconTextButton },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">left (default)</div>
          <IconTextButton type="primary" label="Download" iconPosition="left">
            <template #icon>
              <i class="icon-[lucide--download] text-sm" />
            </template>
          </IconTextButton>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">right</div>
          <IconTextButton type="primary" label="Next" iconPosition="right">
            <template #icon>
              <i class="icon-[lucide--arrow-right] text-sm" />
            </template>
          </IconTextButton>
        </div>
      </div>
    `
  })
}

/**
 * All button types comparison
 */
export const AllTypes: Story = {
  render: () => ({
    components: { IconTextButton },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">primary</div>
          <IconTextButton type="primary" label="Run Workflow">
            <template #icon>
              <i class="icon-[lucide--play] text-sm" />
            </template>
          </IconTextButton>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">secondary</div>
          <IconTextButton type="secondary" label="Settings">
            <template #icon>
              <i class="icon-[lucide--settings] text-sm" />
            </template>
          </IconTextButton>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">transparent</div>
          <IconTextButton type="transparent" label="Close">
            <template #icon>
              <i class="icon-[lucide--x] text-sm" />
            </template>
          </IconTextButton>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">accent</div>
          <IconTextButton type="accent" label="Upgrade Now">
            <template #icon>
              <i class="icon-[lucide--zap] text-sm" />
            </template>
          </IconTextButton>
        </div>
      </div>
    `
  })
}

/**
 * All size variants
 */
export const AllSizes: Story = {
  render: () => ({
    components: { IconTextButton },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">sm</div>
          <IconTextButton size="sm" type="primary" label="Save">
            <template #icon>
              <i class="icon-[lucide--save] text-xs" />
            </template>
          </IconTextButton>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">md (default)</div>
          <IconTextButton size="md" type="primary" label="Save">
            <template #icon>
              <i class="icon-[lucide--save] text-sm" />
            </template>
          </IconTextButton>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">fit-content</div>
          <IconTextButton size="fit-content" type="primary" label="Save" class="px-4 py-2">
            <template #icon>
              <i class="icon-[lucide--save] text-base" />
            </template>
          </IconTextButton>
        </div>
      </div>
    `
  })
}

/**
 * Border variant adds visible border outline
 */
export const WithBorder: Story = {
  render: () => ({
    components: { IconTextButton },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">primary</div>
          <IconTextButton type="primary" label="Export">
            <template #icon>
              <i class="icon-[lucide--upload] text-sm" />
            </template>
          </IconTextButton>
          <IconTextButton type="primary" label="Export" border>
            <template #icon>
              <i class="icon-[lucide--upload] text-sm" />
            </template>
          </IconTextButton>
          <span class="text-xs text-muted-foreground">without / with border</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">secondary</div>
          <IconTextButton type="secondary" label="Cancel">
            <template #icon>
              <i class="icon-[lucide--x] text-sm" />
            </template>
          </IconTextButton>
          <IconTextButton type="secondary" label="Cancel" border>
            <template #icon>
              <i class="icon-[lucide--x] text-sm" />
            </template>
          </IconTextButton>
        </div>
      </div>
    `
  })
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => ({
    components: { IconTextButton },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">enabled</div>
          <IconTextButton type="primary" label="Generate">
            <template #icon>
              <i class="icon-[lucide--sparkles] text-sm" />
            </template>
          </IconTextButton>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">disabled</div>
          <IconTextButton type="primary" label="Generate" disabled>
            <template #icon>
              <i class="icon-[lucide--sparkles] text-sm" />
            </template>
          </IconTextButton>
        </div>
      </div>
    `
  })
}

/**
 * Common use cases in the application
 */
export const UseCases: Story = {
  render: () => ({
    components: { IconTextButton },
    template: `
      <div class="flex flex-col gap-8">
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">File Operations</h3>
          <div class="flex items-center gap-3">
            <IconTextButton type="secondary" label="Open">
              <template #icon>
                <i class="icon-[lucide--folder-open] text-sm" />
              </template>
            </IconTextButton>
            <IconTextButton type="primary" label="Save">
              <template #icon>
                <i class="icon-[lucide--save] text-sm" />
              </template>
            </IconTextButton>
            <IconTextButton type="secondary" label="Export">
              <template #icon>
                <i class="icon-[lucide--download] text-sm" />
              </template>
            </IconTextButton>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Navigation</h3>
          <div class="flex items-center gap-3">
            <IconTextButton type="transparent" label="Back">
              <template #icon>
                <i class="icon-[lucide--arrow-left] text-sm" />
              </template>
            </IconTextButton>
            <IconTextButton type="transparent" label="Next" iconPosition="right">
              <template #icon>
                <i class="icon-[lucide--arrow-right] text-sm" />
              </template>
            </IconTextButton>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Workflow Actions</h3>
          <div class="flex items-center gap-3">
            <IconTextButton type="accent" label="Run">
              <template #icon>
                <i class="icon-[lucide--play] text-sm" />
              </template>
            </IconTextButton>
            <IconTextButton type="secondary" label="Stop">
              <template #icon>
                <i class="icon-[lucide--square] text-sm" />
              </template>
            </IconTextButton>
            <IconTextButton type="secondary" label="Clear Queue">
              <template #icon>
                <i class="icon-[lucide--trash-2] text-sm" />
              </template>
            </IconTextButton>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Create Actions</h3>
          <div class="flex items-center gap-3">
            <IconTextButton type="primary" label="New Workflow">
              <template #icon>
                <i class="icon-[lucide--plus] text-sm" />
              </template>
            </IconTextButton>
            <IconTextButton type="secondary" label="Add Node">
              <template #icon>
                <i class="icon-[lucide--plus-circle] text-sm" />
              </template>
            </IconTextButton>
          </div>
        </div>
      </div>
    `
  })
}

/**
 * Interactive example with click handler
 */
export const Interactive: Story = {
  render: () => ({
    components: { IconTextButton },
    setup() {
      const handleClick = () => {
        alert('Button clicked!')
      }
      return { handleClick }
    },
    template: `
      <div class="flex flex-col gap-4 items-center">
        <IconTextButton type="primary" label="Click Me" @click="handleClick">
          <template #icon>
            <i class="icon-[lucide--mouse-pointer-click] text-sm" />
          </template>
        </IconTextButton>
        <p class="text-sm text-muted-foreground">Click the button to trigger an action</p>
      </div>
    `
  })
}

/**
 * Dark theme preview
 */
export const DarkTheme: Story = {
  render: () => ({
    components: { IconTextButton },
    template: `
      <div class="dark-theme bg-neutral-900 p-8 rounded-lg">
        <div class="flex flex-col gap-4">
          <h3 class="text-sm font-semibold text-white mb-2">Dark Theme</h3>
          <div class="flex items-center gap-3 flex-wrap">
            <IconTextButton type="primary" label="Primary">
              <template #icon>
                <i class="icon-[lucide--play] text-sm" />
              </template>
            </IconTextButton>
            <IconTextButton type="secondary" label="Secondary">
              <template #icon>
                <i class="icon-[lucide--settings] text-sm" />
              </template>
            </IconTextButton>
            <IconTextButton type="transparent" label="Transparent">
              <template #icon>
                <i class="icon-[lucide--info] text-sm" />
              </template>
            </IconTextButton>
            <IconTextButton type="accent" label="Accent">
              <template #icon>
                <i class="icon-[lucide--zap] text-sm" />
              </template>
            </IconTextButton>
          </div>
          <div class="flex items-center gap-3 flex-wrap">
            <IconTextButton type="primary" label="Primary" border>
              <template #icon>
                <i class="icon-[lucide--play] text-sm" />
              </template>
            </IconTextButton>
            <IconTextButton type="secondary" label="Secondary" border>
              <template #icon>
                <i class="icon-[lucide--settings] text-sm" />
              </template>
            </IconTextButton>
          </div>
        </div>
      </div>
    `
  })
}
