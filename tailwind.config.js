module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          dark: "#00628F",
        },
        green: {
          DEFAULT: "#4B8530",
          dark: "#57746E",
        },
        gold: {
          light: "#FFE074",
          dark: "#C0A236",
        },
        gray: {
          DEFAULT: "#747474",
        },
      },
      letterSpacing: {
        widest: ".28em",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
