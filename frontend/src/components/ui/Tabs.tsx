import { forwardRef } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import styled from "styled-components";
import { cssVariable } from "../helper";

const StyledList = styled(TabsPrimitive.List)`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${() => cssVariable("color.border.brand.dark")};
`;

const List = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ children, ...props }, forwardedRef) => {
  return (
    <StyledList {...props} ref={forwardedRef}>
      {children}
    </StyledList>
  );
});

const StyledTrigger = styled(TabsPrimitive.Trigger)`
  all: unset;

  font-family: inherit;
  background-color: ${() => cssVariable("color.background.white")};
  padding-block: ${() => cssVariable("spacing.md")};
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  flex-grow: 1;

  &:first-child {
    border-top-left-radius: ${() => cssVariable("borderRadius.md")};
  }

  &:last-child {
    border-top-right-radius: ${() => cssVariable("borderRadius.md")};
  }

  &:hover {
    color: ${() => cssVariable("color.background.brand.dark")};
  }

  &[data-state="active"] {
    color: ${() => cssVariable("color.background.brand.dark")};
    box-shadow:
      inset 0 -1px 0 0 currentColor,
      0 1px 0 0 currentColor;
  }

  &:focus {
    position: relative;
    box-shadow: 0 0 0 2px ${() => cssVariable("color.border.brand.dark")};
  }
`;

const Trigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ children, ...props }, forwardedRef) => {
  return (
    <StyledTrigger {...props} ref={forwardedRef} className="TabsTrigger">
      {children}
    </StyledTrigger>
  );
});

const StyledRoot = styled(TabsPrimitive.Root)`
  display: flex;
  flex-direction: column;
`;

const Root = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ children, ...props }, forwardedRef) => {
  return (
    <StyledRoot {...props} ref={forwardedRef}>
      <TabsPrimitive.List
        className="TabsList"
        aria-label="Manage your account"
        id="tabs-list"
      ></TabsPrimitive.List>
      {children}
    </StyledRoot>
  );
});

const StyledContent = styled(TabsPrimitive.Content)`
  flex-grow: 1;
  padding: 20px;
  background-color: white;
  border-bottom-left-radius: ${() => cssVariable("borderRadius.md")};
  border-bottom-right-radius: ${() => cssVariable("borderRadius.md")};
  outline: none;
`;

const Content = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ children, ...props }, forwardedRef) => {
  return (
    <StyledContent {...props} ref={forwardedRef}>
      {children}
    </StyledContent>
  );
});

const Tabs = {
  Root,
  Content,
  Trigger,
  List,
};

export { Tabs };
