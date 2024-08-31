import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { Activities } from "src/components/simulator/constants";
import { EnjoymentRateInput } from "src/components/simulator/activities/private/EnjoymentRateInput";

const SideProject = () => {
  return (
    <BaseActivity
      title={Activities.side_project.label}
      identifier="side_project"
    >
      <Range
        name="side_project.revenue"
        label="Revenu mensuel"
        unit="€ / mois"
      />
      <Range
        name="side_project.average_time_spent"
        label="Temps alloué"
        unit="jours / semaine"
      />
      <EnjoymentRateInput name="side_project.enjoyment_rate" />
    </BaseActivity>
  );
};

export { SideProject };
