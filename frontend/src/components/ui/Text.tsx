import { Tokens } from "src/components/tokens";
import styled from "styled-components";
import {
  cssVariable,
  TextColor,
  TextSize,
  TextStyle,
} from "src/components/helper";
import { CSSProperties, ReactNode } from "react";

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
  $size: TextSize;
  $color: TextColor;
  $weight?: CSSProperties["fontWeight"];
  $style?: TextStyle;
  props?: React.ComponentPropsWithoutRef<typeof Text>["align"];
}>`
  font-size: ${(props) => cssVariable(`fonts.size.${props.$size}`)};
  color: ${(props) => cssVariable(`color.text.${props.$color}`)};
  ${(props) => props.$weight && `font-weight: ${props.$weight};`}
  ${(props) => props.$align && `text-align: ${props.$align};`}
  ${({ $style }) =>
    $style && `font-family: ${cssVariable(`fonts.family.${$style}`)};`}
`;

type BaseTextProps = {
  children: React.ReactNode;
  color?: TextColor;
  size?: TextSize;
  weight?: CSSProperties["fontWeight"];
  align?: CSSProperties["textAlign"];
  style?: TextStyle;
};

type PTagProps = {
  as?: "p";
} & Omit<React.ComponentPropsWithoutRef<"p">, "style">;

type LabelTagProps = {
  as?: "label";
} & Omit<React.ComponentPropsWithoutRef<"label">, "style">;

const Text = ({
  as = "p",
  size = "sm",
  color = "primary.medium",
  weight,
  children,
  align,
  style,
  ...props
}: BaseTextProps & (PTagProps | LabelTagProps)) => {
  return (
    <StyledTextTag
      as={as}
      $size={size}
      $color={color}
      $weight={weight}
      $align={align}
      $style={style}
      {...props}
    >
      {children}
    </StyledTextTag>
  );
};

export { Text };
