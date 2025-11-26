import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { h } from 'vue'

/**
 * Semantic Colors
 *
 * This page documents the semantic color tokens used in ComfyUI.
 * Semantic colors abstract the raw palette values into meaningful
 * design tokens that change based on theme (light/dark).
 */

// Semantic color tokens extracted from design-system/src/css/style.css
const semanticTokens = {
  foreground: {
    description: 'Text and icon colors',
    tokens: {
      'base-foreground': {
        light: 'var(--color-charcoal-800)',
        dark: 'var(--color-white)',
        usage: 'Primary text color'
      },
      'muted-foreground': {
        light: 'var(--color-charcoal-200)',
        dark: 'var(--color-smoke-800)',
        usage: 'Secondary/muted text'
      },
      'text-primary': {
        light: 'var(--color-charcoal-700)',
        dark: 'var(--color-white)',
        usage: 'Primary text'
      },
      'text-secondary': {
        light: 'var(--color-ash-500)',
        dark: 'var(--color-slate-100)',
        usage: 'Secondary text'
      }
    }
  },
  background: {
    description: 'Surface and container colors',
    tokens: {
      'base-background': {
        light: 'var(--color-white)',
        dark: 'var(--color-charcoal-800)',
        usage: 'Main app background'
      },
      'secondary-background': {
        light: 'var(--color-smoke-200)',
        dark: 'var(--color-charcoal-600)',
        usage: 'Secondary surfaces'
      },
      'secondary-background-hover': {
        light: 'var(--color-smoke-200)',
        dark: 'var(--color-charcoal-400)',
        usage: 'Hover state for secondary surfaces'
      },
      'secondary-background-selected': {
        light: 'var(--color-smoke-600)',
        dark: 'var(--color-charcoal-200)',
        usage: 'Selected state'
      },
      'muted-background': {
        light: 'var(--color-smoke-700)',
        dark: 'var(--color-charcoal-100)',
        usage: 'Muted backgrounds'
      },
      'accent-background': {
        light: 'var(--color-smoke-800)',
        dark: 'var(--color-charcoal-100)',
        usage: 'Accent backgrounds'
      }
    }
  },
  interactive: {
    description: 'Interactive element colors',
    tokens: {
      'primary-background': {
        light: 'var(--color-azure-400)',
        dark: 'var(--color-azure-600)',
        usage: 'Primary buttons and links'
      },
      'primary-background-hover': {
        light: 'var(--color-cobalt-800)',
        dark: 'var(--color-azure-400)',
        usage: 'Hover state for primary elements'
      },
      'destructive-background': {
        light: 'var(--color-coral-500)',
        dark: 'var(--color-coral-700)',
        usage: 'Destructive actions (delete, remove)'
      },
      'destructive-background-hover': {
        light: 'var(--color-coral-600)',
        dark: 'var(--color-coral-600)',
        usage: 'Hover state for destructive actions'
      },
      'warning-background': {
        light: 'var(--color-gold-400)',
        dark: 'var(--color-gold-600)',
        usage: 'Warning states'
      },
      'warning-background-hover': {
        light: 'var(--color-gold-500)',
        dark: 'var(--color-gold-500)',
        usage: 'Hover state for warnings'
      }
    }
  },
  border: {
    description: 'Border and divider colors',
    tokens: {
      'border-default': {
        light: 'var(--color-smoke-600)',
        dark: 'var(--color-charcoal-200)',
        usage: 'Default borders'
      },
      'border-subtle': {
        light: 'var(--color-smoke-400)',
        dark: 'var(--color-charcoal-300)',
        usage: 'Subtle borders'
      },
      'interface-stroke': {
        light: 'var(--color-smoke-300)',
        dark: 'var(--color-charcoal-400)',
        usage: 'Panel borders'
      }
    }
  },
  node: {
    description: 'Node component specific colors',
    tokens: {
      'node-component-surface': {
        light: 'var(--color-white)',
        dark: 'var(--color-charcoal-600)',
        usage: 'Node background'
      },
      'node-component-surface-hovered': {
        light: 'var(--color-smoke-200)',
        dark: 'var(--color-charcoal-600)',
        usage: 'Node hover state'
      },
      'node-component-header-surface': {
        light: 'var(--color-white)',
        dark: 'var(--color-charcoal-800)',
        usage: 'Node header background'
      },
      'node-stroke': {
        light: 'var(--color-smoke-400)',
        dark: 'var(--color-ash-800)',
        usage: 'Node border'
      },
      'node-stroke-selected': {
        light: 'var(--color-accent-primary)',
        dark: 'var(--color-white)',
        usage: 'Selected node border'
      },
      'node-stroke-executing': {
        light: 'var(--color-azure-600)',
        dark: 'var(--color-azure-600)',
        usage: 'Executing node border'
      },
      'node-stroke-error': {
        light: 'var(--color-error)',
        dark: 'var(--color-error)',
        usage: 'Error node border'
      }
    }
  },
  button: {
    description: 'Button specific colors',
    tokens: {
      'button-surface': {
        light: 'var(--color-white)',
        dark: 'var(--color-charcoal-600)',
        usage: 'Button background'
      },
      'button-surface-contrast': {
        light: 'var(--color-black)',
        dark: 'var(--color-white)',
        usage: 'Button text/icon'
      },
      'button-hover-surface': {
        light: 'var(--color-smoke-200)',
        dark: 'var(--color-charcoal-600)',
        usage: 'Button hover state'
      },
      'button-active-surface': {
        light: 'var(--color-smoke-400)',
        dark: 'var(--color-charcoal-600)',
        usage: 'Button active state'
      },
      'button-icon': {
        light: 'var(--color-smoke-600)',
        dark: 'var(--color-smoke-800)',
        usage: 'Icon button color'
      }
    }
  },
  interface: {
    description: 'UI panel and menu colors',
    tokens: {
      'interface-panel-surface': {
        light: 'var(--color-white)',
        dark: 'var(--color-charcoal-800)',
        usage: 'Panel backgrounds'
      },
      'interface-menu-component-surface-hovered': {
        light: 'var(--color-smoke-200)',
        dark: 'var(--color-charcoal-400)',
        usage: 'Menu item hover'
      },
      'interface-menu-component-surface-selected': {
        light: 'var(--color-smoke-400)',
        dark: 'var(--color-charcoal-300)',
        usage: 'Menu item selected'
      },
      'nav-background': {
        light: 'var(--color-white)',
        dark: 'var(--color-charcoal-800)',
        usage: 'Navigation background'
      }
    }
  }
}

// Semantic token card component
const TokenCard = (props: {
  name: string
  lightValue: string
  darkValue: string
  usage: string
}) => {
  const { name, lightValue, darkValue, usage } = props
  return h(
    'div',
    {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        padding: '1rem',
        borderRadius: '0.5rem',
        border: '1px solid #e5e5e5',
        marginBottom: '0.75rem'
      }
    },
    [
      h(
        'div',
        {
          style: {
            gridColumn: '1 / -1'
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
            `--${name}`
          ),
          h(
            'p',
            {
              style: {
                fontSize: '0.75rem',
                color: '#666',
                margin: '0.5rem 0 0'
              }
            },
            usage
          )
        ]
      ),
      // Light mode preview
      h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem',
            backgroundColor: '#fff',
            borderRadius: '0.375rem',
            border: '1px solid #e5e5e5'
          }
        },
        [
          h('div', {
            style: {
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '0.375rem',
              border: '1px solid rgba(0,0,0,0.1)',
              backgroundColor: lightValue.includes('var(') ? '#ddd' : lightValue
            }
          }),
          h(
            'div',
            {
              style: {
                display: 'flex',
                flexDirection: 'column'
              }
            },
            [
              h(
                'span',
                {
                  style: {
                    fontSize: '0.625rem',
                    textTransform: 'uppercase',
                    color: '#999',
                    letterSpacing: '0.05em'
                  }
                },
                'Light'
              ),
              h(
                'code',
                {
                  style: {
                    fontSize: '0.6875rem',
                    color: '#666'
                  }
                },
                lightValue
              )
            ]
          )
        ]
      ),
      // Dark mode preview
      h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem',
            backgroundColor: '#1a1a1a',
            borderRadius: '0.375rem',
            border: '1px solid #333'
          }
        },
        [
          h('div', {
            style: {
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '0.375rem',
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: darkValue.includes('var(') ? '#444' : darkValue
            }
          }),
          h(
            'div',
            {
              style: {
                display: 'flex',
                flexDirection: 'column'
              }
            },
            [
              h(
                'span',
                {
                  style: {
                    fontSize: '0.625rem',
                    textTransform: 'uppercase',
                    color: '#888',
                    letterSpacing: '0.05em'
                  }
                },
                'Dark'
              ),
              h(
                'code',
                {
                  style: {
                    fontSize: '0.6875rem',
                    color: '#aaa'
                  }
                },
                darkValue
              )
            ]
          )
        ]
      )
    ]
  )
}

// Token category component
const TokenCategory = (props: {
  name: string
  description: string
  tokens: Record<string, { light: string; dark: string; usage: string }>
}) => {
  const { name, description, tokens } = props
  return h(
    'div',
    {
      style: {
        marginBottom: '2.5rem'
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
      ...Object.entries(tokens).map(([tokenName, token]) =>
        h(TokenCard, {
          key: tokenName,
          name: tokenName,
          lightValue: token.light,
          darkValue: token.dark,
          usage: token.usage
        })
      )
    ]
  )
}

const meta: Meta = {
  title: 'Foundation/Colors/Semantic Colors',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Semantic color tokens that adapt to light and dark themes. Use these instead of raw palette values for theme-aware components.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * All semantic color tokens organized by category
 */
export const AllTokens: Story = {
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
              'Semantic Color Tokens'
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
              'Theme-aware color tokens that automatically adapt between light and dark modes.'
            ),
            ...Object.entries(semanticTokens).map(([name, category]) =>
              h(TokenCategory, {
                key: name,
                name,
                description: category.description,
                tokens: category.tokens
              })
            )
          ]
        )
    }
  })
}

/**
 * Foreground (text) color tokens
 */
export const Foreground: Story = {
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
            h(TokenCategory, {
              name: 'foreground',
              description: semanticTokens.foreground.description,
              tokens: semanticTokens.foreground.tokens
            })
          ]
        )
    }
  })
}

/**
 * Background and surface color tokens
 */
export const Background: Story = {
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
            h(TokenCategory, {
              name: 'background',
              description: semanticTokens.background.description,
              tokens: semanticTokens.background.tokens
            })
          ]
        )
    }
  })
}

/**
 * Interactive element color tokens (primary, destructive, warning)
 */
export const Interactive: Story = {
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
            h(TokenCategory, {
              name: 'interactive',
              description: semanticTokens.interactive.description,
              tokens: semanticTokens.interactive.tokens
            })
          ]
        )
    }
  })
}

/**
 * Node component specific color tokens
 */
export const NodeColors: Story = {
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
            h(TokenCategory, {
              name: 'node',
              description: semanticTokens.node.description,
              tokens: semanticTokens.node.tokens
            })
          ]
        )
    }
  })
}

/**
 * Button specific color tokens
 */
export const ButtonColors: Story = {
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
            h(TokenCategory, {
              name: 'button',
              description: semanticTokens.button.description,
              tokens: semanticTokens.button.tokens
            })
          ]
        )
    }
  })
}
