import type { Meta, StoryObj } from '@storybook/vue3-vite'

/**
 * Overlays Overview
 *
 * Overlay components appear on top of the main content to provide
 * contextual information, actions, or confirmations without navigating
 * away from the current view.
 */
const meta = {
  title: 'Overlays/Overview',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => ({
    template: `
      <div style="padding: 3rem; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">
        <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #1a1a1a;">
          Overlays
        </h1>

        <p style="font-size: 1.125rem; color: #4a4a4a; margin-bottom: 2rem;">
          Overlay components that appear on top of the main content for contextual information and actions.
        </p>

        <div style="display: grid; gap: 2rem; margin-bottom: 3rem;">
          <!-- Tooltips -->
          <div style="padding: 1.5rem; border: 1px solid #e5e5e5; border-radius: 0.75rem;">
            <h2 style="font-size: 1.25rem; font-weight: 600; margin: 0 0 0.75rem 0; color: #1a1a1a;">
              Tooltips
            </h2>
            <p style="margin: 0 0 1rem 0; color: #4a4a4a;">
              Small text hints that appear on hover to provide additional context.
            </p>
            <ul style="margin: 0; padding-left: 1.5rem; color: #666;">
              <li><strong>Basic Tooltip:</strong> Simple text on hover (PrimeVue directive)</li>
              <li><strong>NodeTooltip:</strong> Specialized tooltip for node inputs/outputs/widgets</li>
              <li><strong>Positions:</strong> Top, bottom, left, right placement</li>
              <li><strong>Delay:</strong> Configurable show delay</li>
            </ul>
          </div>

          <!-- Popovers -->
          <div style="padding: 1.5rem; border: 1px solid #e5e5e5; border-radius: 0.75rem;">
            <h2 style="font-size: 1.25rem; font-weight: 600; margin: 0 0 0.75rem 0; color: #1a1a1a;">
              Popovers
            </h2>
            <p style="margin: 0 0 1rem 0; color: #4a4a4a;">
              Floating panels that display rich content on click or hover.
            </p>
            <ul style="margin: 0; padding-left: 1.5rem; color: #666;">
              <li><strong>JobDetailsPopover:</strong> Queue job information and actions</li>
              <li><strong>CurrentUserPopover:</strong> User profile and account menu</li>
              <li><strong>WorkflowTabPopover:</strong> Workflow preview on tab hover</li>
              <li><strong>SubmenuPopover:</strong> Color/shape selection for nodes</li>
            </ul>
          </div>

          <!-- Context Menus -->
          <div style="padding: 1.5rem; border: 1px solid #e5e5e5; border-radius: 0.75rem;">
            <h2 style="font-size: 1.25rem; font-weight: 600; margin: 0 0 0.75rem 0; color: #1a1a1a;">
              Context Menus
            </h2>
            <p style="margin: 0 0 1rem 0; color: #4a4a4a;">
              Right-click menus for contextual actions.
            </p>
            <ul style="margin: 0; padding-left: 1.5rem; color: #666;">
              <li><strong>Node Menu:</strong> Right-click actions for nodes (properties, bypass, delete)</li>
              <li><strong>Canvas Menu:</strong> Right-click on canvas (add node, paste)</li>
              <li><strong>Job Menu:</strong> Queue job actions (cancel, copy ID, delete)</li>
              <li><strong>Selection Toolbox:</strong> More options for selected nodes</li>
            </ul>
          </div>
        </div>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin: 0 0 1rem 0; color: #1a1a1a;">
          Implementation Notes
        </h2>

        <div style="padding: 1.5rem; background: #f8f9fa; border-radius: 0.75rem; margin-bottom: 2rem;">
          <h3 style="font-size: 1rem; font-weight: 600; margin: 0 0 0.5rem 0; color: #1a1a1a;">
            PrimeVue Integration
          </h3>
          <p style="margin: 0; color: #4a4a4a;">
            ComfyUI uses PrimeVue components (Tooltip, Popover, ContextMenu) with custom styling
            to match the design system. The <code style="background: #e9ecef; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">pt</code> prop
            is used for style customization via pass-through.
          </p>
        </div>

        <div style="padding: 1.5rem; background: #fff3cd; border-radius: 0.75rem;">
          <h3 style="font-size: 1rem; font-weight: 600; margin: 0 0 0.5rem 0; color: #856404;">
            Store Dependencies
          </h3>
          <p style="margin: 0; color: #856404;">
            Some overlay components (NodeTooltip, JobDetailsPopover) are tightly coupled with
            Pinia stores and LiteGraph canvas. The stories demonstrate visual patterns using
            mock data where necessary.
          </p>
        </div>
      </div>
    `
  })
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = {}
