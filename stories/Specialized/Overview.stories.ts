import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Specialized/Overview',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => ({
    template: `
      <div style="padding: 3rem; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">
        <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #1a1a1a;">
          Specialized
        </h1>

        <p style="font-size: 1.125rem; color: #4a4a4a; margin-bottom: 3rem;">
          ComfyUI-specific components.
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
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">3D Viewer</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">3D model viewer</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Bottom Panel</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Bottom panel (logs, progress, etc.)</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Graph & Canvas</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Node graph and canvas components</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Mask Editor</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Mask editing interface</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Node Library</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Node library/selector</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Queue Management</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Job queue management</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Widgets</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Node widgets</td>
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
