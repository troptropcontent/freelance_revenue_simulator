import { Box } from "../../Box";
import { Text } from "../../Text";
import { NumberInput } from "../primitives/NumberInput";

const NumberInputGroup = ({ name, label }: { name: string; label: string }) => {
  return (
    <Box
      flex
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text as="label" size="sm" htmlFor={name}>
        {label}
      </Text>
      <NumberInput name={name} />
    </Box>
  );
};

export { NumberInputGroup };
