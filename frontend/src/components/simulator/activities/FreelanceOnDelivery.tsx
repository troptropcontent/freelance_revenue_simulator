import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { Activities } from "src/components/simulator/constants";

const FreelanceOnDelivery = () => {
  return (
    <BaseActivity
      title={Activities.freelance_on_delivery.label}
      identifier="freelance_on_delivery"
    >
      <Range
        name="freelance_on_delivery.rate"
        label="Tarif moyen d'une mission"
        unit="€ / mission"
      />
      <Range
        name="freelance_on_delivery.quantity"
        label="Nombre de missions"
        unit="/ mois"
      />
      <Range
        name="freelance_on_delivery.average_time_spent"
        label="Temps passé par mission"
        unit="jours"
      />
      <Range
        name="freelance_on_delivery.enjoyment_rate"
        label="Niveau de kiff"
        max={5}
        unit="/ 5"
      />
    </BaseActivity>
  );
};

export { FreelanceOnDelivery };
