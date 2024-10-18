import { Box } from "../../Box";
import { Text } from "../../Text";
import { CurrencyInput } from "../primitives/CurrencyInput";

const CurrencyInputGroup = ({
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
      <Text as="label" htmlFor={name}>
        {label}
      </Text>
      <CurrencyInput name={name} currency={currency} />
    </Box>
  );
};

export { CurrencyInputGroup };
