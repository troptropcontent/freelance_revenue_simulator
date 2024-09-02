import { Field, useFormikContext } from "formik";
import { Box } from "src/components/ui/Box";
import { Text } from "src/components/ui/Text";
import lodash from "lodash";
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
  const { values } = useFormikContext<Record<string, unknown> | undefined>();

  if (values === undefined || typeof values !== "object") {
    throw new Error("The component Range must be used within a Formik context");
  }

  const value = lodash.get(values, name.split("."));

  return (
    <Box flex flexDirection="column" gap="md">
      <Box flex flexDirection="column" gap="xs">
        <StyledLabel htmlFor={name}>
        <Text>{label + ":"}</Text>
        <Box as="span">
          {[value, unit].filter((v) => v !== undefined).join(" ")}
        </Box>
      </StyledLabel>
        <Text size="xs" color="muted.medium">
          {hint}
        </Text>
      </Box>
      <Field name={name} type="range" value={value} {...props} />
    </Box>
  );
};

export { Range };
