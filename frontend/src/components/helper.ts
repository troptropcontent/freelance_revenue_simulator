import { Tokens } from "./tokens";

type RecursiveKeyOf<TObj extends object> = {
    [TKey in keyof TObj & (string | number)]:
      TObj[TKey] extends any[] ? `${TKey}` :
      TObj[TKey] extends object
        ? `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
        : `${TKey}`;
  }[keyof TObj & (string | number)];

type TokenId = RecursiveKeyOf<Tokens>;

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

const cssVariables = (theme: Tokens) => {
    return createCssVar(theme).join(';');
}

export { cssVariables, cssVariable };
