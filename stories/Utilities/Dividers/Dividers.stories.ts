import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Divider from 'primevue/divider'

import ContentDivider from '@/components/common/ContentDivider.vue'
import TextDivider from '@/components/common/TextDivider.vue'
import VerticalDivider from '@/components/graph/selectionToolbox/VerticalDivider.vue'

/**
 * Dividers are used to visually separate content into distinct sections.
 * ComfyUI uses several divider components for different contexts:
 *
 * - **ContentDivider**: Theme-aware horizontal/vertical separator line
 * - **TextDivider**: Divider with text label (left or right position)
 * - **VerticalDivider**: Simple vertical separator for toolbars
 * - **PrimeVue Divider**: Standard divider with multiple styles
 */
const meta = {
  title: 'Utilities/Dividers',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Divider components for separating content in different contexts.'
      }
    }
  }
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * ContentDivider is a theme-aware separator that automatically
 * adapts its color to light/dark themes.
 */
export const ContentDividerHorizontal: Story = {
  render: () => ({
    components: { ContentDivider },
    template: `
      <div style="width: 400px; padding: 16px; background: var(--p-surface-100);">
        <div style="padding: 16px; background: var(--p-surface-0); border-radius: 8px;">
          <p style="margin: 0 0 12px 0;">Content above divider</p>
          <ContentDivider orientation="horizontal" />
          <p style="margin: 12px 0 0 0;">Content below divider</p>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Horizontal ContentDivider creates a full-width separator between sections.'
      }
    }
  }
}

/**
 * Vertical ContentDivider for side-by-side content separation.
 */
export const ContentDividerVertical: Story = {
  render: () => ({
    components: { ContentDivider },
    template: `
      <div style="display: flex; align-items: stretch; height: 100px; width: 400px; padding: 16px; background: var(--p-surface-100);">
        <div style="flex: 1; display: flex; align-items: center; justify-content: center; background: var(--p-surface-0); border-radius: 8px 0 0 8px;">
          Left Panel
        </div>
        <ContentDivider orientation="vertical" />
        <div style="flex: 1; display: flex; align-items: center; justify-content: center; background: var(--p-surface-0); border-radius: 0 8px 8px 0;">
          Right Panel
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Vertical ContentDivider separates content horizontally, useful for split layouts.'
      }
    }
  }
}

/**
 * ContentDivider supports custom width for different visual weights.
 */
export const ContentDividerWidths: Story = {
  render: () => ({
    components: { ContentDivider },
    template: `
      <div style="width: 400px; display: flex; flex-direction: column; gap: 24px; padding: 16px; background: var(--p-surface-100);">
        <div style="background: var(--p-surface-0); padding: 12px; border-radius: 8px;">
          <p style="margin: 0 0 8px 0; font-size: 12px; color: var(--p-text-muted-color);">Default (0.3px)</p>
          <ContentDivider :width="0.3" />
        </div>
        <div style="background: var(--p-surface-0); padding: 12px; border-radius: 8px;">
          <p style="margin: 0 0 8px 0; font-size: 12px; color: var(--p-text-muted-color);">Thin (1px)</p>
          <ContentDivider :width="1" />
        </div>
        <div style="background: var(--p-surface-0); padding: 12px; border-radius: 8px;">
          <p style="margin: 0 0 8px 0; font-size: 12px; color: var(--p-text-muted-color);">Medium (2px)</p>
          <ContentDivider :width="2" />
        </div>
        <div style="background: var(--p-surface-0); padding: 12px; border-radius: 8px;">
          <p style="margin: 0 0 8px 0; font-size: 12px; color: var(--p-text-muted-color);">Thick (4px)</p>
          <ContentDivider :width="4" />
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'ContentDivider width can be customized for different visual emphasis levels.'
      }
    }
  }
}

/**
 * TextDivider displays a label alongside the divider line.
 * The text can be positioned on the left or right side.
 */
export const TextDividerDefault: Story = {
  render: () => ({
    components: { TextDivider },
    template: `
      <div style="width: 400px; padding: 16px; background: var(--p-surface-100);">
        <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px;">
          <p style="margin: 0 0 16px 0;">Section content above</p>
          <TextDivider text="Section Label" position="left" />
          <p style="margin: 16px 0 0 0;">Section content below</p>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'TextDivider with text label positioned on the left side of the line.'
      }
    }
  }
}

/**
 * TextDivider with right-aligned text.
 */
export const TextDividerRightPosition: Story = {
  render: () => ({
    components: { TextDivider },
    template: `
      <div style="width: 400px; padding: 16px; background: var(--p-surface-100);">
        <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px;">
          <p style="margin: 0 0 16px 0;">Section content above</p>
          <TextDivider text="End of Section" position="right" />
          <p style="margin: 16px 0 0 0;">Section content below</p>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'TextDivider with text positioned on the right side.'
      }
    }
  }
}

/**
 * TextDivider supports different line types: solid, dashed, or dotted.
 */
export const TextDividerLineTypes: Story = {
  render: () => ({
    components: { TextDivider },
    template: `
      <div style="width: 400px; display: flex; flex-direction: column; gap: 24px; padding: 16px; background: var(--p-surface-100);">
        <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px;">
          <TextDivider text="Solid" type="solid" />
        </div>
        <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px;">
          <TextDivider text="Dashed" type="dashed" />
        </div>
        <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px;">
          <TextDivider text="Dotted" type="dotted" />
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'TextDivider line can be solid, dashed, or dotted based on context.'
      }
    }
  }
}

/**
 * VerticalDivider is a simple toolbar separator used in selection toolbox
 * and action bars to group related controls.
 */
export const VerticalDividerToolbar: Story = {
  render: () => ({
    components: { VerticalDivider },
    template: `
      <div style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: var(--p-surface-100); border-radius: 8px;">
        <button style="padding: 8px 12px; background: var(--p-surface-0); border: 1px solid var(--p-surface-border); border-radius: 4px; cursor: pointer;">Cut</button>
        <button style="padding: 8px 12px; background: var(--p-surface-0); border: 1px solid var(--p-surface-border); border-radius: 4px; cursor: pointer;">Copy</button>
        <button style="padding: 8px 12px; background: var(--p-surface-0); border: 1px solid var(--p-surface-border); border-radius: 4px; cursor: pointer;">Paste</button>
        <VerticalDivider />
        <button style="padding: 8px 12px; background: var(--p-surface-0); border: 1px solid var(--p-surface-border); border-radius: 4px; cursor: pointer;">Undo</button>
        <button style="padding: 8px 12px; background: var(--p-surface-0); border: 1px solid var(--p-surface-border); border-radius: 4px; cursor: pointer;">Redo</button>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'VerticalDivider separates groups of related toolbar buttons. Used in selection toolbox and action bars.'
      }
    }
  }
}

/**
 * PrimeVue Divider with different visual styles.
 */
export const PrimeVueDividerStyles: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div style="width: 400px; display: flex; flex-direction: column; gap: 24px; padding: 16px; background: var(--p-surface-100);">
        <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px;">
          <p style="margin: 0 0 8px 0; font-size: 12px; color: var(--p-text-muted-color);">Solid (default)</p>
          <Divider />
        </div>
        <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px;">
          <p style="margin: 0 0 8px 0; font-size: 12px; color: var(--p-text-muted-color);">Dashed</p>
          <Divider type="dashed" />
        </div>
        <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px;">
          <p style="margin: 0 0 8px 0; font-size: 12px; color: var(--p-text-muted-color);">Dotted</p>
          <Divider type="dotted" />
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'PrimeVue Divider provides standard divider styles used throughout the application.'
      }
    }
  }
}

/**
 * PrimeVue Divider with content in the middle.
 */
export const PrimeVueDividerWithContent: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div style="width: 400px; display: flex; flex-direction: column; gap: 24px; padding: 16px; background: var(--p-surface-100);">
        <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px;">
          <Divider align="left">
            <span style="font-size: 12px; color: var(--p-text-muted-color);">Left aligned</span>
          </Divider>
        </div>
        <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px;">
          <Divider align="center">
            <span style="font-size: 12px; color: var(--p-text-muted-color);">Centered</span>
          </Divider>
        </div>
        <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px;">
          <Divider align="right">
            <span style="font-size: 12px; color: var(--p-text-muted-color);">Right aligned</span>
          </Divider>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'PrimeVue Divider can contain text or icons with different alignment options.'
      }
    }
  }
}

/**
 * All divider types displayed together for comparison.
 */
export const AllDividerTypes: Story = {
  render: () => ({
    components: { ContentDivider, TextDivider, VerticalDivider, Divider },
    template: `
      <div style="width: 500px; padding: 24px; background: var(--p-surface-100);">
        <h3 style="margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">Divider Types Comparison</h3>

        <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
          <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: var(--p-text-muted-color);">ContentDivider</p>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: var(--p-text-muted-color);">Theme-aware, customizable width</p>
          <ContentDivider :width="1" />
        </div>

        <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
          <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: var(--p-text-muted-color);">TextDivider</p>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: var(--p-text-muted-color);">With label, customizable position</p>
          <TextDivider text="Label" position="left" />
        </div>

        <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
          <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: var(--p-text-muted-color);">VerticalDivider</p>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: var(--p-text-muted-color);">Toolbar separator</p>
          <div style="display: flex; align-items: center; gap: 12px; height: 40px;">
            <span>Item 1</span>
            <VerticalDivider />
            <span>Item 2</span>
            <VerticalDivider />
            <span>Item 3</span>
          </div>
        </div>

        <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px;">
          <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: var(--p-text-muted-color);">PrimeVue Divider</p>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: var(--p-text-muted-color);">Standard divider with content support</p>
          <Divider align="center">
            <i class="pi pi-star" style="font-size: 12px;"></i>
          </Divider>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Overview of all divider types available in the design system.'
      }
    }
  }
}

/**
 * ComfyUI use cases for dividers in actual application contexts.
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: { ContentDivider, TextDivider, VerticalDivider, Divider },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px; background: var(--p-surface-100);">
        <!-- Settings Panel -->
        <div style="width: 300px;">
          <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Settings Panel</h4>
          <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px;">
            <div style="margin-bottom: 12px;">
              <label style="font-size: 12px; color: var(--p-text-muted-color);">Model</label>
              <p style="margin: 4px 0 0 0;">SD 1.5</p>
            </div>
            <TextDivider text="Advanced" position="left" />
            <div style="margin-top: 12px;">
              <label style="font-size: 12px; color: var(--p-text-muted-color);">Steps</label>
              <p style="margin: 4px 0 0 0;">20</p>
            </div>
            <div style="margin-top: 12px;">
              <label style="font-size: 12px; color: var(--p-text-muted-color);">CFG Scale</label>
              <p style="margin: 4px 0 0 0;">7.5</p>
            </div>
          </div>
        </div>

        <!-- Selection Toolbox -->
        <div>
          <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Selection Toolbox</h4>
          <div style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; background: var(--p-surface-0); border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <button style="padding: 6px; background: transparent; border: none; cursor: pointer;">
              <i class="pi pi-trash" style="font-size: 14px;"></i>
            </button>
            <button style="padding: 6px; background: transparent; border: none; cursor: pointer;">
              <i class="pi pi-copy" style="font-size: 14px;"></i>
            </button>
            <VerticalDivider />
            <button style="padding: 6px; background: transparent; border: none; cursor: pointer;">
              <i class="pi pi-palette" style="font-size: 14px;"></i>
            </button>
            <button style="padding: 6px; background: transparent; border: none; cursor: pointer;">
              <i class="pi pi-sliders-h" style="font-size: 14px;"></i>
            </button>
            <VerticalDivider />
            <button style="padding: 6px; background: transparent; border: none; cursor: pointer;">
              <i class="pi pi-play" style="font-size: 14px;"></i>
            </button>
          </div>
        </div>

        <!-- Dialog Section Separator -->
        <div style="width: 400px;">
          <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Dialog Content</h4>
          <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px;">
            <h5 style="margin: 0 0 8px 0; font-size: 14px;">System Information</h5>
            <p style="margin: 0; font-size: 13px; color: var(--p-text-muted-color);">OS: Windows 11</p>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: var(--p-text-muted-color);">Python: 3.10.6</p>
            <Divider />
            <h5 style="margin: 0 0 8px 0; font-size: 14px;">Device Information</h5>
            <p style="margin: 0; font-size: 13px; color: var(--p-text-muted-color);">GPU: NVIDIA RTX 4090</p>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: var(--p-text-muted-color);">VRAM: 24 GB</p>
          </div>
        </div>

        <!-- Split Panel -->
        <div>
          <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Split Panel Layout</h4>
          <div style="display: flex; width: 500px; height: 120px; background: var(--p-surface-0); border-radius: 8px; overflow: hidden;">
            <div style="flex: 1; padding: 16px; display: flex; align-items: center; justify-content: center;">
              <span style="color: var(--p-text-muted-color);">Input Preview</span>
            </div>
            <ContentDivider orientation="vertical" :width="1" />
            <div style="flex: 1; padding: 16px; display: flex; align-items: center; justify-content: center;">
              <span style="color: var(--p-text-muted-color);">Output Preview</span>
            </div>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Real-world usage of dividers in ComfyUI: settings panels, toolbars, dialogs, and split layouts.'
      }
    }
  }
}
