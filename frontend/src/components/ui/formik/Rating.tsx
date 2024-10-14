import styled from "styled-components";
import { Box } from "../Box";
import StarSvg from "src/assets/star.svg";
import { Field, useFormikContext } from "formik";
import { FormValues } from "src/App";
import { Text } from "../Text";
import { cssVariable } from "src/components/helper";

const Star = styled.label`
  &[for="input_0"] {
    display: none;
  }
  color: gold;
`;

const HiddenRadio = styled(Field)`
  display: none;

  &:checked ~ ${Star} {
    color: ${cssVariable("color.background.grey.light")};
  }

  &:checked + ${Star} {
    color: gold;
  }
`;

const Rating = ({
  label,
  name,
  max = 5,
}: {
  name: string;
  label: string;
  max: number;
}) => {
  const { setFieldValue: setFormikFieldValue } = useFormikContext<FormValues>();
  const setFieldValue = (valueString: string) => {
    // We need to overwrite the formik Field behavior here because the inpout values are detected as string so we need to convert them as int manually
    setFormikFieldValue(name, parseInt(valueString));
  };
  return (
    <Box
      flex
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text>{label}</Text>
      <Box flex flexDirection="row">
        {Array.from(Array(max + 1), (_, i) => {
          const inputId = "input_" + i.toString();
          return (
            <>
              <HiddenRadio
                type="radio"
                id={inputId}
                name={name}
                value={i}
                defaultChecked={i == 0}
                onChange={({
                  target: { value },
                }: React.ChangeEvent<HTMLInputElement>) => setFieldValue(value)}
              />
              <Star htmlFor={inputId}>
                <StarSvg />
              </Star>
            </>
          );
        })}
      </Box>
    </Box>
  );
};

export { Rating };
