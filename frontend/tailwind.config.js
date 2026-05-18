/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
      extend: {
          colors: {
              "primary": "#3b82f6",
              "primary-container": "#2170e4",
              "on-primary": "#ffffff",
              "on-primary-container": "#fefcff",
              "primary-fixed": "#d8e2ff",
              "primary-fixed-dim": "#adc6ff",
              "secondary": "#6b38d4",
              "secondary-container": "#8455ef",
              "on-secondary": "#ffffff",
              "secondary-fixed": "#e9ddff",
              "secondary-fixed-dim": "#d0bcff",
              "tertiary": "#545c72",
              "surface": "#f7f9fb",
              "on-surface": "#191c1e",
              "surface-variant": "#e0e3e5",
              "on-surface-variant": "#424754",
              "background": "#f7f9fb",
              "on-background": "#191c1e",
              "outline": "#727785",
              "outline-variant": "#c2c6d6",
              "error": "#ba1a1a",
              "surface-container-lowest": "#ffffff",
              "surface-container-low": "#f2f4f6",
              "surface-container": "#eceef0",
              "surface-container-high": "#e6e8ea",
              "surface-container-highest": "#e0e3e5",
              "inverse-surface": "#2d3133",
              "inverse-on-surface": "#eff1f3",
          },
          borderRadius: {
              "DEFAULT": "0.375rem",
              "md": "0.375rem",
              "lg": "0.5rem",
              "xl": "0.75rem",
              "full": "9999px"
          },
          fontFamily: {
              "sans": ["Inter", "sans-serif"],
              "mono": ["JetBrains Mono", "monospace"],
              "body-md": ["Inter"],
              "label-md": ["Inter"],
              "headline-md": ["Inter"],
              "display-lg": ["Inter"]
          },
          spacing: {
              "xs": "4px", "sm": "12px", "base": "16px", "md": "24px", "lg": "48px", "xl": "80px",
              "gutter": "24px", "container-max": "1280px"
          }
      }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
