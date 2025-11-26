import type { Meta, StoryObj } from '@storybook/vue3-vite'

import DeviceInfo from '@/components/common/DeviceInfo.vue'
import SystemStatsPanel from '@/components/common/SystemStatsPanel.vue'

// Mock data for device stats
const mockDevice = {
  index: 0,
  name: 'NVIDIA GeForce RTX 4090',
  type: 'cuda',
  vram_total: 25769803776, // 24 GB
  vram_free: 20971520000, // ~19.5 GB
  torch_vram_total: 24696061952, // ~23 GB
  torch_vram_free: 19327352832 // ~18 GB
}

const mockDeviceAMD = {
  index: 0,
  name: 'AMD Radeon RX 7900 XTX',
  type: 'rocm',
  vram_total: 25769803776,
  vram_free: 22548578304,
  torch_vram_total: 24696061952,
  torch_vram_free: 21474836480
}

const mockDeviceCPU = {
  index: 0,
  name: 'CPU',
  type: 'cpu',
  vram_total: 0,
  vram_free: 0,
  torch_vram_total: 0,
  torch_vram_free: 0
}

const mockSystemStats = {
  system: {
    os: 'Windows 11',
    python_version: '3.10.6',
    embedded_python: false,
    pytorch_version: '2.1.0+cu121',
    argv: ['main.py', '--listen', '127.0.0.1', '--port', '8188'],
    ram_total: 68719476736, // 64 GB
    ram_free: 45097156608 // ~42 GB
  },
  devices: [mockDevice]
}

const mockSystemStatsMultiGPU = {
  system: {
    os: 'Ubuntu 22.04 LTS',
    python_version: '3.11.4',
    embedded_python: false,
    pytorch_version: '2.1.0+cu121',
    argv: ['main.py', '--listen', '0.0.0.0', '--multi-gpu'],
    ram_total: 137438953472, // 128 GB
    ram_free: 102005473280 // ~95 GB
  },
  devices: [
    { ...mockDevice, index: 0, name: 'NVIDIA GeForce RTX 4090 #0' },
    { ...mockDevice, index: 1, name: 'NVIDIA GeForce RTX 4090 #1' }
  ]
}

/**
 * System information components display hardware and software details
 * about the ComfyUI backend. These are used in settings dialogs and
 * debug panels to help users understand their system configuration.
 *
 * - **DeviceInfo**: Displays GPU/device statistics (VRAM, type)
 * - **SystemStatsPanel**: Complete system overview with system info and device tabs
 */
const meta = {
  title: 'Utilities/System Info',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Components for displaying system and device information from the ComfyUI backend.'
      }
    }
  }
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * DeviceInfo displays details about a single compute device (GPU/CPU).
 * Shows device name, type, and VRAM statistics with formatted values.
 */
export const DeviceInfoDefault: Story = {
  render: () => ({
    components: { DeviceInfo },
    setup() {
      return { device: mockDevice }
    },
    template: `
      <div style="width: 400px; padding: 16px; background: var(--p-surface-0); border-radius: 8px;">
        <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Device Information</h3>
        <DeviceInfo :device="device" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Default DeviceInfo display showing NVIDIA GPU with VRAM statistics.'
      }
    }
  }
}

/**
 * DeviceInfo showing an AMD GPU with ROCm compute type.
 */
export const DeviceInfoAMD: Story = {
  render: () => ({
    components: { DeviceInfo },
    setup() {
      return { device: mockDeviceAMD }
    },
    template: `
      <div style="width: 400px; padding: 16px; background: var(--p-surface-0); border-radius: 8px;">
        <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">AMD Device</h3>
        <DeviceInfo :device="device" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'DeviceInfo for AMD GPU using ROCm compute backend.'
      }
    }
  }
}

/**
 * DeviceInfo for CPU-only mode when no GPU is available.
 */
export const DeviceInfoCPU: Story = {
  render: () => ({
    components: { DeviceInfo },
    setup() {
      return { device: mockDeviceCPU }
    },
    template: `
      <div style="width: 400px; padding: 16px; background: var(--p-surface-0); border-radius: 8px;">
        <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">CPU Mode</h3>
        <DeviceInfo :device="device" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'DeviceInfo in CPU-only mode shows zero VRAM as the system runs without GPU acceleration.'
      }
    }
  }
}

/**
 * SystemStatsPanel shows the complete system overview including
 * OS, Python version, PyTorch version, RAM, and device information.
 */
export const SystemStatsPanelDefault: Story = {
  render: () => ({
    components: { SystemStatsPanel },
    setup() {
      return { stats: mockSystemStats }
    },
    template: `
      <div style="width: 500px; padding: 16px; background: var(--p-surface-0); border-radius: 8px;">
        <SystemStatsPanel :stats="stats" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Full SystemStatsPanel with system info and single GPU device details.'
      }
    }
  }
}

/**
 * SystemStatsPanel with multiple GPUs shows a tabbed interface
 * to switch between device information panels.
 */
export const SystemStatsPanelMultiGPU: Story = {
  render: () => ({
    components: { SystemStatsPanel },
    setup() {
      return { stats: mockSystemStatsMultiGPU }
    },
    template: `
      <div style="width: 500px; padding: 16px; background: var(--p-surface-0); border-radius: 8px;">
        <SystemStatsPanel :stats="stats" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'SystemStatsPanel with multiple GPUs displays tabs to navigate between device information.'
      }
    }
  }
}

/**
 * Comparison of different device configurations side by side.
 */
export const DeviceComparison: Story = {
  render: () => ({
    components: { DeviceInfo },
    setup() {
      return {
        devices: [
          { ...mockDevice, label: 'NVIDIA CUDA' },
          { ...mockDeviceAMD, label: 'AMD ROCm' },
          { ...mockDeviceCPU, label: 'CPU Only' }
        ]
      }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <div v-for="(d, i) in devices" :key="i" style="width: 280px; padding: 16px; background: var(--p-surface-0); border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: var(--p-primary-color);">{{ d.label }}</h4>
          <DeviceInfo :device="d" />
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Side-by-side comparison of different device types: NVIDIA CUDA, AMD ROCm, and CPU-only.'
      }
    }
  }
}

/**
 * Visual representation of how DeviceInfo formats memory values.
 */
export const MemoryFormatting: Story = {
  render: () => ({
    components: { DeviceInfo },
    setup() {
      const deviceVariants = [
        {
          ...mockDevice,
          name: 'RTX 4090 24GB',
          vram_total: 25769803776,
          vram_free: 25769803776
        },
        {
          ...mockDevice,
          name: 'RTX 4090 (50% used)',
          vram_total: 25769803776,
          vram_free: 12884901888
        },
        {
          ...mockDevice,
          name: 'RTX 4090 (90% used)',
          vram_total: 25769803776,
          vram_free: 2576980378
        }
      ]
      return { deviceVariants }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div v-for="(device, i) in deviceVariants" :key="i" style="width: 400px; padding: 16px; background: var(--p-surface-0); border-radius: 8px;">
          <DeviceInfo :device="device" />
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Memory values are automatically formatted using formatSize utility (e.g., 24 GB, 12.5 GB).'
      }
    }
  }
}

/**
 * ComfyUI use cases showing how system info appears in real contexts.
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: { SystemStatsPanel, DeviceInfo },
    setup() {
      return {
        stats: mockSystemStats,
        multiGpuStats: mockSystemStatsMultiGPU
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px; background: var(--p-surface-100);">
        <!-- Settings Dialog -->
        <div style="width: 550px;">
          <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Settings Dialog - System Tab</h4>
          <div style="background: var(--p-surface-0); padding: 20px; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">
            <SystemStatsPanel :stats="stats" />
          </div>
        </div>

        <!-- Quick Info Tooltip -->
        <div>
          <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">GPU Status Tooltip</h4>
          <div style="display: inline-block; background: var(--p-surface-0); padding: 12px 16px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="width: 8px; height: 8px; background: #22c55e; border-radius: 50%;"></span>
              <span style="font-size: 13px; font-weight: 500;">NVIDIA RTX 4090</span>
            </div>
            <div style="font-size: 12px; color: var(--p-text-muted-color);">
              VRAM: 19.5 GB / 24 GB available
            </div>
          </div>
        </div>

        <!-- Multi-GPU Server -->
        <div style="width: 550px;">
          <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Multi-GPU Server Configuration</h4>
          <div style="background: var(--p-surface-0); padding: 20px; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">
            <SystemStatsPanel :stats="multiGpuStats" />
          </div>
        </div>

        <!-- Status Bar Widget -->
        <div>
          <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Status Bar GPU Widget</h4>
          <div style="display: inline-flex; align-items: center; gap: 12px; padding: 8px 16px; background: var(--p-surface-0); border-radius: 4px; font-size: 12px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <i class="pi pi-microchip" style="font-size: 14px; color: var(--p-primary-color);"></i>
              <span>RTX 4090</span>
            </div>
            <div style="width: 1px; height: 16px; background: var(--p-surface-border);"></div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="color: var(--p-text-muted-color);">VRAM:</span>
              <div style="width: 60px; height: 6px; background: var(--p-surface-200); border-radius: 3px; overflow: hidden;">
                <div style="width: 20%; height: 100%; background: var(--p-primary-color);"></div>
              </div>
              <span>20%</span>
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
          'Real-world usage in ComfyUI: settings dialogs, status tooltips, multi-GPU configurations, and status bar widgets.'
      }
    }
  }
}

/**
 * Dark theme visualization of system info components.
 */
export const DarkTheme: Story = {
  render: () => ({
    components: { SystemStatsPanel, DeviceInfo },
    setup() {
      return { stats: mockSystemStats, device: mockDevice }
    },
    template: `
      <div class="dark" style="padding: 24px; background: #1a1a1a; border-radius: 8px;">
        <div style="display: flex; gap: 24px; flex-wrap: wrap;">
          <div style="width: 300px; padding: 16px; background: #2a2a2a; border-radius: 8px;">
            <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #e5e5e5;">Device Info</h4>
            <DeviceInfo :device="device" />
          </div>
          <div style="flex: 1; min-width: 400px; padding: 16px; background: #2a2a2a; border-radius: 8px;">
            <SystemStatsPanel :stats="stats" />
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'System info components rendered in dark theme context.'
      }
    }
  }
}
