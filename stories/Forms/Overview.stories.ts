import type { Meta, StoryObj } from '@storybook/vue3-vite'

/**
 * Forms Overview
 *
 * This section contains all form-related components used in ComfyUI.
 * These components handle user input for settings, node configuration,
 * and workflow management.
 */
const meta = {
  title: 'Forms/Overview',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => ({
    template: `
      <div class="p-12 max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-base-foreground mb-4">Forms</h1>
        <p class="text-lg text-muted-foreground mb-8">
          Form components for user input, settings configuration, and data entry.
        </p>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold text-base-foreground mb-4">Input Components</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 bg-secondary-background rounded-lg">
              <h3 class="font-semibold text-base-foreground mb-2">SearchBox</h3>
              <p class="text-sm text-muted-foreground">
                Search input with icon, debounced updates, and size variants.
                Used in node library, workflow browser, and filters.
              </p>
            </div>
            <div class="p-4 bg-secondary-background rounded-lg">
              <h3 class="font-semibold text-base-foreground mb-2">EditableText</h3>
              <p class="text-sm text-muted-foreground">
                Inline editable text component. Click to edit, Enter to save,
                Escape to cancel. Used for renaming workflows and tabs.
              </p>
            </div>
          </div>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold text-base-foreground mb-4">Selection Components</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 bg-secondary-background rounded-lg">
              <h3 class="font-semibold text-base-foreground mb-2">SingleSelect</h3>
              <p class="text-sm text-muted-foreground">
                Dropdown for selecting one option. Used for samplers,
                schedulers, and other single-choice settings.
              </p>
            </div>
            <div class="p-4 bg-secondary-background rounded-lg">
              <h3 class="font-semibold text-base-foreground mb-2">MultiSelect</h3>
              <p class="text-sm text-muted-foreground">
                Multi-selection dropdown with search and count badge.
                Used for tag filters and multiple selections.
              </p>
            </div>
            <div class="p-4 bg-secondary-background rounded-lg">
              <h3 class="font-semibold text-base-foreground mb-2">RadioGroup</h3>
              <p class="text-sm text-muted-foreground">
                Horizontal radio buttons for exclusive choices.
                Used for quality presets and output formats.
              </p>
            </div>
            <div class="p-4 bg-secondary-background rounded-lg">
              <h3 class="font-semibold text-base-foreground mb-2">ColorPicker</h3>
              <p class="text-sm text-muted-foreground">
                Color swatch with hex input. Used for customizing
                node colors and visual settings.
              </p>
            </div>
          </div>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold text-base-foreground mb-4">Numeric Controls</h2>
          <div class="grid grid-cols-3 gap-4">
            <div class="p-4 bg-secondary-background rounded-lg">
              <h3 class="font-semibold text-base-foreground mb-2">Slider</h3>
              <p class="text-sm text-muted-foreground">
                Minimal track slider with draggable thumb.
                Supports single and range selection.
              </p>
            </div>
            <div class="p-4 bg-secondary-background rounded-lg">
              <h3 class="font-semibold text-base-foreground mb-2">InputSlider</h3>
              <p class="text-sm text-muted-foreground">
                Combined slider with number input.
                Used for CFG scale, steps, and other values.
              </p>
            </div>
            <div class="p-4 bg-secondary-background rounded-lg">
              <h3 class="font-semibold text-base-foreground mb-2">InputKnob</h3>
              <p class="text-sm text-muted-foreground">
                Rotary knob dial with number input.
                Used for denoise strength and blend factors.
              </p>
            </div>
          </div>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold text-base-foreground mb-4">Composite Components</h2>
          <div class="p-4 bg-secondary-background rounded-lg">
            <h3 class="font-semibold text-base-foreground mb-2">FormItem / Form Components</h3>
            <p class="text-sm text-muted-foreground">
              Dynamic form item that renders different input types based on configuration.
              Supports boolean, number, slider, knob, combo, radio, text, color, and more.
              Core building block for settings panels.
            </p>
          </div>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-semibold text-base-foreground mb-4">Form Patterns</h2>
          <ul class="space-y-2 text-muted-foreground">
            <li class="flex items-center gap-2">
              <i class="icon-[lucide--check] text-green-500" />
              Label + Input combination with proper accessibility
            </li>
            <li class="flex items-center gap-2">
              <i class="icon-[lucide--check] text-green-500" />
              Keyboard navigation support (Tab, Enter, Escape)
            </li>
            <li class="flex items-center gap-2">
              <i class="icon-[lucide--check] text-green-500" />
              Debounced value updates for performance
            </li>
            <li class="flex items-center gap-2">
              <i class="icon-[lucide--check] text-green-500" />
              Consistent styling across light and dark themes
            </li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-base-foreground mb-4">Accessibility</h2>
          <ul class="space-y-2 text-muted-foreground">
            <li class="flex items-center gap-2">
              <i class="icon-[lucide--info] text-blue-500" />
              All inputs have associated labels via aria-label or aria-labelledby
            </li>
            <li class="flex items-center gap-2">
              <i class="icon-[lucide--info] text-blue-500" />
              Focus states are visible and consistent
            </li>
            <li class="flex items-center gap-2">
              <i class="icon-[lucide--info] text-blue-500" />
              Dropdowns support keyboard navigation
            </li>
            <li class="flex items-center gap-2">
              <i class="icon-[lucide--info] text-blue-500" />
              Sliders can be controlled with arrow keys
            </li>
          </ul>
        </section>
      </div>
    `
  })
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = {}
