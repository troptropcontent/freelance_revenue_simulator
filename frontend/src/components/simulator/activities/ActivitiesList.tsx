import { Accordion } from "src/components/ui/Accordion";
import { List } from "src/components/ui/List";
import {
  ActivityKindColors,
  ActivityKinds,
} from "src/components/simulator/constants.ts";
import { EntrepreneurialProject } from "./kinds/EntrepreneurialProject";
import { Freelancing } from "./kinds/Freelancing";
import { UnbilledActivty } from "./kinds/UnbilledActivity";
import { Box } from "src/components/ui/Box";
import { Button } from "src/components/ui/Button";
import { useTranslation } from "react-i18next";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Text } from "src/components/ui/Text";
import { useFormikContext } from "formik";
import { FormValues } from "src/App";
import { useContext } from "react";
import { useFormInitialValues } from "src/shared/hooks";

const ActivityKindComponents: Record<
  (typeof ActivityKinds)[number],
  {
    component: React.FC<{
      color: React.ComponentProps<typeof Box>["background"];
    }>;
    background: React.ComponentProps<typeof Box>["background"];
  }
> = {
  entrepreneurial_project: {
    component: EntrepreneurialProject,
    background: ActivityKindColors["entrepreneurial_project"],
  },
  freelancing: {
    component: Freelancing,
    background: ActivityKindColors["freelancing"],
  },
  unbilled_activity: {
    component: UnbilledActivty,
    background: ActivityKindColors["unbilled_activity"],
  },
};

const ResetButton = () => {
  const { t } = useTranslation();
  const { setValues } = useFormikContext<FormValues>();
  const initial_values = useFormInitialValues();
  const accordionContext = useContext(Accordion.Context);

  const resetAccordionAndFormValues = () => {
    if (accordionContext != null) {
      accordionContext.resetValue();
    }
    setValues(initial_values);
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
        <List.Item
          flex
          flexDirection="row"
          justifyContent="center"
          alignItems="flex-end"
          grow
        >
          <ResetButton />
        </List.Item>
      </List.Root>
    </Accordion.Root>
  );
};

export { ActivitiesList };
