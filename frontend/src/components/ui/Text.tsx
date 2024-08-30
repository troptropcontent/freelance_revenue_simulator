import { Tokens } from "src/components/tokens";
import styled from "styled-components";
import { cssVariable, TextColor } from "src/components/helper";

const StyledText = styled.p<{
  $size: keyof Tokens["fonts"]["size"];
  $color: TextColor;
  props?: React.ComponentPropsWithoutRef<"p">;
}>`
  font-size: ${(props) => cssVariable(`fonts.size.${props.$size}`)};
  color: ${(props) => cssVariable(`color.text.${props.$color}`)};
`;

const Text = ({
  size = "sm",
  color = "primary.medium",
  children,
  ...props
}: {
  color?: TextColor;
  size?: keyof Tokens["fonts"]["size"];
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"p">) => {
  return (
    <StyledText $size={size} $color={color} {...props}>
      {children}
    </StyledText>
  );
};

export { Text };
