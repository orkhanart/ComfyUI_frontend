import type { Meta, StoryObj } from '@storybook/vue3-vite'

import IconTextButton from '@/components/button/IconTextButton.vue'
import MoreButton from '@/components/button/MoreButton.vue'

/**
 * MoreButton
 *
 * An ellipsis button (horizontal or vertical) that opens a popover menu
 * when clicked. Used for overflow actions or additional options.
 *
 * Props:
 * - `size`: 'fit-content' | 'sm' | 'md' (default: 'md')
 * - `type`: 'primary' | 'secondary' | 'transparent' | 'accent' (default: 'secondary')
 * - `isVertical`: boolean - Show vertical ellipsis (default: false)
 * - `border`: boolean - adds visible border (default: false)
 * - `disabled`: boolean (default: false)
 *
 * Events:
 * - `menuOpened`: Emitted when popover opens
 * - `menuClosed`: Emitted when popover closes
 *
 * Slots:
 * - default: Menu content (receives `close` function via slot props)
 */
const meta: Meta<typeof MoreButton> = {
  title: 'Buttons/MoreButton',
  component: MoreButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Ellipsis button with popover menu for overflow actions. Supports horizontal and vertical orientations.'
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
    isVertical: {
      control: 'boolean',
      description: 'Use vertical ellipsis icon'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default horizontal more button
 */
export const Default: Story = {
  render: (args) => ({
    components: { MoreButton, IconTextButton },
    setup() {
      return { args }
    },
    template: `
      <MoreButton v-bind="args">
        <template #default="{ close }">
          <IconTextButton type="transparent" label="Edit" @click="close">
            <template #icon>
              <i class="icon-[lucide--pencil] text-sm" />
            </template>
          </IconTextButton>
          <IconTextButton type="transparent" label="Duplicate" @click="close">
            <template #icon>
              <i class="icon-[lucide--copy] text-sm" />
            </template>
          </IconTextButton>
          <IconTextButton type="transparent" label="Delete" @click="close">
            <template #icon>
              <i class="icon-[lucide--trash-2] text-sm" />
            </template>
          </IconTextButton>
        </template>
      </MoreButton>
    `
  }),
  args: {
    size: 'md',
    type: 'secondary',
    isVertical: false
  }
}

/**
 * Orientation variants: horizontal vs vertical
 */
export const Orientations: Story = {
  render: () => ({
    components: { MoreButton, IconTextButton },
    template: `
      <div class="flex flex-col gap-8">
        <div class="flex items-center gap-4">
          <div class="w-32 text-sm text-muted-foreground">Horizontal</div>
          <MoreButton :isVertical="false">
            <template #default="{ close }">
              <IconTextButton type="transparent" label="Option 1" @click="close">
                <template #icon>
                  <i class="icon-[lucide--star] text-sm" />
                </template>
              </IconTextButton>
              <IconTextButton type="transparent" label="Option 2" @click="close">
                <template #icon>
                  <i class="icon-[lucide--heart] text-sm" />
                </template>
              </IconTextButton>
            </template>
          </MoreButton>
          <span class="text-xs text-muted-foreground">icon-[lucide--ellipsis]</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-32 text-sm text-muted-foreground">Vertical</div>
          <MoreButton isVertical>
            <template #default="{ close }">
              <IconTextButton type="transparent" label="Option 1" @click="close">
                <template #icon>
                  <i class="icon-[lucide--star] text-sm" />
                </template>
              </IconTextButton>
              <IconTextButton type="transparent" label="Option 2" @click="close">
                <template #icon>
                  <i class="icon-[lucide--heart] text-sm" />
                </template>
              </IconTextButton>
            </template>
          </MoreButton>
          <span class="text-xs text-muted-foreground">icon-[lucide--more-vertical]</span>
        </div>
      </div>
    `
  })
}

/**
 * All button types
 */
export const AllTypes: Story = {
  render: () => ({
    components: { MoreButton, IconTextButton },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">secondary</div>
          <MoreButton type="secondary">
            <template #default="{ close }">
              <IconTextButton type="transparent" label="Action" @click="close">
                <template #icon>
                  <i class="icon-[lucide--check] text-sm" />
                </template>
              </IconTextButton>
            </template>
          </MoreButton>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">transparent</div>
          <MoreButton type="transparent">
            <template #default="{ close }">
              <IconTextButton type="transparent" label="Action" @click="close">
                <template #icon>
                  <i class="icon-[lucide--check] text-sm" />
                </template>
              </IconTextButton>
            </template>
          </MoreButton>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">primary</div>
          <MoreButton type="primary">
            <template #default="{ close }">
              <IconTextButton type="transparent" label="Action" @click="close">
                <template #icon>
                  <i class="icon-[lucide--check] text-sm" />
                </template>
              </IconTextButton>
            </template>
          </MoreButton>
        </div>
      </div>
    `
  })
}

/**
 * Size variants
 */
export const AllSizes: Story = {
  render: () => ({
    components: { MoreButton, IconTextButton },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">sm</div>
          <MoreButton size="sm">
            <template #default="{ close }">
              <IconTextButton type="transparent" label="Action" @click="close">
                <template #icon>
                  <i class="icon-[lucide--check] text-sm" />
                </template>
              </IconTextButton>
            </template>
          </MoreButton>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">md (default)</div>
          <MoreButton size="md">
            <template #default="{ close }">
              <IconTextButton type="transparent" label="Action" @click="close">
                <template #icon>
                  <i class="icon-[lucide--check] text-sm" />
                </template>
              </IconTextButton>
            </template>
          </MoreButton>
        </div>
      </div>
    `
  })
}

/**
 * With rich menu content
 */
export const RichMenu: Story = {
  render: () => ({
    components: { MoreButton, IconTextButton },
    template: `
      <MoreButton>
        <template #default="{ close }">
          <IconTextButton type="transparent" label="View Details" @click="close">
            <template #icon>
              <i class="icon-[lucide--eye] text-sm" />
            </template>
          </IconTextButton>
          <IconTextButton type="transparent" label="Edit" @click="close">
            <template #icon>
              <i class="icon-[lucide--pencil] text-sm" />
            </template>
          </IconTextButton>
          <IconTextButton type="transparent" label="Duplicate" @click="close">
            <template #icon>
              <i class="icon-[lucide--copy] text-sm" />
            </template>
          </IconTextButton>
          <IconTextButton type="transparent" label="Move to Folder" @click="close">
            <template #icon>
              <i class="icon-[lucide--folder] text-sm" />
            </template>
          </IconTextButton>
          <div class="border-t border-neutral-200 dark-theme:border-neutral-700 my-1"></div>
          <IconTextButton type="transparent" label="Delete" class="text-red-500" @click="close">
            <template #icon>
              <i class="icon-[lucide--trash-2] text-sm" />
            </template>
          </IconTextButton>
        </template>
      </MoreButton>
    `
  })
}

/**
 * ComfyUI use cases
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: { MoreButton, IconTextButton },
    template: `
      <div class="flex flex-col gap-8">
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Workflow item actions</h3>
          <div class="flex items-center gap-2 p-3 bg-secondary-background rounded-lg">
            <span class="flex-1 text-sm">My Workflow.json</span>
            <MoreButton type="transparent" isVertical>
              <template #default="{ close }">
                <IconTextButton type="transparent" label="Rename" @click="close">
                  <template #icon>
                    <i class="icon-[lucide--pencil] text-sm" />
                  </template>
                </IconTextButton>
                <IconTextButton type="transparent" label="Duplicate" @click="close">
                  <template #icon>
                    <i class="icon-[lucide--copy] text-sm" />
                  </template>
                </IconTextButton>
                <IconTextButton type="transparent" label="Export" @click="close">
                  <template #icon>
                    <i class="icon-[lucide--download] text-sm" />
                  </template>
                </IconTextButton>
                <IconTextButton type="transparent" label="Delete" @click="close">
                  <template #icon>
                    <i class="icon-[lucide--trash-2] text-sm" />
                  </template>
                </IconTextButton>
              </template>
            </MoreButton>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Node actions</h3>
          <div class="flex items-center gap-2 p-3 bg-secondary-background rounded-lg">
            <span class="flex-1 text-sm">KSampler</span>
            <MoreButton type="transparent">
              <template #default="{ close }">
                <IconTextButton type="transparent" label="Copy" @click="close">
                  <template #icon>
                    <i class="icon-[lucide--copy] text-sm" />
                  </template>
                </IconTextButton>
                <IconTextButton type="transparent" label="Bypass" @click="close">
                  <template #icon>
                    <i class="icon-[lucide--skip-forward] text-sm" />
                  </template>
                </IconTextButton>
                <IconTextButton type="transparent" label="Pin" @click="close">
                  <template #icon>
                    <i class="icon-[lucide--pin] text-sm" />
                  </template>
                </IconTextButton>
                <IconTextButton type="transparent" label="Delete" @click="close">
                  <template #icon>
                    <i class="icon-[lucide--trash-2] text-sm" />
                  </template>
                </IconTextButton>
              </template>
            </MoreButton>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Queue item actions</h3>
          <div class="flex items-center gap-2 p-3 bg-secondary-background rounded-lg">
            <i class="icon-[lucide--clock] text-sm text-muted-foreground" />
            <span class="flex-1 text-sm">Job #1234</span>
            <MoreButton type="transparent" size="sm">
              <template #default="{ close }">
                <IconTextButton type="transparent" label="View Output" @click="close">
                  <template #icon>
                    <i class="icon-[lucide--image] text-sm" />
                  </template>
                </IconTextButton>
                <IconTextButton type="transparent" label="Load Workflow" @click="close">
                  <template #icon>
                    <i class="icon-[lucide--upload] text-sm" />
                  </template>
                </IconTextButton>
                <IconTextButton type="transparent" label="Cancel" @click="close">
                  <template #icon>
                    <i class="icon-[lucide--x] text-sm" />
                  </template>
                </IconTextButton>
              </template>
            </MoreButton>
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
    components: { MoreButton, IconTextButton },
    template: `
      <div class="dark-theme bg-neutral-900 p-8 rounded-lg">
        <div class="flex flex-col gap-4">
          <h3 class="text-sm font-semibold text-white mb-2">Dark Theme</h3>
          <div class="flex items-center gap-4">
            <MoreButton type="secondary">
              <template #default="{ close }">
                <IconTextButton type="transparent" label="Edit" @click="close">
                  <template #icon>
                    <i class="icon-[lucide--pencil] text-sm" />
                  </template>
                </IconTextButton>
                <IconTextButton type="transparent" label="Delete" @click="close">
                  <template #icon>
                    <i class="icon-[lucide--trash-2] text-sm" />
                  </template>
                </IconTextButton>
              </template>
            </MoreButton>
            <MoreButton type="transparent" isVertical>
              <template #default="{ close }">
                <IconTextButton type="transparent" label="Edit" @click="close">
                  <template #icon>
                    <i class="icon-[lucide--pencil] text-sm" />
                  </template>
                </IconTextButton>
                <IconTextButton type="transparent" label="Delete" @click="close">
                  <template #icon>
                    <i class="icon-[lucide--trash-2] text-sm" />
                  </template>
                </IconTextButton>
              </template>
            </MoreButton>
          </div>
        </div>
      </div>
    `
  })
}
