interface Color {
  light: string;
  medium: string;
  dark: string;
}

interface Tokens {
  color: {
    background: {
      blue: Color;
      green: Color;
      red: Color;
      yellow: Color;
      orange: Color;
      grey: Color;
      white: string;
      black: string;
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
