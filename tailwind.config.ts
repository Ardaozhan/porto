import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "neon-blue": "#00F0FF",
        "neon-pink": "#FF003C",
        "dark-base": "#0A0A0A",
        "brutalist-gray": "#1A1A1A",
      },
      boxShadow: {
        "neon-blue": "0 0 10px #00F0FF, 0 0 20px #00F0FF",
        "neon-pink": "0 0 10px #FF003C, 0 0 20px #FF003C",
      },
    },
  },
  plugins: [],
};
export default config;
