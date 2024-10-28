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
        error: {
          light: "#000000",
          medium: "#000000",
          dark: "#000000",
        },
        white: "#FFFFFF",
      },
      border: {
        blue: {
          light: "#0000FF",
          medium: "#0000FF",
          dark: "#0000FF",
        },
        neutral: {
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
      rounded: "99999px",
    },
    border: {
      xs: "0.0625em", // 1px
      sm: "0.125em", // 2px
      md: "0.25em", // 4px
      lg: "0.5em", // 8px
      xl: "1em", // 16px
    },
  };
  const result = cssVariables(theme);

  expect(typeof result).toEqual("string");
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
