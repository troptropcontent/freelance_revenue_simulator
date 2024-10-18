import { ReactNode } from "react";
import { Box } from "../../Box";
import { Field, useFormikContext } from "formik";
import { FormValues } from "src/App";
import styled from "styled-components";
import { cssVariable } from "src/components/helper";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const StyledLabel = styled.label`
  &[for="input_0"] {
    display: none;
  }
  color: gold;
`;

const HiddenRadioCheckBox = styled(Field)`
  display: none;

  &:checked ~ ${StyledLabel} {
    color: ${cssVariable("color.background.grey.light")};
  }

  &:checked + ${StyledLabel} {
    color: gold;
  }
`;

const RatingInputIcon = ({
  name,
  value,
  children,
}: {
  name: string;
  value: number;
  children: ReactNode;
}) => {
  const { setFieldValue: setFormikFieldValue } = useFormikContext<FormValues>();
  const setFieldValue = (valueString: string) => {
    // We need to overwrite the formik Field behavior here because the inpout values are detected as string so we need to convert them as int manually
    setFormikFieldValue(name, parseInt(valueString));
  };
  const inputId = "input_" + value.toString();
  return (
    <>
      <HiddenRadioCheckBox
        type="radio"
        id={inputId}
        name={name}
        value={value}
        onChange={({
          target: { value },
        }: React.ChangeEvent<HTMLInputElement>) => setFieldValue(value)}
      />
      <StyledLabel htmlFor={inputId}>{children}</StyledLabel>
    </>
  );
};

const RatingInput = ({
  name,
  children,
  max,
}: {
  name: string;
  children?: ReactNode;
  max: number;
}) => {
  return (
    <Box flex flexDirection="row">
      {Array.from(Array(max + 1), (_, i) => {
        return (
          <RatingInputIcon name={name} value={i} key={i}>
            {children ? children : <StarRoundedIcon />}
          </RatingInputIcon>
        );
      })}
    </Box>
  );
};

export { RatingInput };
