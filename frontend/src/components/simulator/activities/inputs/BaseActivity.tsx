import { Accordion } from "src/components/ui";
import { Box } from "src/components/ui/Box";

const BaseActivity = ({
  title,
  description,
  index,
  children,
}: {
  title: string;
  description?: string;
  index: number;
  children: React.ReactNode;
}) => {
  return (
    <Accordion.Item
      title={title}
      value={`activity_${index}`}
      key={`activity_${index}`}
      description={description}
    >
      <Box flex flexDirection="column" padding={{ top: "md" }} gap="lg">
        {children}
      </Box>
    </Accordion.Item>
  );
};

export { BaseActivity };
