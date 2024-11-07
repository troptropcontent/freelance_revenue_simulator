import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  createContext,
  forwardRef,
  ReactNode,
  useContext,
  useState,
} from "react";
import styled from "styled-components";
import { createPaddingStyle, cssVariable, Spacing } from "../helper";
import { Box } from "./Box";
import Switch from "./Switch";
import { Separator } from "./Separator";

type AccordionContextType = React.ComponentProps<
  typeof AccordionPrimitive.Root
> & {
  setValue: (
    newValue: React.ComponentProps<typeof AccordionPrimitive.Root>["value"],
  ) => void;
  resetValue: () => void;
};

const AccordionContext = createContext<AccordionContextType | null>(null);

const AccordionRoot = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
    gap?: Spacing;
    grow?: boolean;
  }
>(({ value: value_props, ...props }, forwardedRef) => {
  const [value, setValue] =
    useState<React.ComponentProps<typeof AccordionPrimitive.Root>["value"]>(
      value_props,
    );

  const resetValue = () => {
    if (props.type == "single") {
      return setValue(undefined);
    }
    return setValue([]);
  };

  return (
    <AccordionContext.Provider
      // @ts-expect-error The props are the same with a basic AccordionPrimitive.Root
      value={{ ...props, value, setValue, resetValue }}
    >
      {/* @ts-expect-error The props are the same with a basic AccordionPrimitive.Root */}
      <AccordionPrimitive.Root {...props} value={value} ref={forwardedRef} />
    </AccordionContext.Provider>
  );
});
AccordionRoot.displayName = "AccordionRoot";

const StyledRoot = styled(AccordionRoot)`
  & h3 {
    all: unset;
  }

  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap && cssVariable(`spacing.${gap}`)};
  ${({ grow }) => grow && "flex-grow: 1;"}

  .AccordionItem {
    border-radius: ${() => cssVariable("borderRadius.sm")};
    background-color: ${() => cssVariable("color.background.white")};
    ${createPaddingStyle({ inline: 20, top: 15, bottom: 18 })}

    overflow: hidden;

    &:focus-within {
      position: relative;
      z-index: 1;
    }
  }
  .AccordionHeader {
    display: flex;
  }

  .AccordionTrigger {
    all: unset;
  }

  .AccordionContent {
    background-color: ${() => cssVariable("color.background.white")};
  }

  .AccordionContent[data-state="open"] {
    animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }

  .AccordionContent[data-state="closed"] {
    animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }

  @keyframes slideDown {
    from {
      height: 0;
    }
    to {
      height: var(--radix-accordion-content-height);
    }
  }

  @keyframes slideUp {
    from {
      height: var(--radix-accordion-content-height);
    }
    to {
      height: 0;
    }
  }
`;

type AccordionItemProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
> & {
  title: ReactNode;
  onStateChange?: (newState: "open" | "closed") => void;
};

const AccordionItem = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ title, onStateChange, ...props }, forwardedRef) => {
  const accordionContext = useContext(AccordionContext);
  if (accordionContext == null) {
    throw new Error("AccordionItem must be used within a AccordionRoot");
  }

  const handleAddValue = (value: string) => {
    if (accordionContext.type == "single") {
      accordionContext.setValue(value);
    } else {
      accordionContext.setValue(
        accordionContext.value ? [...accordionContext.value, value] : [value],
      );
    }
    if (onStateChange) {
      onStateChange("open");
    }
  };

  const handleRemoveValue = (value: string) => {
    if (accordionContext.type == "single") {
      accordionContext.setValue(undefined);
    } else {
      accordionContext.setValue(
        accordionContext.value
          ? accordionContext.value.filter((identifier) => identifier != value)
          : [],
      );
    }

    if (onStateChange) {
      onStateChange("closed");
    }
  };

  const isItemChecked = () => {
    if (accordionContext.type == "single") {
      return accordionContext.value == props.value;
    } else {
      return accordionContext.value
        ? accordionContext.value.includes(props.value)
        : false;
    }
  };

  return (
    <AccordionPrimitive.Item
      {...props}
      ref={forwardedRef}
      className="AccordionItem"
    >
      <AccordionPrimitive.Header className="AccordionHeader">
        <Box
          flex
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          gap="sm"
          grow
        >
          {title}
        </Box>
        <Switch
          checked={isItemChecked()}
          onCheckedChange={(checked) => {
            if (checked) {
              handleAddValue(props.value);
            } else {
              handleRemoveValue(props.value);
            }
          }}
        />
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="AccordionContent">
        <Separator margin={{ top: 15 }} color="grey.light" />
        {props.children}
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
});
AccordionItem.displayName = "AccordionItem";

const Accordion = {
  Root: StyledRoot,
  Item: AccordionItem,
  Context: AccordionContext,
};

export { Accordion };
