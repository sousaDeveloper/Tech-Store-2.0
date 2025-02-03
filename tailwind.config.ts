import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1f1f1f",
        primaryColor: "#4C30B5",
        secondaryColor: "#E6F0FF",
        backgroundItem: "#333739",
      },
      backgroundImage: {
        "gradient-footer": "linear-gradient(to top, #000, #000, #1f1f1f)",
      },
      screens: {
        "3xl": "1750px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
