import { ReactNode } from "react";
import { Box } from "../../Box";
import { Field, useFormikContext } from "formik";
import styled from "styled-components";
import { cssVariable, TextSize } from "src/components/helper";
import { RATED_COLOR, UNRATED_COLOR } from "./constants";

const StyledLabel = styled.label<{
  $hidden: boolean;
  $size?: TextSize;
}>`
  color: ${RATED_COLOR};
  ${({ $hidden }) =>
    $hidden
      ? "display: none;"
      : "display: flex; flex-direction: column; align-items: center; justify-content: center;"}

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
      <StyledLabel htmlFor={inputId} $hidden={value == 0} $size={size}>
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
    <Box flex flexDirection="row" gap="sm">
      {Array.from(Array(max + 1), (_, i) => {
        return (
          <RatingInputIcon
            size={size}
            disabled={disabled}
            name={name}
            value={i}
            key={i}
          >
            {children ? (
              children
            ) : (
              <svg
                width="27"
                height="25"
                viewBox="0 0 27 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5 24.1807L11.5425 22.4542C4.59 16.3463 0 12.318 0 7.37412C0 3.34579 2.842 0.180664 7 0.180664C11.575 0.180664 13.5 5.68066 13.5 5.68066C13.5 5.68066 15.842 0.180664 20 0.180664C24.158 0.180664 27 3.34579 27 7.37412C27 12.318 22.41 16.3463 15.4575 22.4673L13.5 24.1807Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </RatingInputIcon>
        );
      })}
    </Box>
  );
};

export { RatingInput };
