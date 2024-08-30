import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { Activities } from "src/components/simulator/constants";

const FreelanceDailyRate = () => {
  return (
    <BaseActivity
      title={Activities.freelance_daily_rate.label}
      identifier="freelance_daily_rate"
    >
      <Range
        name="freelance_daily_rate.rate"
        label="Tarif Journalier Moyen (TJM)"
        hint="A titre indicatif, 250€ pour un débutant, 500€ pour un intermédiaire, 750€ pour un pro, 1000€ pour un expert."
        unit="€"
        min={200}
        max={2000}
        step={50}
      />
      <Range
        name="freelance_daily_rate.quantity"
        label="Nombre de missions par mois"
        min={0}
        max={30}
        step={1}
        unit="/ mois"
      />
      <Range
        name="freelance_daily_rate.enjoyment_rate"
        label="Niveau de stimulation"
        hint="A titre indicatif, 1 pour un travail sans intérêt, 5 pour un travail passionnant."
        min={0}
        max={5}
        step={1}
      />
    </BaseActivity>
  );
};

export { FreelanceDailyRate };
