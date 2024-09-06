import { Heading } from "src/components/ui/Heading";
import { Text } from "src/components/ui/Text";
import styled from "styled-components";
import { cssVariable } from "../helper";

interface EmptyStateProps {
  title: string;
  description: string;
}

const StyledEmptyState = styled.div`
  display: none;
  &:only-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${() => cssVariable("spacing.md")};
    padding: ${() => cssVariable("spacing.lg")};
    flex-grow: 1;

    text-align: center;
  }
`;

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <StyledEmptyState>
      <Heading as="h2">{title}</Heading>
      <Text>{description}</Text>
    </StyledEmptyState>
  );
};

export default EmptyState;
