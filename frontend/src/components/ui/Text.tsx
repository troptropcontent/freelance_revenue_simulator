import { Tokens } from "src/components/tokens";
import styled from "styled-components";
import { cssVariable, TextColor } from "src/components/helper";
import { CSSProperties } from "react";

const StyledText = styled.p<{
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

const Text = ({
  size = "sm",
  color = "primary.medium",
  weight,
  children,
  align,
  ...props
}: {
  color?: TextColor;
  size?: keyof Tokens["fonts"]["size"];
  weight?: CSSProperties["fontWeight"];
  align?: CSSProperties["textAlign"];
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"p">) => {
  return (
    <StyledText
      $size={size}
      $color={color}
      $weight={weight}
      $align={align}
      {...props}
    >
      {children}
    </StyledText>
  );
};

export { Text };
