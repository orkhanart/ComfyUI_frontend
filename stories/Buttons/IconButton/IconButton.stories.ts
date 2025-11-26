import type { Meta, StoryObj } from '@storybook/vue3-vite'

import IconButton from '@/components/button/IconButton.vue'

/**
 * IconButton
 *
 * A square button component that displays only an icon. Used for compact
 * actions where the icon alone conveys the meaning.
 *
 * Props:
 * - `size`: 'fit-content' | 'sm' | 'md' (default: 'md')
 * - `type`: 'primary' | 'secondary' | 'transparent' | 'accent' (default: 'secondary')
 * - `border`: boolean - adds visible border (default: false)
 * - `disabled`: boolean (default: false)
 */
const meta: Meta<typeof IconButton> = {
  title: 'Buttons/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Square icon-only buttons for compact UI actions. Supports multiple types, sizes, and border variants.'
      }
    }
  },
  argTypes: {
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
 * Default icon button with secondary type
 */
export const Default: Story = {
  render: (args) => ({
    components: { IconButton },
    setup() {
      return { args }
    },
    template: `
      <IconButton v-bind="args">
        <i class="icon-[lucide--settings] text-sm" />
      </IconButton>
    `
  }),
  args: {
    size: 'md',
    type: 'secondary',
    border: false,
    disabled: false
  }
}

/**
 * All button types comparison
 */
export const AllTypes: Story = {
  render: () => ({
    components: { IconButton },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">primary</div>
          <IconButton type="primary">
            <i class="icon-[lucide--play] text-sm" />
          </IconButton>
          <span class="text-xs text-muted-foreground">High emphasis, main actions</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">secondary</div>
          <IconButton type="secondary">
            <i class="icon-[lucide--settings] text-sm" />
          </IconButton>
          <span class="text-xs text-muted-foreground">Default, alternative actions</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">transparent</div>
          <IconButton type="transparent">
            <i class="icon-[lucide--x] text-sm" />
          </IconButton>
          <span class="text-xs text-muted-foreground">Low emphasis, tertiary</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">accent</div>
          <IconButton type="accent">
            <i class="icon-[lucide--zap] text-sm" />
          </IconButton>
          <span class="text-xs text-muted-foreground">Brand-colored emphasis</span>
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
    components: { IconButton },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">sm (32x32)</div>
          <IconButton size="sm" type="secondary">
            <i class="icon-[lucide--plus] text-xs" />
          </IconButton>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">md (40x40)</div>
          <IconButton size="md" type="secondary">
            <i class="icon-[lucide--plus] text-sm" />
          </IconButton>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">fit-content</div>
          <IconButton size="fit-content" type="secondary" class="p-2">
            <i class="icon-[lucide--plus] text-lg" />
          </IconButton>
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
    components: { IconButton },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">primary</div>
          <IconButton type="primary" :border="false">
            <i class="icon-[lucide--play] text-sm" />
          </IconButton>
          <IconButton type="primary" border>
            <i class="icon-[lucide--play] text-sm" />
          </IconButton>
          <span class="text-xs text-muted-foreground">without / with border</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">secondary</div>
          <IconButton type="secondary" :border="false">
            <i class="icon-[lucide--settings] text-sm" />
          </IconButton>
          <IconButton type="secondary" border>
            <i class="icon-[lucide--settings] text-sm" />
          </IconButton>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">transparent</div>
          <IconButton type="transparent" :border="false">
            <i class="icon-[lucide--x] text-sm" />
          </IconButton>
          <IconButton type="transparent" border>
            <i class="icon-[lucide--x] text-sm" />
          </IconButton>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">accent</div>
          <IconButton type="accent" :border="false">
            <i class="icon-[lucide--zap] text-sm" />
          </IconButton>
          <IconButton type="accent" border>
            <i class="icon-[lucide--zap] text-sm" />
          </IconButton>
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
    components: { IconButton },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">primary</div>
          <IconButton type="primary">
            <i class="icon-[lucide--play] text-sm" />
          </IconButton>
          <IconButton type="primary" disabled>
            <i class="icon-[lucide--play] text-sm" />
          </IconButton>
          <span class="text-xs text-muted-foreground">enabled / disabled</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">secondary</div>
          <IconButton type="secondary">
            <i class="icon-[lucide--settings] text-sm" />
          </IconButton>
          <IconButton type="secondary" disabled>
            <i class="icon-[lucide--settings] text-sm" />
          </IconButton>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">accent</div>
          <IconButton type="accent">
            <i class="icon-[lucide--zap] text-sm" />
          </IconButton>
          <IconButton type="accent" disabled>
            <i class="icon-[lucide--zap] text-sm" />
          </IconButton>
        </div>
      </div>
    `
  })
}

/**
 * Common icon examples used in the application
 */
export const IconExamples: Story = {
  render: () => ({
    components: { IconButton },
    template: `
      <div class="flex flex-col gap-6">
        <h3 class="text-sm font-semibold text-base-foreground">Actions</h3>
        <div class="flex items-center gap-3">
          <IconButton type="secondary" v-tooltip="'Add'">
            <i class="icon-[lucide--plus] text-sm" />
          </IconButton>
          <IconButton type="secondary" v-tooltip="'Edit'">
            <i class="icon-[lucide--pencil] text-sm" />
          </IconButton>
          <IconButton type="secondary" v-tooltip="'Delete'">
            <i class="icon-[lucide--trash-2] text-sm" />
          </IconButton>
          <IconButton type="secondary" v-tooltip="'Copy'">
            <i class="icon-[lucide--copy] text-sm" />
          </IconButton>
          <IconButton type="secondary" v-tooltip="'Download'">
            <i class="icon-[lucide--download] text-sm" />
          </IconButton>
        </div>

        <h3 class="text-sm font-semibold text-base-foreground">Navigation</h3>
        <div class="flex items-center gap-3">
          <IconButton type="secondary" v-tooltip="'Back'">
            <i class="icon-[lucide--arrow-left] text-sm" />
          </IconButton>
          <IconButton type="secondary" v-tooltip="'Forward'">
            <i class="icon-[lucide--arrow-right] text-sm" />
          </IconButton>
          <IconButton type="secondary" v-tooltip="'Home'">
            <i class="icon-[lucide--home] text-sm" />
          </IconButton>
          <IconButton type="secondary" v-tooltip="'Menu'">
            <i class="icon-[lucide--menu] text-sm" />
          </IconButton>
        </div>

        <h3 class="text-sm font-semibold text-base-foreground">Controls</h3>
        <div class="flex items-center gap-3">
          <IconButton type="primary" v-tooltip="'Play'">
            <i class="icon-[lucide--play] text-sm" />
          </IconButton>
          <IconButton type="secondary" v-tooltip="'Pause'">
            <i class="icon-[lucide--pause] text-sm" />
          </IconButton>
          <IconButton type="secondary" v-tooltip="'Stop'">
            <i class="icon-[lucide--square] text-sm" />
          </IconButton>
          <IconButton type="secondary" v-tooltip="'Refresh'">
            <i class="icon-[lucide--refresh-cw] text-sm" />
          </IconButton>
        </div>

        <h3 class="text-sm font-semibold text-base-foreground">Toggle/Close</h3>
        <div class="flex items-center gap-3">
          <IconButton type="transparent" v-tooltip="'Close'">
            <i class="icon-[lucide--x] text-sm" />
          </IconButton>
          <IconButton type="transparent" v-tooltip="'Minimize'">
            <i class="icon-[lucide--minus] text-sm" />
          </IconButton>
          <IconButton type="transparent" v-tooltip="'Maximize'">
            <i class="icon-[lucide--maximize-2] text-sm" />
          </IconButton>
          <IconButton type="secondary" v-tooltip="'More options'">
            <i class="icon-[lucide--more-horizontal] text-sm" />
          </IconButton>
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
    components: { IconButton },
    setup() {
      const handleClick = () => {
        alert('Button clicked!')
      }
      return { handleClick }
    },
    template: `
      <div class="flex flex-col gap-4 items-center">
        <IconButton type="primary" @click="handleClick">
          <i class="icon-[lucide--bell] text-sm" />
        </IconButton>
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
    components: { IconButton },
    template: `
      <div class="dark-theme bg-neutral-900 p-8 rounded-lg">
        <div class="flex flex-col gap-4">
          <h3 class="text-sm font-semibold text-white mb-2">Dark Theme</h3>
          <div class="flex items-center gap-3">
            <IconButton type="primary">
              <i class="icon-[lucide--play] text-sm" />
            </IconButton>
            <IconButton type="secondary">
              <i class="icon-[lucide--settings] text-sm" />
            </IconButton>
            <IconButton type="transparent">
              <i class="icon-[lucide--x] text-sm" />
            </IconButton>
            <IconButton type="accent">
              <i class="icon-[lucide--zap] text-sm" />
            </IconButton>
          </div>
          <div class="flex items-center gap-3">
            <IconButton type="primary" border>
              <i class="icon-[lucide--play] text-sm" />
            </IconButton>
            <IconButton type="secondary" border>
              <i class="icon-[lucide--settings] text-sm" />
            </IconButton>
            <IconButton type="transparent" border>
              <i class="icon-[lucide--x] text-sm" />
            </IconButton>
            <IconButton type="accent" border>
              <i class="icon-[lucide--zap] text-sm" />
            </IconButton>
          </div>
        </div>
      </div>
    `
  })
}
