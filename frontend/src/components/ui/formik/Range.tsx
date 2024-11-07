import { useFormikContext } from "formik";
import { Box } from "src/components/ui/Box";
import { Text } from "src/components/ui/Text";
import styled from "styled-components";
import * as PrimitiveSlider from "@radix-ui/react-slider";
import { forwardRef } from "react";
import { cssVariable } from "src/components/helper";
import { FormValues } from "src/App";

const StyledLabel = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SliderRoot = forwardRef<
  React.ElementRef<typeof PrimitiveSlider.Root>,
  React.ComponentPropsWithoutRef<typeof PrimitiveSlider.Root>
>((props, forwardedRef) => (
  <PrimitiveSlider.Root {...props} ref={forwardedRef} />
));
SliderRoot.displayName = "SliderRoot";

const StyledSliderRoot = styled(SliderRoot)`
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;
  height: 26px;

  .SliderTrack {
    background-color: ${cssVariable("color.background.black.a12")};
    position: relative;
    flex-grow: 1;
    border-radius: 9999px;
    height: 2px;
  }

  .SliderRange {
    position: absolute;
    background-color: ${cssVariable("color.background.black.a12")};
    border-radius: 9999px;
    height: 100%;
  }

  .SliderThumb {
    display: block;
    width: 26px;
    height: 26px;
    background-color: ${cssVariable("color.background.white")};
    border: 2px solid ${cssVariable("color.background.black.a12")};
    border-radius: 9999px;
  }
  .SliderThumb:hover {
    background-color: ${cssVariable("color.background.neutral.medium")};
  }
  .SliderThumb:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${cssVariable("color.background.neutral.dark")};
  }
`;

const Range = ({
  name,
  label,
  hint,
  max = 100,
  min = 0,
  step = 1,
  valueFormater,
}: {
  name: string;
  label: string;
  hint?: string;
  max?: number;
  min?: number;
  step?: number;
  valueFormater?: (value: number) => string;
}) => {
  const { values, setFieldValue, getFieldMeta } = useFormikContext<
    FormValues | undefined
  >();

  if (values === undefined || typeof values !== "object") {
    throw new Error("The component Range must be used within a Formik context");
  }

  const { value } = getFieldMeta<number>(name);

  return (
    <Box flex flexDirection="column" gap="md">
      <Box flex flexDirection="column" gap="xs">
        <StyledLabel htmlFor={name}>
          <Text>{label}</Text>
          <Box
            as="span"
            width={{ min: 45 }}
            background="neutral.medium"
            borderRadius={7}
            padding={"sm"}
            flex
            flexDirection="row"
            justifyContent="center"
          >
            <Text>{valueFormater ? valueFormater(value) : value}</Text>
          </Box>
        </StyledLabel>
        <Text style="base" color="muted.medium">
          {hint}
        </Text>
      </Box>
      <StyledSliderRoot
        value={[value]}
        max={max}
        min={min}
        step={step}
        name={name}
        onValueChange={([value]) => setFieldValue(name, value)}
      >
        <PrimitiveSlider.Track className="SliderTrack">
          <PrimitiveSlider.Range className="SliderRange" />
        </PrimitiveSlider.Track>
        <PrimitiveSlider.Thumb className="SliderThumb" aria-label="Volume" />
      </StyledSliderRoot>
    </Box>
  );
};

export { Range };
