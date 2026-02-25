import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#E2D9CC",
        navy: "#1B2A4A",
        "navy-hover": "#253A5E",
        "price-red": "#B91C1C",
        "price-green": "#0E7C3A",
        "text-primary": "#111827",
        "text-muted": "#6B7280",
        border: "#E2E8F0",
        "chip-bg": "#F1F5F9",
        "star-gold": "#F59E0B",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
