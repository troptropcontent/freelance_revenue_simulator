import { Box } from "./Box";

const Root = (
  props: Omit<Parameters<typeof Box>[0], "as" | "flex" | "flexDirection">,
) => {
  return <Box as="ul" flex flexDirection="column" {...props} />;
};

const Item = (props: Omit<Parameters<typeof Box>[0], "as">) => {
  return <Box as="li" {...props} />;
};

const List = {
  Root,
  Item,
};

export { List };
