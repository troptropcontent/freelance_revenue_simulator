import { Tokens } from "src/components/tokens";
import styled from "styled-components";
import { cssVariable, TextColor } from "src/components/helper";
import { CSSProperties } from "react";

const StyledText = styled.p<{
  $size: keyof Tokens["fonts"]["size"];
  $color: TextColor;
  $weight?: CSSProperties["fontWeight"];
  props?: React.ComponentPropsWithoutRef<"p">;
}>`
  font-size: ${(props) => cssVariable(`fonts.size.${props.$size}`)};
  color: ${(props) => cssVariable(`color.text.${props.$color}`)};
  ${(props) => props.$weight && `font-weight: ${props.$weight};`}
`;

const Text = ({
  size = "sm",
  color = "primary.medium",
  weight,
  children,
  ...props
}: {
  color?: TextColor;
  size?: keyof Tokens["fonts"]["size"];
  weight?: CSSProperties["fontWeight"];
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"p">) => {
  return (
    <StyledText $size={size} $color={color} $weight={weight} {...props}>
      {children}
    </StyledText>
  );
};

export { Text };
