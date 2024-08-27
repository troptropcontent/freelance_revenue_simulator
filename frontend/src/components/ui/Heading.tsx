import { CSSProperties } from "react";
import styled from "styled-components";
import { BuildPaddingStyle, Padding } from "./helpers";

type HeadingProps = {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  align?: CSSProperties["textAlign"];
  padding?: Padding;
  id?: string;
};

const HeadingTag = ({ as, children, id }: Omit<HeadingProps, "align">) => {
  const Tag = as;
  return <Tag id={id}>{children}</Tag>;
};

const StyledHeading = styled(HeadingTag)<{
  $align: CSSProperties["textAlign"];
  $padding?: Padding;
}>`
  ${(props) => props.$align && `text-align: ${props.$align};`}
  ${(props) => props.$padding && BuildPaddingStyle(props.$padding)}
`;

const Heading = ({ as, children, align, id, padding }: HeadingProps) => {
  return (
    <StyledHeading as={as} $align={align} $padding={padding} id={id}>
      {children}
    </StyledHeading>
  );
};

export { Heading };
