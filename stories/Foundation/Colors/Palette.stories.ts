import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { h } from 'vue'

/**
 * Color Palette
 *
 * This page documents the complete color palette used in ComfyUI.
 * Colors are organized into families for consistent usage across the application.
 */

// Color definitions extracted from design-system/src/css/style.css
const colorPalette = {
  charcoal: {
    description: 'Dark neutral colors for backgrounds and surfaces',
    colors: {
      100: '#55565e',
      200: '#494a50',
      300: '#3c3d42',
      400: '#313235',
      500: '#2d2e32',
      600: '#262729',
      700: '#202121',
      800: '#171718'
    }
  },
  smoke: {
    description: 'Light neutral colors for backgrounds and borders',
    colors: {
      100: '#f3f3f3',
      200: '#e9e9e9',
      300: '#e1e1e1',
      400: '#d9d9d9',
      500: '#c5c5c5',
      600: '#b4b4b4',
      700: '#a0a0a0',
      800: '#8a8a8a'
    }
  },
  ash: {
    description: 'Medium neutral colors for text and icons',
    colors: {
      300: '#bbbbbb',
      500: '#828282',
      800: '#444444'
    }
  },
  ivory: {
    description: 'Warm off-white colors for subtle backgrounds',
    colors: {
      100: '#fdfbfa',
      200: '#faf9f5',
      300: '#f0eee6'
    }
  },
  sand: {
    description: 'Warm neutral colors for accents',
    colors: {
      100: '#e1ded5',
      200: '#fff7d5',
      300: '#888682',
      400: '#eed7ac'
    }
  },
  slate: {
    description: 'Cool neutral colors with blue undertone',
    colors: {
      100: '#9c9eab',
      200: '#9fa2bd',
      300: '#5b5e7d'
    }
  },
  azure: {
    description: 'Primary blue colors for interactive elements',
    colors: {
      300: '#78bae9',
      400: '#31b9f4',
      600: '#0b8ce9'
    }
  },
  cobalt: {
    description: 'Deep blue for hover states',
    colors: {
      800: '#185a8b'
    }
  },
  jade: {
    description: 'Success and positive state colors',
    colors: {
      400: '#47e469',
      600: '#00cd72'
    }
  },
  gold: {
    description: 'Warning and attention colors',
    colors: {
      400: '#fcbf64',
      500: '#fdab34',
      600: '#fd9903'
    }
  },
  coral: {
    description: 'Error and destructive action colors',
    colors: {
      500: '#f75951',
      600: '#e04e48',
      700: '#b33a3a'
    }
  },
  magenta: {
    description: 'Accent colors for special states',
    colors: {
      300: '#ceaac9',
      700: '#6a246a'
    }
  },
  brand: {
    description: 'ComfyUI brand colors',
    colors: {
      yellow: '#f0ff41',
      blue: '#172dd7'
    }
  },
  base: {
    description: 'Fundamental black and white',
    colors: {
      white: '#ffffff',
      black: '#000000'
    }
  }
}

// Color swatch component
const ColorSwatch = (props: {
  name: string
  hex: string
  showName?: boolean
}) => {
  const { name, hex, showName = true } = props
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem'
      }
    },
    [
      h('div', {
        style: {
          width: '4rem',
          height: '4rem',
          backgroundColor: hex,
          borderRadius: '0.5rem',
          border: '1px solid rgba(0,0,0,0.1)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }
      }),
      showName &&
        h(
          'span',
          {
            style: {
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              color: '#666'
            }
          },
          name
        ),
      h(
        'span',
        {
          style: {
            fontSize: '0.625rem',
            fontFamily: 'monospace',
            color: '#999'
          }
        },
        hex
      )
    ]
  )
}

// Color family component
const ColorFamily = (props: {
  name: string
  description: string
  colors: Record<string, string>
}) => {
  const { name, description, colors } = props
  return h(
    'div',
    {
      style: {
        marginBottom: '2rem'
      }
    },
    [
      h(
        'h3',
        {
          style: {
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '0.25rem',
            textTransform: 'capitalize',
            color: '#1a1a1a'
          }
        },
        name
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
        description
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem'
          }
        },
        Object.entries(colors).map(([shade, hex]) =>
          h(ColorSwatch, { key: shade, name: shade, hex })
        )
      )
    ]
  )
}

const meta: Meta = {
  title: 'Foundation/Colors/Palette',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The complete color palette used throughout ComfyUI. Each color family serves a specific purpose in the design system.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * All color families displayed together
 */
export const AllColors: Story = {
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
              'Color Palette'
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
              'Complete color palette extracted from the design system CSS variables.'
            ),
            ...Object.entries(colorPalette).map(([name, family]) =>
              h(ColorFamily, {
                key: name,
                name,
                description: family.description,
                colors: family.colors
              })
            )
          ]
        )
    }
  })
}

/**
 * Neutral colors: Charcoal, Smoke, and Ash families
 */
export const Neutrals: Story = {
  render: () => ({
    setup() {
      const neutralFamilies = {
        charcoal: colorPalette.charcoal,
        smoke: colorPalette.smoke,
        ash: colorPalette.ash
      }
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
              'h2',
              {
                style: {
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#1a1a1a'
                }
              },
              'Neutral Colors'
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
              'Used for backgrounds, surfaces, text, and borders throughout the application.'
            ),
            ...Object.entries(neutralFamilies).map(([name, family]) =>
              h(ColorFamily, {
                key: name,
                name,
                description: family.description,
                colors: family.colors
              })
            )
          ]
        )
    }
  })
}

/**
 * Primary colors: Azure and Cobalt
 */
export const Primary: Story = {
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
              'h2',
              {
                style: {
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#1a1a1a'
                }
              },
              'Primary Colors'
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
              'Used for primary actions, links, and focused states.'
            ),
            h(ColorFamily, {
              name: 'azure',
              description: colorPalette.azure.description,
              colors: colorPalette.azure.colors
            }),
            h(ColorFamily, {
              name: 'cobalt',
              description: colorPalette.cobalt.description,
              colors: colorPalette.cobalt.colors
            })
          ]
        )
    }
  })
}

/**
 * Status colors: Success, Warning, and Error
 */
export const Status: Story = {
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
              'h2',
              {
                style: {
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#1a1a1a'
                }
              },
              'Status Colors'
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
              'Used for success, warning, and error states.'
            ),
            h(ColorFamily, {
              name: 'jade (Success)',
              description: colorPalette.jade.description,
              colors: colorPalette.jade.colors
            }),
            h(ColorFamily, {
              name: 'gold (Warning)',
              description: colorPalette.gold.description,
              colors: colorPalette.gold.colors
            }),
            h(ColorFamily, {
              name: 'coral (Error)',
              description: colorPalette.coral.description,
              colors: colorPalette.coral.colors
            })
          ]
        )
    }
  })
}

/**
 * Brand colors: ComfyUI electric yellow and sapphire blue
 */
export const Brand: Story = {
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
              'h2',
              {
                style: {
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#1a1a1a'
                }
              },
              'Brand Colors'
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
              'Official ComfyUI brand colors used for logos and brand elements.'
            ),
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  gap: '2rem',
                  marginBottom: '2rem'
                }
              },
              [
                h(
                  'div',
                  {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }
                  },
                  [
                    h('div', {
                      style: {
                        width: '8rem',
                        height: '8rem',
                        backgroundColor: '#f0ff41',
                        borderRadius: '1rem',
                        border: '1px solid rgba(0,0,0,0.1)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                      }
                    }),
                    h(
                      'span',
                      {
                        style: {
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: '#1a1a1a'
                        }
                      },
                      'Electric Yellow'
                    ),
                    h(
                      'span',
                      {
                        style: { fontSize: '0.875rem', fontFamily: 'monospace' }
                      },
                      '#f0ff41'
                    )
                  ]
                ),
                h(
                  'div',
                  {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }
                  },
                  [
                    h('div', {
                      style: {
                        width: '8rem',
                        height: '8rem',
                        backgroundColor: '#172dd7',
                        borderRadius: '1rem',
                        border: '1px solid rgba(0,0,0,0.1)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                      }
                    }),
                    h(
                      'span',
                      {
                        style: {
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: '#1a1a1a'
                        }
                      },
                      'Sapphire Blue'
                    ),
                    h(
                      'span',
                      {
                        style: { fontSize: '0.875rem', fontFamily: 'monospace' }
                      },
                      '#172dd7'
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
