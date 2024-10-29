import type { Config } from "tailwindcss";
import { ThemeTokens } from "./src/components/constants.ts";

export default {
  content: ["./index.html"],
  theme: {
    spacing: ThemeTokens.spacing,
    extend: {},
  },
  plugins: [],
} satisfies Config;
