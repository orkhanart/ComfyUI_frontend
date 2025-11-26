import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Button from 'primevue/button'
import Message from 'primevue/message'

/**
 * File operation components handle downloading, uploading, and managing files
 * in ComfyUI. These components provide user-friendly interfaces for:
 *
 * - **FileDownload**: Download button with file size display and URL copy
 * - **BackgroundImageUpload**: Image upload for workflow backgrounds
 * - **ElectronFileDownload**: Desktop app file operations
 *
 * Note: The actual Vue components have dependencies on composables (useDownload,
 * useCopyToClipboard) that require runtime context. These stories demonstrate
 * the visual patterns and layouts used.
 */
const meta = {
  title: 'Utilities/File Operations',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Components for file download, upload, and management operations in ComfyUI.'
      }
    }
  }
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * FileDownload component displays a download button with file information.
 * Shows the file label, size, and provides download and copy URL actions.
 */
export const FileDownloadDefault: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="padding: 16px; background: var(--p-surface-0); border-radius: 8px; width: 450px;">
        <div style="display: flex; flex-row; align-items: center; gap: 12px;">
          <div>
            <div title="https://example.com/models/sd_xl_base_1.0.safetensors">
              sd_xl_base_1.0.safetensors
            </div>
          </div>
          <div>
            <Button label="Download (6.94 GB)" size="small" outlined />
          </div>
          <div>
            <Button label="Copy URL" size="small" outlined />
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Default FileDownload showing model file with size and action buttons.'
      }
    }
  }
}

/**
 * FileDownload with custom label for better context.
 */
export const FileDownloadWithLabel: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="padding: 16px; background: var(--p-surface-0); border-radius: 8px; width: 500px;">
        <div style="display: flex; flex-row; align-items: center; gap: 12px;">
          <div>
            <div title="SDXL Base Model - Stable Diffusion XL 1.0">
              <span style="font-weight: 500;">SDXL Base Model</span>
              <span style="color: var(--p-text-muted-color); font-size: 12px; margin-left: 8px;">
                Stable Diffusion XL 1.0
              </span>
            </div>
          </div>
          <div style="margin-left: auto;">
            <Button label="Download (6.94 GB)" size="small" outlined />
          </div>
          <div>
            <Button label="Copy URL" size="small" outlined />
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'FileDownload with a custom label and hint for better context.'
      }
    }
  }
}

/**
 * FileDownload in error state when the file cannot be accessed.
 */
export const FileDownloadError: Story = {
  render: () => ({
    components: { Button, Message },
    template: `
      <div style="padding: 16px; background: var(--p-surface-0); border-radius: 8px; width: 500px;">
        <div style="display: flex; flex-row; align-items: center; gap: 12px;">
          <div>
            <div>missing_model.safetensors</div>
            <Message
              severity="error"
              icon="pi pi-exclamation-triangle"
              size="small"
              variant="outlined"
              style="margin-top: 8px; padding: 4px 8px;"
            >
              File not found or access denied
            </Message>
          </div>
          <div style="margin-left: auto;">
            <Button label="Download (?)" size="small" outlined disabled />
          </div>
          <div>
            <Button label="Copy URL" size="small" outlined disabled />
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'FileDownload shows error state when file is inaccessible, with disabled buttons.'
      }
    }
  }
}

/**
 * Multiple file downloads in a list format.
 */
export const FileDownloadList: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const files = [
        { name: 'sd_xl_base_1.0.safetensors', size: '6.94 GB', type: 'Model' },
        {
          name: 'sd_xl_refiner_1.0.safetensors',
          size: '6.08 GB',
          type: 'Model'
        },
        { name: 'sdxl_vae.safetensors', size: '335 MB', type: 'VAE' },
        { name: 'ip-adapter_sdxl.safetensors', size: '698 MB', type: 'LoRA' }
      ]
      return { files }
    },
    template: `
      <div style="padding: 16px; background: var(--p-surface-0); border-radius: 8px; width: 550px;">
        <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Required Downloads</h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div
            v-for="file in files"
            :key="file.name"
            style="display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid var(--p-surface-border);"
          >
            <div style="flex: 1;">
              <div style="font-size: 13px;">{{ file.name }}</div>
              <div style="font-size: 11px; color: var(--p-text-muted-color);">{{ file.type }}</div>
            </div>
            <Button :label="'Download (' + file.size + ')'" size="small" outlined />
            <Button icon="pi pi-copy" size="small" outlined aria-label="Copy URL" />
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple FileDownload items in a list, common for model dependencies.'
      }
    }
  }
}

/**
 * Image upload component for workflow backgrounds.
 */
export const BackgroundImageUpload: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="padding: 24px; background: var(--p-surface-0); border-radius: 8px; width: 400px;">
        <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Background Image</h4>
        <div
          style="
            border: 2px dashed var(--p-surface-border);
            border-radius: 8px;
            padding: 32px;
            text-align: center;
            cursor: pointer;
            transition: border-color 0.2s;
          "
        >
          <i class="pi pi-image" style="font-size: 32px; color: var(--p-text-muted-color); margin-bottom: 12px; display: block;"></i>
          <p style="margin: 0 0 8px 0; color: var(--p-text-muted-color); font-size: 13px;">
            Drag & drop an image here
          </p>
          <p style="margin: 0 0 16px 0; color: var(--p-text-muted-color); font-size: 12px;">
            or
          </p>
          <Button label="Browse Files" size="small" outlined />
        </div>
        <p style="margin: 12px 0 0 0; font-size: 11px; color: var(--p-text-muted-color);">
          Supported formats: PNG, JPG, WebP (max 10MB)
        </p>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Drag and drop upload area for setting workflow canvas background images.'
      }
    }
  }
}

/**
 * Image upload with preview of selected file.
 */
export const BackgroundImageUploadWithPreview: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="padding: 24px; background: var(--p-surface-0); border-radius: 8px; width: 400px;">
        <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Background Image</h4>
        <div style="position: relative; border-radius: 8px; overflow: hidden;">
          <img
            src="https://picsum.photos/400/200"
            alt="Background preview"
            style="width: 100%; height: 150px; object-fit: cover;"
          />
          <div style="position: absolute; top: 8px; right: 8px; display: flex; gap: 4px;">
            <Button icon="pi pi-pencil" size="small" rounded aria-label="Change" />
            <Button icon="pi pi-trash" size="small" rounded severity="danger" aria-label="Remove" />
          </div>
        </div>
        <p style="margin: 12px 0 0 0; font-size: 11px; color: var(--p-text-muted-color);">
          background.jpg (245 KB)
        </p>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Upload component with image preview and actions to change or remove.'
      }
    }
  }
}

/**
 * File size display variants showing different formatting.
 */
export const FileSizeFormats: Story = {
  render: () => ({
    setup() {
      const sizes = [
        { bytes: 1024, formatted: '1 KB' },
        { bytes: 1048576, formatted: '1 MB' },
        { bytes: 354418278, formatted: '338 MB' },
        { bytes: 1073741824, formatted: '1 GB' },
        { bytes: 7449083904, formatted: '6.94 GB' },
        { bytes: 15032385536, formatted: '14 GB' }
      ]
      return { sizes }
    },
    template: `
      <div style="padding: 16px; background: var(--p-surface-0); border-radius: 8px; width: 300px;">
        <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">File Size Formatting</h4>
        <table style="width: 100%; font-size: 13px;">
          <thead>
            <tr style="text-align: left; border-bottom: 1px solid var(--p-surface-border);">
              <th style="padding: 8px 0;">Bytes</th>
              <th style="padding: 8px 0;">Display</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="size in sizes" :key="size.bytes" style="border-bottom: 1px solid var(--p-surface-100);">
              <td style="padding: 8px 0; color: var(--p-text-muted-color);">{{ size.bytes.toLocaleString() }}</td>
              <td style="padding: 8px 0; font-weight: 500;">{{ size.formatted }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'File sizes are formatted using formatSize utility for human-readable display.'
      }
    }
  }
}

/**
 * ComfyUI use cases for file operations in real contexts.
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: { Button, Message },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px; background: var(--p-surface-100);">
        <!-- Missing Models Dialog -->
        <div style="width: 550px;">
          <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Missing Models Dialog</h4>
          <div style="background: var(--p-surface-0); padding: 20px; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
              <i class="pi pi-exclamation-triangle" style="font-size: 24px; color: #f59e0b;"></i>
              <div>
                <h5 style="margin: 0; font-size: 16px;">Missing Models Detected</h5>
                <p style="margin: 4px 0 0 0; font-size: 13px; color: var(--p-text-muted-color);">
                  The following models are required to run this workflow
                </p>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px; padding: 12px; background: var(--p-surface-50); border-radius: 6px;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 13px;">sd_xl_base_1.0.safetensors</span>
                <Button label="Download (6.94 GB)" size="small" outlined />
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 13px;">controlnet-canny-sdxl-1.0.safetensors</span>
                <Button label="Download (2.5 GB)" size="small" outlined />
              </div>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px;">
              <Button label="Download All" severity="primary" />
              <Button label="Skip" severity="secondary" outlined />
            </div>
          </div>
        </div>

        <!-- Export Workflow -->
        <div style="width: 400px;">
          <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Export Workflow</h4>
          <div style="background: var(--p-surface-0); padding: 20px; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">
            <p style="margin: 0 0 16px 0; font-size: 13px; color: var(--p-text-muted-color);">
              Export your workflow to share or backup
            </p>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <Button label="Export as JSON" icon="pi pi-download" outlined class="w-full" />
              <Button label="Export as PNG (embedded)" icon="pi pi-image" outlined class="w-full" />
              <Button label="Export API Format" icon="pi pi-code" outlined class="w-full" />
            </div>
          </div>
        </div>

        <!-- Settings Import/Export -->
        <div style="width: 400px;">
          <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Settings Backup</h4>
          <div style="background: var(--p-surface-0); padding: 20px; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">
            <div style="display: flex; gap: 12px;">
              <div style="flex: 1; padding: 16px; border: 1px solid var(--p-surface-border); border-radius: 6px; text-align: center;">
                <i class="pi pi-upload" style="font-size: 24px; color: var(--p-primary-color); margin-bottom: 8px; display: block;"></i>
                <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 500;">Import</p>
                <p style="margin: 0; font-size: 11px; color: var(--p-text-muted-color);">Load settings from file</p>
              </div>
              <div style="flex: 1; padding: 16px; border: 1px solid var(--p-surface-border); border-radius: 6px; text-align: center;">
                <i class="pi pi-download" style="font-size: 24px; color: var(--p-primary-color); margin-bottom: 8px; display: block;"></i>
                <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 500;">Export</p>
                <p style="margin: 0; font-size: 11px; color: var(--p-text-muted-color);">Save settings to file</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Model Download Progress -->
        <div style="width: 450px;">
          <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Download Progress</h4>
          <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <i class="pi pi-spinner pi-spin" style="font-size: 16px; color: var(--p-primary-color);"></i>
              <span style="font-size: 13px; font-weight: 500;">Downloading sd_xl_base_1.0.safetensors</span>
            </div>
            <div style="height: 8px; background: var(--p-surface-200); border-radius: 4px; overflow: hidden; margin-bottom: 8px;">
              <div style="width: 45%; height: 100%; background: var(--p-primary-color); border-radius: 4px;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--p-text-muted-color);">
              <span>3.12 GB / 6.94 GB</span>
              <span>45% - 2 min remaining</span>
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
          'Real-world file operation contexts: missing models dialog, workflow export, settings backup, and download progress.'
      }
    }
  }
}

/**
 * Dark theme visualization of file operation components.
 */
export const DarkTheme: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="dark" style="padding: 24px; background: #1a1a1a; border-radius: 8px;">
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <!-- File Download -->
          <div style="padding: 16px; background: #2a2a2a; border-radius: 8px; width: 450px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="color: #e5e5e5;">sd_xl_base_1.0.safetensors</div>
              <div style="margin-left: auto;">
                <Button label="Download (6.94 GB)" size="small" outlined />
              </div>
              <Button label="Copy URL" size="small" outlined />
            </div>
          </div>

          <!-- Upload Area -->
          <div style="padding: 16px; background: #2a2a2a; border-radius: 8px; width: 350px;">
            <div
              style="
                border: 2px dashed #444;
                border-radius: 8px;
                padding: 24px;
                text-align: center;
              "
            >
              <i class="pi pi-cloud-upload" style="font-size: 28px; color: #888; margin-bottom: 8px; display: block;"></i>
              <p style="margin: 0; color: #888; font-size: 13px;">Drop files here or click to browse</p>
            </div>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'File operation components in dark theme context.'
      }
    }
  }
}
