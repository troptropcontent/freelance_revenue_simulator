import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { Activities } from "src/components/simulator/constants";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";

const FreelanceDailyRate = () => {
  return (
    <BaseActivity
      title={Activities.freelance_daily_rate.label}
      description={Activities.freelance_daily_rate.description}
      identifier="freelance_daily_rate"
    >
      <Range
        name="freelance_daily_rate.rate"
        label="Tarif Journalier Moyen (TJM)"
        hint="(i) Débutant : 250€ - Intermédiaire : 500€ - Pro 750€ - Expert : 1000€."
        unit="€"
        min={200}
        max={2000}
        step={50}
      />
      <Range
        name="freelance_daily_rate.quantity"
        label="Nombre de jours facturés"
        min={0}
        max={30}
        step={1}
        unit="/ mois"
      />
      <EnjoymentRateInput name="freelance_daily_rate.enjoyment_rate" />
    </BaseActivity>
  );
};

export { FreelanceDailyRate };
