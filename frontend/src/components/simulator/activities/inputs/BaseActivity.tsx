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
  identifier: string;
  children: React.ReactNode;
}) => {
  return (
    <Accordion.Item
      title={title}
      value={identifier}
      key={identifier}
      description={description}
    >
      <Box flex flexDirection="column" padding={{ top: "md" }} gap="lg">
        {children}
      </Box>
    </Accordion.Item>
  );
};

export { BaseActivity };
