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
        backgroundItem: "#333739",
      },
      backgroundImage: {
        "gradient-header": "linear-gradient(to bottom, #000, #000, #1f1f1f)",
        "gradient-footer": "linear-gradient(to top, #000, #000, #1f1f1f)",
      },
    },
  },
  plugins: [],
} satisfies Config;
