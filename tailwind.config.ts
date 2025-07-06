import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        dark: {
          primary: '#0a0a0b',
          secondary: '#111113',
          tertiary: '#1a1a1d',
          card: '#1e1e21',
          glass: 'rgba(30, 30, 33, 0.8)',
        },
        text: {
          primary: '#ffffff',
          secondary: '#b4b4b8',
          muted: '#6b6b70',
        },
        accent: {
          electric: '#00d4ff',
          neon: '#39ff14',
          magenta: '#ff0080',
          purple: '#8b5cf6',
          gold: '#ffd700',
        },
        border: {
          primary: '#2a2a2d',
          accent: '#3a3a3d',
          glow: 'rgba(0, 212, 255, 0.3)',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #ff0080 0%, #00d4ff 100%)',
        'gradient-accent': 'linear-gradient(135deg, #39ff14 0%, #00d4ff 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a0a0b 0%, #1a1a1d 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'animated-gradient': 'linear-gradient(-45deg, #00d4ff, #8b5cf6, #ff0080, #39ff14)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.2' }],
        '7xl': ['4.5rem', { lineHeight: '1.2' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 212, 255, 0.4)',
        'neon': '0 0 10px rgba(57, 255, 20, 0.5)',
        'magenta': '0 0 10px rgba(255, 0, 128, 0.5)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'card-3d': '0 10px 30px rgba(0, 0, 0, 0.5), 0 1px 8px rgba(0, 0, 0, 0.3)',
        'card-3d-hover': '0 25px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 212, 255, 0.2)',
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      }
    },
  },
  plugins: [],
};

export default config;