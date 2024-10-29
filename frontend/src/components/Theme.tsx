import { ThemeProvider, createGlobalStyle } from "styled-components";
import { cssVariables } from "./helper";
import { ThemeTokens } from "./constants";

const GlobalStyle = createGlobalStyle`
  :root {
    ${({ theme }) => cssVariables(theme)}
  }
`;

const Theme = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={ThemeTokens}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export { Theme };
