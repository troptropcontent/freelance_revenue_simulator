import * as RadixSwitch from "@radix-ui/react-switch";
import styled from "styled-components";
import { Box } from "./Box";
import { cssVariable } from "../helper";

const StyledRoot = styled(RadixSwitch.Root)`
  all: unset;
  margin: 3px;
  width: 56px;
  height: 29px;
  background-color: ${cssVariable("color.background.neutral.medium")};
  box-shadow: 0 2px 2px ${cssVariable("color.background.black.a7")};
  border-radius: 9999px;
  position: relative;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  &[data-state="checked"] {
    background-color: ${cssVariable("color.background.success.medium")};
  }
`;

const StyledThumb = styled(RadixSwitch.Thumb)`
  display: block;
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 9999px;
  box-shadow: 0 2px 2px ${cssVariable("color.background.black.a7")};
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;
  &[data-state="checked"] {
    transform: translateX(29px);
  }
`;

const Switch = ({
  onCheckedChange,
}: {
  onCheckedChange?: React.ComponentProps<
    typeof RadixSwitch.Root
  >["onCheckedChange"];
}) => {
  return (
    <StyledRoot onCheckedChange={onCheckedChange}>
      <StyledThumb />
    </StyledRoot>
  );
};

export default Switch;
