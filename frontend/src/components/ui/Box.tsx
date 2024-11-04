import React, { CSSProperties } from "react";
import styled from "styled-components";
import {
  BackgroundColor,
  Border,
  BorderRadius,
  createBorderRadiusStyle,
  createPaddingStyle,
  cssVariable,
  Padding,
  Spacing,
} from "../helper";

type BoxProps = {
  as?: "div" | "span" | "ul" | "ol" | "li";
  children: React.ReactNode;
  flex?: boolean;
  flexDirection?: CSSProperties["flexDirection"];
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  gap?: Spacing | number;
  padding?: Padding;
  background?: BackgroundColor;
  borderRadius?: BorderRadius;
  grow?: boolean;
  height?: string | number;
  border?: Border;
  width?: number | { min?: number; max?: number };
  flexWrap?: CSSProperties["flexWrap"];
};

const BoxTag = ({
  as = "div",
  children,
  id,
}: {
  as?: NonNullable<BoxProps["as"]>;
  children: React.ReactNode;
  id?: string;
}) => {
  const Tag = as;
  return <Tag id={id}>{children}</Tag>;
};

const StyledBox = styled(BoxTag)<{
  $flex?: boolean;
  $flexDirection?: CSSProperties["flexDirection"];
  $justifyContent?: CSSProperties["justifyContent"];
  $alignItems?: CSSProperties["alignItems"];
  $gap?: React.ComponentProps<typeof Box>["gap"];
  $padding?: Padding;
  $background?: BoxProps["background"];
  $borderRadius?: BoxProps["borderRadius"];
  $grow?: boolean;
  $height?: string | number;
  $border?: Border;
  $width?: React.ComponentProps<typeof Box>["width"];
  $flexWrap?: CSSProperties["flexWrap"];
}>`
  ${(props) =>
    props.as === "ul" && `list-style-type: none; padding: 0; margin: 0;`}
  ${(props) => props.$flex && `display: flex;`}
    ${(props) =>
    props.$flexDirection && `flex-direction: ${props.$flexDirection};`}
    ${(props) =>
    props.$justifyContent && `justify-content: ${props.$justifyContent};`}
    ${(props) => props.$alignItems && `align-items: ${props.$alignItems};`}
    ${({ $gap }) =>
    $gap &&
    `gap: ${typeof $gap == "string" ? cssVariable(`spacing.${$gap}`) : `${$gap}px`};`}
    ${(props) => props.$padding && createPaddingStyle(props.$padding)}
    ${(props) =>
    props.$background &&
    `background-color: ${cssVariable(`color.background.${props.$background}`)};`}
    ${(props) =>
    props.$borderRadius && createBorderRadiusStyle(props.$borderRadius)}
    ${(props) => props.$grow && `flex-grow: 1;`}
    ${(props) =>
    props.$height &&
    `height: ${typeof props.$height === "number" ? `${props.$height}px` : props.$height};`}
    ${(props) =>
    props.$border &&
    `border: ${cssVariable(`color.border.${props.$border.color}`)} solid ${cssVariable(`border.${props.$border.size}`)};`}
    ${({ $width }) => {
    if ($width == undefined) {
      return;
    }

    if (typeof $width == "object") {
      return Object.entries($width).map(
        ([key, value]) => `${key}-width: ${value}px;`,
      );
    }

    return `width: ${$width}px;`;
  }}
  
  ${(props) => props.$flexWrap && `flex-wrap: ${props.$flexWrap};`}
`;

const Box = ({
  as = "div",
  children,
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  gap,
  padding,
  borderRadius,
  background,
  grow,
  height,
  border,
  width,
  flexWrap,
  ...props
}: BoxProps & React.ComponentProps<NonNullable<BoxProps["as"]>>) => {
  return (
    <StyledBox
      as={as}
      $flex={flex}
      $flexDirection={flexDirection}
      $justifyContent={justifyContent}
      $alignItems={alignItems}
      $gap={gap}
      $padding={padding}
      $background={background}
      $borderRadius={borderRadius}
      $grow={grow}
      $height={height}
      $border={border}
      $width={width}
      $flexWrap={flexWrap}
      {...props}
    >
      {children}
    </StyledBox>
  );
};

export { Box };
