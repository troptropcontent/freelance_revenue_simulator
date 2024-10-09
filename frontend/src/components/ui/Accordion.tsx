import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  createContext,
  Dispatch,
  forwardRef,
  SetStateAction,
  useContext,
  useState,
} from "react";
import styled from "styled-components";
import { cssVariable, Spacing } from "../helper";
import { Text } from "./Text";
import { Box } from "./Box";
import Switch from "./Switch";
import { Separator } from "./Separator";

const AccordionContext = createContext<{
  setValue: Dispatch<SetStateAction<string[]>>;
  value: string[];
} | null>(null);

const AccordionRoot = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
    gap?: Spacing;
    grow?: boolean;
  }
>((props, forwardedRef) => {
  const [value, setValue] = useState<string[]>([]);

  return (
    <AccordionContext.Provider value={{ setValue, value }}>
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
>((props, forwardedRef) => {
  const accordionContext = useContext(AccordionContext);
  if (accordionContext == null) {
    throw new Error("AccordionItem must be used within a AccordionRoot");
  }
  return (
    <AccordionPrimitive.Item
      {...props}
      ref={forwardedRef}
      className="AccordionItem"
    >
      <AccordionPrimitive.Header className="AccordionHeader">
        <Box flex flexDirection="column" justifyContent="center" gap="sm" grow>
          <Text>{props.title}</Text>
          {props.description && (
            <Text size="xs" color="muted.dark">
              {props.description}
            </Text>
          )}
        </Box>
        <Switch
          onCheckedChange={(checked) => {
            if (checked) {
              accordionContext.setValue([
                ...accordionContext.value,
                props.value,
              ]);
            } else {
              accordionContext.setValue(
                accordionContext.value.filter(
                  (identifier) => identifier != props.value,
                ),
              );
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
