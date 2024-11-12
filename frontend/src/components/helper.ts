import { FontWeights, Tokens } from "./tokens";

type RecursiveKeyOf<TObj extends object> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends any[]
    ? `${TKey}`
    : TObj[TKey] extends object
      ? `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
      : `${TKey}`;
}[keyof TObj & (string | number)];

type TokenId = RecursiveKeyOf<Tokens>;

type SpacingsType<T, Keys extends string> =
  | T
  | {
      [key in Keys]?: T;
    };

type Spacing = keyof Tokens["spacing"];

const PaddingKeys = {
  top: "padding-block-start",
  right: "padding-inline-end",
  bottom: "padding-block-end",
  left: "padding-inline-start",
  inline: "padding-inline",
  block: "padding-block",
} as const;

type Padding =
  | SpacingsType<Spacing | number, keyof typeof PaddingKeys>
  | number;

const MarginKeys = {
  top: "margin-block-start",
  right: "margin-inline-end",
  bottom: "margin-block-end",
  left: "margin-inline-start",
  inline: "margin-inline",
  block: "margin-block",
} as const;

type Margin = SpacingsType<Spacing | number, keyof typeof MarginKeys>;

const BorderRadiusKeys = {
  topLeft: "border-top-left-radius",
  topRight: "border-top-right-radius",
  bottomLeft: "border-bottom-left-radius",
  bottomRight: "border-bottom-right-radius",
} as const;

type BorderRadius = SpacingsType<
  keyof Tokens["borderRadius"] | number,
  keyof typeof BorderRadiusKeys
>;

type Border = {
  color: RecursiveKeyOf<Tokens["color"]["border"]>;
  size: keyof Tokens["border"];
};

type BackgroundColor = RecursiveKeyOf<Tokens["color"]["background"]>;

type ButtonColor =
  | Exclude<keyof Tokens["color"]["background"], "black">
  | "transparent";

type TextColor = RecursiveKeyOf<Tokens["color"]["text"]>;

type TextSize = keyof Tokens["fonts"]["size"];

type TextStyle = keyof Tokens["fonts"]["family"];

const cssVariable = (tokenId: TokenId) => {
  return `var(--${tokenId.split(".").join("-")})`;
};

// This function is here to map all the tokens values that can not be sent as is into css variables.
const mapValues = (varName: string, value: unknown): unknown => {
  // For clarity, the tokens for font weight are stored in string 'bold', 'semi-bold' etc, as those values are passed to css values we need to convert them in number before
  if (/--fonts.styles.*.font_weight/.test(varName)) {
    return FontWeights[value as keyof typeof FontWeights];
  } else {
    return value;
  }
};

const createCssVar = (themeObject: object, prefix: string = ""): string[] =>
  Object.entries(themeObject).flatMap(([key, value]) => {
    const varName = prefix == "" ? `--${key}` : `${prefix}-${key}`;
    if (typeof value === "object") return createCssVar(value, varName);
    return `${varName}:${mapValues(varName, value)}`;
  });

const createPaddingStyle = (padding: Padding) => {
  if (typeof padding === "number") {
    return `padding: ${padding}px;`;
  }

  if (typeof padding === "string") {
    const tokenId = `spacing.${padding}` as TokenId;
    return `padding: ${cssVariable(tokenId)};`;
  }

  return Object.entries(padding)
    .map(([key, value]) => {
      const cssValue =
        typeof value == "string"
          ? cssVariable(`spacing.${value}`)
          : `${value}px`;

      return `${PaddingKeys[key as keyof typeof PaddingKeys]}: ${cssValue};`;
    })
    .join("");
};

const createMarginStyle = (margin: Margin) => {
  if (typeof margin === "number") {
    return `margin: ${margin}px;`;
  }

  if (typeof margin === "string") {
    return `margin: ${cssVariable(`spacing.${margin}`)};`;
  }

  return Object.entries(margin)
    .map(([key, value]) => {
      const cssValue =
        typeof value == "string"
          ? cssVariable(`spacing.${value}`)
          : `${value}px`;

      return `${MarginKeys[key as keyof typeof PaddingKeys]}: ${cssValue};`;
    })
    .join("");
};

const createBorderRadiusStyle = (borderRadius: BorderRadius) => {
  if (typeof borderRadius === "string") {
    return `border-radius: ${cssVariable(`borderRadius.${borderRadius}`)};`;
  }

  if (typeof borderRadius === "number") {
    return `border-radius: ${borderRadius}px;`;
  }

  return Object.entries(borderRadius)
    .map(([key, value]) => {
      const cssValue = typeof value == "string" ? cssVariable(`borderRadius.${value}`) : `${value}px`
   
      return `${BorderRadiusKeys[key as keyof typeof BorderRadiusKeys]}: ${cssValue};`;
    })
    .join("");
};

const cssVariables = (theme: Tokens) => {
  return createCssVar(theme).join(";");
};

export {
  cssVariables,
  cssVariable,
  createPaddingStyle,
  createMarginStyle,
  createBorderRadiusStyle,
};
export type {
  RecursiveKeyOf,
  Padding,
  Margin,
  BorderRadius,
  Border,
  Spacing,
  BackgroundColor,
  TokenId,
  TextColor,
  TextSize,
  TextStyle,
  ButtonColor,
};
