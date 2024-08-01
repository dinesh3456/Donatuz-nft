module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      blur: {
        500: "500px",
      },
      colors: {
        gray: {
          800: "#1F2937",
          900: "#111827",
        },
        purple: {
          400: "#9F7AEA",
          600: "#7C3AED",
          700: "#6D28D9",
        },
        blue: {
          DEFAULT: "#504dfb",
        },
      },
      keyframes: {
        "indeterminate-progress": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "indeterminate-progress": "indeterminate-progress 1.5s infinite linear",
      },
    },
  },
  plugins: [],
};
