import type { Meta, StoryObj } from '@storybook/vue3-vite'

/**
 * Utility components provide helper functionality for various tasks in ComfyUI.
 * These components handle common operations like visual separation, system information
 * display, file operations, and user-related features.
 *
 * ## Available Components
 *
 * | Component | Description |
 * |-----------|-------------|
 * | **Dividers** | Visual separators (ContentDivider, TextDivider, VerticalDivider) |
 * | **System Info** | Hardware and software information (DeviceInfo, SystemStatsPanel) |
 * | **File Operations** | File download, upload, and management |
 * | **Customization** | Color pickers, icon selectors, personalization |
 * | **User Components** | User avatars, credits, and account features |
 *
 * ## Usage Guidelines
 *
 * - Use **Dividers** to visually separate content sections
 * - Use **System Info** components in settings dialogs and debug panels
 * - Use **File Operations** for model downloads and workflow exports
 * - Use **Customization** for personalization dialogs (colors, icons)
 * - Use **User Components** for authentication and profile displays
 */
const meta = {
  title: 'Utilities/Overview',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => ({
    template: `
      <div style="padding: 3rem; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">
        <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #1a1a1a;">
          Utilities
        </h1>

        <p style="font-size: 1.125rem; color: #4a4a4a; margin-bottom: 3rem;">
          Helper components and tools for common operations throughout ComfyUI.
        </p>

        <h2 style="font-size: 1.875rem; font-weight: 600; margin-bottom: 1.5rem; margin-top: 2.5rem; color: #1a1a1a;">
          Components
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
          <thead>
            <tr style="border-bottom: 2px solid #e5e5e5;">
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Component</th>
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Description</th>
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Source</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Dividers</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Visual separators for content sections (horizontal, vertical, with text)</td>
              <td style="padding: 0.75rem 1rem; font-family: monospace; font-size: 0.875rem; color: #6b7280;">ContentDivider, TextDivider, VerticalDivider</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">System Info</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Hardware and software information display (GPU, RAM, OS)</td>
              <td style="padding: 0.75rem 1rem; font-family: monospace; font-size: 0.875rem; color: #6b7280;">DeviceInfo, SystemStatsPanel</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">File Operations</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">File download, upload, and management operations</td>
              <td style="padding: 0.75rem 1rem; font-family: monospace; font-size: 0.875rem; color: #6b7280;">FileDownload, BackgroundImageUpload</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Customization</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Color pickers, icon selectors, personalization options</td>
              <td style="padding: 0.75rem 1rem; font-family: monospace; font-size: 0.875rem; color: #6b7280;">ColorCustomizationSelector, CustomizationDialog</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">User Components</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">User avatars, credits, and authentication features</td>
              <td style="padding: 0.75rem 1rem; font-family: monospace; font-size: 0.875rem; color: #6b7280;">UserAvatar, UserCredit</td>
            </tr>
          </tbody>
        </table>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; margin-top: 2.5rem; color: #1a1a1a;">
          Common Use Cases
        </h2>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-bottom: 2rem;">
          <div style="padding: 1.25rem; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
            <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600; color: #1a1a1a;">Settings Dialogs</h3>
            <p style="margin: 0; font-size: 0.875rem; color: #4a4a4a;">
              Use SystemStatsPanel to display system information and Dividers to separate setting groups.
            </p>
          </div>
          <div style="padding: 1.25rem; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
            <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600; color: #1a1a1a;">Toolbars</h3>
            <p style="margin: 0; font-size: 0.875rem; color: #4a4a4a;">
              Use VerticalDivider to group related toolbar buttons in action bars and selection toolbox.
            </p>
          </div>
          <div style="padding: 1.25rem; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
            <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600; color: #1a1a1a;">Model Downloads</h3>
            <p style="margin: 0; font-size: 0.875rem; color: #4a4a4a;">
              Use FileDownload for missing model dialogs with size display and copy URL functionality.
            </p>
          </div>
          <div style="padding: 1.25rem; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
            <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600; color: #1a1a1a;">User Authentication</h3>
            <p style="margin: 0; font-size: 0.875rem; color: #4a4a4a;">
              Use UserAvatar and UserCredit in topbar for user profile display and account balance.
            </p>
          </div>
        </div>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; margin-top: 2.5rem; color: #1a1a1a;">
          Implementation Notes
        </h2>

        <ul style="padding-left: 1.5rem; color: #4a4a4a; margin-bottom: 2rem;">
          <li style="margin-bottom: 0.5rem;"><strong>ContentDivider</strong> automatically adapts to light/dark theme via colorPaletteStore</li>
          <li style="margin-bottom: 0.5rem;"><strong>TextDivider</strong> wraps PrimeVue Divider with text positioning</li>
          <li style="margin-bottom: 0.5rem;"><strong>DeviceInfo</strong> uses formatSize utility for human-readable memory values</li>
          <li style="margin-bottom: 0.5rem;"><strong>FileDownload</strong> uses useDownload and useCopyToClipboard composables</li>
          <li style="margin-bottom: 0.5rem;"><strong>UserAvatar</strong> falls back to icon when photoUrl is null or image fails to load</li>
          <li style="margin-bottom: 0.5rem;"><strong>UserCredit</strong> shows skeleton loader while fetching balance from auth store</li>
        </ul>
      </div>
    `
  })
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = {}
