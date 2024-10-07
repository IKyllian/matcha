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
      tokens: {
        colors: {
          primary: { value: '#000000' },
          primaryBackground: { value: '#DCF2FA' },
          secondaryBackground: { value: '#FEF2E8' },
          buttonPrimaryBackground: { value: '#FF9D73' },
          lightPink: { value: '#faafe5' },
          darkPink: { value: '#ed05ab' },
          lightRed: { value: '#FF6B6B' }
        },
        fonts: {
          title: { value: "Archivo, sans-serif" },
          body: { value: "Lexend Mega, sans-serif" }
        }
      },
      textStyles
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
