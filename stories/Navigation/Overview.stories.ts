import type { Meta, StoryObj } from '@storybook/vue3-vite'

/**
 * Navigation Overview
 *
 * Navigation components provide the primary means of moving through the ComfyUI
 * application. They include sidebar navigation, workflow tabs, breadcrumbs for
 * subgraph navigation, and context menus for contextual actions.
 *
 * Component Categories:
 * - Tabs: Tab navigation with TabList and Tab components
 * - Breadcrumb: Hierarchical path navigation for subgraphs
 * - Sidebar: Icon-based side navigation with badges and labels
 * - Topbar: Workflow tabs with close, status indicators
 * - Menus: Context menus and dropdown menus
 *
 * Design Principles:
 * - Consistent styling with ComfyUI design system
 * - Keyboard navigation support
 * - Clear visual feedback for active/selected states
 * - Responsive overflow handling
 * - Dark theme optimized
 */
const meta: Meta = {
  title: 'Navigation/Overview',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => ({
    template: `
      <div style="padding: 3rem; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">
        <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #1a1a1a;">
          Navigation
        </h1>

        <p style="font-size: 1.125rem; color: #4a4a4a; margin-bottom: 2rem;">
          Navigation components provide the primary means of moving through the ComfyUI
          application. They include sidebar navigation, workflow tabs, breadcrumbs for
          subgraph navigation, and context menus for contextual actions.
        </p>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; margin-top: 2rem; color: #1a1a1a;">
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
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Tabs</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">
                Tab navigation system with TabList container and Tab items.
                Uses provide/inject for state management.
              </td>
              <td style="padding: 0.75rem 1rem; color: #666; font-family: monospace; font-size: 0.875rem;">
                components/tab/
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Breadcrumb</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">
                Hierarchical path navigation for subgraph levels.
                Shows workflow name, subgraph path, with overflow handling.
              </td>
              <td style="padding: 0.75rem 1rem; color: #666; font-family: monospace; font-size: 0.875rem;">
                components/breadcrumb/
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Sidebar</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">
                Icon-based side navigation with badges, labels, and tooltips.
                Supports connected and floating styles.
              </td>
              <td style="padding: 0.75rem 1rem; color: #666; font-family: monospace; font-size: 0.875rem;">
                components/sidebar/
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Topbar</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">
                Workflow tabs with close buttons, unsaved indicators,
                and overflow scrolling.
              </td>
              <td style="padding: 0.75rem 1rem; color: #666; font-family: monospace; font-size: 0.875rem;">
                components/topbar/
              </td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 1rem;"><strong style="color: #1a1a1a;">Menus</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">
                Context menus and dropdown menus with icons, shortcuts,
                badges, and submenu support.
              </td>
              <td style="padding: 0.75rem 1rem; color: #666; font-family: monospace; font-size: 0.875rem;">
                components/graph/, queue/
              </td>
            </tr>
          </tbody>
        </table>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; margin-top: 2rem; color: #1a1a1a;">
          Design Principles
        </h2>

        <ul style="color: #4a4a4a; margin-bottom: 2rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem;">
            <strong>Consistency:</strong> All navigation follows ComfyUI design system tokens
          </li>
          <li style="margin-bottom: 0.5rem;">
            <strong>Accessibility:</strong> Full keyboard navigation and ARIA support
          </li>
          <li style="margin-bottom: 0.5rem;">
            <strong>Feedback:</strong> Clear visual states for active, hover, disabled
          </li>
          <li style="margin-bottom: 0.5rem;">
            <strong>Responsive:</strong> Overflow handling and adaptive layouts
          </li>
          <li style="margin-bottom: 0.5rem;">
            <strong>Theme-aware:</strong> Optimized for dark theme interface
          </li>
        </ul>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; margin-top: 2rem; color: #1a1a1a;">
          Key Features
        </h2>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 2rem;">
          <div style="background: #f8f8f8; padding: 1rem; border-radius: 8px;">
            <h3 style="font-size: 1rem; font-weight: 600; color: #1a1a1a; margin-bottom: 0.5rem;">
              Workflow Management
            </h3>
            <p style="font-size: 0.875rem; color: #666; margin: 0;">
              Tabs for multiple workflows, unsaved indicators, context menu actions
            </p>
          </div>
          <div style="background: #f8f8f8; padding: 1rem; border-radius: 8px;">
            <h3 style="font-size: 1rem; font-weight: 600; color: #1a1a1a; margin-bottom: 0.5rem;">
              Subgraph Navigation
            </h3>
            <p style="font-size: 0.875rem; color: #666; margin: 0;">
              Breadcrumbs for nested subgraph levels with rename support
            </p>
          </div>
          <div style="background: #f8f8f8; padding: 1rem; border-radius: 8px;">
            <h3 style="font-size: 1rem; font-weight: 600; color: #1a1a1a; margin-bottom: 0.5rem;">
              Feature Access
            </h3>
            <p style="font-size: 0.875rem; color: #666; margin: 0;">
              Sidebar icons for Node Library, Model Browser, Settings
            </p>
          </div>
          <div style="background: #f8f8f8; padding: 1rem; border-radius: 8px;">
            <h3 style="font-size: 1rem; font-weight: 600; color: #1a1a1a; margin-bottom: 0.5rem;">
              Contextual Actions
            </h3>
            <p style="font-size: 0.875rem; color: #666; margin: 0;">
              Right-click menus with keyboard shortcuts and badges
            </p>
          </div>
        </div>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; margin-top: 2rem; color: #1a1a1a;">
          Usage Notes
        </h2>

        <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 2rem;">
          <p style="margin: 0; color: #856404; font-size: 0.875rem;">
            <strong>Note:</strong> Many navigation components have store dependencies
            (workflowStore, workspaceStore, settingStore). The stories in this section
            use mocked components to demonstrate visual patterns independently.
          </p>
        </div>
      </div>
    `
  })
}

export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = {}
