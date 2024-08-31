import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { Activities } from "src/components/simulator/constants";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";

const Sponsorship = () => {
  return (
    <BaseActivity title={Activities.sponsorship.label} identifier="sponsorship">
      <Range
        name="sponsorship.rate"
        label="Tarif par contenu sponsorisé"
        unit="€ / contenu"
      />
      <Range
        name="sponsorship.quantity"
        label="Nombre de contenu sponsorisé"
        unit="/ mois"
      />
      <Range
        name="sponsorship.average_time_spent"
        label="Temps passé par contenu sponsorisé"
        unit="jours"
      />
      <EnjoymentRateInput name="sponsorship.enjoyment_rate" />
    </BaseActivity>
  );
};

export { Sponsorship };
