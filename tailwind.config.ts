import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial'],
      },
      colors: {
        ziwei: {
          bg: '#f8f1e7',
          ink: '#3c2a1e',
          red: '#8d2921',
          gold: '#c39a4b',
          jade: '#426b57'
        }
      }
    }
  },
  plugins: []
};
export default config;
