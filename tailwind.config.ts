import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: { sm: "600px", md: "900px", lg: "1200px" },
      container: { center: true, padding: "1rem", screens: { sm: "600px", md: "900px", lg: "1200px" } },
    },
  },
  plugins: [nextui()],
} satisfies Config;

export default config;
