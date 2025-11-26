import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Foundation/Shadows/Overview',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => ({
    template: `
      <div style="padding: 3rem; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">
        <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #1a1a1a;">
          Shadows
        </h1>

        <p style="font-size: 1.125rem; color: #4a4a4a; margin-bottom: 2rem;">
          Shadows create depth and establish visual hierarchy in the interface.
        </p>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #1a1a1a;">
          Shadow Scale
        </h2>

        <p style="color: #4a4a4a; margin-bottom: 1rem;">
          Tailwind CSS shadow utilities from subtle to dramatic:
        </p>

        <ul style="color: #4a4a4a; padding-left: 1.5rem; margin-bottom: 2rem;">
          <li style="margin-bottom: 0.5rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">shadow-sm</code> - Subtle, minimal elevation</li>
          <li style="margin-bottom: 0.5rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">shadow</code> - Default shadow for cards</li>
          <li style="margin-bottom: 0.5rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">shadow-md</code> - Medium elevation</li>
          <li style="margin-bottom: 0.5rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">shadow-lg</code> - Floating elements</li>
          <li style="margin-bottom: 0.5rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">shadow-xl</code> - Modals and overlays</li>
          <li style="margin-bottom: 0.5rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">shadow-2xl</code> - Maximum elevation</li>
        </ul>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #1a1a1a;">
          Custom Shadows
        </h2>

        <p style="color: #4a4a4a; margin-bottom: 2rem;">
          <code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">shadow-interface</code>
          - Custom shadow for panels and floating UI elements, defined in the design system.
        </p>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #1a1a1a;">
          Pages
        </h2>

        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 2px solid #e5e5e5;">
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Page</th>
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong>Shadow Scale</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Visual reference for all shadow sizes</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong>ComfyUI Shadows</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Custom shadow tokens</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong>Focus Rings</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Accessibility focus indicators</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 1rem;"><strong>Elevation Levels</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Conceptual elevation hierarchy</td>
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
