import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { Activities } from "src/components/simulator/constants";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";

const Sponsorship = () => {
  return (
    <BaseActivity
      title={Activities.sponsorship.label}
      identifier="sponsorship"
      description={Activities.sponsorship.description}
    >
      <Range
        name="sponsorship.rate"
        label="Tarif par contenu sponsorisé"
        unit="€ / contenu"
        min={100}
        max={10000}
        step={50}
      />
      <Range
        name="sponsorship.quantity"
        label="Nombre de contenus sponsorisés"
        unit="/ mois"
      />
      <Range
        name="sponsorship.average_time_spent"
        label="Temps passé par contenu sponsorisé"
        min={0}
        max={10}
        step={0.5}
        unit="jours"
      />
      <EnjoymentRateInput name="sponsorship.enjoyment_rate" />
    </BaseActivity>
  );
};

export { Sponsorship };
