import { Formik } from "formik";
import { Activities, ActivitiesType } from "./components/simulator/constants";
import { useTranslation } from "react-i18next";
import { useFormInitialValues } from "./shared/hooks";
import { Button } from "./components/ui/Button";
import { InputTabs } from "./components/simulator/inputs/InputTabs";

function App() {
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
