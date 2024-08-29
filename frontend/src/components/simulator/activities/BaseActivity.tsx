import { FormValues } from "src/App";
import { Accordion } from "src/components/ui";
import { Box } from "src/components/ui/Box";

const BaseActivity = ({
  title,
  identifier,
  children,
}: {
  title: string;
  identifier: keyof FormValues;
  children: React.ReactNode;
}) => {
  return (
    <Accordion.Item title={title} value={identifier} key={identifier}>
      <Box flex flexDirection="column" padding="md" gap="lg">
        {children}
      </Box>
    </Accordion.Item>
  );
};

export { BaseActivity };
