import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/core/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        primary: {
          base: "#67e8f9",
          border: "#22d3ee",
          text: "#fff7f7",
        },
        secondary: {
          base: "#155e75",
          border: "#164e63",
        },
        danger: {
          base: "#fff7f7",
          border: "#ffa0a0",
          text: "#d15a56",
        },
        success: {
          base: "#EDF8E2",
          border: "#77C728",
          text: "#4b964e",
        },
        warning: {
          base: "#fff5d8",
          warningBorder: "#fae19a",
          text: "#FD7D3F",
        },
        gray: {
          color1: "#b3b3b3",
          color2: "#6C6C6C",
          color3: "#6E6E6E",
          color4: "#454545",
          color5: "#707070",
          color6: "#797979",
          color7: "#747474",
          color8: "#D9D9DA",
          color9: "#7E7D7D",
        },
        orange: {
          color1: "#E65D1B",
        },
        red: {
          color1: "#b41515",
        },
        green: {
          color1: "#4b964e",
        },
        yellow: {
          color1: "#FFFF00",
        },
      },
    },
  },
  plugins: [nextui()],
};
export default config;
