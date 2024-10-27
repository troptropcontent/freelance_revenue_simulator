interface Color {
  light: ColorValueHex;
  medium: ColorValueHex;
  dark: ColorValueHex;
}

type ColorValueHex = `#${string}`;

interface Tokens {
  color: {
    background: {
      success: Color;
      neutral: Color;
      blue: Color;
      green: Color;
      red: Color;
      yellow: Color;
      orange: Color;
      grey: Color;
      white: ColorValueHex;
      black: {
        a1: ColorValueHex;
        a2: ColorValueHex;
        a3: ColorValueHex;
        a4: ColorValueHex;
        a5: ColorValueHex;
        a6: ColorValueHex;
        a7: ColorValueHex;
        a8: ColorValueHex;
        a9: ColorValueHex;
        a10: ColorValueHex;
        a11: ColorValueHex;
        a12: ColorValueHex;
      };
      brand: Color;
    };
    text: {
      primary: Color;
      secondary: Color;
      error: Color;
      muted: Color;
      white: ColorValueHex;
    };
    border: {
      neutral: Color;
      blue: Color;
      green: Color;
      red: Color;
      yellow: Color;
      orange: Color;
      brand: Color;
    };
  };
  fonts: {
    family: {
      default: string;
      heading: string;
    };
    size: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    rounded: string;
  };
  border: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export type { Tokens, ColorValueHex };
