interface Color {
  light: string;
  medium: string;
  dark: string;
}

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
      white: string;
      black: {
        a1: string;
        a2: string;
        a3: string;
        a4: string;
        a5: string;
        a6: string;
        a7: string;
        a8: string;
        a9: string;
        a10: string;
        a11: string;
        a12: string;
      };
      brand: Color;
    };
    text: {
      primary: Color;
      secondary: Color;
      muted: Color;
      white: string;
    };
    border: {
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
  };
}

export type { Tokens };
