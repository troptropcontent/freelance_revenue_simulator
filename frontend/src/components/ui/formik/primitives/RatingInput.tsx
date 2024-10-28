import { ReactNode } from "react";
import { Box } from "../../Box";
import { Field, useFormikContext } from "formik";
import styled from "styled-components";
import { cssVariable, TextSize } from "src/components/helper";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { RATED_COLOR, UNRATED_COLOR } from "./constants";

const StyledLabel = styled.label<{
  $size?: TextSize;
}>`
  color: ${RATED_COLOR};

  & > svg {
    ${({ $size }) => $size && `width: ${cssVariable(`fonts.size.${$size}`)};`}
    ${({ $size }) => $size && `height: ${cssVariable(`fonts.size.${$size}`)};`}
  }
`;

const HiddenRadioCheckBox = styled(Field)`
  display: none;

  &:checked ~ ${StyledLabel} {
    color: ${UNRATED_COLOR};
  }

  &:checked + ${StyledLabel} {
    color: ${RATED_COLOR};
  }
`;

const RatingInputIcon = ({
  name,
  value,
  children,
  disabled,
  size,
}: {
  name: string;
  value: number;
  children: ReactNode;
  disabled?: boolean;
  size?: TextSize;
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
      <StyledLabel htmlFor={inputId} hidden={value == 0} $size={size}>
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
  size,
}: {
  name: string;
  children?: ReactNode;
  max: number;
  disabled?: boolean;
  size?: TextSize;
}) => {
  return (
    <Box flex flexDirection="row">
      {Array.from(Array(max + 1), (_, i) => {
        return (
          <RatingInputIcon
            size={size}
            disabled={disabled}
            name={name}
            value={i}
            key={i}
          >
            {children ? children : <StarRoundedIcon />}
          </RatingInputIcon>
        );
      })}
    </Box>
  );
};

export { RatingInput };
