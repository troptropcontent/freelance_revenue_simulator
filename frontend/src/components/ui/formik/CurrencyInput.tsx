import { Box } from "../Box";

const CurrencyInput = ({ name, label }: { name: string; label: string }) => {
  return (
    <Box flex flexDirection="row">
      <label htmlFor={name}>{label}</label>
      <input type="number"></input>
    </Box>
  );
};

export { CurrencyInput };
