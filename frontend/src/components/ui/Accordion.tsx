import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { createContext, forwardRef, useContext, useState } from "react";
import styled from "styled-components";
import { cssVariable, Spacing } from "../helper";
import { Text } from "./Text";
import { Box } from "./Box";
import Switch from "./Switch";
import { Separator } from "./Separator";
import { Tooltip } from "./Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

type AccordionContextType = React.ComponentProps<
  typeof AccordionPrimitive.Root
> & {
  setValue: (
    newValue: React.ComponentProps<typeof AccordionPrimitive.Root>["value"],
  ) => void;
};

const AccordionContext = createContext<AccordionContextType | null>(null);

const AccordionRoot = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
    gap?: Spacing;
    grow?: boolean;
  }
>((props, forwardedRef) => {
  const [value, setValue] = useState<
    React.ComponentProps<typeof AccordionPrimitive.Root>["value"]
  >(props.value);

  return (
    <AccordionContext.Provider value={{ ...props, value: value, setValue }}>
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
    padding: ${() => cssVariable("spacing.md")};

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

const AccordionItem = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
    description?: string;
  }
>(({ title, description, ...props }, forwardedRef) => {
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
          <Text>{title}</Text>
          {description && (
            <Tooltip.Root>
              <Tooltip.Trigger>
                <HelpOutlineIcon color="disabled" fontSize="small" />
              </Tooltip.Trigger>
              <Tooltip.Content>{description}</Tooltip.Content>
            </Tooltip.Root>
          )}
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
        <Separator margin={{ top: "sm" }} color="grey.light" />
        {props.children}
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
});
AccordionItem.displayName = "AccordionItem";

const Accordion = {
  Root: StyledRoot,
  Item: AccordionItem,
};

export { Accordion };
