import { FormValues } from "src/App";
import { Accordion } from "src/components/ui";
import { Box } from "src/components/ui/Box";

const BaseActivity = ({
  title,
  description,
  identifier,
  children,
}: {
  title: string;
  description?: string;
  identifier: keyof FormValues["activities"] | "general_informations";
  children: React.ReactNode;
}) => {
  return (
    <Accordion.Item
      title={title}
      value={identifier}
      key={identifier}
      description={description}
    >
      <Box flex flexDirection="column" padding="md" gap="lg">
        {children}
      </Box>
    </Accordion.Item>
  );
};

export { BaseActivity };
