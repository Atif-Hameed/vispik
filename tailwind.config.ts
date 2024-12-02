import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Example custom colors
        primary: "#00FEB5",
        secondary: "#D4D4D4",
        bg: "#30353A",
        white: "#F5F5F5",
        darkBg: "#292D31",
        lightDark: "#30353A",
        lightbg: "#E5E5E5",
        border: "#495056",
        lightBorder: "#D0D0D0",
        darkGreen: "#00BF88",
        lightGray: "#E6E6E6",
      },
      screens: {
        xxl: "1400px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
