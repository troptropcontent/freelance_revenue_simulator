import { ReactNode } from "react";
import { Box } from "src/components/ui/Box";
import { Heading } from "src/components/ui/Heading";
import { List } from "src/components/ui/List";
import { Text } from "src/components/ui/Text";
import { ActivityKindEmoji, ActivityKinds } from "../../constants";

const BaseKind = ({
  kind,
  title,
  description,
  color,
  children,
}: {
  kind: (typeof ActivityKinds)[number];
  title: string;
  description: string;
  color: React.ComponentProps<typeof Box>["background"];
  children: ReactNode;
}) => {
  return (
    <List.Item
      key={kind}
      borderRadius="md"
      background={color}
      padding={{ block: "md", inline: "sm" }}
      flex
      flexDirection="column"
      gap="md"
    >
      <Box flex flexDirection="column" gap="sm">
        <Text style="title_2">
          {ActivityKindEmoji[kind]}
          {title}
        </Text>
        <Text align="center">{description}</Text>
      </Box>
      {children}
    </List.Item>
  );
};

export { BaseKind };
