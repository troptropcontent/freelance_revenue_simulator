import * as RadixTooltip from "@radix-ui/react-tooltip";
import { forwardRef, ReactNode } from "react";
import styled from "styled-components";
import { createPaddingStyle, cssVariable } from "../helper";

const Root = ({ children }: { children: ReactNode }) => {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={200}>{children}</RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

const Trigger = forwardRef<
  React.ElementRef<typeof RadixTooltip.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixTooltip.Trigger>
>((props, forwardedRef) => {
  return <RadixTooltip.Trigger {...props} asChild ref={forwardedRef} />;
});
Trigger.displayName = "Trigger";

const StyledTrigger = styled(Trigger)`
  all: unset;
`;

const TooltipArrow = forwardRef<
  React.ElementRef<typeof RadixTooltip.Arrow>,
  React.ComponentPropsWithoutRef<typeof RadixTooltip.Arrow>
>((props, forwardedRef) => {
  return <RadixTooltip.Arrow {...props} ref={forwardedRef} />;
});
Trigger.displayName = "TooltipArrow";

const StyledTooltipArrow = styled(TooltipArrow)`
  fill: white;
`;

const TooltipContent = forwardRef<
  React.ElementRef<typeof RadixTooltip.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTooltip.Content>
>((props, forwardedRef) => {
  return <RadixTooltip.Content {...props} ref={forwardedRef} />;
});
Trigger.displayName = "TooltipContent";

const StyledTooltipContent = styled(TooltipContent)`
  z-index: 9999;
  border-radius: ${cssVariable("borderRadius.sm")};
  ${createPaddingStyle("md")}
  font-size: ${cssVariable("fonts.size.xs")};
  line-height: 1;
  background-color: ${cssVariable("color.background.white")};
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  user-select: none;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  &[data-state="delayed-open"][data-side="top"] {
    animation-name: slideDownAndFade;
  }
  &[data-state="delayed-open"][data-side="right"] {
    animation-name: slideLeftAndFade;
  }
  &[data-state="delayed-open"][data-side="bottom"] {
    animation-name: slideUpAndFade;
  }
  &[data-state="delayed-open"][data-side="left"] {
    animation-name: slideRightAndFade;
  }

  @keyframes slideUpAndFade {
    from {
      opacity: 0;
      transform: translateY(2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideRightAndFade {
    from {
      opacity: 0;
      transform: translateX(-2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideDownAndFade {
    from {
      opacity: 0;
      transform: translateY(-2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideLeftAndFade {
    from {
      opacity: 0;
      transform: translateX(2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const Content = ({ children }: { children: ReactNode }) => {
  return (
    <RadixTooltip.Portal>
      <StyledTooltipContent>
        {children}
        <StyledTooltipArrow />
      </StyledTooltipContent>
    </RadixTooltip.Portal>
  );
};

const Tooltip = {
  Root,
  Trigger: StyledTrigger,
  Content,
};

export { Tooltip };
