import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { Activities } from "src/components/simulator/constants";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";

const Training = () => {
  return (
    <BaseActivity title={Activities.training.label} identifier="training">
      <Range name="training.rate" label="Tarif" unit="€ / formation" />
      <Range
        name="training.quantity"
        label="Nombre de formations"
        unit="/ mois"
      />
      <Range
        name="training.average_time_spent"
        label="Temps alloué"
        unit="jours / semaine"
      />
      <EnjoymentRateInput name="training.enjoyment_rate" />
    </BaseActivity>
  );
};

export { Training };
