import React, { useState } from "react";
import * as PrimitiveDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import styled from "styled-components";
import { cssVariable } from "../helper";
import { Box } from "./Box";
import { Text } from "./Text";
import { Button } from "./Button";

const DialogOverlay = styled(PrimitiveDialog.Overlay)`
  background-color: ${() =>
    `rgba(${cssVariable("color.background.black")}, 0.6)`};
  position: fixed;
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: ${() => cssVariable("spacing.lg")};
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  display: grid;
  grid-template-areas:
    "title close"
    "description description"
    "content content";

  gap: ${() => cssVariable("spacing.xs")};

  & .DialogContent {
    grid-area: content;
  }

  & .DialogTitle {
    grid-area: title;
  }

  & .DialogDescription {
    grid-area: description;
    margin-block-end: ${() => cssVariable("spacing.sm")};
  }

  & .DialogClose {
    grid-area: close;
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
      <PrimitiveDialog.Trigger asChild>{trigger}</PrimitiveDialog.Trigger>
      <PrimitiveDialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <PrimitiveDialog.Title className="DialogTitle">
            {title}
          </PrimitiveDialog.Title>
          <PrimitiveDialog.Close asChild>
            <Button color="grey" className="DialogClose">
              <Cross2Icon />
            </Button>
          </PrimitiveDialog.Close>
          <Text size="xs" className="DialogDescription">
            {description}
          </Text>
          <Box className="DialogContent">{children({ setOpen })}</Box>
        </DialogContent>
      </PrimitiveDialog.Portal>
    </PrimitiveDialog.Root>
  );
};

export { Dialog };
