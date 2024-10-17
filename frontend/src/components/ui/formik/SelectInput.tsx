import { forwardRef, ReactNode } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import styled from "styled-components";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { createPaddingStyle, cssVariable } from "src/components/helper";
import { FormValues } from "src/App";
import { useFormikContext } from "formik";

const CustomSelectViewport = forwardRef<
  React.ElementRef<typeof RadixSelect.Viewport>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Viewport>
>((props, forwardedRef) => {
  return <RadixSelect.Viewport {...props} ref={forwardedRef} />;
});
CustomSelectViewport.displayName = "CustomSelectViewport";

const StyledSelectViewport = styled(CustomSelectViewport)`
  ${createPaddingStyle("sm")}
`;

const CustomSelectContent = forwardRef<
  React.ElementRef<typeof RadixSelect.Content>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Content>
>((props, forwardedRef) => {
  return <RadixSelect.Content {...props} ref={forwardedRef} />;
});
CustomSelectContent.displayName = "CustomSelectContent";

const StyledSelectContent = styled(CustomSelectContent)`
  overflow: hidden;
  background-color: white;
  border-radius: 6px;
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

const CustomSelectInputTrigger = forwardRef<
  React.ElementRef<typeof RadixSelect.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger>
>((props, forwardedRef) => {
  return <RadixSelect.Trigger {...props} ref={forwardedRef} />;
});
CustomSelectInputTrigger.displayName = "CustomSelectInputTrigger";

const StyledSelectInputTrigger = styled(CustomSelectInputTrigger)`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${createPaddingStyle({ inline: "sm" })}
  font-size: ${cssVariable("fonts.size.xs")};
  ${createPaddingStyle("sm")}
  min-width: 97px;
  gap: ${cssVariable("spacing.sm")};
  background-color: white;

  border: ${cssVariable("border.sm")} solid
    ${cssVariable("color.border.neutral.dark")};
  border-radius: ${cssVariable("borderRadius.sm")};

  &:hover {
    background-color: ${cssVariable("color.background.neutral.medium")};
  }
  &:focus {
    box-shadow: 0 0 0 2px black;
  }
  &[data-placeholder] {
    color: ${cssVariable("color.text.muted.dark")};
  }
`;

const CustomSelectRoot = ({
  name,
  placeholder,
  children,
}: {
  name: string;
  placeholder: string;
  children: ReactNode;
}) => {
  const { values, setFieldValue, getFieldMeta } = useFormikContext<
    FormValues | undefined
  >();

  if (values === undefined || typeof values !== "object") {
    throw new Error("The component Range must be used within a Formik context");
  }

  const { initialValue } = getFieldMeta<string>(name);

  return (
    <RadixSelect.Root
      defaultValue={initialValue}
      onValueChange={(value) => setFieldValue(name, value)}
    >
      <StyledSelectInputTrigger>
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className="SelectIcon">
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </StyledSelectInputTrigger>
      <RadixSelect.Portal>
        <StyledSelectContent>
          <RadixSelect.ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </RadixSelect.ScrollUpButton>
          <StyledSelectViewport>{children}</StyledSelectViewport>
          <RadixSelect.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </RadixSelect.ScrollDownButton>
        </StyledSelectContent>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};
CustomSelectRoot.displayName = "CustomSelectRoot";

const CustomSelectItem = forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Item>
>(({ children, ...props }, forwardedRef) => {
  return (
    <RadixSelect.Item {...props} ref={forwardedRef}>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="SelectItemIndicator">
        <CheckIcon />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
});
CustomSelectItem.displayName = "CustomSelectItem";

const StyledSelectItem = styled(CustomSelectItem)`
  font-size: ${cssVariable("fonts.size.xs")};
  border-radius: ${cssVariable("borderRadius.xs")};
  display: flex;
  align-items: center;
  padding: 8px 35px 8px 25px;
  position: relative;
  user-select: none;

  &[data-highlighted] {
    outline: none;
    background-color: ${cssVariable("color.background.black.a3")};
  }
`;

const SelectInput = {
  Root: CustomSelectRoot,
  Item: StyledSelectItem,
};

export { SelectInput };
