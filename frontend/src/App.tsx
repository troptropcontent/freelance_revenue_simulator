import { Formik } from "formik";
import { Activities, ActivitiesType } from "./components/simulator/constants";
import { useTranslation } from "react-i18next";
import { useFormInitialValues } from "./shared/hooks";
import { Button } from "./components/ui/Button";
import { InputTabs } from "./components/simulator/inputs/InputTabs";

export type ActivityTypes = keyof typeof Activities;

export type FormValues = {
  activities: {
    [ActivityType in ActivityTypes]: {
      enabled: boolean;
      name?: string;
    } & {
      type: `${ActivityType}`;
      values?: ActivitiesType[ActivityType]["initial_values"];
    };
  }[keyof typeof Activities][];
  config: {
    number_of_days_off_per_year: number;
    number_of_days_worked_per_week: number;
    number_of_hours_worked_per_day: number;
  };
};

function App() {
  const { t } = useTranslation();
  const initial_values = useFormInitialValues();

  return (
    <Formik
      initialValues={initial_values}
      onSubmit={() => {}}
      enableReinitialize
    >
      <form className="container grid grid-cols-3 gap-x-6">
        <div>Simulateur SoloPortfolio</div>
        <div>
          <Button>Partager</Button>
        </div>

        <InputTabs />
        <div>Results</div>
      </form>
    </Formik>
  );
}

export { App };
