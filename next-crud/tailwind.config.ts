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
        primary: "#8E59FF",
        secondary: "#e0e0e0",
        tertiary: "#6c6c6c",
        disabled: "#cccccc",
        error: "#dc2626",
        "shades-04-40%": "rgba(111, 118, 126, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
