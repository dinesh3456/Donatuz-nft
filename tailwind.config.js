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
    },
  },
  plugins: [],
};
