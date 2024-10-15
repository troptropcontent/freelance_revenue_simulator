import styled from "styled-components";
import { Box } from "../Box";
import StarSvg from "src/assets/star.svg";
import { Field, useFormikContext } from "formik";
import { FormValues } from "src/App";
import { Text } from "../Text";
import { cssVariable } from "src/components/helper";

const StarSymbol = styled.label`
  &[for="input_0"] {
    display: none;
  }
  color: gold;
`;

const HiddenRadio = styled(Field)`
  display: none;

  &:checked ~ ${StarSymbol} {
    color: ${cssVariable("color.background.grey.light")};
  }

  &:checked + ${StarSymbol} {
    color: gold;
  }
`;

const Star = ({ name, value }: { name: string; value: number }) => {
  const { setFieldValue: setFormikFieldValue } = useFormikContext<FormValues>();
  const setFieldValue = (valueString: string) => {
    // We need to overwrite the formik Field behavior here because the inpout values are detected as string so we need to convert them as int manually
    setFormikFieldValue(name, parseInt(valueString));
  };
  const inputId = "input_" + value.toString();
  return (
    <>
      <HiddenRadio
        type="radio"
        id={inputId}
        name={name}
        value={value}
        onChange={({
          target: { value },
        }: React.ChangeEvent<HTMLInputElement>) => setFieldValue(value)}
      />
      <StarSymbol htmlFor={inputId}>
        <StarSvg />
      </StarSymbol>
    </>
  );
};

const Rating = ({
  label,
  name,
  max = 5,
}: {
  name: string;
  label: string;
  max: number;
}) => {
  const stars = [];
  for (let i = 0; i < max + 1; i++) {
    stars.push(i);
  }

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
          return <Star name={name} value={i} key={i} />;
        })}
      </Box>
    </Box>
  );
};

export { Rating };
