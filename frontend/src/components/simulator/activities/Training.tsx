import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { Activities } from "src/components/simulator/constants";

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
      <Range
        name="training.enjoyment_rate"
        label="Niveau de kiff"
        max={5}
        unit="/ 5"
      />
    </BaseActivity>
  );
};

export { Training };
