import styled from "styled-components";
import { cssVariable, mediaQueries, TextColor } from "src/components/helper";
import { CSSProperties, ReactNode } from "react";
import { ThemeTokens } from "../constants";

const TextTag = ({
  children,
  as,
}: {
  children: ReactNode;
  as: "p" | "label";
}) => {
  const Tag = as;
  return <Tag>{children}</Tag>;
};

const StyledTextTag = styled(TextTag)<{
  $align?: CSSProperties["textAlign"];
  $color: TextColor;
  $style: NonNullable<React.ComponentPropsWithoutRef<typeof Text>["style"]>;
  $weight: React.ComponentPropsWithoutRef<typeof Text>["weight"];
  $size: React.ComponentPropsWithoutRef<typeof Text>["size"];
  $decoration: React.ComponentPropsWithoutRef<typeof Text>["decoration"];
  props?: React.ComponentPropsWithoutRef<typeof Text>["align"];
}>`
  color: ${(props) => cssVariable(`color.text.${props.$color}`)};
  ${(props) => props.$align && `text-align: ${props.$align};`}
  ${({ $style, $size, $weight }) =>
    `
  font-size: ${$size ? `${typeof $size == "string" ? `${$size}` : `${$size}px`}` : cssVariable(`fonts.styles.${$style}.small.font_size`)};
  font-weight: ${$weight ? $weight : cssVariable(`fonts.styles.${$style}.small.font_weight`)};
  letter-spacing: ${cssVariable(`fonts.styles.${$style}.small.letter_spacing`)};
  line-height: ${cssVariable(`fonts.styles.${$style}.small.line_height`)};

  ${mediaQueries("md")`
    font-size: ${$size ? `${typeof $size == "string" ? `${$size}` : `${$size}px`}` : `${cssVariable(`fonts.styles.${$style}.normal.font_size`)}`};
    font-weight: ${$weight ? $weight : cssVariable(`fonts.styles.${$style}.normal.font_weight`)};
    letter-spacing: ${cssVariable(`fonts.styles.${$style}.normal.letter_spacing`)};
    line-height: ${cssVariable(`fonts.styles.${$style}.normal.line_height`)};
    `}
  `}
  ${({ $decoration }) => $decoration && `text-decoration: ${$decoration};`}
`;

type BaseTextProps = {
  children: React.ReactNode;
  color?: TextColor;
  align?: CSSProperties["textAlign"];
  style?: keyof (typeof ThemeTokens)["fonts"]["styles"];
  size?: CSSProperties["fontSize"];
  weight?: CSSProperties["fontWeight"];
  decoration?: CSSProperties["textDecoration"];
};

type PTagProps = {
  as?: "p";
} & Omit<React.ComponentPropsWithoutRef<"p">, "style">;

type LabelTagProps = {
  as?: "label";
} & Omit<React.ComponentPropsWithoutRef<"label">, "style">;

const Text = ({
  as = "p",
  color = "primary.medium",
  children,
  align,
  style = "text",
  size,
  weight,
  decoration,
  ...props
}: BaseTextProps & (PTagProps | LabelTagProps)) => {
  return (
    <StyledTextTag
      as={as}
      $color={color}
      $align={align}
      $style={style}
      $size={size}
      $weight={weight}
      $decoration={decoration}
      {...props}
    >
      {children}
    </StyledTextTag>
  );
};

export { Text };
