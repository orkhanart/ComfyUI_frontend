import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Feedback/Overview',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => ({
    template: `
      <div style="padding: 3rem; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">
        <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #1a1a1a;">
          Feedback
        </h1>

        <p style="font-size: 1.125rem; color: #4a4a4a; margin-bottom: 3rem;">
          User feedback components.
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
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Dialogs</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Modal/dialog windows</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Empty States</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Empty state displays</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Loading</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Loading indicators (spinner, skeleton, etc.)</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Toast</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Toast/notification messages</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  })
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = {}
