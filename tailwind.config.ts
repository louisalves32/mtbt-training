import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { accent: "#C6F000", ink: "#0A0A0A", coal: "#161616", steel: "#232323" },
    fontFamily: { display: ["var(--font-display)", "Impact", "sans-serif"], body: ["var(--font-body)", "system-ui", "sans-serif"] },
  } },
  plugins: [],
} satisfies Config;
