import styled from "styled-components";
import { Box } from "../../Box";
import { Text } from "../../Text";
import { Field } from "formik";

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
  currency,
}: {
  name: string;
  currency: string;
}) => {
  return (
    <Box
      as="span"
      flex
      borderRadius={7}
      border={{ color: "neutral.dark", size: "xs" }}
      padding="sm"
      gap="sm"
      justifyContent="center"
      width={{ min: 92 }}
    >
      <StyledInput id={name} name={name} type="number" />
      <Text>{currency}</Text>
    </Box>
  );
};

export { CurrencyInput };
