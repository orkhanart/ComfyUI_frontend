import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Foundation/Colors/Overview',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => ({
    template: `
      <div style="padding: 3rem; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">
        <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #1a1a1a;">
          Colors
        </h1>

        <p style="font-size: 1.125rem; color: #4a4a4a; margin-bottom: 2rem;">
          The color system provides a consistent visual language across ComfyUI.
        </p>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #1a1a1a;">
          Structure
        </h2>

        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; color: #1a1a1a;">
            Color Palette
          </h3>
          <p style="color: #4a4a4a; margin-bottom: 1rem;">
            Raw color values organized into families (Charcoal, Smoke, Azure, etc.).
            These are the building blocks used to create semantic tokens.
          </p>

          <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; color: #1a1a1a;">
            Semantic Colors
          </h3>
          <p style="color: #4a4a4a; margin-bottom: 1rem;">
            Theme-aware tokens that automatically switch between light and dark modes.
            Always prefer semantic tokens over raw palette values.
          </p>
        </div>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #1a1a1a;">
          Usage Guidelines
        </h2>

        <ul style="color: #4a4a4a; padding-left: 1.5rem; margin-bottom: 2rem;">
          <li style="margin-bottom: 0.5rem;">Use semantic tokens (e.g., <code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">bg-base-background</code>) instead of raw colors</li>
          <li style="margin-bottom: 0.5rem;">Never use Tailwind dark: variants - semantic tokens handle theme switching</li>
          <li style="margin-bottom: 0.5rem;">Use the <code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">cn()</code> utility for conditional class application</li>
          <li style="margin-bottom: 0.5rem;">Reference <code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">design-system/src/css/style.css</code> for all available tokens</li>
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
              <td style="padding: 0.75rem 1rem;"><strong>Palette</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Raw color values organized by family</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 1rem;"><strong>Semantic Colors</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Theme-aware tokens with light/dark variants</td>
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
