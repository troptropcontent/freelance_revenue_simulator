import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { Activities } from "src/components/simulator/constants";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";

const FreelanceOnDelivery = () => {
  return (
    <BaseActivity
      title={Activities.freelance_on_delivery.label}
      identifier="freelance_on_delivery"
      description={Activities.freelance_on_delivery.description}
    >
      <Range
        name="freelance_on_delivery.rate"
        label="Tarif moyen d'une mission"
        unit="€ / mission"
        min={100}
        max={50000}
        step={50}
      />
      <Range
        name="freelance_on_delivery.quantity"
        label="Nombre de missions facturées"
        min={0}
        max={50}
        unit="/ mois"
      />
      <Range
        name="freelance_on_delivery.average_time_spent"
        label="Temps passé par mission"
        min={0}
        max={20}
        step={0.5}
        unit="jours"
      />
      <EnjoymentRateInput name="freelance_on_delivery.enjoyment_rate" />
    </BaseActivity>
  );
};

export { FreelanceOnDelivery };
