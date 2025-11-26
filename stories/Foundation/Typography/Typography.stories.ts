import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { h } from 'vue'

/**
 * Typography
 *
 * This page documents the typography system used in ComfyUI.
 * The design system uses Inter as the primary font family with
 * Tailwind CSS utility classes for sizing and weights.
 */

// Typography scale from Tailwind + custom additions
const fontSizes = {
  xxxs: { size: '0.5625rem', lineHeight: 'calc(1 / 0.5625)', pixels: '9px' },
  xxs: { size: '0.625rem', lineHeight: 'calc(1 / 0.625)', pixels: '10px' },
  xs: { size: '0.75rem', lineHeight: '1rem', pixels: '12px' },
  sm: { size: '0.875rem', lineHeight: '1.25rem', pixels: '14px' },
  base: { size: '1rem', lineHeight: '1.5rem', pixels: '16px' },
  lg: { size: '1.125rem', lineHeight: '1.75rem', pixels: '18px' },
  xl: { size: '1.25rem', lineHeight: '1.75rem', pixels: '20px' },
  '2xl': { size: '1.5rem', lineHeight: '2rem', pixels: '24px' },
  '3xl': { size: '1.875rem', lineHeight: '2.25rem', pixels: '30px' },
  '4xl': { size: '2.25rem', lineHeight: '2.5rem', pixels: '36px' }
}

const fontWeights = {
  normal: { value: '400', description: 'Regular text' },
  medium: { value: '500', description: 'Slightly emphasized text' },
  semibold: { value: '600', description: 'Subheadings and labels' },
  bold: { value: '700', description: 'Headings and important text' }
}

// Font size row component
const FontSizeRow = (props: {
  name: string
  size: string
  lineHeight: string
  pixels: string
}) => {
  const { name, size, lineHeight, pixels } = props
  return h(
    'div',
    {
      style: {
        display: 'grid',
        gridTemplateColumns: '80px 100px 120px 1fr',
        alignItems: 'center',
        padding: '1rem 0',
        borderBottom: '1px solid #f0f0f0',
        gap: '1rem'
      }
    },
    [
      h(
        'code',
        {
          style: {
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#1a1a1a',
            backgroundColor: '#f5f5f5',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem'
          }
        },
        `text-${name}`
      ),
      h(
        'span',
        {
          style: {
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            color: '#666'
          }
        },
        `${size} (${pixels})`
      ),
      h(
        'span',
        {
          style: {
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            color: '#999'
          }
        },
        `line-height: ${lineHeight}`
      ),
      h(
        'span',
        {
          style: {
            fontSize: size,
            lineHeight: lineHeight,
            color: '#1a1a1a',
            fontFamily: "'Inter', system-ui, sans-serif"
          }
        },
        'The quick brown fox jumps over the lazy dog'
      )
    ]
  )
}

// Font weight row component
const FontWeightRow = (props: {
  name: string
  value: string
  description: string
}) => {
  const { name, value, description } = props
  return h(
    'div',
    {
      style: {
        display: 'grid',
        gridTemplateColumns: '120px 60px 200px 1fr',
        alignItems: 'center',
        padding: '1rem 0',
        borderBottom: '1px solid #f0f0f0',
        gap: '1rem'
      }
    },
    [
      h(
        'code',
        {
          style: {
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#1a1a1a',
            backgroundColor: '#f5f5f5',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem'
          }
        },
        `font-${name}`
      ),
      h(
        'span',
        {
          style: {
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            color: '#666'
          }
        },
        value
      ),
      h(
        'span',
        {
          style: {
            fontSize: '0.75rem',
            color: '#999'
          }
        },
        description
      ),
      h(
        'span',
        {
          style: {
            fontSize: '1rem',
            fontWeight: value,
            color: '#1a1a1a',
            fontFamily: "'Inter', system-ui, sans-serif"
          }
        },
        'The quick brown fox jumps over the lazy dog'
      )
    ]
  )
}

const meta: Meta = {
  title: 'Foundation/Typography/Scale',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Typography scale and font weights used throughout ComfyUI. The primary font is Inter.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Complete font size scale from xxxs to 4xl
 */
export const FontSizes: Story = {
  render: () => ({
    setup() {
      return () =>
        h(
          'div',
          {
            style: {
              padding: '2rem',
              maxWidth: '1200px',
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
              'Font Sizes'
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
              'Tailwind CSS font size utilities with custom additions (xxxs, xxs) for compact UI elements.'
            ),
            h(
              'div',
              {
                style: {
                  display: 'grid',
                  gridTemplateColumns: '80px 100px 120px 1fr',
                  padding: '0.75rem 0',
                  borderBottom: '2px solid #e5e5e5',
                  gap: '1rem',
                  marginBottom: '0.5rem'
                }
              },
              [
                h(
                  'span',
                  {
                    style: {
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#666'
                    }
                  },
                  'Class'
                ),
                h(
                  'span',
                  {
                    style: {
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#666'
                    }
                  },
                  'Size'
                ),
                h(
                  'span',
                  {
                    style: {
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#666'
                    }
                  },
                  'Line Height'
                ),
                h(
                  'span',
                  {
                    style: {
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#666'
                    }
                  },
                  'Preview'
                )
              ]
            ),
            ...Object.entries(fontSizes).map(([name, config]) =>
              h(FontSizeRow, {
                key: name,
                name,
                size: config.size,
                lineHeight: config.lineHeight,
                pixels: config.pixels
              })
            )
          ]
        )
    }
  })
}

/**
 * Font weight options from normal (400) to bold (700)
 */
export const FontWeights: Story = {
  render: () => ({
    setup() {
      return () =>
        h(
          'div',
          {
            style: {
              padding: '2rem',
              maxWidth: '1200px',
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
              'Font Weights'
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
              'Inter supports variable font weights. These are the commonly used weights in the design system.'
            ),
            h(
              'div',
              {
                style: {
                  display: 'grid',
                  gridTemplateColumns: '120px 60px 200px 1fr',
                  padding: '0.75rem 0',
                  borderBottom: '2px solid #e5e5e5',
                  gap: '1rem',
                  marginBottom: '0.5rem'
                }
              },
              [
                h(
                  'span',
                  {
                    style: {
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#666'
                    }
                  },
                  'Class'
                ),
                h(
                  'span',
                  {
                    style: {
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#666'
                    }
                  },
                  'Value'
                ),
                h(
                  'span',
                  {
                    style: {
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#666'
                    }
                  },
                  'Usage'
                ),
                h(
                  'span',
                  {
                    style: {
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#666'
                    }
                  },
                  'Preview'
                )
              ]
            ),
            ...Object.entries(fontWeights).map(([name, config]) =>
              h(FontWeightRow, {
                key: name,
                name,
                value: config.value,
                description: config.description
              })
            )
          ]
        )
    }
  })
}

/**
 * Heading styles from H1 to H6
 */
export const Headings: Story = {
  render: () => ({
    setup() {
      const headings = [
        {
          tag: 'h1',
          size: '2.25rem',
          weight: '700',
          class: 'text-4xl font-bold'
        },
        {
          tag: 'h2',
          size: '1.875rem',
          weight: '700',
          class: 'text-3xl font-bold'
        },
        {
          tag: 'h3',
          size: '1.5rem',
          weight: '600',
          class: 'text-2xl font-semibold'
        },
        {
          tag: 'h4',
          size: '1.25rem',
          weight: '600',
          class: 'text-xl font-semibold'
        },
        {
          tag: 'h5',
          size: '1.125rem',
          weight: '600',
          class: 'text-lg font-semibold'
        },
        {
          tag: 'h6',
          size: '1rem',
          weight: '600',
          class: 'text-base font-semibold'
        }
      ]

      return () =>
        h(
          'div',
          {
            style: {
              padding: '2rem',
              maxWidth: '1000px',
              fontFamily: "'Inter', system-ui, sans-serif"
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
                  color: '#1a1a1a',
                  fontFamily: 'system-ui, sans-serif'
                }
              },
              'Headings'
            ),
            h(
              'p',
              {
                style: {
                  fontSize: '1rem',
                  color: '#666',
                  marginBottom: '2rem',
                  fontFamily: 'system-ui, sans-serif'
                }
              },
              'Recommended heading styles using Tailwind utility combinations.'
            ),
            ...headings.map((heading) =>
              h(
                'div',
                {
                  key: heading.tag,
                  style: {
                    marginBottom: '2rem',
                    paddingBottom: '1.5rem',
                    borderBottom: '1px solid #f0f0f0'
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
                        marginBottom: '0.5rem'
                      }
                    },
                    [
                      h(
                        'code',
                        {
                          style: {
                            fontSize: '0.75rem',
                            backgroundColor: '#f5f5f5',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem',
                            color: '#666'
                          }
                        },
                        `<${heading.tag}>`
                      ),
                      h(
                        'code',
                        {
                          style: {
                            fontSize: '0.75rem',
                            backgroundColor: '#e8f4fc',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem',
                            color: '#0b8ce9'
                          }
                        },
                        heading.class
                      )
                    ]
                  ),
                  h(
                    heading.tag,
                    {
                      style: {
                        fontSize: heading.size,
                        fontWeight: heading.weight,
                        color: '#1a1a1a',
                        margin: '0.5rem 0 0'
                      }
                    },
                    'The quick brown fox jumps over the lazy dog'
                  )
                ]
              )
            )
          ]
        )
    }
  })
}

/**
 * Body text styles for paragraphs and content
 */
export const BodyText: Story = {
  render: () => ({
    setup() {
      const bodyStyles = [
        {
          name: 'Large Body',
          class: 'text-lg',
          size: '1.125rem',
          description: 'For introductory or emphasized paragraphs'
        },
        {
          name: 'Default Body',
          class: 'text-base',
          size: '1rem',
          description: 'Standard body text for most content'
        },
        {
          name: 'Small Body',
          class: 'text-sm',
          size: '0.875rem',
          description: 'Secondary content and descriptions'
        },
        {
          name: 'Caption',
          class: 'text-xs',
          size: '0.75rem',
          description: 'Labels, captions, and helper text'
        },
        {
          name: 'Micro',
          class: 'text-xxs',
          size: '0.625rem',
          description: 'Badges and compact UI elements'
        }
      ]

      const sampleText =
        'ComfyUI is a powerful and modular stable diffusion GUI with a graph/nodes interface. It allows you to design and execute advanced stable diffusion pipelines using a visual workflow.'

      return () =>
        h(
          'div',
          {
            style: {
              padding: '2rem',
              maxWidth: '800px',
              fontFamily: "'Inter', system-ui, sans-serif"
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
                  color: '#1a1a1a',
                  fontFamily: 'system-ui, sans-serif'
                }
              },
              'Body Text'
            ),
            h(
              'p',
              {
                style: {
                  fontSize: '1rem',
                  color: '#666',
                  marginBottom: '2rem',
                  fontFamily: 'system-ui, sans-serif'
                }
              },
              'Text styles for paragraphs, descriptions, and content areas.'
            ),
            ...bodyStyles.map((style) =>
              h(
                'div',
                {
                  key: style.name,
                  style: {
                    marginBottom: '2rem',
                    paddingBottom: '1.5rem',
                    borderBottom: '1px solid #f0f0f0'
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
                        marginBottom: '0.25rem'
                      }
                    },
                    [
                      h(
                        'span',
                        {
                          style: {
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#1a1a1a'
                          }
                        },
                        style.name
                      ),
                      h(
                        'code',
                        {
                          style: {
                            fontSize: '0.75rem',
                            backgroundColor: '#e8f4fc',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem',
                            color: '#0b8ce9'
                          }
                        },
                        style.class
                      ),
                      h(
                        'span',
                        {
                          style: {
                            fontSize: '0.75rem',
                            color: '#999'
                          }
                        },
                        style.size
                      )
                    ]
                  ),
                  h(
                    'p',
                    {
                      style: {
                        fontSize: '0.75rem',
                        color: '#666',
                        marginBottom: '0.75rem'
                      }
                    },
                    style.description
                  ),
                  h(
                    'p',
                    {
                      style: {
                        fontSize: style.size,
                        color: '#1a1a1a',
                        lineHeight: '1.6',
                        margin: 0
                      }
                    },
                    sampleText
                  )
                ]
              )
            )
          ]
        )
    }
  })
}

/**
 * Font family: Inter
 */
export const FontFamily: Story = {
  render: () => ({
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
              'Font Family'
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
              'ComfyUI uses Inter as the primary font family.'
            ),

            // Inter showcase
            h(
              'div',
              {
                style: {
                  padding: '2rem',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '0.75rem',
                  marginBottom: '2rem'
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
                      'span',
                      {
                        style: {
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          fontFamily: "'Inter', sans-serif",
                          color: '#1a1a1a'
                        }
                      },
                      'Inter'
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
                      'font-inter'
                    )
                  ]
                ),
                h(
                  'p',
                  {
                    style: {
                      fontSize: '0.875rem',
                      color: '#666',
                      marginBottom: '1.5rem'
                    }
                  },
                  'A carefully crafted variable font optimized for user interfaces with excellent legibility at small sizes.'
                ),
                h(
                  'div',
                  {
                    style: {
                      fontFamily: "'Inter', sans-serif",
                      color: '#1a1a1a'
                    }
                  },
                  [
                    h(
                      'p',
                      { style: { fontSize: '2rem', marginBottom: '0.5rem' } },
                      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                    ),
                    h(
                      'p',
                      { style: { fontSize: '2rem', marginBottom: '0.5rem' } },
                      'abcdefghijklmnopqrstuvwxyz'
                    ),
                    h(
                      'p',
                      { style: { fontSize: '2rem', marginBottom: '0.5rem' } },
                      '0123456789'
                    ),
                    h(
                      'p',
                      { style: { fontSize: '1.5rem' } },
                      '!@#$%^&*()_+-=[]{}|;:\'",.<>?/'
                    )
                  ]
                )
              ]
            ),

            // Monospace for code
            h(
              'div',
              {
                style: {
                  padding: '2rem',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '0.75rem',
                  color: '#fff'
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
                      'span',
                      {
                        style: {
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          fontFamily: 'monospace'
                        }
                      },
                      'Monospace'
                    ),
                    h(
                      'code',
                      {
                        style: {
                          fontSize: '0.75rem',
                          backgroundColor: '#333',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem'
                        }
                      },
                      'font-mono'
                    )
                  ]
                ),
                h(
                  'p',
                  {
                    style: {
                      fontSize: '0.875rem',
                      color: '#999',
                      marginBottom: '1rem'
                    }
                  },
                  'System monospace font used for code, technical values, and node identifiers.'
                ),
                h(
                  'pre',
                  {
                    style: {
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      margin: 0
                    }
                  },
                  `const workflow = {
  nodes: ['KSampler', 'VAEDecode', 'SaveImage'],
  connections: 12
}`
                )
              ]
            )
          ]
        )
    }
  })
}
