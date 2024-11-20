import styled from "styled-components";
import { ButtonColor, cssVariable, mediaQueries } from "src/components/helper";
import { forwardRef } from "react";

const StyledButton = styled.button<{
  $color: ButtonColor;
}>`
  all: unset;

  cursor: pointer;

  & > * {
    color: ${({ $color }) => {
      if ($color == "brand") {
        return cssVariable(`color.text.white`);
      }
    }};
  }

  background-color: ${({ $color }) => {
    if ($color == "white") {
      return cssVariable(`color.background.white`);
    }

    if ($color == "transparent") {
      return;
    }

    return cssVariable(`color.background.${$color}.light`);
  }};
  padding-inline: 15px;
  padding-block: 3.782px;
  border-radius: ${cssVariable("borderRadius.sm")};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${mediaQueries("md")`
    padding-inline: 20px;
    padding-block-start: 8px;
    padding-block-end: 10px;
    `}

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

    & > p {
      color: ${({ $color }) => {
        if ($color == "brand") {
          return cssVariable(`color.text.primary.dark`);
        }
      }};
    }
  }

  & > svg {
    padding-inline-start: ${cssVariable(`spacing.xs`)};
    height: 14px;
    weight: 14px;
  }
  ${mediaQueries("md")`
    & > svg {
    height: 22px;
    weight: 22px;
  }
  `}
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
