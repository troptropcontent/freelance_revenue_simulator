import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { Activities } from "src/components/simulator/constants";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";

const Consulting = () => {
  return (
    <BaseActivity
      title={Activities.consulting.label}
      identifier="consulting"
      description={Activities.consulting.description}
    >
      <Range name="consulting.rate" label="Tarif horaire" unit="€ / h" />
      <Range
        name="consulting.quantity"
        label="Nombre d'heures facturées"
        unit="h / mois"
      />
      <EnjoymentRateInput name="consulting.enjoyment_rate" />
    </BaseActivity>
  );
};

export { Consulting };
