import React, { forwardRef, useState } from "react";
import * as PrimitiveDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import styled from "styled-components";
import { createPaddingStyle, cssVariable } from "../helper";
import { Box } from "./Box";
import { Text } from "./Text";
import { Button } from "./Button";
import { Separator } from "./Separator";

const DialogOverlay = styled(PrimitiveDialog.Overlay)`
  background-color: ${cssVariable("color.background.black.a5")};
  position: fixed;
  z-index: 999999998;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const DialogContent = styled(PrimitiveDialog.Content)`
  background-color: ${() => cssVariable("color.background.white")};
  border-radius: ${() => cssVariable("borderRadius.md")};
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  z-index: 999999999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;

  gap: ${() => cssVariable("spacing.xs")};

  & .DialogDescription {
    margin-block-end: ${() => cssVariable("spacing.sm")};
  }

  & .DialogClose {
    ${createPaddingStyle("md")}
    position: absolute;
    right: 0;
    top: 0;
    width: fit-content;
    margin-inline-start: auto;
  }

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  &:focus {
    outline: none;
  }
`;

const CustomTrigger = forwardRef<
  React.ElementRef<typeof PrimitiveDialog.Trigger>,
  React.ComponentPropsWithoutRef<typeof PrimitiveDialog.Trigger>
>((props, forwardedRef) => (
  <PrimitiveDialog.Trigger {...props} ref={forwardedRef} />
));

const StyledTrigger = styled(CustomTrigger)`
  all: unset;
`;

type DialogChildrenProps = {
  setOpen: (open: boolean) => void;
};
type DialogProps = {
  children: (props: DialogChildrenProps) => React.ReactNode;
  trigger: React.ReactNode;
  title: string;
  description: string;
};
const Dialog = ({ children, trigger, title, description }: DialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <PrimitiveDialog.Root open={open} onOpenChange={setOpen}>
      <StyledTrigger>{trigger}</StyledTrigger>
      <PrimitiveDialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <PrimitiveDialog.Close asChild>
            <Button
              color="transparent"
              className="DialogClose"
              onClick={() => setOpen(false)}
            >
              <Cross2Icon />
            </Button>
          </PrimitiveDialog.Close>
          <Box padding="lg" flex flexDirection="column" gap={"sm"}>
            <PrimitiveDialog.Title className="DialogTitle">
              <Text style={"title_2"} align="center">
                {title}
              </Text>
            </PrimitiveDialog.Title>
            <Text className="DialogDescription" align="center">
              {description}
            </Text>
            <Box className="DialogContent">
              <Separator
                color="neutral.dark"
                margin={{ inline: "md", bottom: "md" }}
              />
              {children({ setOpen })}
            </Box>
          </Box>
        </DialogContent>
      </PrimitiveDialog.Portal>
    </PrimitiveDialog.Root>
  );
};

export { Dialog };
