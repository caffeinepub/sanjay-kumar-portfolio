/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Bricolage Grotesque", "sans-serif"],
        body: ["Satoshi", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        background: "rgb(8, 10, 16)",
        foreground: "rgb(210, 225, 255)",
        card: {
          DEFAULT: "rgb(14, 18, 30)",
          foreground: "rgb(210, 225, 255)",
        },
        primary: {
          DEFAULT: "oklch(0.78 0.18 196)",
          foreground: "oklch(0.05 0.01 210)",
        },
        secondary: {
          DEFAULT: "rgb(22, 28, 44)",
          foreground: "rgb(200, 215, 255)",
        },
        muted: {
          DEFAULT: "rgb(18, 24, 38)",
          foreground: "rgb(120, 135, 170)",
        },
        accent: {
          DEFAULT: "oklch(0.85 0.20 160)",
          foreground: "rgb(8, 10, 16)",
        },
        border: "rgb(30, 40, 65)",
        input: "rgb(22, 28, 44)",
        ring: "oklch(0.78 0.18 196)",
        cyan: {
          glow: "oklch(0.78 0.18 196)",
          dim: "oklch(0.65 0.14 196)",
          bright: "oklch(0.88 0.20 196)",
        },
        teal: {
          glow: "oklch(0.72 0.16 180)",
        },
        electric: {
          green: "oklch(0.85 0.20 160)",
        },
      },
      boxShadow: {
        "glow-sm": "0 0 15px oklch(0.78 0.18 196 / 0.2)",
        "glow-md": "0 0 30px oklch(0.78 0.18 196 / 0.3)",
        "glow-lg": "0 0 60px oklch(0.78 0.18 196 / 0.25)",
        "card-hover": "0 20px 60px rgb(0 0 0 / 0.5), 0 0 30px oklch(0.78 0.18 196 / 0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
        typewriter: "typewriter 3s steps(20) forwards",
        blink: "blink 1s step-end infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px oklch(0.78 0.18 196 / 0.3)" },
          "50%": { boxShadow: "0 0 40px oklch(0.78 0.18 196 / 0.6)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
