import * as RadixSeparator from "@radix-ui/react-separator";
import styled from "styled-components";
import {
  BackgroundColor,
  createMarginStyle,
  cssVariable,
  Margin,
} from "../helper";

const StyledSeparator = styled(RadixSeparator.Root)<{
  $margin?: Margin;
  $color?: React.ComponentProps<typeof Separator>["color"];
}>`
  background-color: black;
  ${(props) =>
    props.$color &&
    `background-color: ${cssVariable(`color.background.${props.$color}`)};`}

  &[data-orientation="horizontal"] {
    height: 1px;
    width: 100%;
  }

  &[data-orientation="vertical"] {
    height: 100%;
    width: 1px;
  }

  ${(props) => props.$margin && createMarginStyle(props.$margin)}
`;

const Separator = ({
  orientation,
  margin,
  color,
}: {
  orientation?: React.ComponentProps<typeof RadixSeparator.Root>["orientation"];
  margin?: Margin;
  color?: BackgroundColor;
}) => (
  <StyledSeparator
    decorative
    orientation={orientation}
    $margin={margin}
    $color={color}
  />
);

export { Separator };
