import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Foundation/Spacing/Overview',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => ({
    template: `
      <div style="padding: 3rem; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">
        <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #1a1a1a;">
          Spacing
        </h1>

        <p style="font-size: 1.125rem; color: #4a4a4a; margin-bottom: 2rem;">
          Consistent spacing creates visual rhythm and hierarchy throughout the interface.
        </p>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #1a1a1a;">
          Base Unit
        </h2>

        <p style="color: #4a4a4a; margin-bottom: 2rem;">
          The spacing system uses a <strong>4px (0.25rem)</strong> base unit.
          All spacing values are multiples of this base for visual consistency.
        </p>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #1a1a1a;">
          Utilities
        </h2>

        <p style="color: #4a4a4a; margin-bottom: 1rem;">
          Tailwind CSS spacing utilities available:
        </p>

        <ul style="color: #4a4a4a; padding-left: 1.5rem; margin-bottom: 2rem;">
          <li style="margin-bottom: 0.5rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">p-{size}</code> - Padding (all sides)</li>
          <li style="margin-bottom: 0.5rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">px-{size}</code> / <code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">py-{size}</code> - Horizontal/vertical padding</li>
          <li style="margin-bottom: 0.5rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">m-{size}</code> - Margin (all sides)</li>
          <li style="margin-bottom: 0.5rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">mx-{size}</code> / <code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">my-{size}</code> - Horizontal/vertical margin</li>
          <li style="margin-bottom: 0.5rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">gap-{size}</code> - Flex/grid gap</li>
          <li style="margin-bottom: 0.5rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">space-x-{size}</code> / <code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">space-y-{size}</code> - Child spacing</li>
        </ul>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #1a1a1a;">
          Common Values
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
          <thead>
            <tr style="border-bottom: 2px solid #e5e5e5;">
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Size</th>
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Value</th>
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">1</code></td>
              <td style="padding: 0.75rem 1rem; font-family: monospace;">4px</td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Tight spacing, icon margins</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">2</code></td>
              <td style="padding: 0.75rem 1rem; font-family: monospace;">8px</td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Default small spacing</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">4</code></td>
              <td style="padding: 0.75rem 1rem; font-family: monospace;">16px</td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Standard component padding</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">6</code></td>
              <td style="padding: 0.75rem 1rem; font-family: monospace;">24px</td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Section spacing</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 1rem;"><code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">8</code></td>
              <td style="padding: 0.75rem 1rem; font-family: monospace;">32px</td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Large section gaps</td>
            </tr>
          </tbody>
        </table>

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
              <td style="padding: 0.75rem 1rem;"><strong>Spacing Scale</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Complete scale with visual reference</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong>Patterns</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Common spacing combinations</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong>Padding Demo</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Visual padding comparison</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 1rem;"><strong>Gap Demo</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Flex/grid gap examples</td>
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
