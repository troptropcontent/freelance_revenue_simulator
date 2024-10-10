import { Field } from "formik";
import { Box } from "../Box";
import styled from "styled-components";
import { cssVariable } from "src/components/helper";

const StyledInput = styled(Field)`
  all: unset;
  width: 45px;

  /* Remove the arrows */
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  -moz-appearance: textfield;

  text-align: right;
`;

const CurrencyInput = ({
  name,
  label,
  currency = "€",
}: {
  name: string;
  label: string;
  currency?: string;
}) => {
  return (
    <Box
      flex
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <label htmlFor={name}>{label}</label>
      <Box
        as="span"
        flex
        borderRadius={"md"}
        border={{ color: "neutral.dark", size: "sm" }}
        padding="sm"
        gap="sm"
        justifyContent="center"
      >
        <StyledInput id={name} name={name} type="number" />
        {currency}
      </Box>
    </Box>
  );
};

export { CurrencyInput };
