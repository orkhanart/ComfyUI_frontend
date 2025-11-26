import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Buttons/Overview',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => ({
    template: `
      <div style="padding: 3rem; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">
        <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #1a1a1a;">
          Buttons
        </h1>

        <p style="font-size: 1.125rem; color: #4a4a4a; margin-bottom: 3rem;">
          All button variants.
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
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">IconButton</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Icon-only buttons</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">IconGroup</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Grouped icon buttons</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">IconTextButton</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Icon + text combination buttons</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">MoreButton</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">"More" / overflow menu button</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">TextButton</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Text-only buttons</td>
            </tr>
          </tbody>
        </table>

        <h2 style="font-size: 1.875rem; font-weight: 600; margin-bottom: 1rem; margin-top: 2.5rem; color: #1a1a1a;">
          Types
        </h2>

        <ul style="color: #4a4a4a; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">primary</code> - High emphasis, main actions (dark bg, light text)</li>
          <li style="margin-bottom: 0.5rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">secondary</code> - Medium emphasis, alternative actions</li>
          <li style="margin-bottom: 0.5rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">transparent</code> - Low emphasis, tertiary actions</li>
          <li><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">accent</code> - Brand-colored, special emphasis</li>
        </ul>

        <h2 style="font-size: 1.875rem; font-weight: 600; margin-bottom: 1rem; margin-top: 2.5rem; color: #1a1a1a;">
          Sizes
        </h2>

        <ul style="color: #4a4a4a; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">sm</code> - Small (32x32 icons, compact text)</li>
          <li style="margin-bottom: 0.5rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">md</code> - Medium/default (40x40 icons)</li>
          <li><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">fit-content</code> - Auto-sized to content</li>
        </ul>

        <h2 style="font-size: 1.875rem; font-weight: 600; margin-bottom: 1rem; margin-top: 2.5rem; color: #1a1a1a;">
          Border Variant
        </h2>

        <p style="color: #4a4a4a;">
          All buttons support a <code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">border</code> prop
          that adds a visible border, useful for buttons on complex backgrounds.
        </p>
      </div>
    `
  })
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = {}
