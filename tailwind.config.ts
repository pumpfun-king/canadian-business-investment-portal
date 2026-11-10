import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tlg: {
          crimson: "#831f28",
          crimsonHover: "#9c2631",
          crimsonDark: "#5c131a",
          deepNavy: "#121b27",
          cardDark: "#1a2432",
          surface: "#FBF9F8",
          cardLight: "#FFFFFF",
          mutedText: "#8e95a2",
          borderSoft: "#ebdcd9",
          pillBg: "#731b22",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
