import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { h } from 'vue'
import ComfyLogo from '@/components/icons/ComfyLogo.vue'
import PuzzleIcon from '@/components/icons/PuzzleIcon.vue'
import VerifiedIcon from '@/components/icons/VerifiedIcon.vue'

/**
 * ComfyUI Custom Icons
 *
 * Custom SVG icons specific to ComfyUI. These are Vue components
 * that accept size and color props for flexibility.
 */

// Custom icon definitions from packages/design-system/src/icons/
const customIconClasses = [
  {
    name: 'ai-model',
    class: 'icon-[comfy--ai-model]',
    description: 'AI model file indicator'
  },
  {
    name: 'file-output',
    class: 'icon-[comfy--file-output]',
    description: 'Output file indicator'
  },
  {
    name: 'image-ai-edit',
    class: 'icon-[comfy--image-ai-edit]',
    description: 'AI image editing'
  },
  {
    name: 'mask',
    class: 'icon-[comfy--mask]',
    description: 'Mask editing tool'
  },
  {
    name: 'node',
    class: 'icon-[comfy--node]',
    description: 'Node indicator'
  },
  {
    name: 'pin',
    class: 'icon-[comfy--pin]',
    description: 'Pin/bookmark action'
  },
  {
    name: 'play',
    class: 'icon-[comfy--play]',
    description: 'Play/execute action'
  },
  {
    name: 'template',
    class: 'icon-[comfy--template]',
    description: 'Workflow template'
  },
  {
    name: 'workflow',
    class: 'icon-[comfy--workflow]',
    description: 'Workflow indicator'
  }
]

const meta: Meta = {
  title: 'Foundation/Icons/ComfyUI Icons',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Custom icons designed specifically for ComfyUI. Includes both Vue components and CSS class-based icons via Iconify.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Vue component icons with customizable size and color
 */
export const VueComponentIcons: Story = {
  render: () => ({
    components: { ComfyLogo, PuzzleIcon, VerifiedIcon },
    setup() {
      const sizes = [16, 24, 32, 48]
      const colors = ['currentColor', '#0b8ce9', '#00cd72', '#f75951']

      return () =>
        h(
          'div',
          {
            style: {
              padding: '2rem',
              maxWidth: '1000px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }
          },
          [
            h(
              'h1',
              {
                style: {
                  fontSize: '2rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  color: '#1a1a1a'
                }
              },
              'Vue Component Icons'
            ),
            h(
              'p',
              {
                style: {
                  fontSize: '1rem',
                  color: '#666',
                  marginBottom: '2rem'
                }
              },
              'Icons implemented as Vue components with size and color props.'
            ),

            // ComfyLogo
            h(
              'div',
              {
                style: {
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '0.75rem'
                }
              },
              [
                h(
                  'div',
                  {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }
                  },
                  [
                    h(
                      'h3',
                      {
                        style: {
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          color: '#1a1a1a',
                          margin: 0
                        }
                      },
                      'ComfyLogo'
                    ),
                    h(
                      'code',
                      {
                        style: {
                          fontSize: '0.75rem',
                          backgroundColor: '#e5e5e5',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem'
                        }
                      },
                      '@/components/icons/ComfyLogo.vue'
                    )
                  ]
                ),
                h(
                  'p',
                  {
                    style: {
                      fontSize: '0.875rem',
                      color: '#666',
                      marginBottom: '1rem'
                    }
                  },
                  'The ComfyUI logo icon. Supports outline and fill modes.'
                ),
                h(
                  'div',
                  {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      flexWrap: 'wrap'
                    }
                  },
                  sizes.map((size) =>
                    h(
                      'div',
                      {
                        key: size,
                        style: {
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }
                      },
                      [
                        h(ComfyLogo, { size, color: '#1a1a1a', mode: 'fill' }),
                        h(
                          'span',
                          {
                            style: { fontSize: '0.75rem', color: '#999' }
                          },
                          `${size}px`
                        )
                      ]
                    )
                  )
                )
              ]
            ),

            // PuzzleIcon
            h(
              'div',
              {
                style: {
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '0.75rem'
                }
              },
              [
                h(
                  'div',
                  {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }
                  },
                  [
                    h(
                      'h3',
                      {
                        style: {
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          color: '#1a1a1a',
                          margin: 0
                        }
                      },
                      'PuzzleIcon'
                    ),
                    h(
                      'code',
                      {
                        style: {
                          fontSize: '0.75rem',
                          backgroundColor: '#e5e5e5',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem'
                        }
                      },
                      '@/components/icons/PuzzleIcon.vue'
                    )
                  ]
                ),
                h(
                  'p',
                  {
                    style: {
                      fontSize: '0.875rem',
                      color: '#666',
                      marginBottom: '1rem'
                    }
                  },
                  'Extension/plugin indicator icon.'
                ),
                h(
                  'div',
                  {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      flexWrap: 'wrap'
                    }
                  },
                  colors.map((color) =>
                    h(
                      'div',
                      {
                        key: color,
                        style: {
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }
                      },
                      [
                        h(PuzzleIcon, { size: 32, color }),
                        h(
                          'span',
                          {
                            style: {
                              fontSize: '0.625rem',
                              fontFamily: 'monospace',
                              color: '#999'
                            }
                          },
                          color
                        )
                      ]
                    )
                  )
                )
              ]
            ),

            // VerifiedIcon
            h(
              'div',
              {
                style: {
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '0.75rem'
                }
              },
              [
                h(
                  'div',
                  {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }
                  },
                  [
                    h(
                      'h3',
                      {
                        style: {
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          color: '#1a1a1a',
                          margin: 0
                        }
                      },
                      'VerifiedIcon'
                    ),
                    h(
                      'code',
                      {
                        style: {
                          fontSize: '0.75rem',
                          backgroundColor: '#e5e5e5',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem'
                        }
                      },
                      '@/components/icons/VerifiedIcon.vue'
                    )
                  ]
                ),
                h(
                  'p',
                  {
                    style: {
                      fontSize: '0.875rem',
                      color: '#666',
                      marginBottom: '1rem'
                    }
                  },
                  'Verified/trusted indicator with checkmark.'
                ),
                h(
                  'div',
                  {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      flexWrap: 'wrap'
                    }
                  },
                  sizes.map((size) =>
                    h(
                      'div',
                      {
                        key: size,
                        style: {
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }
                      },
                      [
                        h(VerifiedIcon, { size }),
                        h(
                          'span',
                          {
                            style: { fontSize: '0.75rem', color: '#999' }
                          },
                          `${size}px`
                        )
                      ]
                    )
                  )
                )
              ]
            )
          ]
        )
    }
  })
}

/**
 * CSS class-based icons using Iconify dynamic selectors
 */
export const CSSClassIcons: Story = {
  render: () => ({
    setup() {
      return () =>
        h(
          'div',
          {
            style: {
              padding: '2rem',
              maxWidth: '1000px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }
          },
          [
            h(
              'h1',
              {
                style: {
                  fontSize: '2rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  color: '#1a1a1a'
                }
              },
              'CSS Class Icons'
            ),
            h(
              'p',
              {
                style: {
                  fontSize: '1rem',
                  color: '#666',
                  marginBottom: '1rem'
                }
              },
              'Custom SVG icons available via Iconify CSS classes. Use the icon-[comfy--name] pattern.'
            ),
            h(
              'p',
              {
                style: {
                  fontSize: '0.875rem',
                  color: '#999',
                  marginBottom: '2rem'
                }
              },
              'Source: packages/design-system/src/icons/'
            ),

            h(
              'div',
              {
                style: {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '1rem'
                }
              },
              customIconClasses.map((icon) =>
                h(
                  'div',
                  {
                    key: icon.name,
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '1.5rem',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '0.5rem',
                      gap: '0.75rem'
                    }
                  },
                  [
                    h('span', {
                      class: icon.class,
                      style: {
                        fontSize: '2rem',
                        color: '#1a1a1a'
                      }
                    }),
                    h(
                      'code',
                      {
                        style: {
                          fontSize: '0.6875rem',
                          backgroundColor: '#e5e5e5',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem',
                          wordBreak: 'break-all',
                          textAlign: 'center'
                        }
                      },
                      icon.class
                    ),
                    h(
                      'span',
                      {
                        style: {
                          fontSize: '0.75rem',
                          color: '#666',
                          textAlign: 'center'
                        }
                      },
                      icon.description
                    )
                  ]
                )
              )
            )
          ]
        )
    }
  })
}

/**
 * Icon usage examples in different contexts
 */
export const UsageExamples: Story = {
  render: () => ({
    components: { ComfyLogo, PuzzleIcon, VerifiedIcon },
    setup() {
      return () =>
        h(
          'div',
          {
            style: {
              padding: '2rem',
              maxWidth: '800px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }
          },
          [
            h(
              'h1',
              {
                style: {
                  fontSize: '2rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  color: '#1a1a1a'
                }
              },
              'Usage Examples'
            ),
            h(
              'p',
              {
                style: {
                  fontSize: '1rem',
                  color: '#666',
                  marginBottom: '2rem'
                }
              },
              'How to use ComfyUI icons in different contexts.'
            ),

            // Vue component usage
            h(
              'div',
              {
                style: {
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '0.75rem',
                  color: '#fff'
                }
              },
              [
                h(
                  'h3',
                  {
                    style: {
                      fontSize: '1rem',
                      fontWeight: '600',
                      marginBottom: '1rem'
                    }
                  },
                  'Vue Component'
                ),
                h(
                  'pre',
                  {
                    style: {
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      margin: 0,
                      overflow: 'auto'
                    }
                  },
                  `<script setup>
import ComfyLogo from '@/components/icons/ComfyLogo.vue'
</script>

<template>
  <ComfyLogo :size="24" color="currentColor" mode="fill" />
</template>`
                )
              ]
            ),

            // CSS class usage
            h(
              'div',
              {
                style: {
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '0.75rem',
                  color: '#fff'
                }
              },
              [
                h(
                  'h3',
                  {
                    style: {
                      fontSize: '1rem',
                      fontWeight: '600',
                      marginBottom: '1rem'
                    }
                  },
                  'CSS Class (Iconify)'
                ),
                h(
                  'pre',
                  {
                    style: {
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      margin: 0,
                      overflow: 'auto'
                    }
                  },
                  `<!-- Comfy custom icon -->
<span class="icon-[comfy--workflow] text-2xl" />

<!-- With Tailwind utilities -->
<span class="icon-[comfy--node] text-xl text-azure-600" />`
                )
              ]
            ),

            // In button context
            h(
              'div',
              {
                style: {
                  padding: '1.5rem',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '0.75rem'
                }
              },
              [
                h(
                  'h3',
                  {
                    style: {
                      fontSize: '1rem',
                      fontWeight: '600',
                      marginBottom: '1rem',
                      color: '#1a1a1a'
                    }
                  },
                  'In Context'
                ),
                h(
                  'div',
                  {
                    style: {
                      display: 'flex',
                      gap: '1rem',
                      flexWrap: 'wrap'
                    }
                  },
                  [
                    // Button with icon
                    h(
                      'button',
                      {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 1rem',
                          backgroundColor: '#0b8ce9',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }
                      },
                      [
                        h(ComfyLogo, { size: 16, color: '#fff', mode: 'fill' }),
                        'Run Workflow'
                      ]
                    ),
                    // Badge with verified icon
                    h(
                      'span',
                      {
                        style: {
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.25rem 0.75rem',
                          backgroundColor: '#e8f4fc',
                          color: '#0b8ce9',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }
                      },
                      [h(VerifiedIcon, { size: 14 }), 'Verified Publisher']
                    ),
                    // Extension label
                    h(
                      'span',
                      {
                        style: {
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.25rem 0.75rem',
                          backgroundColor: '#f0f0f0',
                          color: '#666',
                          borderRadius: '0.25rem',
                          fontSize: '0.75rem'
                        }
                      },
                      [
                        h(PuzzleIcon, { size: 14, color: '#666' }),
                        'Custom Node'
                      ]
                    )
                  ]
                )
              ]
            )
          ]
        )
    }
  })
}
