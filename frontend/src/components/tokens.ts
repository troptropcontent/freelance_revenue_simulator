interface Color {
  light: ColorValueHex;
  medium: ColorValueHex;
  dark: ColorValueHex;
}

type ColorValueHex = `#${string}`;

const FontWeights = {
  thin: 100,
  extra_light: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semi_bold: 600,
  bold: 700,
  extra_bold: 800,
  black: 900,
} as const;

interface FontStyle {
  font_size: string;
  line_height: string;
  letter_spacing: string;
  font_weight: keyof typeof FontWeights;
}

interface ResponsiveFontStyle {
  small: FontStyle;
  normal: FontStyle;
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
    styles: {
      hero_title: ResponsiveFontStyle;
      hero_subtitle: ResponsiveFontStyle;
      hero_text: ResponsiveFontStyle;
      title_n1: ResponsiveFontStyle;
      subtitle_n1: ResponsiveFontStyle;
      title_n2: ResponsiveFontStyle;
      subtitle_n2: ResponsiveFontStyle;
      title_n3: ResponsiveFontStyle;
      subtitle_n3: ResponsiveFontStyle;
      text: ResponsiveFontStyle;
      text_section: ResponsiveFontStyle;
      results: ResponsiveFontStyle;
      footer: ResponsiveFontStyle;
      text_in_charts: ResponsiveFontStyle;
      text_in_charts_semibold: ResponsiveFontStyle;
      call_to_action: ResponsiveFontStyle;
    };
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
  screens: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export { FontWeights };
export type { Tokens, ColorValueHex };


