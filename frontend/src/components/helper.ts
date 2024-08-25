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

const cssVariables = (theme: Tokens) => {
    return createCssVar(theme).join(';');
}

export { cssVariables, cssVariable, createPaddingStyle, createBorderRadiusStyle };
