import styled from "styled-components";
import { cssVariable, TextColor } from "src/components/helper";
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
  props?: React.ComponentPropsWithoutRef<typeof Text>["align"];
}>`
  color: ${(props) => cssVariable(`color.text.${props.$color}`)};
  ${(props) => props.$align && `text-align: ${props.$align};`}
  ${({ $style }) =>
    `
  font-size: ${cssVariable(`fonts.styles.${$style}.font_size`)};
  font-weight: ${cssVariable(`fonts.styles.${$style}.font_weight`)};
  letter-spacing: ${cssVariable(`fonts.styles.${$style}.letter_spacing`)};
  `}
  ${({ $weight }) => $weight && `font-weight: ${$weight};`}
`;

type BaseTextProps = {
  children: React.ReactNode;
  color?: TextColor;
  align?: CSSProperties["textAlign"];
  style?: keyof (typeof ThemeTokens)["fonts"]["styles"];
  weight?: CSSProperties["fontWeight"];
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
  style = "base",
  weight,
  ...props
}: BaseTextProps & (PTagProps | LabelTagProps)) => {
  return (
    <StyledTextTag
      as={as}
      $color={color}
      $align={align}
      $style={style}
      $weight={weight}
      {...props}
    >
      {children}
    </StyledTextTag>
  );
};

export { Text };
