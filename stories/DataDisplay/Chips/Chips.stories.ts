import type { Meta, StoryObj } from '@storybook/vue3-vite'

import SearchFilterChip from '@/components/common/SearchFilterChip.vue'
import SquareChip from '@/components/chip/SquareChip.vue'

/**
 * Chip components for displaying tags, badges, and filter indicators.
 *
 * ## Components
 * - **SquareChip**: Compact label chip with icon slot, used for card overlays and tags
 * - **SearchFilterChip**: Removable filter chip with badge, used in search results
 *
 * ## SquareChip Variants
 * - `dark`: Semi-transparent dark background (default)
 * - `light`: Blurred light background
 * - `gray`: Card tag style background
 */
const meta: Meta<typeof SquareChip> = {
  title: 'Data Display/Chips',
  component: SquareChip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Chip components for displaying tags, badges, and removable filter indicators.'
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Text content of the chip'
    },
    variant: {
      control: 'select',
      options: ['dark', 'light', 'gray'],
      description: 'Visual style variant'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default SquareChip with dark variant
 */
export const Default: Story = {
  args: {
    label: 'SD 1.5',
    variant: 'dark'
  }
}

/**
 * All SquareChip variants
 */
export const AllVariants: Story = {
  render: () => ({
    components: { SquareChip },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <div style="text-align: center;">
          <SquareChip label="Dark" variant="dark" />
          <p style="margin-top: 8px; font-size: 12px; color: #666;">dark</p>
        </div>

        <div style="text-align: center; padding: 16px; background: #333; border-radius: 8px;">
          <SquareChip label="Light" variant="light" />
          <p style="margin-top: 8px; font-size: 12px; color: #ccc;">light (on dark bg)</p>
        </div>

        <div style="text-align: center;">
          <SquareChip label="Gray" variant="gray" />
          <p style="margin-top: 8px; font-size: 12px; color: #666;">gray</p>
        </div>
      </div>
    `
  })
}

/**
 * SquareChip with icon slot
 */
export const WithIcon: Story = {
  render: () => ({
    components: { SquareChip },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <SquareChip label="Verified" variant="dark">
          <template #icon>
            <i class="pi pi-check-circle" style="font-size: 12px;"></i>
          </template>
        </SquareChip>

        <SquareChip label="SDXL" variant="dark">
          <template #icon>
            <i class="pi pi-box" style="font-size: 12px;"></i>
          </template>
        </SquareChip>

        <SquareChip label="512x512" variant="gray">
          <template #icon>
            <i class="pi pi-image" style="font-size: 12px;"></i>
          </template>
        </SquareChip>
      </div>
    `
  })
}

/**
 * SquareChip on card overlays - typical usage
 */
export const CardOverlayUsage: Story = {
  render: () => ({
    components: { SquareChip },
    template: `
      <div style="position: relative; width: 250px; height: 200px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; overflow: hidden;">
        <div style="position: absolute; top: 12px; left: 12px; display: flex; gap: 8px;">
          <SquareChip label="New" variant="dark" />
          <SquareChip label="SDXL" variant="dark" />
        </div>

        <div style="position: absolute; bottom: 12px; left: 12px; display: flex; gap: 8px;">
          <SquareChip label="1024x1024" variant="light" />
        </div>

        <div style="position: absolute; bottom: 12px; right: 12px;">
          <SquareChip label="24 runs" variant="dark" />
        </div>
      </div>
    `
  })
}

/**
 * SearchFilterChip - removable filter chips with badges
 */
export const SearchFilterChipStory: Story = {
  name: 'Search Filter Chip',
  render: () => ({
    components: { SearchFilterChip },
    setup() {
      const handleRemove = (text: string) => {
        console.log(`Filter removed: ${text}`)
        alert(`Removed filter: ${text}`)
      }
      return { handleRemove }
    },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        <SearchFilterChip
          text="CLIP Text Encode"
          badge="I"
          badge-class="i-badge"
          @remove="handleRemove('CLIP Text Encode')"
        />

        <SearchFilterChip
          text="KSampler"
          badge="O"
          badge-class="o-badge"
          @remove="handleRemove('KSampler')"
        />

        <SearchFilterChip
          text="conditioning"
          badge="C"
          badge-class="c-badge"
          @remove="handleRemove('conditioning')"
        />

        <SearchFilterChip
          text="sampling"
          badge="S"
          badge-class="s-badge"
          @remove="handleRemove('sampling')"
        />
      </div>
    `
  })
}

/**
 * Badge types explanation for SearchFilterChip
 */
export const BadgeTypes: Story = {
  render: () => ({
    components: { SearchFilterChip },
    template: `
      <div style="max-width: 500px;">
        <h3 style="margin-bottom: 16px; font-weight: 600; color: #1a1a1a;">Filter Badge Types</h3>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <SearchFilterChip text="Input filter" badge="I" badge-class="i-badge" />
            <span style="color: #666; font-size: 14px;">Input node filter (green)</span>
          </div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <SearchFilterChip text="Output filter" badge="O" badge-class="o-badge" />
            <span style="color: #666; font-size: 14px;">Output node filter (red)</span>
          </div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <SearchFilterChip text="Category filter" badge="C" badge-class="c-badge" />
            <span style="color: #666; font-size: 14px;">Category filter (blue)</span>
          </div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <SearchFilterChip text="Source filter" badge="S" badge-class="s-badge" />
            <span style="color: #666; font-size: 14px;">Source filter (yellow)</span>
          </div>
        </div>
      </div>
    `
  })
}

/**
 * ComfyUI use cases
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: { SquareChip, SearchFilterChip },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h3 style="margin-bottom: 16px; font-weight: 600; color: #1a1a1a;">Workflow Card Tags</h3>
          <div style="display: flex; gap: 12px;">
            <div style="position: relative; width: 180px; height: 140px; background: #4a5568; border-radius: 8px;">
              <div style="position: absolute; top: 8px; left: 8px; display: flex; gap: 4px;">
                <SquareChip label="SDXL" variant="dark" />
              </div>
              <div style="position: absolute; bottom: 8px; right: 8px;">
                <SquareChip label="15 runs" variant="dark" />
              </div>
            </div>

            <div style="position: relative; width: 180px; height: 140px; background: #667eea; border-radius: 8px;">
              <div style="position: absolute; top: 8px; left: 8px; display: flex; gap: 4px;">
                <SquareChip label="SD 1.5" variant="dark" />
                <SquareChip label="LoRA" variant="dark" />
              </div>
              <div style="position: absolute; bottom: 8px; right: 8px;">
                <SquareChip label="512x512" variant="dark" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 16px; font-weight: 600; color: #1a1a1a;">Node Search Filters</h3>
          <div style="padding: 16px; background: #f5f5f5; border-radius: 8px; max-width: 500px;">
            <div style="margin-bottom: 12px; font-size: 14px; color: #666;">Active filters:</div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <SearchFilterChip text="conditioning" badge="C" badge-class="c-badge" />
              <SearchFilterChip text="CLIP" badge="I" badge-class="i-badge" />
              <SearchFilterChip text="CONDITIONING" badge="O" badge-class="o-badge" />
            </div>
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 16px; font-weight: 600; color: #1a1a1a;">Model Tags</h3>
          <div style="display: flex; gap: 8px;">
            <SquareChip label="Checkpoint" variant="gray" />
            <SquareChip label="LoRA" variant="gray" />
            <SquareChip label="VAE" variant="gray" />
            <SquareChip label="ControlNet" variant="gray" />
          </div>
        </div>
      </div>
    `
  })
}

/**
 * Dark theme preview
 */
export const DarkTheme: Story = {
  render: () => ({
    components: { SquareChip, SearchFilterChip },
    template: `
      <div class="dark-theme" style="background: #0a0a0a; padding: 24px; border-radius: 8px;">
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <div>
            <h4 style="margin-bottom: 12px; font-weight: 600; color: #ccc;">SquareChip Variants</h4>
            <div style="display: flex; gap: 12px;">
              <SquareChip label="Dark" variant="dark" />
              <SquareChip label="Light" variant="light" />
              <SquareChip label="Gray" variant="gray" />
            </div>
          </div>

          <div>
            <h4 style="margin-bottom: 12px; font-weight: 600; color: #ccc;">SearchFilterChip</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <SearchFilterChip text="Input Type" badge="I" badge-class="i-badge" />
              <SearchFilterChip text="Output Type" badge="O" badge-class="o-badge" />
            </div>
          </div>

          <div>
            <h4 style="margin-bottom: 12px; font-weight: 600; color: #ccc;">Card Overlay Demo</h4>
            <div style="position: relative; width: 200px; height: 150px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 8px;">
              <div style="position: absolute; top: 8px; left: 8px; display: flex; gap: 6px;">
                <SquareChip label="FLUX" variant="dark" />
              </div>
              <div style="position: absolute; bottom: 8px; right: 8px;">
                <SquareChip label="42 runs" variant="dark" />
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  })
}
