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
          darker: "#A98E2F",
        },
        gray: {
          lighter: "#848484",
          light: "#747474",
          DEFAULT: "#676767",
          dark: "#595959",
        },
        red: {
          light: "#FF0000",
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
      maxHeight: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      listStyleType: {
        square: "square",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["group-focus"],
    },
  },
  plugins: [require("@whiterussianstudio/tailwind-easing")],
};
