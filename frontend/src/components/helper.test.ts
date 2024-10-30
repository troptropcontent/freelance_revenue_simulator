import { ThemeTokens } from "./constants";
import {
  BorderRadius,
  createBorderRadiusStyle,
  createPaddingStyle,
  cssVariable,
  cssVariables,
  Padding,
} from "./helper";

test("cssVariables", () => {
  const result = cssVariables(ThemeTokens);

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
