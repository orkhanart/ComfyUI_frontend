import type { Meta, StoryObj } from '@storybook/vue3-vite'

import IconButton from '@/components/button/IconButton.vue'
import IconGroup from '@/components/button/IconGroup.vue'

/**
 * IconGroup
 *
 * A container component that groups multiple IconButton components together
 * as a unified visual unit. Used for related actions or toolbar-style controls.
 *
 * The component provides:
 * - Unified background with rounded corners
 * - Shadow styling for elevation
 * - Proper spacing for child buttons
 *
 * Usage:
 * Place IconButton components as children to create grouped controls.
 */
const meta: Meta<typeof IconGroup> = {
  title: 'Buttons/IconGroup',
  component: IconGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Container for grouping related icon buttons together with unified styling. Useful for toolbars and action groups.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default icon group with two buttons
 */
export const Default: Story = {
  render: () => ({
    components: { IconGroup, IconButton },
    template: `
      <IconGroup>
        <IconButton type="transparent">
          <i class="icon-[lucide--zoom-in] text-sm" />
        </IconButton>
        <IconButton type="transparent">
          <i class="icon-[lucide--zoom-out] text-sm" />
        </IconButton>
      </IconGroup>
    `
  })
}

/**
 * Two-button groups for common paired actions
 */
export const TwoButtons: Story = {
  render: () => ({
    components: { IconGroup, IconButton },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div class="w-32 text-sm text-muted-foreground">Zoom controls</div>
          <IconGroup>
            <IconButton type="transparent">
              <i class="icon-[lucide--zoom-in] text-sm" />
            </IconButton>
            <IconButton type="transparent">
              <i class="icon-[lucide--zoom-out] text-sm" />
            </IconButton>
          </IconGroup>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-32 text-sm text-muted-foreground">Undo/Redo</div>
          <IconGroup>
            <IconButton type="transparent">
              <i class="icon-[lucide--undo] text-sm" />
            </IconButton>
            <IconButton type="transparent">
              <i class="icon-[lucide--redo] text-sm" />
            </IconButton>
          </IconGroup>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-32 text-sm text-muted-foreground">Navigation</div>
          <IconGroup>
            <IconButton type="transparent">
              <i class="icon-[lucide--arrow-left] text-sm" />
            </IconButton>
            <IconButton type="transparent">
              <i class="icon-[lucide--arrow-right] text-sm" />
            </IconButton>
          </IconGroup>
        </div>
      </div>
    `
  })
}

/**
 * Three-button groups for related actions
 */
export const ThreeButtons: Story = {
  render: () => ({
    components: { IconGroup, IconButton },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div class="w-32 text-sm text-muted-foreground">Text alignment</div>
          <IconGroup>
            <IconButton type="transparent">
              <i class="icon-[lucide--align-left] text-sm" />
            </IconButton>
            <IconButton type="transparent">
              <i class="icon-[lucide--align-center] text-sm" />
            </IconButton>
            <IconButton type="transparent">
              <i class="icon-[lucide--align-right] text-sm" />
            </IconButton>
          </IconGroup>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-32 text-sm text-muted-foreground">Media controls</div>
          <IconGroup>
            <IconButton type="transparent">
              <i class="icon-[lucide--skip-back] text-sm" />
            </IconButton>
            <IconButton type="transparent">
              <i class="icon-[lucide--play] text-sm" />
            </IconButton>
            <IconButton type="transparent">
              <i class="icon-[lucide--skip-forward] text-sm" />
            </IconButton>
          </IconGroup>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-32 text-sm text-muted-foreground">View options</div>
          <IconGroup>
            <IconButton type="transparent">
              <i class="icon-[lucide--grid-2x2] text-sm" />
            </IconButton>
            <IconButton type="transparent">
              <i class="icon-[lucide--list] text-sm" />
            </IconButton>
            <IconButton type="transparent">
              <i class="icon-[lucide--columns-2] text-sm" />
            </IconButton>
          </IconGroup>
        </div>
      </div>
    `
  })
}

/**
 * Larger groups for toolbar-style controls
 */
export const Toolbar: Story = {
  render: () => ({
    components: { IconGroup, IconButton },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div class="w-32 text-sm text-muted-foreground">Edit toolbar</div>
          <IconGroup>
            <IconButton type="transparent">
              <i class="icon-[lucide--scissors] text-sm" />
            </IconButton>
            <IconButton type="transparent">
              <i class="icon-[lucide--copy] text-sm" />
            </IconButton>
            <IconButton type="transparent">
              <i class="icon-[lucide--clipboard] text-sm" />
            </IconButton>
            <IconButton type="transparent">
              <i class="icon-[lucide--trash-2] text-sm" />
            </IconButton>
          </IconGroup>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-32 text-sm text-muted-foreground">Format toolbar</div>
          <IconGroup>
            <IconButton type="transparent">
              <i class="icon-[lucide--bold] text-sm" />
            </IconButton>
            <IconButton type="transparent">
              <i class="icon-[lucide--italic] text-sm" />
            </IconButton>
            <IconButton type="transparent">
              <i class="icon-[lucide--underline] text-sm" />
            </IconButton>
            <IconButton type="transparent">
              <i class="icon-[lucide--strikethrough] text-sm" />
            </IconButton>
          </IconGroup>
        </div>
      </div>
    `
  })
}

/**
 * Toggle group with active state
 */
export const ToggleGroup: Story = {
  render: () => ({
    components: { IconGroup, IconButton },
    setup() {
      const activeIndex = 0
      return { activeIndex }
    },
    template: `
      <div class="flex flex-col gap-6">
        <p class="text-sm text-muted-foreground mb-2">
          Toggle groups show selection state. Use type="primary" for active item.
        </p>
        <div class="flex items-center gap-4">
          <div class="w-32 text-sm text-muted-foreground">View mode</div>
          <IconGroup>
            <IconButton type="primary">
              <i class="icon-[lucide--grid-2x2] text-sm" />
            </IconButton>
            <IconButton type="transparent">
              <i class="icon-[lucide--list] text-sm" />
            </IconButton>
          </IconGroup>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-32 text-sm text-muted-foreground">Sort order</div>
          <IconGroup>
            <IconButton type="transparent">
              <i class="icon-[lucide--arrow-up-a-z] text-sm" />
            </IconButton>
            <IconButton type="primary">
              <i class="icon-[lucide--arrow-down-a-z] text-sm" />
            </IconButton>
          </IconGroup>
        </div>
      </div>
    `
  })
}

/**
 * Segmented control pattern
 */
export const SegmentedControl: Story = {
  render: () => ({
    components: { IconGroup, IconButton },
    template: `
      <div class="flex flex-col gap-6">
        <p class="text-sm text-muted-foreground mb-2">
          Segmented controls for mutually exclusive options.
        </p>
        <div class="flex items-center gap-4">
          <div class="w-32 text-sm text-muted-foreground">Text align</div>
          <IconGroup>
            <IconButton type="primary">
              <i class="icon-[lucide--align-left] text-sm" />
            </IconButton>
            <IconButton type="transparent">
              <i class="icon-[lucide--align-center] text-sm" />
            </IconButton>
            <IconButton type="transparent">
              <i class="icon-[lucide--align-right] text-sm" />
            </IconButton>
            <IconButton type="transparent">
              <i class="icon-[lucide--align-justify] text-sm" />
            </IconButton>
          </IconGroup>
        </div>
      </div>
    `
  })
}

/**
 * ComfyUI-specific use cases
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: { IconGroup, IconButton },
    template: `
      <div class="flex flex-col gap-6">
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Canvas controls</h3>
          <IconGroup>
            <IconButton type="transparent" v-tooltip="'Zoom in'">
              <i class="icon-[lucide--zoom-in] text-sm" />
            </IconButton>
            <IconButton type="transparent" v-tooltip="'Zoom out'">
              <i class="icon-[lucide--zoom-out] text-sm" />
            </IconButton>
            <IconButton type="transparent" v-tooltip="'Fit to screen'">
              <i class="icon-[lucide--maximize] text-sm" />
            </IconButton>
          </IconGroup>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Node operations</h3>
          <IconGroup>
            <IconButton type="transparent" v-tooltip="'Copy'">
              <i class="icon-[lucide--copy] text-sm" />
            </IconButton>
            <IconButton type="transparent" v-tooltip="'Cut'">
              <i class="icon-[lucide--scissors] text-sm" />
            </IconButton>
            <IconButton type="transparent" v-tooltip="'Paste'">
              <i class="icon-[lucide--clipboard] text-sm" />
            </IconButton>
            <IconButton type="transparent" v-tooltip="'Delete'">
              <i class="icon-[lucide--trash-2] text-sm" />
            </IconButton>
          </IconGroup>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">History</h3>
          <IconGroup>
            <IconButton type="transparent" v-tooltip="'Undo'">
              <i class="icon-[lucide--undo] text-sm" />
            </IconButton>
            <IconButton type="transparent" v-tooltip="'Redo'">
              <i class="icon-[lucide--redo] text-sm" />
            </IconButton>
          </IconGroup>
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
    components: { IconGroup, IconButton },
    template: `
      <div class="dark-theme bg-neutral-900 p-8 rounded-lg">
        <div class="flex flex-col gap-4">
          <h3 class="text-sm font-semibold text-white mb-2">Dark Theme</h3>
          <div class="flex items-center gap-4">
            <IconGroup>
              <IconButton type="transparent">
                <i class="icon-[lucide--zoom-in] text-sm" />
              </IconButton>
              <IconButton type="transparent">
                <i class="icon-[lucide--zoom-out] text-sm" />
              </IconButton>
            </IconGroup>
            <IconGroup>
              <IconButton type="primary">
                <i class="icon-[lucide--grid-2x2] text-sm" />
              </IconButton>
              <IconButton type="transparent">
                <i class="icon-[lucide--list] text-sm" />
              </IconButton>
            </IconGroup>
          </div>
        </div>
      </div>
    `
  })
}
