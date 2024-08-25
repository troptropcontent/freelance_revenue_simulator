import { DefaultTheme, ThemeProvider, createGlobalStyle  } from "styled-components";
import { cssVariables } from "./helper";

const theme: DefaultTheme = {
    color: {
        background: {
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
        },
        text: {
            primary: {
                light: "#000000",
                medium: "#000000",
                dark: "#000000",
            },
            secondary: {
                light: "#000000",
                medium: "#000000",
                dark: "#000000",
            },
            muted: {
                light: "#000000",
                medium: "#000000",
                dark: "#000000",
            },
        },
        border: {
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
        }
    },
    fonts: {
        family: {
            default: "'Merriweather', serif",
            heading: "'Work Sans', sans-serif",
        },
        size: {
            xs: "0.75rem", // 12px
            sm: "1rem",    // 16px
            md: "1.5rem",  // 24px
            lg: "2rem",    // 32px
            xl: "3rem",    // 48px
        },
    },
    spacing: {
        xs: "0.25em",  // 4px
        sm: "0.5em",   // 8px
        md: "1em",     // 16px
        lg: "2em",     // 32px
        xl: "4em",     // 64px
    },
    borderRadius: {
        xs: "0.25em",  // 4px
        sm: "0.5em",   // 8px
        md: "1em",     // 16px
        lg: "2em",     // 32px
        xl: "4em",     // 64px
    },
}

const GlobalStyle = createGlobalStyle`
  :root {
    ${ ({theme}) => cssVariables(theme) }
  }
`


const Theme = ({children}: {children: React.ReactNode}) => {
    return <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
    </ThemeProvider>
}

export default Theme;