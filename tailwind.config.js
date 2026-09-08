/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: withOpacity('--color-canvas'),
        surface: withOpacity('--color-surface'),
        'surface-alt': withOpacity('--color-surface-alt'),
        'surface-raised': withOpacity('--color-surface-raised'),
        border: {
          DEFAULT: withOpacity('--color-border'),
          soft: withOpacity('--color-border-soft')
        },
        ink: {
          DEFAULT: withOpacity('--color-ink'),
          muted: withOpacity('--color-ink-muted'),
          faint: withOpacity('--color-ink-faint')
        },
        civic: {
          teal: withOpacity('--civic-teal'),
          tealDim: withOpacity('--civic-tealDim'),
          saffron: withOpacity('--civic-saffron'),
          saffronDim: withOpacity('--civic-saffronDim'),
          leaf: withOpacity('--civic-leaf'),
          leafDim: withOpacity('--civic-leafDim'),
          sky: withOpacity('--civic-sky'),
          skyDim: withOpacity('--civic-skyDim'),
          rose: withOpacity('--civic-rose'),
          roseDim: withOpacity('--civic-roseDim'),
          violet: withOpacity('--civic-violet')
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      boxShadow: {
        soft: '0 2px 12px rgba(30, 70, 110, 0.06)',
        card: '0 4px 16px -2px rgba(30, 70, 110, 0.08), 0 2px 6px -1px rgba(30, 70, 110, 0.04)',
        panel: '0 1px 4px 0 rgba(30, 70, 110, 0.05)',
        highlight: '0 0 0 1px rgba(19, 184, 137, 0.2), 0 2px 8px rgba(19, 184, 137, 0.12)'
      },
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '14px',
        '2xl': '18px',
        '3xl': '24px'
      }
    }
  },
  plugins: []
}
