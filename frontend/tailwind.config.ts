import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces Variable', 'Georgia', 'serif'],
      },
      colors: {
        cream: '#FAF7F1',
        ink: '#16281E',
        gold: { light: '#E9CE7A', DEFAULT: '#C9A227', dark: '#8A6D1F' },
      },
      boxShadow: {
        soft: '0 8px 30px rgb(22 50 30 / 0.08)',
        lift: '0 24px 60px -16px rgb(22 50 30 / 0.28)',
        glow: '0 0 0 4px rgb(22 163 74 / 0.15)',
      },
      borderRadius: { '4xl': '2rem' },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(.96) translateY(-6px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(.5)' },
          '60%': { transform: 'scale(1.08)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .6s cubic-bezier(.22,1,.36,1) both',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        shimmer: 'shimmer 1.8s linear infinite',
        'scale-in': 'scale-in .18s ease-out both',
        'pop-in': 'pop-in .45s cubic-bezier(.22,1,.36,1) both',
      },
    },
  },
  plugins: [],
};

export default config;
