import { ReactNode } from "react";
import { Box } from "../../Box";
import { Field, useFormikContext } from "formik";
import styled from "styled-components";
import { cssVariable } from "src/components/helper";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const StyledLabel = styled.label`
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
  disabled,
}: {
  name: string;
  value: number;
  children: ReactNode;
  disabled?: boolean;
}) => {
  const { setFieldValue: setFormikFieldValue } = useFormikContext();

  const setFieldValue = (valueString: string) => {
    // We need to overwrite the formik Field behavior here because the inpout values are detected as string so we need to convert them as int manually
    setFormikFieldValue(name, parseInt(valueString));
  };
  const inputId = name + "_" + value.toString();
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
        disabled={disabled}
      />
      <StyledLabel htmlFor={inputId} hidden={value == 0}>
        {children}
      </StyledLabel>
    </>
  );
};

const RatingInput = ({
  name,
  children,
  max,
  disabled,
}: {
  name: string;
  children?: ReactNode;
  max: number;
  disabled?: boolean;
}) => {
  return (
    <Box flex flexDirection="row">
      {Array.from(Array(max + 1), (_, i) => {
        return (
          <RatingInputIcon disabled={disabled} name={name} value={i} key={i}>
            {children ? children : <StarRoundedIcon />}
          </RatingInputIcon>
        );
      })}
    </Box>
  );
};

export { RatingInput };
