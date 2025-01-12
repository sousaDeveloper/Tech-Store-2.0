import type { Config } from "tailwindcss";

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
      },
      backgroundImage: {
        "gradient-header": "linear-gradient(to bottom, #000, #000, #1f1f1f)",
        "text-gradient": "linear-gradient(to right, 6)",
      },
    },
  },
  plugins: [],
} satisfies Config;
