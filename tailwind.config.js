/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        clay: {
          50: "#fdf5f2",
          100: "#fbe8e1",
          200: "#f6cdbe",
          300: "#eeab93",
          400: "#e07f61",
          500: "#d15d3c",
          600: "#b84a2c",
          700: "#993c25",
          800: "#7b3321",
          900: "#652d1f",
          950: "#38150d",
        },
        sand: {
          50: "#fbf8f4",
          100: "#f5efe6",
          200: "#eaddcb",
          300: "#dac5a7",
          400: "#c6a67f",
          500: "#b58f63",
          600: "#9a7450",
          700: "#7d5d43",
          800: "#664d3b",
          900: "#554134",
          950: "#2e221a",
        },
        night: {
          800: "#231c19",
          900: "#1a1513",
          950: "#120e0d",
        },
      },
      boxShadow: {
        soft: "0 18px 45px -20px rgba(56, 21, 13, 0.35)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};
