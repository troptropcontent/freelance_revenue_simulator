import { useFormikContext } from "formik";
import { Box } from "src/components/ui/Box";
import { Text } from "src/components/ui/Text";
import lodash from "lodash";
import styled from "styled-components";
import * as PrimitiveSlider from "@radix-ui/react-slider";
import { forwardRef } from "react";
import { cssVariable } from "src/components/helper";

const StyledLabel = styled.label`
  display: flex;
  justify-content: space-between;
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
  height: 20px;

  .SliderTrack {
    background-color: ${cssVariable("color.background.grey.medium")};
    position: relative;
    flex-grow: 1;
    border-radius: 9999px;
    height: 3px;
  }

  .SliderRange {
    position: absolute;
    background-color: ${cssVariable("color.background.brand.dark")};
    border-radius: 9999px;
    height: 100%;
  }

  .SliderThumb {
    display: block;
    width: 20px;
    height: 20px;
    background-color: ${cssVariable("color.background.brand.light")};
    box-shadow: 0 2px 10px rgba(${cssVariable("color.background.black")}, 0.5);
    border-radius: 10px;
  }
  .SliderThumb:hover {
    background-color: ${cssVariable("color.background.brand.medium")};
  }
  .SliderThumb:focus {
    outline: none;
    box-shadow: 0 0 0 5px rgba(${cssVariable("color.background.black")}, 0.5);
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
  const { values, setFieldValue } = useFormikContext<
    Record<string, unknown> | undefined
  >();

  if (values === undefined || typeof values !== "object") {
    throw new Error("The component Range must be used within a Formik context");
  }

  const value = lodash.get(values, name.split("."));
  const valueNumber = typeof value === "number" ? value : 0;

  return (
    <Box flex flexDirection="column" gap="md">
      <Box flex flexDirection="column" gap="xs">
        <StyledLabel htmlFor={name}>
          <Text>{label + ":"}</Text>
          <Box as="span">
            {valueFormater ? valueFormater(valueNumber) : value}
          </Box>
        </StyledLabel>
        <Text size="xs" color="muted.medium">
          {hint}
        </Text>
      </Box>
      <StyledSliderRoot
        defaultValue={[valueNumber]}
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
