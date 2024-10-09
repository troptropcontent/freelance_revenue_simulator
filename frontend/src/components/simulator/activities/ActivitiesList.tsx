import { Accordion } from "src/components/ui/Accordion";
import { List } from "src/components/ui/List";
import { ActivityKinds } from "src/components/simulator/constants.ts";
import { EntrepreneurialProject } from "./kinds/EntrepreneurialProject";
import { Freelancing } from "./kinds/Freelancing";
import { UnbilledActivty } from "./kinds/UnbilledActivity";
import { Box } from "src/components/ui/Box";

const ActivityKindComponents: Record<
  (typeof ActivityKinds)[number],
  {
    component: React.FC<{
      color: React.ComponentProps<typeof Box>["background"];
    }>;
    background: React.ComponentProps<typeof Box>["background"];
  }
> = {
  entrepeunarial_project: {
    component: EntrepreneurialProject,
    background: "green.medium",
  },
  freelancing: {
    component: Freelancing,
    background: "blue.medium",
  },
  unbilled_activity: {
    component: UnbilledActivty,
    background: "yellow.medium",
  },
};

const ActivitiesList = () => {
  console.log("toto");
  return (
    <Accordion.Root type="multiple" grow>
      <List.Root grow gap="sm">
        {ActivityKinds.map((activity_kind) => {
          const ActivityComponent =
            ActivityKindComponents[activity_kind].component;

          return (
            <ActivityComponent
              color={ActivityKindComponents[activity_kind].background}
              key={activity_kind}
            />
          );
        })}
      </List.Root>
    </Accordion.Root>
  );
};

export { ActivitiesList };
