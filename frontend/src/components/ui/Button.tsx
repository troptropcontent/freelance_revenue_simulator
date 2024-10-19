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
>(({ children, color = "brand", onClick, ...props }, forwardedRef) => {
  const handleClick = (
    e: Parameters<
      NonNullable<React.ComponentPropsWithoutRef<"button">["onClick"]>
    >[0],
  ) => {
    if (onClick == undefined) {
      return;
    }

    e.preventDefault();
    onClick(e);
  };
  return (
    <StyledButton
      {...props}
      onClick={handleClick}
      $color={color}
      ref={forwardedRef}
    >
      {children}
    </StyledButton>
  );
});
Button.displayName = "Button";

export { Button };
