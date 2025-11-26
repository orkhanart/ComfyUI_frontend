import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Foundation/Overview',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => ({
    template: `
      <div style="padding: 3rem; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">
        <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #1a1a1a;">
          Foundation
        </h1>

        <p style="font-size: 1.125rem; color: #4a4a4a; margin-bottom: 3rem;">
          The building blocks of the design system.
        </p>

        <h2 style="font-size: 1.875rem; font-weight: 600; margin-bottom: 1.5rem; margin-top: 2.5rem; color: #1a1a1a;">
          Contents
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
          <thead>
            <tr style="border-bottom: 2px solid #e5e5e5;">
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Token</th>
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Colors</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Color palette and semantic color tokens</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Icons</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Icon set and usage guide</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Shadows</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Shadow styles and elevation levels</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Spacing</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Spacing, margin and padding systems</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Typography</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Font styles and text hierarchy</td>
            </tr>
          </tbody>
        </table>

        <h2 style="font-size: 1.875rem; font-weight: 600; margin-bottom: 1rem; margin-top: 2.5rem; color: #1a1a1a;">
          Principles
        </h2>

        <ul style="color: #4a4a4a; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem;">Consistent color usage</li>
          <li style="margin-bottom: 0.5rem;">Accessibility standards compliance</li>
          <li style="margin-bottom: 0.5rem;">Responsive design support</li>
          <li>Dark/Light theme compatibility</li>
        </ul>
      </div>
    `
  })
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = {}
