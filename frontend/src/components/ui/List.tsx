import { Box } from "src/components/ui/Box";
import EmptyState from "./EmptyState";

type RootProps = Omit<
  React.ComponentPropsWithoutRef<typeof Box>,
  "as" | "flex" | "flexDirection"
> & {
  emptyState?: React.ComponentProps<typeof EmptyState>;
};

const Root = (props: RootProps) => {
  const { children, emptyState, ...rest } = props;
  return (
    <Box as="ul" flex flexDirection="column" {...rest}>
      {children}
      {emptyState && <EmptyState {...emptyState} />}
    </Box>
  );
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
