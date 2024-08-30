import styled from "styled-components";
import { ButtonColor, cssVariable } from "src/components/helper";
import { forwardRef } from "react";

const StyledButton = styled.button<{
  $color: Exclude<ButtonColor, "white" | "black">;
}>`
  all: unset;

  background-color: ${({ $color }) =>
    cssVariable(`color.background.${$color}.light`)};
  padding: ${cssVariable("spacing.sm")};
  border-radius: ${cssVariable("borderRadius.sm")};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ $color }) =>
      cssVariable(`color.background.${$color}.dark`)};
  }
`;

const Button = forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button"> & {
    color?: Exclude<ButtonColor, "white" | "black">;
  }
>(({ children, color = "brand", ...props }, forwardedRef) => (
  <StyledButton {...props} $color={color} ref={forwardedRef}>
    {children}
  </StyledButton>
));
Button.displayName = "Button";

export { Button };
