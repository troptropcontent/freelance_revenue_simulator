import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { forwardRef } from "react";
import styled, { CSSProperties } from "styled-components";
import { cssVariable, Spacing } from "../helper";

const CustomCollapsibleRoot = forwardRef<
  React.ElementRef<typeof RadixCollapsible.Root>,
  React.ComponentPropsWithoutRef<typeof RadixCollapsible.Root>
>((props, forwardedRef) => (
  <RadixCollapsible.Root {...props} ref={forwardedRef} />
));
CustomCollapsibleRoot.displayName = "CustomCollapsibleRoot";

const StyledCollapsibleRoot = styled(CustomCollapsibleRoot)`
  display: flex;
  flex-direction: column;
`;

const CustomCollapsibleTrigger = forwardRef<
  React.ElementRef<typeof RadixCollapsible.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixCollapsible.Trigger>
>((props, forwardedRef) => (
  <RadixCollapsible.Trigger {...props} ref={forwardedRef} />
));
CustomCollapsibleTrigger.displayName = "CustomCollapsibleTrigger";

const StyledCollapsibleTrigger = styled(CustomCollapsibleTrigger)`
  all: unset;
  cursor: pointer;
`;

const CustomCollapsibleContent = forwardRef<
  React.ElementRef<typeof RadixCollapsible.Content>,
  React.ComponentPropsWithoutRef<typeof RadixCollapsible.Content>
>((props, forwardedRef) => (
  <RadixCollapsible.Content {...props} ref={forwardedRef} />
));
CustomCollapsibleContent.displayName = "CustomCollapsibleContent";

const StyledCollapsibleContent = styled(CustomCollapsibleContent)<{
  $display?: CSSProperties["display"];
  $flexDirection?: CSSProperties["flexDirection"];
  $gap?: Spacing | number;
}>`
  ${({ $display }) => $display && `display: ${$display}`};
  ${({ $flexDirection }) =>
    $flexDirection && `flex-direction: ${$flexDirection}`};
  ${({ $gap }) =>
    $gap &&
    `gap: ${typeof $gap == "string" ? cssVariable(`spacing.${$gap}`) : `${$gap}px`};`}
`;

const Collapsible = {
  Root: StyledCollapsibleRoot,
  Trigger: StyledCollapsibleTrigger,
  Content: StyledCollapsibleContent,
};

export { Collapsible };
