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
import { useFormik, useFormikContext } from "formik";
import { FormValues } from "src/App";
import { useContext } from "react";
import { useFormInitialValues } from "src/shared/hooks";
import { Dialog } from "src/components/ui/Dialog";
import { Range } from "src/components/ui/formik/Range";

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

const ConfigModalContent = () => {
  return (
    <Box flex flexDirection="column" gap="lg">
      <Range
        name={`config.number_of_days_worked_per_week`}
        label={"Jours ouvrés (travaillés) par semaine"}
        min={0}
        max={7}
        step={1}
      />
      <Range
        name={`config.weeks_off`}
        label={"Semaines de vacances par an"}
        min={0}
        max={10}
        step={0.5}
      />
      <Text style="footer" align="center">
        Les calculs du simulateur sont basés sur des journées de 7 heures
        travaillées. Cette donnée n’est pas modifiable.
      </Text>
    </Box>
  );
};

const ActivitiesList = () => {
  return (
    <Accordion.Root type="multiple" asChild>
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
        <List.Item flex flexDirection="column" justifyContent="center" grow>
          <ResetButton />
          <Dialog
            title="Ajuster les paramètres"
            description="Tu peux ajuster les paramètres tels que tes jours ouvrés par semaine et les vacances que tu souhaites prendre par an."
            trigger={
              <Text weight="bolder" align="center">
                <u>Ajuster les paramètres</u>
              </Text>
            }
          >
            {() => <ConfigModalContent />}
          </Dialog>
        </List.Item>
      </List.Root>
    </Accordion.Root>
  );
};

export { ActivitiesList };
