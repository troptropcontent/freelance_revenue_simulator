import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { Activities } from "src/components/simulator/constants";

const Consulting = () => {
  return (
    <BaseActivity title={Activities.consulting.label} identifier="consulting">
      <Range name="consulting.rate" label="Tarif horaire" unit="€ / h" />
      <Range
        name="consulting.quantity"
        label="Nombre d'heures facturées"
        unit="h / mois"
      />
      <Range
        name="consulting.enjoyment_rate"
        label="Niveau de kiff"
        max={5}
        unit="/ 5"
      />
    </BaseActivity>
  );
};

export { Consulting };
