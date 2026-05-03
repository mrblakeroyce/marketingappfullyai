import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#08090D",
        fog: "#F4F1EA",
        cream: "#FFF9EF",
        champagne: "#E8D8B8",
        ember: "#FF6B35",
        mint: "#B7F8D8",
        violet: "#9B7CFF",
        skyglass: "#DDF3FF",
      },
      boxShadow: {
        soft: "0 22px 80px rgba(8, 9, 13, 0.12)",
        glow: "0 0 80px rgba(255, 107, 53, 0.18)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
