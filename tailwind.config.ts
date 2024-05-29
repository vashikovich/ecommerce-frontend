import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-900": "#1F3A93",
        beige: "#F5F5DC",
        "snow-white": "#FFFAFA",
        coral: "#FF6F61",
        "light-gray": "#CCCCCC",
        "medium-gray": "#888888",
      },
    },
  },
  plugins: [],
};
export default config;
