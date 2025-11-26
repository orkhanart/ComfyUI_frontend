import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Foundation/Typography/Overview',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => ({
    template: `
      <div style="padding: 3rem; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">
        <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #1a1a1a;">
          Typography
        </h1>

        <p style="font-size: 1.125rem; color: #4a4a4a; margin-bottom: 2rem;">
          The typography system ensures consistent, readable text across the application.
        </p>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #1a1a1a;">
          Font Family
        </h2>

        <p style="color: #4a4a4a; margin-bottom: 2rem;">
          <strong>Inter</strong> is the primary font family, chosen for its excellent legibility
          at small sizes and support for variable font weights (100-900).
        </p>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #1a1a1a;">
          Scale
        </h2>

        <p style="color: #4a4a4a; margin-bottom: 1rem;">
          The type scale extends Tailwind defaults with additional small sizes for compact UI:
        </p>

        <ul style="color: #4a4a4a; padding-left: 1.5rem; margin-bottom: 2rem;">
          <li style="margin-bottom: 0.5rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">text-xxxs</code> (9px) - Micro text for badges</li>
          <li style="margin-bottom: 0.5rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">text-xxs</code> (10px) - Compact labels</li>
          <li style="margin-bottom: 0.5rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">text-xs</code> to <code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">text-4xl</code> - Standard Tailwind scale</li>
        </ul>

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
              <td style="padding: 0.75rem 1rem;"><strong>Font Sizes</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Complete size scale with previews</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong>Font Weights</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Available font weights (400-700)</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong>Headings</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">H1-H6 heading styles</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong>Body Text</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Paragraph and content styles</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 1rem;"><strong>Font Family</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Inter and monospace specimens</td>
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
