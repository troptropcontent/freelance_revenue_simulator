import { Tokens } from "./tokens";

type RecursiveKeyOf<TObj extends object> = {
    [TKey in keyof TObj & (string | number)]:
      TObj[TKey] extends any[] ? `${TKey}` :
      TObj[TKey] extends object
        ? `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
        : `${TKey}`;
  }[keyof TObj & (string | number)];

type TokenId = RecursiveKeyOf<Tokens>;

type SpacingsType<T, Keys extends string> = T | {
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

type Padding = SpacingsType<Spacing, keyof typeof PaddingKeys>;

const BorderRadiusKeys = {
  topLeft: "border-top-left-radius",
  topRight: "border-top-right-radius",
  bottomLeft: "border-bottom-left-radius",
  bottomRight: "border-bottom-right-radius",
} as const;

type BorderRadius = SpacingsType<keyof Tokens["borderRadius"], keyof typeof BorderRadiusKeys>;

type BackgroundColor = RecursiveKeyOf<Tokens["color"]["background"]>;

const cssVariable = (tokenId: TokenId) => {
    return `var(--${tokenId.split('.').join('-')})`;
}

const createCssVar = (themeObject: object, prefix: string = ""): string[] =>
    Object.entries(themeObject).flatMap(([key, value]) => {
      const varName = prefix == "" ? `--${key}` : `${prefix}-${key}`;
      if (typeof value === 'object')
        return createCssVar(value, varName);
      return `${varName}:${value}`;
});

const createPaddingStyle = (padding: Padding) => {
  if (typeof padding === "string") {
    const tokenId = `spacing.${padding}` as TokenId;
    return `padding: ${cssVariable(tokenId)};`
  }

  return Object.entries(padding).map(([key, value]) => {
    const tokenId = `spacing.${value}` as TokenId;
    return `${PaddingKeys[key as keyof typeof PaddingKeys]}: ${cssVariable(tokenId)};`
  }).join("");
}

const createBorderRadiusStyle = (borderRadius: BorderRadius) => {
  if (typeof borderRadius === "string") {
    const tokenId = `borderRadius.${borderRadius}` as TokenId;
    return `border-radius: ${cssVariable(tokenId)};`
  }

  return Object.entries(borderRadius).map(([key, value]) => {
    const tokenId = `borderRadius.${value}` as TokenId;
    return `${BorderRadiusKeys[key as keyof typeof BorderRadiusKeys]}: ${cssVariable(tokenId)};`
  }).join("");
}

const cssVariables = (theme: Tokens) => {
    return createCssVar(theme).join(';');
}

export { cssVariables, cssVariable, createPaddingStyle, createBorderRadiusStyle };
export type { RecursiveKeyOf, Padding, BorderRadius, Spacing, BackgroundColor };
