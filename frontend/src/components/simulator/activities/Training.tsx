import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { Activities } from "src/components/simulator/constants";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";

const Training = () => {
  return (
    <BaseActivity
      title={Activities.training.label}
      identifier="training"
      description={Activities.training.description}
    >
      <Range
        name="training.rate"
        label="Tarif"
        unit="€ / formation"
        min={0}
        max={10000}
        step={50}
      />
      <Range
        name="training.quantity"
        label="Nombre de formations"
        unit="/ mois"
        min={0}
        max={100} 
      />
      <Range
        name="training.average_time_spent"
        label="Temps alloué par formation"
        unit="jours / semaine"
        min={0}
        max={20}
        step={0.5}
      />
      <EnjoymentRateInput name="training.enjoyment_rate" />
    </BaseActivity>
  );
};

export { Training };
