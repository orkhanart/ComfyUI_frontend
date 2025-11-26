import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Introduction/Overview',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => ({
    template: `
      <div style="padding: 3rem; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">
        <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #1a1a1a;">
          ComfyUI Design System v2.0
        </h1>

        <p style="font-size: 1.125rem; color: #4a4a4a; margin-bottom: 3rem;">
          This documentation contains the new design system for ComfyUI Frontend.
        </p>

        <h2 style="font-size: 1.875rem; font-weight: 600; margin-bottom: 1rem; margin-top: 2.5rem; color: #1a1a1a;">
          About
        </h2>

        <p style="color: #4a4a4a; margin-bottom: 2rem;">
          Design System v2.0 was created to standardize all UI components of ComfyUI and provide a consistent user experience.
        </p>

        <h2 style="font-size: 1.875rem; font-weight: 600; margin-bottom: 1.5rem; margin-top: 2.5rem; color: #1a1a1a;">
          Categories
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
          <thead>
            <tr style="border-bottom: 2px solid #e5e5e5;">
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Category</th>
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Foundation</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Basic design tokens like colors, icons, typography</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Buttons</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">All button variants</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Forms</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Form elements and input components</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Data Display</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Data visualization components</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Navigation</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Navigation components</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Feedback</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">User feedback components</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Overlays</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Modal and popup components</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Specialized</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">ComfyUI-specific components</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Utilities</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Helper components</td>
            </tr>
          </tbody>
        </table>

        <h2 style="font-size: 1.875rem; font-weight: 600; margin-bottom: 1rem; margin-top: 2.5rem; color: #1a1a1a;">
          Usage
        </h2>

        <p style="color: #4a4a4a;">
          Each category contains documentation and examples of related components.
        </p>
      </div>
    `
  })
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = {}
