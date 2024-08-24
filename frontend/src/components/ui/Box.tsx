import { CSSProperties } from "react";
import styled from "styled-components";
import { BorderRadius, BuildBorderRadiusStyle, BuildPaddingStyle, Padding } from "./utils";

// TODO: Refacto to use Theme

type BoxProps = {
    as?: React.ElementType;
    children: React.ReactNode;
    id?: string;
    flex?: boolean;
    flexDirection?: CSSProperties["flexDirection"];
    justifyContent?: CSSProperties["justifyContent"];
    alignItems?: CSSProperties["alignItems"];
    gap?: "small" | "medium" | "large" | "none";
    padding?: Padding;
    background?: "primary" | "secondary" | "tertiary" | "grey-light" | "grey" | "grey-dark" | "background" | "white";
    borderRadius?: BorderRadius;
} 

const BoxTag = ({
    as = "div",
    children,
    id,
}: Omit<BoxProps, "flex">) => {
    const Tag = as;
    return <Tag id={id}>{children}</Tag>
}

const StyledBox = styled(BoxTag)<{ 
    $flex?: boolean, 
    $flexDirection?: CSSProperties["flexDirection"], 
    $justifyContent?: CSSProperties["justifyContent"],
    $alignItems?: CSSProperties["alignItems"],
    $gap?: CSSProperties["gap"], 
    $padding?: Padding, 
    $background?: BoxProps["background"],
    $borderRadius?: BoxProps["borderRadius"]
    }>`
    ${props => props.as === "ul" && `list-style-type: none; padding: 0; margin: 0;`}
    ${props => props.$flex && `display: flex;`}
    ${props => props.$flexDirection && `flex-direction: ${props.$flexDirection};`}
    ${props => props.$justifyContent && `justify-content: ${props.$justifyContent};`}
    ${props => props.$alignItems && `align-items: ${props.$alignItems};`}
    ${props => props.$gap && `gap: var(--spacing-${props.$gap});`}
    ${props => props.$padding && BuildPaddingStyle(props.$padding)}
    ${props => props.$background && `background-color: var(--color-${props.$background});`}
    ${props => props.$borderRadius && BuildBorderRadiusStyle(props.$borderRadius)}
`;

const Box = ({
    as = "div",
    children,
    id,
    flex,
    flexDirection,
    justifyContent,
    alignItems,
    gap,
    padding,
    borderRadius,
    background,
}: BoxProps) => {
    return <StyledBox 
    as={as} 
    $flex={flex} 
    $flexDirection={flexDirection} 
    $justifyContent={justifyContent}
    $alignItems={alignItems}
    $gap={gap} 
    $padding={padding} 
    $background={background}
    $borderRadius={borderRadius}
    id={id}
    >{children}</StyledBox>
}

export { Box };