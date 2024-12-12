import { defineConfig } from "@pandacss/dev";
import { textStyles } from './src/global-style/text.style';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      breakpoints: {
        xs: '400px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
      tokens: {
        colors: {
          primary: { value: '#000000' },
          primaryBackground: { value: '#DCF2FA' },
          secondaryBackground: { value: '#FEF2E8' },
          buttonPrimaryBackground: { value: '#FF9D73' },
          lightPink: { value: '#faafe5' },
          darkPink: { value: '#ed05ab' },
          lightRed: { value: '#FF6B6B' },
          successLight: { value: '#c3f4aa' },
          successDark: { value: 'rgb(5, 65, 8)' },
          errorLight: { value: '#f4aaaa' },
          errorDark: { value: 'rgb(65, 5, 5)' },
          warningLight: { value: '#f4f3aa' },
          warningDark: { value: 'rgb(65, 61, 5)' },
        },
        fonts: {
          title: { value: "Archivo, sans-serif" },
          body: { value: "Lexend Mega, sans-serif" }
        }
      },
      textStyles,
      keyframes: {
        fadeIn: {
          from: { opacity: 0, transform: 'translateY(-20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeOut: {
          from: { opacity: 1, transform: 'translateY(0)' },
          to: { opacity: 0, transform: 'translateY(-20px)' },
        }
      }
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
