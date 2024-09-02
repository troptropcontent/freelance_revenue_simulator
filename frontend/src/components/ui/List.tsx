import { Box } from "src/components/ui/Box";

type RootProps = Omit<
  React.ComponentProps<typeof Box>,
  "as" | "flex" | "flexDirection"
>;

const Root = (props: RootProps) => {
  return <Box as="ul" flex flexDirection="column" {...props} />;
};

type ItemProps = Omit<React.ComponentProps<typeof Box>, "as">;
const Item = (props: ItemProps) => {
  return <Box as="li" {...props} />;
};

const List = {
  Root,
  Item,
};

export { List };
