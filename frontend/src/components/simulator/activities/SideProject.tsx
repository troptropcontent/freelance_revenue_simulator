import { Range } from "src/components/ui/formik/Range";
import { BaseActivity } from "src/components/simulator/activities/BaseActivity";
import { Activities } from "src/components/simulator/constants";

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
      <Range
        name="side_project.enjoyment_rate"
        label="Niveau de kiff"
        max={5}
        unit="/ 5"
      />
    </BaseActivity>
  );
};

export { SideProject };
