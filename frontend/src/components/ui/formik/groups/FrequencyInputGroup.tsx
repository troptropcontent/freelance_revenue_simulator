import { Box } from "../../Box";
import { Frequencies } from "src/components/simulator/constants";
import { useTranslation } from "react-i18next";
import { Text } from "../../Text";
import { SelectInput } from "../primitives/SelectInput";
import { NumberInput } from "../primitives/NumberInput";

const FrequencyInputGroup = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => {
  const { t } = useTranslation();
  return (
    <Box
      flex
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text as="label" size="sm" htmlFor={`${name}_value`}>
        {label}
      </Text>
      <Box flex flexDirection="row" gap="md">
        <NumberInput name={`${name}_value`} />
        <SelectInput.Root
          placeholder="Select a Frequency"
          name={`${name}_unit`}
        >
          {Frequencies.map((frequency) => (
            <SelectInput.Item value={frequency} key={frequency}>
              {t(`common.frequencies.${frequency}`)}
            </SelectInput.Item>
          ))}
        </SelectInput.Root>
      </Box>
    </Box>
  );
};

export { FrequencyInputGroup };
