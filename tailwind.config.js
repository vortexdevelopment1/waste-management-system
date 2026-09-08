/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#0A101C',
        surface: '#101A2C',
        'surface-alt': '#15213A',
        'surface-raised': '#1A2A45',
        border: {
          DEFAULT: '#223252',
          soft: '#1A2740'
        },
        ink: {
          DEFAULT: '#E8EDF7',
          muted: '#93A3C2',
          faint: '#5D6E93'
        },
        civic: {
          teal: '#22B8A6',
          tealDim: '#123B39',
          saffron: '#EFA23D',
          saffronDim: '#3B2C13',
          leaf: '#4CC77E',
          leafDim: '#123A28',
          sky: '#3FA9DA',
          skyDim: '#0F2E44',
          rose: '#E96A6A',
          roseDim: '#3A1414',
          violet: '#9B8CE8'
        }
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      boxShadow: {
        panel: '0 1px 0 0 rgba(255,255,255,0.02) inset, 0 8px 24px -12px rgba(0,0,0,0.6)'
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '10px'
      }
    }
  },
  plugins: []
}
