import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // We will define our custom font here
      fontFamily: {
        ninja: ["Kalam", "cursive"],
      },
    },
  },
  plugins: [daisyui],

  // daisyUI config
  daisyui: {
    themes: [
      {
        konoha: {
          // Mapping our Naruto palette to daisyUI's theme keys
          "primary": "#4A7856",       // Konoha Green (for primary buttons, active states)
          "secondary": "#2C3E50",     // Ninja Blue (for secondary elements)
          "accent": "#E74C3C",        // Will of Fire Red (for highlights, notifications)
          "neutral": "#adb5bd",       // Headband Metal (for borders, neutral text)
          
          "base-100": "#1B2631",      // Shadow Dark (the main background color)
          "base-content": "#FDF6E3",  // Scroll Parchment (the primary text color)

          "info": "#3ABFF8",          // A bright blue for informational messages
          "success": "#36D399",       // A standard success green
          "warning": "#FBBD23",       // A standard warning yellow
          "error": "#F87272",         // A standard error red
        },
      },
      // You can keep other themes if you want to switch between them
      "dark",
      "light",
      "cyberpunk",
    ],
  },
};