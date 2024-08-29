import { Field, useFormikContext } from "formik";
import { Box } from "src/components/ui/Box";
import { Text } from "src/components/ui/Text";
import styled from "styled-components";

const StyledLabel = styled.label`
  display: flex;
  justify-content: space-between;
`;

const Range = ({
  name,
  label,
  hint,
  unit,
  ...props
}: {
  name: string;
  label: string;
  hint?: string;
  unit?: string;
} & React.ComponentProps<"input">) => {
  const { values } = useFormikContext();
  const value: number | undefined = name
    .split(".")
    .reduce((acc, key) => acc[key], values);

  return (
    <Box flex flexDirection="column" gap="md">
      <StyledLabel htmlFor={name}>
        <Text>{label + ":"}</Text>
        <Box as="span">
          {[value, unit].filter((v) => v !== undefined).join(" ")}
        </Box>
      </StyledLabel>
      {hint && (
        <Text size="xs" color="muted.medium">
          {hint}
        </Text>
      )}
      <Field name={name} type="range" value={value} {...props} />
    </Box>
  );
};

export { Range };
