import type { Config } from "tailwindcss";
import { ThemeTokens } from "./src/components/constants.ts";
import { FontWeights } from "./src/components/tokens";

const mappedFontSizes = () => {
  const font_sizes = ThemeTokens.fonts.styles;
  const initial_value: Record<
    string,
    [
      font_size: string,
      config: {
        fontWeight: string;
        letterSpacing: string;
        lineHeight: string;
      },
    ]
  > = {};
  return Object.keys(font_sizes).reduce((prev, current_key) => {
    const { font_size, font_weight, letter_spacing, line_height } =
      font_sizes[current_key as keyof typeof font_sizes];
    prev[current_key] = [
      font_size,
      {
        fontWeight: FontWeights[font_weight].toString(),
        letterSpacing: letter_spacing,
        lineHeight: line_height,
      },
    ];
    return prev;
  }, initial_value);
};

export default {
  content: ["./index.html"],
  theme: {
    spacing: ThemeTokens.spacing,
    extend: {
      fontSize: mappedFontSizes(),
      colors: {
        grey: {
          "0": "#ECEBEB",
          "1": "#D4D4D4",
          "2": "#ACACAC",
          "3": "#666666",
        },
        primary: {
          light: "#F8F6FA",
          dark: "#32164B",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
