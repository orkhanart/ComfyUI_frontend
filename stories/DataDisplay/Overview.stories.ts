import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Data Display/Overview',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => ({
    template: `
      <div style="padding: 3rem; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">
        <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #1a1a1a;">
          Data Display
        </h1>

        <p style="font-size: 1.125rem; color: #4a4a4a; margin-bottom: 3rem;">
          Data visualization components.
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
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Cards</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Card components</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Images</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Image/visual components</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">TreeExplorer</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Tree structure explorer</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">VirtualGrid</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Virtualized grid view</td>
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
