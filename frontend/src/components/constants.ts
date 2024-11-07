import { DefaultTheme } from "styled-components";

const ThemeTokens = {
  color: {
    background: {
      success: {
        light: "#99F5D1", // Lighter shade of 29ECA3
        medium: "#29ECA3", // The given medium green-blue
        dark: "#17B57D", // Darker shade of 29ECA3
      },
      neutral: {
        light: "#FBFAFC", // Lighter shade of F8F6FA
        medium: "#F8F6FA", // The given medium neutral
        dark: "#E3DFE8", // Darker shade of F8F6FA
      },
      blue: {
        light: "#E6F1FB", // Lighter shade of CAE0F7
        medium: "#CAE0F7", // The given medium blue
        dark: "#87B9E4", // Darker shade of CAE0F7
      },
      yellow: {
        light: "#FBE7B3", // Lighter shade of F8D470
        medium: "#F8D470", // The given medium yellow
        dark: "#F0B441", // Darker shade of F8D470
      },
      green: {
        light: "#F1FBCD", // Lighter shade of E3F588
        medium: "#E3F588", // The given medium green
        dark: "#B5D737", // Darker shade of E3F588
      },
      red: {
        light: "#FF0000",
        medium: "#FF0000",
        dark: "#FF0000",
      },
      orange: {
        light: "#FFA500",
        medium: "#FFA500",
        dark: "#FFA500",
      },
      grey: {
        light: "#D4D4D4",
        medium: "#C7C8CC",
        dark: "#B4B4B8",
      },
      white: "#FFFFFF",
      black: {
        a1: "#0000000d",
        a2: "#0000001a",
        a3: "#00000026",
        a4: "#0003",
        a5: "#0000004d",
        a6: "#0006",
        a7: "#00000080",
        a8: "#0009",
        a9: "#000000b3",
        a10: "#000c",
        a11: "#000000e6",
        a12: "#000000f2",
      },
      brand: {
        light: "#FFEAC5",
        medium: "#f4a261",
        dark: "#e76f51",
      },
    },
    text: {
      primary: {
        light: "#6A5A7D",
        medium: "#32164B",
        dark: "#1E0F34",
      },
      secondary: {
        light: "#000000",
        medium: "#000000",
        dark: "#000000",
      },
      error: {
        light: "#FFCDD2",
        medium: "#E57373",
        dark: "#B71C1C",
      },
      muted: {
        light: "#E3E1D9",
        medium: "#C7C8CC",
        dark: "#B4B4B8",
      },
      white: "#FFFFFF",
    },
    border: {
      neutral: {
        light: "#FBFAFC", // Lighter shade of F8F6FA
        medium: "#F8F6FA", // The given medium neutral
        dark: "#E3DFE8", // Darker shade of F8F6FA
      },
      blue: {
        light: "#0000FF",
        medium: "#0000FF",
        dark: "#0000FF",
      },
      green: {
        light: "#00FF00",
        medium: "#00FF00",
        dark: "#00FF00",
      },
      red: {
        light: "#FF0000",
        medium: "#FF0000",
        dark: "#FF0000",
      },
      yellow: {
        light: "#FFFF00",
        medium: "#FFFF00",
        dark: "#FFFF00",
      },
      orange: {
        light: "#FFA500",
        medium: "#FFA500",
        dark: "#FFA500",
      },
      brand: {
        light: "#FFEAC5",
        medium: "#f4a261",
        dark: "#e76f51",
      },
    },
  },
  fonts: {
    styles: {
      biggest: {
        font_size: "50px",
        font_weight: "bold",
        line_height: "auto",
        letter_spacing: "0",
      },
      title_1: {
        font_size: "35px",
        font_weight: "bold",
        line_height: "48px",
        letter_spacing: "0",
      },
      subtitle_1: {
        font_size: "23px",
        font_weight: "semi_bold",
        line_height: "auto",
        letter_spacing: "0",
      },
      title_2: {
        font_size: "30px",
        font_weight: "semi_bold",
        line_height: "32px",
        letter_spacing: "0",
      },
      subtitle_2: {
        font_size: "15px",
        font_weight: "medium",
        line_height: "auto",
        letter_spacing: "0",
      },
      title_3: {
        font_size: "20px",
        font_weight: "semi_bold",
        line_height: "28px",
        letter_spacing: "0",
      },
      sub_title_3: {
        font_size: "17",
        font_weight: "semi_bold",
        line_height: "28px",
        letter_spacing: "0",
      },
      base: {
        font_size: "17px",
        font_weight: "medium",
        line_height: "22px",
        letter_spacing: "0",
      },
      footer: {
        font_size: "12px",
        font_weight: "normal",
        letter_spacing: "0",
        line_height: "auto",
      },
    },
    family: {
      default: "'Merriweather', serif",
      heading: "'Work Sans', sans-serif",
    },
    size: {
      xs: "0.75rem", // 12px
      sm: "1rem", // 16px
      md: "1.5rem", // 24px
      lg: "2rem", // 32px
      xl: "3rem", // 48px
    },
  },
  spacing: {
    xs: "0.25em", // 4px
    sm: "0.5em", // 8px
    md: "1em", // 16px
    lg: "2em", // 32px
    xl: "4em", // 64px
  },
  borderRadius: {
    xs: "0.25em", // 4px
    sm: "0.5em", // 8px
    md: "1em", // 16px
    lg: "2em", // 32px
    xl: "4em", // 64px
    rounded: "9999px", // Rounded
  },
  border: {
    xs: "0.0625em", // 1px
    sm: "0.125em", // 2px
    md: "0.25em", // 4px
    lg: "0.5em", // 8px
    xl: "1em", // 16px
  },
} as const satisfies DefaultTheme;

export { ThemeTokens };
