import { Box } from "../../Box";
import { Text } from "../../Text";
import { RatingInput } from "../primitives/RatingInput";

const RatingInputGroup = ({
  label,
  name,
  max = 5,
}: {
  name: string;
  label: string;
  max: number;
}) => {
  return (
    <Box
      flex
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text>{label}</Text>
      <RatingInput name={name} max={max} />
    </Box>
  );
};

export { RatingInputGroup };
