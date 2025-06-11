import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#FF5A5F", // Lebendiges Rot-Pink
          foreground: "#FFFFFF",
          dark: "#E5484D",
          light: "#FF8A8F",
        },
        secondary: {
          DEFAULT: "#3A86FF", // Kräftiges Blau
          foreground: "#FFFFFF",
          dark: "#2563EB",
          light: "#60A5FA",
        },
        accent: {
          DEFAULT: "#FFBE0B", // Leuchtendes Gelb
          foreground: "#000000",
          dark: "#F59E0B",
          light: "#FCD34D",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        black: {
          DEFAULT: "#000000",
          soft: "#121212",
        },
        white: {
          DEFAULT: "#FFFFFF",
          soft: "#F5F5F5",
        },
        // Neue Farbakzente
        neon: {
          green: "#39FF14",
          pink: "#FF10F0",
          blue: "#00FFFF",
          yellow: "#FFFF00",
        },
        mountain: {
          rock: "#6D6875",
          forest: "#2D6A4F",
          snow: "#F8F9FA",
          water: "#48CAE4",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-light": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-light": "pulse-light 4s ease-in-out infinite",
        "slide-in": "slide-in 0.5s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        display: ["var(--font-bebas-neue)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-diagonal": "linear-gradient(45deg, var(--tw-gradient-stops))",
        noise: "url('/images/noise.png')",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
        glow: "0 0 10px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    ({ addUtilities, theme, e }) => {
      const textShadows = theme("textShadow")
      const utilities = Object.entries(textShadows).reduce((acc, [key, value]) => {
        const className = key === "DEFAULT" ? "text-shadow" : `text-shadow-${key}`
        return {
          ...acc,
          [`.${e(className)}`]: {
            textShadow: value,
          },
        }
      }, {})
      addUtilities(utilities)
    },
  ],
} satisfies Config

export default config
