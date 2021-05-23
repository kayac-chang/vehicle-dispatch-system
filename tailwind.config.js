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
          darkest: "#425B56",
          dark: "#57746E",
        },
        gold: {
          light: "#FFE074",
          dark: "#C0A236",
        },
        gray: {
          DEFAULT: "#747474",
          "copy-right": "#595959",
        },
      },
      letterSpacing: {
        widest: ".28em",
      },
      zIndex: {
        "-10": "-10",
      },
      fontSize: {
        xxs: ".625rem",
      },
      backgroundImage: {
        mask: "url('/images/mask.png')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@whiterussianstudio/tailwind-easing")],
};
