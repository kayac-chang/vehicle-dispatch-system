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
          DEFAULT: "#376422",
          darkest: "#425B56",
          dark: "#57746E",
        },
        gold: {
          light: "#FFE074",
          dark: "#C0A236",
        },
        gray: {
          light: "#747474",
          DEFAULT: "#676767",
          dark: "#595959",
        },
      },
      letterSpacing: {
        wide: "0.08em",
        wider: "0.2em",
        widest: "0.28em",
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

      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@whiterussianstudio/tailwind-easing")],
};
