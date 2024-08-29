import { Tokens } from "src/components/tokens";
import styled from "styled-components";
import { cssVariable, TextColor } from "src/components/helper";

const StyledText = styled.p<{
  $size: keyof Tokens["fonts"]["size"];
  $color: TextColor;
}>`
  font-size: ${(props) => cssVariable(`fonts.size.${props.$size}`)};
  color: ${(props) => cssVariable(`color.text.${props.$color}`)};
`;

const Text = ({
  size = "sm",
  color = "primary.medium",
  children,
}: {
  color?: TextColor;
  size?: keyof Tokens["fonts"]["size"];
  children: React.ReactNode;
}) => {
  return (
    <StyledText $size={size} $color={color}>
      {children}
    </StyledText>
  );
};

export { Text };
