import styled from "styled-components";
import { ButtonColor, cssVariable } from "src/components/helper";
import { forwardRef } from "react";

const StyledButton = styled.button<{
  $color: ButtonColor;
}>`
  all: unset;

  cursor: pointer;

  color: ${({ $color }) => {
    if ($color == "brand") {
      return cssVariable(`color.text.white`);
    }
  }};

  background-color: ${({ $color }) => {
    if ($color == "white") {
      return cssVariable(`color.background.white`);
    }

    if ($color == "transparent") {
      return;
    }

    return cssVariable(`color.background.${$color}.light`);
  }};
  padding: ${cssVariable("spacing.sm")};
  border-radius: ${cssVariable("borderRadius.sm")};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ $color }) => {
      if ($color == "white") {
        return cssVariable(`color.background.neutral.dark`);
      }

      if ($color == "transparent") {
        return;
      }

      return cssVariable(`color.background.${$color}.dark`);
    }};

    color: ${({ $color }) => {
      if ($color == "brand") {
        return cssVariable(`color.text.primary.dark`);
      }
    }};
  }

  & > svg {
    padding-inline-start: ${cssVariable(`spacing.xs`)};
  }
`;

const Button = forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button"> & {
    color?: Exclude<ButtonColor, "black">;
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
