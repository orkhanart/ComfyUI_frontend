import type { Meta, StoryObj } from '@storybook/vue3-vite'

import TextButton from '@/components/button/TextButton.vue'

/**
 * TextButton
 *
 * A button component that displays a text label. Primary choice for
 * actions that need descriptive text.
 *
 * Props:
 * - `label`: string - The button text (required)
 * - `size`: 'fit-content' | 'sm' | 'md' (default: 'md')
 * - `type`: 'primary' | 'secondary' | 'transparent' | 'accent' (default: 'primary')
 * - `border`: boolean - adds visible border (default: false)
 * - `disabled`: boolean (default: false)
 * - `onClick`: () => void - Click handler (required)
 */
const meta: Meta<typeof TextButton> = {
  title: 'Buttons/TextButton',
  component: TextButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Text-only buttons with label. Default type is primary for call-to-action scenarios.'
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Button text label'
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
 * Default text button with primary type
 */
export const Default: Story = {
  render: (args) => ({
    components: { TextButton },
    setup() {
      const handleClick = () => {}
      return { args, handleClick }
    },
    template: `
      <TextButton v-bind="args" :onClick="handleClick" />
    `
  }),
  args: {
    label: 'Submit',
    size: 'md',
    type: 'primary',
    border: false,
    disabled: false
  }
}

/**
 * All button types comparison
 */
export const AllTypes: Story = {
  render: () => ({
    components: { TextButton },
    setup() {
      const noop = () => {}
      return { noop }
    },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">primary</div>
          <TextButton type="primary" label="Submit" :onClick="noop" />
          <span class="text-xs text-muted-foreground">High emphasis, call-to-action</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">secondary</div>
          <TextButton type="secondary" label="Cancel" :onClick="noop" />
          <span class="text-xs text-muted-foreground">Alternative actions</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">transparent</div>
          <TextButton type="transparent" label="Learn more" :onClick="noop" />
          <span class="text-xs text-muted-foreground">Low emphasis, tertiary</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">accent</div>
          <TextButton type="accent" label="Upgrade" :onClick="noop" />
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
    components: { TextButton },
    setup() {
      const noop = () => {}
      return { noop }
    },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">sm</div>
          <TextButton size="sm" type="primary" label="Small" :onClick="noop" />
          <span class="text-xs text-muted-foreground">Compact areas, less padding</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">md (default)</div>
          <TextButton size="md" type="primary" label="Medium" :onClick="noop" />
          <span class="text-xs text-muted-foreground">Standard size</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">fit-content</div>
          <TextButton size="fit-content" type="primary" label="Fit Content" :onClick="noop" class="px-4 py-2" />
          <span class="text-xs text-muted-foreground">Custom sizing</span>
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
    components: { TextButton },
    setup() {
      const noop = () => {}
      return { noop }
    },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">primary</div>
          <TextButton type="primary" label="Submit" :onClick="noop" />
          <TextButton type="primary" label="Submit" border :onClick="noop" />
          <span class="text-xs text-muted-foreground">without / with border</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">secondary</div>
          <TextButton type="secondary" label="Cancel" :onClick="noop" />
          <TextButton type="secondary" label="Cancel" border :onClick="noop" />
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">transparent</div>
          <TextButton type="transparent" label="Learn more" :onClick="noop" />
          <TextButton type="transparent" label="Learn more" border :onClick="noop" />
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">accent</div>
          <TextButton type="accent" label="Upgrade" :onClick="noop" />
          <TextButton type="accent" label="Upgrade" border :onClick="noop" />
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
    components: { TextButton },
    setup() {
      const noop = () => {}
      return { noop }
    },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">primary</div>
          <TextButton type="primary" label="Submit" :onClick="noop" />
          <TextButton type="primary" label="Submit" disabled :onClick="noop" />
          <span class="text-xs text-muted-foreground">enabled / disabled</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">secondary</div>
          <TextButton type="secondary" label="Cancel" :onClick="noop" />
          <TextButton type="secondary" label="Cancel" disabled :onClick="noop" />
        </div>
        <div class="flex items-center gap-4">
          <div class="w-28 text-sm text-muted-foreground">accent</div>
          <TextButton type="accent" label="Upgrade" :onClick="noop" />
          <TextButton type="accent" label="Upgrade" disabled :onClick="noop" />
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
    components: { TextButton },
    setup() {
      const noop = () => {}
      return { noop }
    },
    template: `
      <div class="flex flex-col gap-8">
        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Form Actions</h3>
          <div class="flex items-center gap-3">
            <TextButton type="primary" label="Save Changes" :onClick="noop" />
            <TextButton type="secondary" label="Cancel" :onClick="noop" />
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Confirmation Dialog</h3>
          <div class="flex items-center gap-3">
            <TextButton type="primary" label="Confirm" :onClick="noop" />
            <TextButton type="transparent" label="Go Back" :onClick="noop" />
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Destructive Action</h3>
          <div class="flex items-center gap-3">
            <TextButton type="accent" label="Delete Workflow" :onClick="noop" />
            <TextButton type="secondary" label="Keep" :onClick="noop" />
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-base-foreground mb-3">Call-to-Action</h3>
          <div class="flex items-center gap-3">
            <TextButton type="accent" label="Get Started" :onClick="noop" />
            <TextButton type="transparent" label="Learn More" :onClick="noop" />
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
    components: { TextButton },
    setup() {
      const handleClick = () => {
        alert('Button clicked!')
      }
      return { handleClick }
    },
    template: `
      <div class="flex flex-col gap-4 items-center">
        <TextButton type="primary" label="Click Me" :onClick="handleClick" />
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
    components: { TextButton },
    setup() {
      const noop = () => {}
      return { noop }
    },
    template: `
      <div class="dark-theme bg-neutral-900 p-8 rounded-lg">
        <div class="flex flex-col gap-4">
          <h3 class="text-sm font-semibold text-white mb-2">Dark Theme</h3>
          <div class="flex items-center gap-3">
            <TextButton type="primary" label="Primary" :onClick="noop" />
            <TextButton type="secondary" label="Secondary" :onClick="noop" />
            <TextButton type="transparent" label="Transparent" :onClick="noop" />
            <TextButton type="accent" label="Accent" :onClick="noop" />
          </div>
          <div class="flex items-center gap-3">
            <TextButton type="primary" label="Primary" border :onClick="noop" />
            <TextButton type="secondary" label="Secondary" border :onClick="noop" />
            <TextButton type="transparent" label="Transparent" border :onClick="noop" />
            <TextButton type="accent" label="Accent" border :onClick="noop" />
          </div>
        </div>
      </div>
    `
  })
}
