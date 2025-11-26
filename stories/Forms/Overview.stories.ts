import type { Meta, StoryObj } from '@storybook/vue3-vite'

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
          Form elements and input components.
        </p>

        <h2 style="font-size: 1.875rem; font-weight: 600; margin-bottom: 1.5rem; margin-top: 2.5rem; color: #1a1a1a;">
          Components
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
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Form Components</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Basic form elements (input, checkbox, radio, etc.)</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">MultiSelect</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Multi-selection dropdown</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">SearchBox</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Search input box</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">SingleSelect</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Single selection dropdown</td>
            </tr>
          </tbody>
        </table>

        <h2 style="font-size: 1.875rem; font-weight: 600; margin-bottom: 1rem; margin-top: 2.5rem; color: #1a1a1a;">
          Form Patterns
        </h2>

        <ul style="color: #4a4a4a; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem;">Label + Input combination</li>
          <li style="margin-bottom: 0.5rem;">Validation states (error, success)</li>
          <li style="margin-bottom: 0.5rem;">Helper text</li>
          <li>Required field indicator</li>
        </ul>

        <h2 style="font-size: 1.875rem; font-weight: 600; margin-bottom: 1rem; margin-top: 2.5rem; color: #1a1a1a;">
          Accessibility
        </h2>

        <ul style="color: #4a4a4a; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem;">All inputs must be associated with labels</li>
          <li style="margin-bottom: 0.5rem;">Error messages must be screen reader compatible</li>
          <li>Keyboard navigation support</li>
        </ul>
      </div>
    `
  })
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = {}
