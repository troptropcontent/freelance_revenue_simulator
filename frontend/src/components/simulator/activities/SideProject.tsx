import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { Activities } from "src/components/simulator/constants";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";

const SideProject = () => {
  return (
    <BaseActivity
      title={Activities.side_project.label}
      identifier="side_project"
      description={Activities.side_project.description}
    >
      <Range
        name="side_project.revenue"
        label="Chiffres d'affaires moyen"
        unit="€ / mois"
      />
      <Range
        name="side_project.average_time_spent"
        label="Temps alloué"
        unit="jours / semaine"
        min={0}
        max={20}
        step={0.5}
      />
      <EnjoymentRateInput name="side_project.enjoyment_rate" />
    </BaseActivity>
  );
};

export { SideProject };
