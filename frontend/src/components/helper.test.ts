import {
  BorderRadius,
  createBorderRadiusStyle,
  createPaddingStyle,
  cssVariable,
  cssVariables,
  Padding,
} from "./helper";
import { Tokens } from "./tokens";

test("cssVariables", () => {
  const theme: Tokens = {
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
        grey: {
          light: "#808080",
          medium: "#808080",
          dark: "#808080",
        },
        white: "#FFFFFF",
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
      },
    },
    fonts: {
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
    },
  };
  const result = cssVariables(theme);
  expect(result.split(";")).toEqual([
    "--color-background-blue-light:#0000FF",
    "--color-background-blue-medium:#0000FF",
    "--color-background-blue-dark:#0000FF",
    "--color-background-green-light:#00FF00",
    "--color-background-green-medium:#00FF00",
    "--color-background-green-dark:#00FF00",
    "--color-background-red-light:#FF0000",
    "--color-background-red-medium:#FF0000",
    "--color-background-red-dark:#FF0000",
    "--color-background-yellow-light:#FFFF00",
    "--color-background-yellow-medium:#FFFF00",
    "--color-background-yellow-dark:#FFFF00",
    "--color-background-orange-light:#FFA500",
    "--color-background-orange-medium:#FFA500",
    "--color-background-orange-dark:#FFA500",
    "--color-text-primary-light:#000000",
    "--color-text-primary-medium:#000000",
    "--color-text-primary-dark:#000000",
    "--color-text-secondary-light:#000000",
    "--color-text-secondary-medium:#000000",
    "--color-text-secondary-dark:#000000",
    "--color-text-muted-light:#000000",
    "--color-text-muted-medium:#000000",
    "--color-text-muted-dark:#000000",
    "--color-border-blue-light:#0000FF",
    "--color-border-blue-medium:#0000FF",
    "--color-border-blue-dark:#0000FF",
    "--color-border-green-light:#00FF00",
    "--color-border-green-medium:#00FF00",
    "--color-border-green-dark:#00FF00",
    "--color-border-red-light:#FF0000",
    "--color-border-red-medium:#FF0000",
    "--color-border-red-dark:#FF0000",
    "--color-border-yellow-light:#FFFF00",
    "--color-border-yellow-medium:#FFFF00",
    "--color-border-yellow-dark:#FFFF00",
    "--color-border-orange-light:#FFA500",
    "--color-border-orange-medium:#FFA500",
    "--color-border-orange-dark:#FFA500",
    "--fonts-family-default:'Merriweather', serif",
    "--fonts-family-heading:'Work Sans', sans-serif",
    "--fonts-size-xs:0.75rem",
    "--fonts-size-sm:1rem",
    "--fonts-size-md:1.5rem",
    "--fonts-size-lg:2rem",
    "--fonts-size-xl:3rem",
    "--spacing-xs:0.25em",
    "--spacing-sm:0.5em",
    "--spacing-md:1em",
    "--spacing-lg:2em",
    "--spacing-xl:4em",
    "--borderRadius-xs:0.25em",
    "--borderRadius-sm:0.5em",
    "--borderRadius-md:1em",
    "--borderRadius-lg:2em",
    "--borderRadius-xl:4em",
  ]);
});

test("cssVariable", () => {
  const result = cssVariable("color.background.blue.dark");
  expect(result).toBe("var(--color-background-blue-dark)");
});

describe("createPaddingStyle", () => {
  const scenarios: {
    padding: Padding;
    expected: string;
  }[] = [
    {
      padding: { top: "xs" },
      expected: "padding-block-start: var(--spacing-xs);",
    },
    {
      padding: { bottom: "sm" },
      expected: "padding-block-end: var(--spacing-sm);",
    },
    {
      padding: { inline: "md" },
      expected: "padding-inline: var(--spacing-md);",
    },
    {
      padding: "xl",
      expected: "padding: var(--spacing-xl);",
    },
    {
      padding: { top: "xs", bottom: "sm", inline: "md", block: "lg" },
      expected:
        "padding-block-start: var(--spacing-xs);padding-block-end: var(--spacing-sm);padding-inline: var(--spacing-md);padding-block: var(--spacing-lg);",
    },
    {
      padding: {},
      expected: "",
    },
  ];
  scenarios.forEach((scenario) => {
    const testName = `With ${JSON.stringify(scenario.padding)} as argument, it should return ${scenario.expected === "" ? "an empty string" : scenario.expected}`;

    test(testName, () => {
      const result = createPaddingStyle(scenario.padding);
      expect(result).toBe(scenario.expected);
    });
  });
});

describe("createBorderRadiusStyle", () => {
  const scenarios: {
    borderRadius: BorderRadius;
    expected: string;
  }[] = [
    {
      borderRadius: "xs",
      expected: "border-radius: var(--borderRadius-xs);",
    },
    {
      borderRadius: {
        bottomLeft: "xs",
        bottomRight: "sm",
        topLeft: "md",
        topRight: "lg",
      },
      expected:
        "border-bottom-left-radius: var(--borderRadius-xs);border-bottom-right-radius: var(--borderRadius-sm);border-top-left-radius: var(--borderRadius-md);border-top-right-radius: var(--borderRadius-lg);",
    },
    {
      borderRadius: {},
      expected: "",
    },
  ];
  scenarios.forEach((scenario) => {
    const testName = `With ${JSON.stringify(scenario.borderRadius)} as argument, it should return ${scenario.expected === "" ? "an empty string" : scenario.expected}`;

    test(testName, () => {
      const result = createBorderRadiusStyle(scenario.borderRadius);
      expect(result).toBe(scenario.expected);
    });
  });
});
