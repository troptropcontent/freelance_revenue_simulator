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
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="24"
                viewBox="0 0 27 24"
                fill="none"
              >
                <path
                  d="M13.3134 20.1062L7.02452 23.7753C6.7467 23.9465 6.45625 24.0199 6.15317 23.9954C5.85009 23.971 5.5849 23.8731 5.35759 23.7019C5.13028 23.5307 4.95349 23.3166 4.8272 23.0598C4.70092 22.803 4.67567 22.5156 4.75143 22.1976L6.41836 15.2631L0.849311 10.6035C0.596747 10.3833 0.438894 10.1326 0.375753 9.85133C0.312611 9.57004 0.331554 9.29486 0.43258 9.0258C0.533605 8.75674 0.685144 8.53659 0.887196 8.36537C1.08925 8.19415 1.36707 8.08408 1.72066 8.03516L9.07029 7.41143L11.9116 0.880566C12.0379 0.587044 12.2337 0.366902 12.4989 0.220141C12.764 0.0733805 13.0356 0 13.3134 0C13.5912 0 13.8627 0.0733805 14.1279 0.220141C14.3931 0.366902 14.5888 0.587044 14.7151 0.880566L17.5565 7.41143L24.9061 8.03516C25.2597 8.08408 25.5375 8.19415 25.7396 8.36537C25.9416 8.53659 26.0931 8.75674 26.1942 9.0258C26.2952 9.29486 26.3141 9.57004 26.251 9.85133C26.1879 10.1326 26.03 10.3833 25.7774 10.6035L20.2084 15.2631L21.8753 22.1976C21.9511 22.5156 21.9258 22.803 21.7995 23.0598C21.6733 23.3166 21.4965 23.5307 21.2692 23.7019C21.0419 23.8731 20.7767 23.971 20.4736 23.9954C20.1705 24.0199 19.8801 23.9465 19.6022 23.7753L13.3134 20.1062Z"
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
