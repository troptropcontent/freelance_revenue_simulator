import { Tokens } from "src/components/tokens";
import styled from "styled-components";
import { cssVariable, TextColor } from "src/components/helper";
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
  $size: keyof Tokens["fonts"]["size"];
  $color: TextColor;
  $weight?: CSSProperties["fontWeight"];
  props?: React.ComponentPropsWithoutRef<typeof Text>["align"];
}>`
  font-size: ${(props) => cssVariable(`fonts.size.${props.$size}`)};
  color: ${(props) => cssVariable(`color.text.${props.$color}`)};
  ${(props) => props.$weight && `font-weight: ${props.$weight};`}
  ${(props) => props.$align && `text-align: ${props.$align};`}
`;

type BaseTextProps = {
  children: React.ReactNode;
  color?: TextColor;
  size?: keyof Tokens["fonts"]["size"];
  weight?: CSSProperties["fontWeight"];
  align?: CSSProperties["textAlign"];
};

type PTagProps = {
  as?: "p";
} & React.ComponentPropsWithoutRef<"p">;

type LabelTagProps = {
  as?: "label";
} & React.ComponentPropsWithoutRef<"label">;

const Text = ({
  as = "p",
  size = "sm",
  color = "primary.medium",
  weight,
  children,
  align,
  ...props
}: BaseTextProps & (PTagProps | LabelTagProps)) => {
  return (
    <StyledTextTag
      as={as}
      $size={size}
      $color={color}
      $weight={weight}
      $align={align}
      {...props}
    >
      {children}
    </StyledTextTag>
  );
};

export { Text };
