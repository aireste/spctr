import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05050A",
        "acid-green": "#AAFF00",
        "brand-red": "#FF1A1A",
        "brand-orange": "#FF5500",
        "brand-teal": "#00E5CC",
        "brand-purple": "#9B5FE3",
        "brand-blue": "#1A8FFF",
        "brand-pink": "#FF2D78",
      },
      fontFamily: {
        barlow: ["var(--font-barlow)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
        playfair: ["var(--font-playfair)", "serif"],
        kh: ["var(--font-kh)", "sans-serif"],
      },
      animation: {
        glitch: "glitch 4s steps(1) infinite",
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "scan-line": "scanLine 6s linear infinite",
      },
      keyframes: {
        glitch: {
          "0%, 90%, 100%": {
            transform: "translate(0)",
            textShadow: "none",
            clipPath: "inset(0 0 0 0)",
          },
          "91%": {
            transform: "translate(-3px, 1px) skewX(-1deg)",
            textShadow: "3px 0 #FF1A1A, -3px 0 #00E5CC",
            clipPath: "inset(15% 0 50% 0)",
          },
          "92%": {
            transform: "translate(3px, -1px) skewX(1deg)",
            textShadow: "-3px 0 #FF1A1A, 3px 0 #00E5CC",
            clipPath: "inset(60% 0 10% 0)",
          },
          "93%": {
            transform: "translate(0)",
            textShadow: "none",
            clipPath: "inset(0 0 0 0)",
          },
          "94%": {
            transform: "translate(-2px, 2px)",
            textShadow: "2px 0 #AAFF00",
            clipPath: "inset(30% 0 40% 0)",
          },
          "95%": {
            transform: "translate(0)",
            textShadow: "none",
            clipPath: "inset(0 0 0 0)",
          },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scanLine: {
          "0%": { top: "-5%" },
          "100%": { top: "105%" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
