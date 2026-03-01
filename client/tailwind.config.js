/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1E3A5F",
          50: "#EEF3F9",
          100: "#D4E3F0",
          200: "#A9C7E1",
          300: "#7EABD2",
          400: "#538FC3",
          500: "#2B6CA8",
          600: "#1E3A5F",
          700: "#173052",
          800: "#112541",
          900: "#0B1A2E",
        },
        cat: {
          DEFAULT: "#FFCD00",
          50: "#FFFCE0",
          100: "#FFF8B3",
          200: "#FFF080",
          300: "#FFE84D",
          400: "#FFE01A",
          500: "#FFCD00",
          600: "#E6B800",
          700: "#CC9F00",
        },
        surface: {
          0: "#FFFFFF",
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        status: {
          critical: "#DC2626",
          serious: "#EA580C",
          caution: "#D97706",
          normal: "#16A34A",
          info: "#2563EB",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
