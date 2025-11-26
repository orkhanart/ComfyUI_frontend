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
      <div style="padding: 3rem; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">
        <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #1a1a1a;">
          Forms
        </h1>

        <p style="font-size: 1.125rem; color: #4a4a4a; margin-bottom: 3rem;">
          Form components for user input, settings configuration, and data entry.
        </p>

        <h2 style="font-size: 1.875rem; font-weight: 600; margin-bottom: 1.5rem; margin-top: 2.5rem; color: #1a1a1a;">
          Input Components
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
          <thead>
            <tr style="border-bottom: 2px solid #e5e5e5;">
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Component</th>
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">SearchBox</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Search input with icon, debounced updates, and size variants</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">EditableText</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Inline editable text. Click to edit, Enter to save, Escape to cancel</td>
            </tr>
          </tbody>
        </table>

        <h2 style="font-size: 1.875rem; font-weight: 600; margin-bottom: 1.5rem; margin-top: 2.5rem; color: #1a1a1a;">
          Selection Components
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
          <thead>
            <tr style="border-bottom: 2px solid #e5e5e5;">
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Component</th>
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">SingleSelect</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Dropdown for selecting one option (samplers, schedulers)</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">MultiSelect</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Multi-selection dropdown with search and count badge</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">RadioGroup</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Horizontal radio buttons for exclusive choices</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">ColorPicker</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Color swatch with hex input for node colors and visual settings</td>
            </tr>
          </tbody>
        </table>

        <h2 style="font-size: 1.875rem; font-weight: 600; margin-bottom: 1.5rem; margin-top: 2.5rem; color: #1a1a1a;">
          Numeric Controls
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
          <thead>
            <tr style="border-bottom: 2px solid #e5e5e5;">
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Component</th>
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Slider</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Minimal track slider with draggable thumb, single and range selection</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">InputSlider</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Combined slider with number input (CFG scale, steps)</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">InputKnob</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Rotary knob dial with number input (denoise strength, blend factors)</td>
            </tr>
          </tbody>
        </table>

        <h2 style="font-size: 1.875rem; font-weight: 600; margin-bottom: 1.5rem; margin-top: 2.5rem; color: #1a1a1a;">
          Composite Components
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
          <thead>
            <tr style="border-bottom: 2px solid #e5e5e5;">
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Component</th>
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">FormItem</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Dynamic form item that renders different input types based on configuration</td>
            </tr>
          </tbody>
        </table>

        <h2 style="font-size: 1.875rem; font-weight: 600; margin-bottom: 1rem; margin-top: 2.5rem; color: #1a1a1a;">
          Form Patterns
        </h2>

        <ul style="color: #4a4a4a; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem;">Label + Input combination with proper accessibility</li>
          <li style="margin-bottom: 0.5rem;">Keyboard navigation support (Tab, Enter, Escape)</li>
          <li style="margin-bottom: 0.5rem;">Debounced value updates for performance</li>
          <li>Consistent styling across light and dark themes</li>
        </ul>

        <h2 style="font-size: 1.875rem; font-weight: 600; margin-bottom: 1rem; margin-top: 2.5rem; color: #1a1a1a;">
          Accessibility
        </h2>

        <ul style="color: #4a4a4a; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem;">All inputs have associated labels via aria-label or aria-labelledby</li>
          <li style="margin-bottom: 0.5rem;">Focus states are visible and consistent</li>
          <li style="margin-bottom: 0.5rem;">Dropdowns support keyboard navigation</li>
          <li>Sliders can be controlled with arrow keys</li>
        </ul>
      </div>
    `
  })
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = {}
