import { Field } from "formik";
import { createPaddingStyle, cssVariable } from "src/components/helper";
import styled from "styled-components";

const StyledField = styled(Field)`
  all: unset;
  width: 92px;
  ${createPaddingStyle("sm")}

  /* Remove the arrows */
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  -moz-appearance: textfield;

  text-align: center;

  border: ${cssVariable("border.xs")} solid
    ${cssVariable("color.border.neutral.dark")};
  border-radius: 7px;

  &:focus {
    box-shadow: 0 0 0 2px black;
  }
`;
const NumberInput = ({
  name,
  min,
  max,
}: {
  name: string;
  min?: number;
  max?: number;
}) => {
  return <StyledField type="number" name={name} min={min} max={max} />;
};

export { NumberInput };
