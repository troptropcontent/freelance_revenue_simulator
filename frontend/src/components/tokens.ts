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
        };
        text: {
            primary: Color;
            secondary: Color;
            muted: Color;
        };
        border: {
            blue: Color;
            green: Color;
            red: Color;
            yellow: Color;
            orange: Color;
        };
    },
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
    },
    spacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    },
    borderRadius: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    },
}

export type { Tokens };