import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { forwardRef } from "react";
import styled from "styled-components";
import { cssVariable, Spacing } from "../helper";
import { Text } from "./Text";
import { Box } from "./Box";

const AccordionRoot = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
    gap?: Spacing;
  }
>((props, forwardedRef) => (
  <AccordionPrimitive.Root {...props} ref={forwardedRef} />
));
AccordionRoot.displayName = "AccordionRoot";

const StyledRoot = styled(AccordionRoot)`
  button,
  h3 {
    all: unset;
  }

  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap && cssVariable(`spacing.${gap}`)};

  .AccordionItem {
    border-radius: ${() => cssVariable("borderRadius.md")};

    overflow: hidden;
    margin-top: 1px;

    &:focus-within {
      position: relative;
      z-index: 1;
      box-shadow: 0 0 0 2px ${() => cssVariable("color.border.brand.medium")};
    }
  }
  .AccordionHeader {
    display: flex;
  }

  .AccordionTrigger {
    font-family: inherit;
    background-color: transparent;
    padding: 0 20px;
    height: 45px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    line-height: 1;
    color: var(--violet-11);
    box-shadow: 0 1px 0 ${() => cssVariable("color.background.grey.dark")};
    background-color: white;
    padding: ${() => cssVariable("spacing.md")};

    &:hover {
      background-color: ${() => cssVariable("color.background.brand.light")};
    }

    & > svg {
      transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
    }

    &[data-state="open"] > svg {
      transform: rotate(180deg);
    }
  }

  .AccordionContent {
    overflow: hidden;
    font-size: 15px;
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
>((props, forwardedRef) => (
  <AccordionPrimitive.Item
    {...props}
    ref={forwardedRef}
    className="AccordionItem"
  >
    <AccordionPrimitive.Header className="AccordionHeader">
      <AccordionPrimitive.Trigger className="AccordionTrigger">
        <Box flex flexDirection="column" gap="sm">
          <Text>{props.title}</Text>
          {props.description && (
            <Text size="xs" color="muted.dark">
              {props.description}
            </Text>
          )}
        </Box>
        <ChevronDownIcon aria-hidden />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
    <AccordionPrimitive.Content className="AccordionContent">
      {props.children}
    </AccordionPrimitive.Content>
  </AccordionPrimitive.Item>
));
AccordionItem.displayName = "AccordionItem";

const Accordion = {
  Root: StyledRoot,
  Item: AccordionItem,
};

export { Accordion };
