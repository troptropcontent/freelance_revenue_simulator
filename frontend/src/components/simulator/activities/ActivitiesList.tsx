import { Accordion } from "src/components/ui/Accordion";
import { List } from "src/components/ui/List";
import { ActivityKinds } from "src/components/simulator/constants.ts";
import { EntrepreneurialProject } from "./kinds/EntrepreneurialProject";
import { Freelancing } from "./kinds/Freelancing";
import { UnbilledActivty } from "./kinds/UnbilledActivity";
import { Box } from "src/components/ui/Box";
import { Button } from "src/components/ui/Button";
import { useTranslation } from "react-i18next";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Text } from "src/components/ui/Text";
import { useFormikContext } from "formik";
import { FormValues, InitialValues } from "src/App";
import { useContext } from "react";

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

const ResetButton = () => {
  const { t } = useTranslation();
  const { setValues } = useFormikContext<FormValues>();
  const accordionContext = useContext(Accordion.Context);

  const resetAccordionAndFormValues = () => {
    if (accordionContext != null) {
      accordionContext.resetValue();
    }
    setValues(InitialValues);
  };
  return (
    <Button color="transparent" onClick={resetAccordionAndFormValues}>
      <RefreshIcon fontSize="small" />
      <Text>{t("simulator.activities.reset")}</Text>
    </Button>
  );
};

const ActivitiesList = () => {
  return (
    <Accordion.Root type="multiple">
      <List.Root
        grow
        gap="sm"
        border={{ color: "neutral.medium", size: "sm" }}
        borderRadius={{ bottomLeft: "md", topLeft: "md" }}
        padding="md"
      >
        {ActivityKinds.map((activity_kind, index) => {
          const ActivityComponent =
            ActivityKindComponents[activity_kind].component;

          return (
            <ActivityComponent
              color={ActivityKindComponents[activity_kind].background}
              key={`kind_${index}`}
            />
          );
        })}
        <List.Item flex flexDirection="row" justifyContent="center">
          <ResetButton />
        </List.Item>
      </List.Root>
    </Accordion.Root>
  );
};

export { ActivitiesList };