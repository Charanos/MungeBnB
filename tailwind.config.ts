import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        textDark: "#333",
        bgColor: "#e3e3e3",
        textLight: "#f6feff",
        accentColor: "#3D5AF1",
        betaColor: "#120f25a4",
        alphaColor: "#36315f28",
        primaryColor: "#0E153A",
        accentColor2: "#C850F2",
        secondaryColor: "#b59c53",
      },
      fontFamily: {
        primaryFont: ["Nunito", "sans-serif"],
        secondaryFont: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
